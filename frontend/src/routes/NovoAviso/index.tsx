import { Link, useNavigate, useSearchParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioInterdicao from '../../components/FormularioInterdicao/FormularioInterdicao';
import MensagemRetorno from '../../components/MensagemRetorno/MensagemRetorno';
import Pagina from '../../components/Pagina/Pagina';
import { useFetch } from '../../hooks/useFetch';
import { cadastrarInterdicao } from '../../services/interdicoes';
import { listarTrechosComResumo } from '../../services/trechos';
import { listarUsuarios } from '../../services/usuarios';
import type { DadosInterdicao } from '../../types/interdicao';

async function carregarDados(signal: AbortSignal) {
    const [trechos, usuarios] = await Promise.all([listarTrechosComResumo(signal), listarUsuarios(signal)]);
    return { trechos, usuarios };
}

export default function NovoAviso() {
    const navigate = useNavigate();
    const [parametros] = useSearchParams();
    const trechoInicial = parametros.get('trecho') ?? '';
    const { dados, carregando, erro, recarregar } = useFetch(carregarDados);

    async function publicar(cdTrecho: number, interdicao: DadosInterdicao) {
        await cadastrarInterdicao(cdTrecho, interdicao);
        navigate(`/trechos/${cdTrecho}`, {
            state: {
                aviso: {
                    tipo: 'sucesso',
                    mensagem: 'Aviso publicado. O trecho saiu das rotas sugeridas até alguém confirmar a liberação.',
                },
            },
        });
    }

    return (
        <Pagina titulo="Avisar interdição" estreita>
            <CabecalhoPagina
                titulo="Avisar interdição"
                descricao="Conte o que está bloqueando o caminho e até quando. Se souber, diga por onde dá para passar."
                voltar={trechoInicial ? { para: `/trechos/${trechoInicial}`, rotulo: 'Voltar ao trecho' } : { para: '/avisos', rotulo: 'Voltar aos avisos' }}
            />

            {carregando && <EstadoRequisicao tipo="carregando" titulo="Carregando trechos e moradores…" />}
            {erro && (
                <EstadoRequisicao tipo="erro" titulo="Não conseguimos abrir o formulário" texto={erro.message} aoTentarNovamente={recarregar} />
            )}
            {dados && dados.usuarios.length === 0 && (
                <EstadoRequisicao
                    tipo="vazio"
                    titulo="Ainda não há moradores cadastrados"
                    texto="Para avisar uma interdição, primeiro cadastre-se como morador."
                    acao={<Botao para="/participar">Quero participar</Botao>}
                />
            )}
            {dados && dados.usuarios.length > 0 && (
                <div className="flex flex-col gap-5">
                    <MensagemRetorno tipo="info">
                        Cada trecho pode ter só um aviso ativo por vez. Avisos já publicados ficam na página{' '}
                        <Link to="/avisos" className="font-bold underline underline-offset-4">
                            Avisos
                        </Link>
                        .
                    </MensagemRetorno>
                    <div className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                        <FormularioInterdicao
                            trechos={dados.trechos}
                            usuarios={dados.usuarios}
                            trechoInicial={trechoInicial}
                            aoEnviar={publicar}
                        />
                    </div>
                </div>
            )}
        </Pagina>
    );
}
