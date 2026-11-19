import { useMemo, useState } from 'react';
import Botao from '../../components/Botao/Botao';
import CardTrecho from '../../components/CardTrecho/CardTrecho';
import ChipsPerfil from '../../components/ChipsPerfil/ChipsPerfil';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import Icone from '../../components/Icone/Icone';
import IlustracaoRota from '../../components/IlustracaoRota/IlustracaoRota';
import { useFetch } from '../../hooks/useFetch';
import { useTituloPagina } from '../../hooks/useTituloPagina';
import { listarPerfis } from '../../services/perfis';
import { listarTrechosComResumo } from '../../services/trechos';
import { ordenarPorConforto, pesosDoPerfil } from '../../utils/conforto';
import { formatarData } from '../../utils/datas';
import { nomePerfil, nomeTipoInterdicao } from '../../utils/texto';

async function carregarInicio(signal: AbortSignal) {
    const [perfis, trechos] = await Promise.all([listarPerfis(signal), listarTrechosComResumo(signal)]);
    return { perfis, trechos };
}

const PASSOS = [
    {
        titulo: 'Nota de conforto',
        texto: 'Mostra como o trecho costuma ser, segundo quem passa por ele todos os dias.',
    },
    {
        titulo: 'Aviso de interdição',
        texto: 'Mostra como o trecho está hoje: obra, alagamento ou bloqueio, com previsão e passagem alternativa.',
    },
    {
        titulo: 'Rota para o seu perfil',
        texto: 'Juntas, as duas informações apontam o caminho mais confortável e liberado para você.',
    },
];

