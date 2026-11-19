import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioAvaliacao from '../../components/FormularioAvaliacao/FormularioAvaliacao';
import Pagina from '../../components/Pagina/Pagina';
import { useFetch } from '../../hooks/useFetch';
import { cadastrarAvaliacao } from '../../services/avaliacoes';
import { buscarTrecho } from '../../services/trechos';
import { listarUsuarios } from '../../services/usuarios';
import type { DadosAvaliacao } from '../../types/avaliacao';

export default function AvaliarTrecho() {
    const { id } = useParams();
    const cdTrecho = Number(id);
    const navigate = useNavigate();

    const carregar = useCallback(
        async (signal: AbortSignal) => {
            const [trecho, usuarios] = await Promise.all([buscarTrecho(cdTrecho, signal), listarUsuarios(signal)]);
            return { trecho, usuarios };
        },
        [cdTrecho],
    );
    const { dados, carregando, erro, recarregar } = useFetch(carregar);

    if (!Number.isInteger(cdTrecho) || cdTrecho <= 0) {
        return <Navigate to="/trechos" replace state={{ aviso: { tipo: 'erro', mensagem: `“${id}” não é um trecho válido.` } }} />;
    }

    async function enviar(avaliacao: DadosAvaliacao) {
        await cadastrarAvaliacao(cdTrecho, avaliacao);
        navigate(`/trechos/${cdTrecho}`, {
            state: { aviso: { tipo: 'sucesso', mensagem: 'Obrigado! Sua avaliação ajuda quem anda por aqui.' } },
        });
    }

    return (
        <Pagina titulo="Avaliar trecho">
            <CabecalhoPagina
                titulo={dados ? `Avaliar ${dados.trecho.nmLogradouro}` : 'Avaliar trecho'}
                descricao="Dê uma nota de 1 a 5 para cada critério, pensando em como o trecho costuma ser no dia a dia. Em todos eles, 5 é o melhor."
                voltar={{ para: `/trechos/${cdTrecho}`, rotulo: 'Voltar ao trecho' }}
            />

            {carregando && <EstadoRequisicao tipo="carregando" titulo="Preparando a avaliação…" />}
            {erro && (
                <EstadoRequisicao
                    tipo="erro"
                    titulo={erro.status === 404 ? 'Esse trecho não existe' : 'Não conseguimos abrir a avaliação'}
                    texto={erro.message}
                    aoTentarNovamente={erro.status === 404 ? undefined : recarregar}
                    acao={<Botao para="/trechos">Ir para o mapa</Botao>}
                />
            )}
            {dados && dados.usuarios.length === 0 && (
                <EstadoRequisicao
                    tipo="vazio"
                    titulo="Ainda não há moradores cadastrados"
                    texto="Para avaliar, primeiro cadastre-se como morador."
                    acao={<Botao para="/participar">Quero participar</Botao>}
                />
            )}
            {dados && dados.usuarios.length > 0 && (
                <div className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                    <FormularioAvaliacao usuarios={dados.usuarios} aoEnviar={enviar} />
                </div>
            )}
        </Pagina>
    );
}
