import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import CardInterdicao from '../../components/CardInterdicao/CardInterdicao';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioEncerramento from '../../components/FormularioEncerramento/FormularioEncerramento';
import MensagemRetorno from '../../components/MensagemRetorno/MensagemRetorno';
import Pagina from '../../components/Pagina/Pagina';
import { useAvisoNavegacao } from '../../hooks/useAvisoNavegacao';
import { useFetch } from '../../hooks/useFetch';
import { encerrarInterdicao, listarInterdicoes } from '../../services/interdicoes';
import { listarTrechos } from '../../services/trechos';
import { listarUsuarios } from '../../services/usuarios';
import type { DadosEncerramento, Interdicao } from '../../types/interdicao';

type Filtro = 'ativos' | 'encerrados' | 'todos';

const FILTROS: { valor: Filtro; rotulo: string }[] = [
    { valor: 'ativos', rotulo: 'Ativos' },
    { valor: 'encerrados', rotulo: 'Liberados' },
    { valor: 'todos', rotulo: 'Todos' },
];

async function carregarAvisos(signal: AbortSignal) {
    const [interdicoes, trechos, usuarios] = await Promise.all([
        listarInterdicoes(signal),
        listarTrechos(signal),
        listarUsuarios(signal),
    ]);
    return { interdicoes, trechos, usuarios };
}

function dataParaOrdenar(interdicao: Interdicao): string {
    return Array.isArray(interdicao.dtInicio) ? interdicao.dtInicio.join('-') : interdicao.dtInicio;
}

export default function Avisos() {
    const { dados, carregando, erro, recarregar } = useFetch(carregarAvisos);
    const { aviso, fecharAviso } = useAvisoNavegacao();
    const [parametros, setParametros] = useSearchParams();
    const [encerrandoId, setEncerrandoId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);

    const filtroUrl = parametros.get('situacao');
    const filtro: Filtro = filtroUrl === 'encerrados' || filtroUrl === 'todos' ? filtroUrl : 'ativos';

    const lista = useMemo(() => {
        if (!dados) return [];
        return dados.interdicoes
            .filter((item) =>
                filtro === 'todos' ? true : filtro === 'ativos' ? item.stInterdicao === 'ATIVA' : item.stInterdicao === 'ENCERRADA',
            )
            .sort((a, b) => dataParaOrdenar(b).localeCompare(dataParaOrdenar(a)));
    }, [dados, filtro]);

    const contagem = (valor: Filtro) =>
        dados?.interdicoes.filter((item) =>
            valor === 'todos' ? true : valor === 'ativos' ? item.stInterdicao === 'ATIVA' : item.stInterdicao === 'ENCERRADA',
        ).length ?? 0;

    const nomeTrecho = (cdTrecho: number) => dados?.trechos.find((trecho) => trecho.cdTrecho === cdTrecho)?.nmLogradouro;
    const nomeUsuario = (cdUsuario?: number | null) =>
        dados?.usuarios.find((usuario) => usuario.cdUsuario === cdUsuario)?.nmUsuario;

    async function confirmarLiberacao(interdicao: Interdicao, dadosEncerramento: DadosEncerramento) {
        await encerrarInterdicao(interdicao.cdInterdicao, dadosEncerramento);
        setEncerrandoId(null);
        setMensagem(`Obrigado! ${nomeTrecho(interdicao.cdTrecho) ?? 'O trecho'} foi liberado e voltou para as rotas sugeridas.`);
        recarregar();
    }

    return (
        <Pagina titulo="Avisos de interdição">
            <CabecalhoPagina
                titulo="Avisos de interdição"
                descricao="Obras, alagamentos e bloqueios avisados pelos moradores. Quando o trecho for liberado, outra pessoa confirma."
                acoes={
                    <Botao para="/avisos/novo" variante="perigo" icone="alerta">
                        Avisar interdição
                    </Botao>
                }
            />

            <div className="mb-6 flex flex-col gap-4">
                {aviso && (
                    <MensagemRetorno tipo={aviso.tipo} aoFechar={fecharAviso}>
                        {aviso.mensagem}
                    </MensagemRetorno>
                )}
                {mensagem && (
                    <MensagemRetorno tipo="sucesso" aoFechar={() => setMensagem(null)}>
                        {mensagem}
                    </MensagemRetorno>
                )}
            </div>

            <div role="group" aria-label="Filtrar avisos por situação" className="mb-8 flex flex-wrap gap-2">
                {FILTROS.map((opcao) => {
                    const ativo = opcao.valor === filtro;
                    return (
                        <button
                            key={opcao.valor}
                            type="button"
                            aria-pressed={ativo}
                            onClick={() => setParametros(opcao.valor === 'ativos' ? {} : { situacao: opcao.valor }, { replace: true })}
                            className={`inline-flex min-h-12 items-center gap-2 rounded-full border-2 px-5 font-display font-extrabold ${
                                ativo ? 'border-azul-noite bg-azul-noite text-white' : 'border-linha bg-white text-azul-noite hover:border-azul-noite'
                            }`}
                        >
                            {opcao.rotulo}
                            {dados && (
                                <span className={`rounded-full px-2 text-sm ${ativo ? 'bg-white/20' : 'bg-azul-50'}`}>{contagem(opcao.valor)}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {carregando && !dados && <EstadoRequisicao tipo="carregando" titulo="Carregando os avisos…" />}
            {erro && (
                <EstadoRequisicao
                    tipo="erro"
                    titulo="Não conseguimos carregar os avisos"
                    texto={erro.message}
                    aoTentarNovamente={recarregar}
                />
            )}

            {dados && lista.length === 0 && (
                <EstadoRequisicao
                    tipo="vazio"
                    titulo={filtro === 'ativos' ? 'Nenhuma interdição ativa agora' : 'Nenhum aviso por aqui'}
                    texto={
                        filtro === 'ativos'
                            ? 'Todos os trechos avisados estão liberados. Viu uma obra ou alagamento? Avise a vizinhança.'
                            : 'Os avisos aparecem aqui assim que alguém publicar.'
                    }
                    acao={
                        <Botao para="/avisos/novo" variante="perigo" icone="alerta">
                            Avisar interdição
                        </Botao>
                    }
                />
            )}

            {dados && lista.length > 0 && (
                <ul className="grid gap-5 lg:grid-cols-2">
                    {lista.map((interdicao) => (
                        <li key={interdicao.cdInterdicao}>
                            <CardInterdicao
                                interdicao={interdicao}
                                nomeTrecho={nomeTrecho(interdicao.cdTrecho)}
                                nomeQuemAvisou={nomeUsuario(interdicao.cdUsuarioAviso)}
                                nomeQuemConfirmou={nomeUsuario(interdicao.cdUsuarioConfirma)}
                            >
                                {interdicao.stInterdicao === 'ATIVA' &&
                                    (encerrandoId === interdicao.cdInterdicao ? (
                                        <FormularioEncerramento
                                            interdicao={interdicao}
                                            usuarios={dados.usuarios}
                                            aoEnviar={(dadosEncerramento) => confirmarLiberacao(interdicao, dadosEncerramento)}
                                            aoCancelar={() => setEncerrandoId(null)}
                                        />
                                    ) : (
                                        <Botao
                                            variante="secundario"
                                            icone="check"
                                            onClick={() => setEncerrandoId(interdicao.cdInterdicao)}
                                            className="w-fit"
                                        >
                                            Já foi liberado
                                        </Botao>
                                    ))}
                            </CardInterdicao>
                        </li>
                    ))}
                </ul>
            )}
        </Pagina>
    );
}
