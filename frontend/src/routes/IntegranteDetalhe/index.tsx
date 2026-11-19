import { Link, useParams } from 'react-router';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FotoIntegrante from '../../components/FotoIntegrante/FotoIntegrante';
import Icone, { type NomeIcone } from '../../components/Icone/Icone';
import Pagina from '../../components/Pagina/Pagina';
import { integrantes } from '../../data/integrantes';

export default function IntegranteDetalhe() {
    const { id } = useParams();
    const indice = integrantes.findIndex((integrante) => integrante.id === id);
    const voltar = { para: '/integrantes', rotulo: 'Voltar aos integrantes' };

    if (indice === -1) {
        return (
            <Pagina titulo="Integrante não encontrado">
                <CabecalhoPagina titulo="Integrante não encontrado" voltar={voltar} />
                <EstadoRequisicao
                    tipo="vazio"
                    titulo={`Não há ninguém com o identificador “${id}” na equipe`}
                    acao={<Botao para="/integrantes">Ver a equipe</Botao>}
                />
            </Pagina>
        );
    }

    const integrante = integrantes[indice];
    const anterior = integrantes[(indice - 1 + integrantes.length) % integrantes.length];
    const proximo = integrantes[(indice + 1) % integrantes.length];

    // Só aparecem os links que o integrante já preencheu em data/integrantes.ts.
    const links: { url: string; rotulo: string; icone: NomeIcone }[] = [
        { url: integrante.github, rotulo: 'GitHub', icone: 'github' as const },
        { url: integrante.linkedin, rotulo: 'LinkedIn', icone: 'linkedin' as const },
    ].filter((link) => link.url !== '');

    return (
        <Pagina titulo={integrante.nome}>
            <CabecalhoPagina titulo={integrante.nome} voltar={voltar} />

            <article className="grid items-center gap-8 rounded-cartao border border-linha bg-white p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
                <div className="mx-auto">
                    <FotoIntegrante integrante={integrante} tamanho="grande" />
                </div>
                <div>
                    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-bold text-ardosia">RM</dt>
                            <dd className="font-display text-2xl font-extrabold text-azul-noite">{integrante.rm}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-bold text-ardosia">Turma</dt>
                            <dd className="font-display text-2xl font-extrabold text-azul-noite">{integrante.turma}</dd>
                        </div>
                    </dl>

                    {links.length > 0 && (
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {links.map((link) => (
                                <a
                                    key={link.rotulo}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-botao border-2 border-azul-noite px-5 font-display font-extrabold text-azul-noite hover:bg-azul-50"
                                >
                                    <Icone nome={link.icone} />
                                    {link.rotulo}
                                    <span className="sr-only">(abre em nova aba)</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </article>

            <nav aria-label="Outros integrantes" className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
                <Link
                    to={`/integrantes/${anterior.id}`}
                    className="inline-flex min-h-12 items-center gap-2 font-bold text-verde-texto underline underline-offset-4 hover:text-azul-noite"
                >
                    <Icone nome="seta-esquerda" className="size-5" />
                    {anterior.nome}
                </Link>
                <Link
                    to={`/integrantes/${proximo.id}`}
                    className="inline-flex min-h-12 items-center gap-2 font-bold text-verde-texto underline underline-offset-4 hover:text-azul-noite"
                >
                    {proximo.nome}
                    <Icone nome="seta-direita" className="size-5" />
                </Link>
            </nav>
        </Pagina>
    );
}