export default function Home() {
    useTituloPagina('Mapa de conforto das ruas');
    const { dados, carregando, erro, recarregar } = useFetch(carregarInicio);
    const [perfilId, setPerfilId] = useState<number | null>(null);

    const perfilEscolhido = dados?.perfis.find((perfil) => perfil.cdPerfil === perfilId) ?? null;

    const melhores = useMemo(() => {
        if (!dados) return [];
        return ordenarPorConforto(dados.trechos, pesosDoPerfil(perfilEscolhido?.nmPerfil))
            .filter((item) => item.nota !== null && !item.resumo.interdicaoAtiva)
            .slice(0, 3);
    }, [dados, perfilEscolhido]);

    const avisoAtivo = dados?.trechos.find((item) => item.interdicaoAtiva) ?? null;
    const linkMapa = perfilId ? `/trechos?perfil=${perfilId}` : '/trechos';

    return (
        <main id="conteudo" tabIndex={-1} className="outline-none">
            {/* Hero */}
            <section className="border-b border-linha">
                <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
                    <div>
                        <p className="mb-5 inline-block rounded-full bg-verde-50 px-4 py-1.5 text-sm font-bold tracking-wide text-verde-texto uppercase">
                            Mapa de conforto das ruas
                        </p>
                        <h1 className="text-[2.5rem] leading-[1.1] font-black md:text-[3.5rem] md:leading-[4rem]">
                            Qual é o melhor caminho para você, agora?
                        </h1>
                        <p className="mt-5 max-w-[60ch] text-lg md:text-xl">
                            Moradores avaliam sombra, iluminação, calçada, segurança e silêncio. O MovEz mostra os trechos mais
                            confortáveis para o seu jeito de andar e avisa quando um trecho está interditado.
                        </p>

                        <div className="mt-8">
                            {dados ? (
                                <ChipsPerfil perfis={dados.perfis} selecionado={perfilId} aoSelecionar={setPerfilId} />
                            ) : (
                                <div aria-hidden="true">
                                    <p className="mb-3 font-bold text-azul-noite">Como você anda?</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[110, 170, 130, 110].map((largura, indice) => (
                                            <span
                                                key={indice}
                                                className="h-12 animate-pulse rounded-full bg-linha"
                                                style={{ width: largura }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Botao para={linkMapa} icone="rota">
                                Ver melhor caminho
                            </Botao>
                            <Botao para="/trechos" variante="secundario">
                                Avaliar um trecho
                            </Botao>
                        </div>
                    </div>

                    <IlustracaoRota />
                </div>
            </section>

            {/* Como funciona */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-16">
                    <h2 className="text-[2rem] leading-tight font-extrabold">Duas informações, uma decisão</h2>
                    <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
                        {PASSOS.map((passo, indice) => (
                            <li key={passo.titulo} className="rounded-cartao bg-neblina p-6">
                                <span className="grid size-10 place-items-center rounded-botao bg-verde-caminho font-display text-xl font-black text-azul-noite">
                                    {indice + 1}
                                </span>
                                <h3 className="mt-4 text-2xl font-extrabold">{passo.titulo}</h3>
                                <p className="mt-2">{passo.texto}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Dados reais da API */}
            <section className="border-t border-linha">
                <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-16">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-[2rem] leading-tight font-extrabold">Os trechos mais confortáveis agora</h2>
                            <p className="mt-2 text-ardosia">
                                {perfilEscolhido
                                    ? `Ordenados pelo que mais importa para quem anda como ${nomePerfil(perfilEscolhido.nmPerfil).toLowerCase()}.`
                                    : 'Escolha como você anda, lá em cima, para ver a ordem certa para você.'}
                            </p>
                        </div>
                        <Botao para={linkMapa} variante="texto">
                            Ver o mapa completo
                        </Botao>
                    </div>

                    <div className="mt-8">
                        {carregando && <EstadoRequisicao tipo="carregando" titulo="Buscando os trechos avaliados…" />}
                        {erro && (
                            <EstadoRequisicao
                                tipo="erro"
                                titulo="Não conseguimos carregar os trechos"
                                texto={erro.message}
                                aoTentarNovamente={recarregar}
                            />
                        )}
                        {dados && melhores.length === 0 && (
                            <EstadoRequisicao
                                tipo="vazio"
                                titulo="Nenhum trecho avaliado ainda"
                                texto="Seja a primeira pessoa a avaliar uma rua do seu bairro."
                                acao={<Botao para="/trechos">Avaliar um trecho</Botao>}
                            />
                        )}
                        {melhores.length > 0 && (
                            <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                                {melhores.map((item, indice) => (
                                    <li key={item.resumo.trecho.cdTrecho}>
                                        <CardTrecho resumo={item.resumo} nota={item.nota} posicao={indice + 1} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* Aviso ativo */}
            {avisoAtivo?.interdicaoAtiva && (
                <section aria-labelledby="titulo-aviso" className="border-t border-linha">
                    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
                        <div className="listras-interdicao flex flex-col gap-5 rounded-cartao border-2 border-interditado p-6 md:flex-row md:items-center md:justify-between md:p-8">
                            <div>
                                <p className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-interditado uppercase">
                                    <Icone nome="alerta" className="size-5" />
                                    Aviso ativo
                                </p>
                                <h2 id="titulo-aviso" className="mt-2 text-2xl leading-tight font-extrabold md:text-[1.75rem]">
                                    {nomeTipoInterdicao(avisoAtivo.interdicaoAtiva.tpInterdicao)} na {avisoAtivo.trecho.nmLogradouro} até{' '}
                                    {formatarData(avisoAtivo.interdicaoAtiva.dtPrevisaoFim)}
                                </h2>
                                {avisoAtivo.interdicaoAtiva.dsPassagemAlternativa && (
                                    <p className="mt-2">Passagem alternativa: {avisoAtivo.interdicaoAtiva.dsPassagemAlternativa}</p>
                                )}
                            </div>
                            <Botao para={`/trechos/${avisoAtivo.trecho.cdTrecho}`} variante="secundario" className="shrink-0">
                                Ver o trecho
                            </Botao>
                        </div>
                    </div>
                </section>
            )}

            {/* Chamada para participar */}
            <section className="bg-white">
                <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-14 md:px-8 md:py-16 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-[2rem] leading-tight font-extrabold">Você conhece as ruas do seu bairro</h2>
                        <p className="mt-3 text-lg">
                            Cadastre-se como morador para avaliar trechos e avisar interdições. Cada nota ajuda quem anda por aqui.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Botao para="/participar" icone="usuario">
                            Quero participar
                        </Botao>
                        <Botao para="/avisos" variante="secundario">
                            Ver avisos
                        </Botao>
                    </div>
                </div>
            </section>
        </main>
    );
}
