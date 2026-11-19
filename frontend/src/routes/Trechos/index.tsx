import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import CardTrecho from '../../components/CardTrecho/CardTrecho';
import ChipsPerfil from '../../components/ChipsPerfil/ChipsPerfil';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import Icone from '../../components/Icone/Icone';
import MensagemRetorno from '../../components/MensagemRetorno/MensagemRetorno';
import Pagina from '../../components/Pagina/Pagina';
import { useAvisoNavegacao } from '../../hooks/useAvisoNavegacao';
import { useFetch } from '../../hooks/useFetch';
import { listarPerfis } from '../../services/perfis';
import { listarTrechosComResumo } from '../../services/trechos';
import { ordenarPorConforto, pesosDoPerfil } from '../../utils/conforto';
import { nomePerfil } from '../../utils/texto';

async function carregarMapa(signal: AbortSignal) {
    const [perfis, trechos] = await Promise.all([listarPerfis(signal), listarTrechosComResumo(signal)]);
    return { perfis, trechos };
}

// Remove acentos e caixa para a busca achar "consolacao" ao digitar "Consolação".
function normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function Trechos() {
    const { dados, carregando, erro, recarregar } = useFetch(carregarMapa);
    const { aviso, fecharAviso } = useAvisoNavegacao();
    const [parametros, setParametros] = useSearchParams();
    const [busca, setBusca] = useState('');

    // O perfil fica na URL (?perfil=3): dá para compartilhar o link e voltar ao mesmo filtro.
    const perfilId = Number(parametros.get('perfil')) || null;
    const perfilEscolhido = dados?.perfis.find((perfil) => perfil.cdPerfil === perfilId) ?? null;

    function escolherPerfil(id: number | null) {
        setParametros(id ? { perfil: String(id) } : {}, { replace: true });
    }

    const ordenados = useMemo(() => {
        if (!dados) return [];
        const termo = normalizar(busca.trim());
        return ordenarPorConforto(dados.trechos, pesosDoPerfil(perfilEscolhido?.nmPerfil)).filter(({ resumo }) =>
            termo === '' ? true : normalizar(`${resumo.trecho.nmLogradouro} ${resumo.trecho.nmBairro}`).includes(termo),
        );
    }, [dados, busca, perfilEscolhido]);

    const liberados = ordenados.filter((item) => !item.resumo.interdicaoAtiva);
    const interditados = ordenados.filter((item) => item.resumo.interdicaoAtiva);
    const totalAvaliados = liberados.filter((item) => item.nota !== null).length;

    return (
        <Pagina titulo="Mapa de conforto">
            <CabecalhoPagina
                titulo="Mapa de conforto"
                descricao="Trechos de rua avaliados pelos moradores, do mais confortável para o menos. Interditados ficam no fim da lista."
                acoes={
                    <Botao para="/trechos/novo" icone="mais" variante="secundario">
                        Cadastrar trecho
                    </Botao>
                }
            />

            {aviso && (
                <div className="mb-6">
                    <MensagemRetorno tipo={aviso.tipo} aoFechar={fecharAviso}>
                        {aviso.mensagem}
                    </MensagemRetorno>
                </div>
            )}

            {carregando && <EstadoRequisicao tipo="carregando" titulo="Carregando o mapa de conforto…" />}

            {erro && (
                <EstadoRequisicao
                    tipo="erro"
                    titulo="Não conseguimos carregar o mapa"
                    texto={erro.message}
                    aoTentarNovamente={recarregar}
                />
            )}

            {dados && (
                <>
                    <section
                        aria-label="Filtros"
                        className="mb-8 grid gap-6 rounded-cartao border border-linha bg-white p-5 md:p-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end"
                    >
                        <ChipsPerfil perfis={dados.perfis} selecionado={perfilId} aoSelecionar={escolherPerfil} />

                        <div className="flex flex-col gap-2">
                            <label htmlFor="busca-trecho" className="font-bold text-azul-noite">
                                Buscar rua ou bairro
                            </label>
                            <div className="relative">
                                <Icone
                                    nome="busca"
                                    className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ardosia"
                                />
                                <input
                                    id="busca-trecho"
                                    type="search"
                                    value={busca}
                                    onChange={(evento) => setBusca(evento.target.value)}
                                    placeholder="Ex.: Paulista"
                                    className="min-h-12 w-full rounded-campo border-2 border-azul-noite/70 bg-white py-2.5 pr-4 pl-12 text-lg outline-none hover:border-azul-noite focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-azul-noite"
                                />
                            </div>
                        </div>
                    </section>

                    <p className="mb-5 text-ardosia" role="status">
                        {ordenados.length === 0
                            ? 'Nenhum trecho encontrado.'
                            : `${ordenados.length} ${ordenados.length === 1 ? 'trecho' : 'trechos'}, ${totalAvaliados} com nota${
                                  perfilEscolhido ? `, ordenados para o perfil ${nomePerfil(perfilEscolhido.nmPerfil).toLowerCase()}` : ''
                              }.`}
                    </p>

                    {dados.trechos.length === 0 && (
                        <EstadoRequisicao
                            tipo="vazio"
                            titulo="Ainda não há trechos cadastrados"
                            texto="Cadastre o primeiro trecho de rua para começar o mapa."
                            acao={<Botao para="/trechos/novo">Cadastrar trecho</Botao>}
                        />
                    )}

                    {dados.trechos.length > 0 && ordenados.length === 0 && (
                        <EstadoRequisicao
                            tipo="vazio"
                            titulo={`Nada encontrado para “${busca.trim()}”`}
                            texto="Confira a grafia ou busque só pelo nome do bairro."
                            acao={
                                <Botao variante="secundario" onClick={() => setBusca('')}>
                                    Limpar busca
                                </Botao>
                            }
                        />
                    )}

                    {liberados.length > 0 && (
                        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                            {liberados.map((item) => (
                                <li key={item.resumo.trecho.cdTrecho}>
                                    <CardTrecho resumo={item.resumo} nota={item.nota} />
                                </li>
                            ))}
                        </ul>
                    )}

                    {interditados.length > 0 && (
                        <section aria-labelledby="titulo-interditados" className="mt-12">
                            <h2 id="titulo-interditados" className="text-2xl font-extrabold">
                                Fora das rotas por enquanto
                            </h2>
                            <p className="mt-1 mb-5 text-ardosia">Estes trechos têm um aviso de interdição ativo.</p>
                            <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                                {interditados.map((item) => (
                                    <li key={item.resumo.trecho.cdTrecho}>
                                        <CardTrecho resumo={item.resumo} nota={item.nota} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </>
            )}
        </Pagina>
    );
}
