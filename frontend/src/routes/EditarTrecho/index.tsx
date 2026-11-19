import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioTrecho from '../../components/FormularioTrecho/FormularioTrecho';
import Pagina from '../../components/Pagina/Pagina';
import { useFetch } from '../../hooks/useFetch';
import { alterarTrecho, buscarTrecho } from '../../services/trechos';
import type { DadosTrecho } from '../../types/trecho';

export default function EditarTrecho() {
    const { id } = useParams();
    const cdTrecho = Number(id);
    const navigate = useNavigate();

    const carregar = useCallback((signal: AbortSignal) => buscarTrecho(cdTrecho, signal), [cdTrecho]);
    const { dados: trecho, carregando, erro, recarregar } = useFetch(carregar);

    if (!Number.isInteger(cdTrecho) || cdTrecho <= 0) {
        return <Navigate to="/trechos" replace state={{ aviso: { tipo: 'erro', mensagem: `“${id}” não é um trecho válido.` } }} />;
    }

    async function salvar(dados: DadosTrecho) {
        await alterarTrecho(cdTrecho, dados);
        navigate(`/trechos/${cdTrecho}`, { state: { aviso: { tipo: 'sucesso', mensagem: 'Alterações salvas.' } } });
    }

    return (
        <Pagina titulo="Editar trecho" estreita>
            <CabecalhoPagina
                titulo="Editar trecho"
                descricao={trecho ? `Você está editando “${trecho.nmLogradouro}”.` : undefined}
                voltar={{ para: `/trechos/${cdTrecho}`, rotulo: 'Voltar ao trecho' }}
            />

            {carregando && <EstadoRequisicao tipo="carregando" titulo="Carregando os dados do trecho…" />}
            {erro && (
                <EstadoRequisicao
                    tipo="erro"
                    titulo={erro.status === 404 ? 'Esse trecho não existe' : 'Não conseguimos carregar o trecho'}
                    texto={erro.message}
                    aoTentarNovamente={erro.status === 404 ? undefined : recarregar}
                    acao={<Botao para="/trechos">Ir para o mapa</Botao>}
                />
            )}
            {trecho && !carregando && (
                <div className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                    <FormularioTrecho modo="edicao" valoresIniciais={trecho} aoEnviar={salvar} />
                </div>
            )}
        </Pagina>
    );
}
