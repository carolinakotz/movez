import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import Icone, { type NomeIcone } from '../../components/Icone/Icone';
import Pagina from '../../components/Pagina/Pagina';
import { CRITERIOS, pesosDoPerfil } from '../../utils/conforto';

const ICONES: Record<string, NomeIcone> = {
    nrSombra: 'sombra',
    nrIluminacao: 'iluminacao',
    nrCalcada: 'calcada',
    nrSeguranca: 'seguranca',
    nrSilencio: 'silencio',
};

const PERFIS = [
    { nome: 'IDOSO', rotulo: 'Idoso' },
    { nome: 'CARRINHO DE BEBE', rotulo: 'Carrinho de bebê' },
    { nome: 'CADEIRANTE', rotulo: 'Cadeirante' },
    { nome: 'PEDESTRE COMUM', rotulo: 'Pedestre' },
];

const REGRAS = [
    'Notas vão de 1 a 5 em cada critério, e 5 é sempre o melhor (no silêncio, o mais silencioso).',
    'Um trecho tem no máximo um aviso de interdição ativo por vez.',
    'A previsão de término não pode ser antes do início da interdição.',
    'Quem confirma a liberação precisa ser outra pessoa, diferente de quem avisou.',
    'A passagem alternativa é opcional, mas ajuda muito quem precisa desviar.',
];

export default function Sobre() {
    return (
        <Pagina titulo="Sobre">
            <CabecalhoPagina
                titulo="Sobre o MovEz"
                descricao="O mapa de conforto das ruas, feito por quem anda nelas."
            />

            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
                <section aria-labelledby="titulo-problema">
                    <h2 id="titulo-problema" className="text-[1.75rem] leading-tight font-extrabold md:text-[2rem]">
                        O problema
                    </h2>
                    <div className="mt-4 flex max-w-[68ch] flex-col gap-4 text-lg">
                        <p>
                            Os aplicativos de mapa mostram o caminho mais curto, mas não dizem se a calçada é esburacada, se a rua
                            fica escura à noite ou se há sombra no meio da tarde. Para muita gente, esses detalhes decidem se dá
                            para sair de casa a pé.
                        </p>
                        <p>
                            Uma pessoa idosa precisa de piso regular e boa iluminação. Quem empurra um carrinho de bebê procura
                            calçada larga e sombra. Para quem usa cadeira de rodas, um degrau sem rampa bloqueia o caminho
                            inteiro. E uma obra que começou ontem muda tudo isso de uma hora para outra.
                        </p>
                    </div>

                    <h2 className="mt-10 text-[1.75rem] leading-tight font-extrabold md:text-[2rem]">A solução</h2>
                    <div className="mt-4 flex max-w-[68ch] flex-col gap-4 text-lg">
                        <p>
                            O MovEz junta duas informações dadas pelos próprios moradores: a <strong>nota de conforto</strong>, que
                            diz como o trecho costuma ser, e o <strong>aviso de interdição</strong>, que diz como ele está hoje.
                        </p>
                        <p>
                            Com o perfil de quem anda, o MovEz reordena os trechos pelo que mais importa para cada pessoa e tira das
                            rotas sugeridas tudo o que estiver interditado. O projeto nasceu na Global Solution 2026/2 da FIAP, com
                            o tema CitizenTech: cidades e comunidades.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="titulo-regras" className="h-fit rounded-cartao border border-linha bg-white p-6 md:p-7">
                    <h2 id="titulo-regras" className="text-2xl font-extrabold">
                        Regras da comunidade
                    </h2>
                    <ul className="mt-4 flex flex-col gap-3">
                        {REGRAS.map((regra) => (
                            <li key={regra} className="flex gap-3">
                                <Icone nome="check" className="mt-1 size-5 text-verde-texto" />
                                <span>{regra}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <section aria-labelledby="titulo-pesos" className="mt-14">
                <h2 id="titulo-pesos" className="text-[1.75rem] leading-tight font-extrabold md:text-[2rem]">
                    Quanto cada critério pesa para cada perfil
                </h2>
                <p className="mt-2 max-w-[68ch] text-lg text-ardosia">
                    A nota geral é uma média ponderada. Sem perfil escolhido, todos os critérios pesam 1.
                </p>

                <div className="mt-6 overflow-x-auto rounded-cartao border border-linha bg-white">
                    <table className="w-full min-w-[640px] text-left">
                        <caption className="sr-only">Peso de cada critério de conforto por perfil de pedestre</caption>
                        <thead className="bg-azul-50">
                            <tr>
                                <th scope="col" className="px-5 py-4 font-display font-extrabold text-azul-noite">
                                    Critério
                                </th>
                                {PERFIS.map((perfil) => (
                                    <th key={perfil.nome} scope="col" className="px-5 py-4 text-center font-display font-extrabold text-azul-noite">
                                        {perfil.rotulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-linha">
                            {CRITERIOS.map(({ chave, rotulo }) => (
                                <tr key={chave}>
                                    <th scope="row" className="px-5 py-3 font-bold text-azul-noite">
                                        <span className="inline-flex items-center gap-3">
                                            <Icone nome={ICONES[chave]} className="size-5 text-verde-texto" />
                                            {rotulo}
                                        </span>
                                    </th>
                                    {PERFIS.map((perfil) => {
                                        const peso = pesosDoPerfil(perfil.nome)[chave];
                                        return (
                                            <td key={perfil.nome} className="px-5 py-3 text-center">
                                                <span
                                                    className={`inline-grid size-9 place-items-center rounded-full font-display font-black ${
                                                        peso >= 3 ? 'bg-verde-caminho text-azul-noite' : peso === 2 ? 'bg-verde-200 text-azul-noite' : 'bg-neblina text-ardosia'
                                                    }`}
                                                >
                                                    {peso}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mt-14 flex flex-col gap-4 rounded-cartao bg-azul-noite p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-white">Pronto para testar?</h2>
                    <p className="mt-1 text-azul-100">Escolha seu perfil e veja quais ruas combinam com o seu jeito de andar.</p>
                </div>
                <Botao para="/trechos" icone="rota" className="shrink-0">
                    Ver o mapa de conforto
                </Botao>
            </section>
        </Pagina>
    );
}
