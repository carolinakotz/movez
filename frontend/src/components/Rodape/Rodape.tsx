import { Link } from 'react-router';
import Logo from '../Logo/Logo';

const LINKS_RODAPE = [
    { caminho: '/sobre', rotulo: 'Sobre o projeto' },
    { caminho: '/faq', rotulo: 'Perguntas frequentes' },
    { caminho: '/integrantes', rotulo: 'Integrantes' },
    { caminho: '/contato', rotulo: 'Contato' },
];

export default function Rodape() {
    return (
        <footer className="mt-auto bg-azul-noite text-white">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-10 md:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                    {/* O guia pede a logo sempre sobre fundo claro */}
                    <Link to="/" aria-label="MovEz, página inicial" className="w-fit rounded-botao bg-white px-4 py-3">
                        <Logo className="h-9 w-auto" />
                    </Link>
                    <p className="max-w-md text-base text-azul-100">
                        Um mapa de conforto feito pelos moradores. Projeto da Global Solution 2026/2, tema CitizenTech.
                    </p>
                </div>

                <nav aria-label="Links do rodapé">
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {LINKS_RODAPE.map((link) => (
                            <li key={link.caminho}>
                                <Link
                                    to={link.caminho}
                                    className="inline-flex min-h-12 items-center text-base font-bold text-verde-200 underline underline-offset-4 hover:text-white"
                                >
                                    {link.rotulo}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="border-t border-white/15">
                <p className="mx-auto max-w-[1200px] px-5 py-4 text-sm text-azul-100 md:px-8">
                    © 2026 MovEz. Projeto acadêmico da FIAP, turma 1TDSPH.
                </p>
            </div>
        </footer>
    );
}
