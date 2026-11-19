import { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import CardAvaliacao from '../../components/CardAvaliacao/CardAvaliacao';
import CardInterdicao from '../../components/CardInterdicao/CardInterdicao';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioEncerramento from '../../components/FormularioEncerramento/FormularioEncerramento';
import ListaCriterios from '../../components/ListaCriterios/ListaCriterios';
import MensagemRetorno from '../../components/MensagemRetorno/MensagemRetorno';
import Pagina from '../../components/Pagina/Pagina';
import SeloNota from '../../components/SeloNota/SeloNota';
import { useAvisoNavegacao } from '../../hooks/useAvisoNavegacao';
import { useFetch } from '../../hooks/useFetch';
import { ErroApi } from '../../services/api';
import { encerrarInterdicao } from '../../services/interdicoes';
import { listarPerfis } from '../../services/perfis';
import { buscarTrechoCompleto, excluirTrecho } from '../../services/trechos';
import { listarUsuarios } from '../../services/usuarios';
import type { AvisoNavegacao } from '../../types/api';
import type { DadosEncerramento } from '../../types/interdicao';
import { classificarNota, formatarNota, notaConforto, pesosDoPerfil } from '../../utils/conforto';
import { formatarMetros, nomePerfil } from '../../utils/texto';

export default function TrechoDetalhe() {
    const { id } = useParams();
    const cdTrecho = Number(id);
    const idValido = Number.isInteger(cdTrecho) && cdTrecho > 0;

    const navigate = useNavigate();
    const { aviso, fecharAviso } = useAvisoNavegacao();
    const [mensagem, setMensagem] = useState<AvisoNavegacao | null>(null);
    const [encerrando, setEncerrando] = useState(false);
    const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
    const [excluindo, setExcluindo] = useState(false);

    const carregar = useCallback(
        async (signal: AbortSignal) => {
            const [completo, usuarios, perfis] = await Promise.all([
                buscarTrechoCompleto(cdTrecho, signal),
                listarUsuarios(signal),
                listarPerfis(signal),
            ]);
            return { ...completo, usuarios, perfis };
        },
        [cdTrecho],
    );

    const { dados, carregando, erro, recarregar } = useFetch(carregar);

    if (!idValido) {
        return <Navigate to="/trechos" replace state={{ aviso: { tipo: 'erro', mensagem: `“${id}” não é um trecho válido.` } }} />;
    }

    const nomeUsuario = (cdUsuario?: number | null) =>
        dados?.usuarios.find((usuario) => usuario.cdUsuario === cdUsuario)?.nmUsuario;

    async function confirmarLiberacao(dadosEncerramento: DadosEncerramento) {
        if (!dados?.interdicaoAtiva) return;
        await encerrarInterdicao(dados.interdicaoAtiva.cdInterdicao, dadosEncerramento);
        setEncerrando(false);
        setMensagem({ tipo: 'sucesso', mensagem: 'Obrigado! O trecho foi liberado e voltou para as rotas sugeridas.' });
        recarregar();
    }

    async function excluir() {
        setExcluindo(true);
        setMensagem(null);
        try {
            await excluirTrecho(cdTrecho);
            navigate('/trechos', { state: { aviso: { tipo: 'sucesso', mensagem: 'Trecho excluído do mapa.' } } });
        } catch (erroExclusao) {
            setMensagem({
                tipo: 'erro',
                mensagem: erroExclusao instanceof ErroApi ? erroExclusao.message : 'Não foi possível excluir o trecho.',
            });
            setConfirmandoExclusao(false);
        } finally {
            setExcluindo(false);
        }
    }

    const voltar = { para: '/trechos', rotulo: 'Voltar ao mapa de conforto' };

    if (carregando && !dados) {
        return (
            <Pagina titulo="Carregando trecho">
                <EstadoRequisicao tipo="carregando" titulo="Carregando o trecho…" />
            </Pagina>
        );
    }

    if (erro || !dados) {
        const naoExiste = erro?.status === 404;
        return (
            <Pagina titulo={naoExiste ? 'Trecho não encontrado' : 'Erro ao carregar trecho'}>
                <CabecalhoPagina titulo={naoExiste ? 'Trecho não encontrado' : 'Algo deu errado'} voltar={voltar} />
                <EstadoRequisicao
                    tipo="erro"
                    titulo={naoExiste ? `Não existe trecho com o código ${cdTrecho}` : 'Não conseguimos carregar este trecho'}
                    texto={erro?.message}
                    aoTentarNovamente={naoExiste ? undefined : recarregar}
                    acao={<Botao para="/trechos">Ir para o mapa</Botao>}
                />
            </Pagina>
        );
    }

    const { trecho, avaliacoes, interdicoes, medias, interdicaoAtiva, perfis, usuarios } = dados;
    const notaGeral = notaConforto(medias);
    const encerradas = interdicoes.filter((item) => item.stInterdicao === 'ENCERRADA');
    const avaliacoesRecentes = [...avaliacoes].sort((a, b) => String(b.dtAvaliacao).localeCompare(String(a.dtAvaliacao)));

    return (
        <Pagina titulo={trecho.nmLogradouro}>
            <CabecalhoPagina
                titulo={trecho.nmLogradouro}
                descricao={`${trecho.nmBairro}, ${trecho.nmCidade}. Extensão de ${formatarMetros(trecho.vlExtensaoM)}.`}
                voltar={voltar}
                acoes={
                    <>
                        <Botao para={`/trechos/${cdTrecho}/avaliar`} icone="comentario">
                            Avaliar trecho
                        </Botao>
                        {!interdicaoAtiva && (
                            <Botao para={`/avisos/novo?trecho=${cdTrecho}`} variante="perigo" icone="alerta">
                                Avisar interdição
                            </Botao>
                        )}
                    </>
                }
            />

            <div className="flex flex-col gap-4">
                {aviso && (
                    <MensagemRetorno tipo={aviso.tipo} aoFechar={fecharAviso}>
                        {aviso.mensagem}
                    </MensagemRetorno>
                )}
                {mensagem && (
                    <MensagemRetorno tipo={mensagem.tipo} aoFechar={() => setMensagem(null)}>
                        {mensagem.mensagem}
                    </MensagemRetorno>
                )}
            </div>

            {interdicaoAtiva && (
                <section aria-label="Interdição ativa" className="mt-6">
                    <CardInterdicao
                        interdicao={interdicaoAtiva}
                        nomeTrecho={trecho.nmLogradouro}
                        nomeQuemAvisou={nomeUsuario(interdicaoAtiva.cdUsuarioAviso)}
                        mostrarLinkTrecho={false}
                    >
                        {encerrando ? (
                            <FormularioEncerramento
                                interdicao={interdicaoAtiva}
                                usuarios={usuarios}
                                aoEnviar={confirmarLiberacao}
                                aoCancelar={() => setEncerrando(false)}
                            />
                        ) : (
                            <Botao variante="secundario" icone="check" onClick={() => setEncerrando(true)} className="w-fit">
                                Já foi liberado
                            </Botao>
                        )}
                    </CardInterdicao>
                </section>
            )}

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <section aria-labelledby="titulo-conforto" className="rounded-cartao border border-linha bg-white p-5 md:p-7">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <h2 id="titulo-conforto" className="text-2xl font-extrabold">
                                Conforto do trecho
                            </h2>
                            <p className="mt-1 text-ardosia">
                                {avaliacoes.length === 0
                                    ? 'Ninguém avaliou este trecho ainda.'
                                    : `Baseado em ${avaliacoes.length} ${avaliacoes.length === 1 ? 'avaliação' : 'avaliações'} de moradores.`}
                            </p>
                        </div>
                        <SeloNota nota={notaGeral} tamanho="grande" />
                    </div>
                    {medias ? (
                        <ListaCriterios medias={medias} />
                    ) : (
                        <EstadoRequisicao
                            tipo="vazio"
                            titulo="Sem avaliações por enquanto"
                            texto="Você passa por aqui? Conte como é a sombra, a calçada e o resto."
                            acao={<Botao para={`/trechos/${cdTrecho}/avaliar`}>Avaliar trecho</Botao>}
                        />
                    )}
                </section>

                <section aria-labelledby="titulo-perfis" className="rounded-cartao border border-linha bg-white p-5 md:p-7">
                    <h2 id="titulo-perfis" className="text-2xl font-extrabold">
                        Nota para cada perfil
                    </h2>
                    <p className="mt-1 mb-5 text-ardosia">Cada perfil dá mais peso aos critérios que mais importam para ele.</p>
                    {medias ? (
                        <ul className="flex flex-col divide-y divide-linha">
                            {perfis.map((perfil) => {
                                const nota = notaConforto(medias, pesosDoPerfil(perfil.nmPerfil));
                                return (
                                    <li key={perfil.cdPerfil} className="flex items-center justify-between gap-3 py-3">
                                        <span className="font-bold text-azul-noite">{nomePerfil(perfil.nmPerfil)}</span>
                                        {nota !== null && (
                                            <span
                                                className={`rounded-full px-3 py-1 font-display font-extrabold ${classificarNota(nota).fundo} ${classificarNota(nota).texto}`}
                                            >
                                                {formatarNota(nota)} · {classificarNota(nota).rotulo}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-ardosia">As notas por perfil aparecem depois da primeira avaliação.</p>
                    )}
                </section>
            </div>

            {avaliacoes.length > 0 && (
                <section aria-labelledby="titulo-avaliacoes" className="mt-12">
                    <h2 id="titulo-avaliacoes" className="mb-5 text-2xl font-extrabold">
                        O que os moradores dizem
                    </h2>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {avaliacoesRecentes.map((avaliacao) => {
                            const autor = usuarios.find((usuario) => usuario.cdUsuario === avaliacao.cdUsuario);
                            return (
                                <li key={avaliacao.cdAvaliacao}>
                                    <CardAvaliacao avaliacao={avaliacao} nomeUsuario={autor?.nmUsuario} perfilUsuario={autor?.nmPerfil} />
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {encerradas.length > 0 && (
                <section aria-labelledby="titulo-historico" className="mt-12">
                    <h2 id="titulo-historico" className="mb-5 text-2xl font-extrabold">
                        Interdições anteriores
                    </h2>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {encerradas.map((interdicao) => (
                            <li key={interdicao.cdInterdicao}>
                                <CardInterdicao
                                    interdicao={interdicao}
                                    nomeQuemAvisou={nomeUsuario(interdicao.cdUsuarioAviso)}
                                    nomeQuemConfirmou={nomeUsuario(interdicao.cdUsuarioConfirma)}
                                    mostrarLinkTrecho={false}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section aria-labelledby="titulo-gerenciar" className="mt-12 rounded-cartao border border-linha bg-white p-5 md:p-7">
                <h2 id="titulo-gerenciar" className="text-xl font-extrabold">
                    Gerenciar trecho
                </h2>
                <p className="mt-1 text-ardosia">
                    Corrija o nome ou a extensão, ou exclua o trecho. Só dá para excluir trechos sem avaliações e sem interdições.
                </p>

                {confirmandoExclusao ? (
                    <div role="alertdialog" aria-labelledby="titulo-confirmar" className="mt-5 rounded-botao border-2 border-interditado bg-interditado-fundo p-4">
                        <p id="titulo-confirmar" className="font-bold text-interditado">
                            Excluir “{trecho.nmLogradouro}” do mapa? Essa ação não pode ser desfeita.
                        </p>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <Botao variante="perigo" icone="lixeira" onClick={excluir} carregando={excluindo}>
                                {excluindo ? 'Excluindo…' : 'Sim, excluir'}
                            </Botao>
                            <Botao variante="secundario" onClick={() => setConfirmandoExclusao(false)}>
                                Cancelar
                            </Botao>
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Botao para={`/trechos/${cdTrecho}/editar`} variante="secundario" icone="lapis">
                            Editar trecho
                        </Botao>
                        <Botao variante="secundario" icone="lixeira" onClick={() => setConfirmandoExclusao(true)}>
                            Excluir trecho
                        </Botao>
                    </div>
                )}
            </section>
        </Pagina>
    );
}
