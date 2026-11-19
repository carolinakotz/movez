import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { LINKS_NAVEGACAO } from '../../data/navegacao';
import Icone from '../Icone/Icone';
import Logo from '../Logo/Logo';

export default function Cabecalho() {
    const [menuAberto, setMenuAberto] = useState(false);

    // Fecha o menu ao escolher um link (no celular o menu cobre a página).
    const fecharMenu = () => setMenuAberto(false);

    // Fecha o menu com a tecla Esc.
    useEffect(() => {
        if (!menuAberto) return;

        function fecharComEsc(evento: KeyboardEvent) {
            if (evento.key === 'Escape') setMenuAberto(false);
        }

        window.addEventListener('keydown', fecharComEsc);
        return () => window.removeEventListener('keydown', fecharComEsc);
    }, [menuAberto]);

    return (
        <header className="sticky top-0 z-50 border-b border-linha bg-white">
            <a
                href="#conteudo"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-botao focus:bg-azul-noite focus:px-4 focus:py-3 focus:text-white"
            >
                Pular para o conteúdo
            </a>

            <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
                <Link to="/" onClick={fecharMenu} aria-label="MovEz, página inicial" className="shrink-0 rounded-campo">
                    <Logo className="h-9 w-auto md:h-11" />
                </Link>

                <button
                    type="button"
                    onClick={() => setMenuAberto((atual) => !atual)}
                    aria-expanded={menuAberto}
                    aria-controls="menu-principal"
                    className="inline-flex min-h-12 items-center gap-2 rounded-botao border-2 border-azul-noite px-4 font-display font-extrabold text-azul-noite xl:hidden"
                >
                    <Icone nome={menuAberto ? 'fechar' : 'menu'} />
                    {menuAberto ? 'Fechar' : 'Menu'}
                </button>

                <nav
                    id="menu-principal"
                    aria-label="Navegação principal"
                    className={`${
                        menuAberto ? 'block' : 'hidden'
                    } absolute top-full left-0 max-h-[calc(100vh-4.5rem)] w-full overflow-y-auto border-b border-linha bg-white shadow-[0_12px_24px_rgb(2_34_86/0.12)] xl:static xl:block xl:w-auto xl:overflow-visible xl:border-none xl:shadow-none`}
                >
                    <ul className="flex flex-col px-5 py-3 md:px-8 xl:flex-row xl:items-center xl:gap-1 xl:p-0">
                        {LINKS_NAVEGACAO.map((link) => (
                            <li key={link.caminho} className="border-b border-linha last:border-b-0 xl:border-none">
                                <NavLink
                                    to={link.caminho}
                                    end={link.caminho === '/'}
                                    onClick={fecharMenu}
                                    className={({ isActive }) =>
                                        `flex min-h-12 items-center rounded-campo px-2 font-display text-[1.0625rem] font-extrabold transition-colors xl:px-3 ${
                                            isActive
                                                ? 'text-verde-texto underline decoration-verde-caminho decoration-[3px] underline-offset-8'
                                                : 'text-azul-noite hover:text-verde-texto'
                                        }`
                                    }
                                >
                                    {link.rotulo}
                                </NavLink>
                            </li>
                        ))}
                        <li className="py-3 xl:ml-3 xl:py-0">
                            <Link
                                to="/participar"
                                onClick={fecharMenu}
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-botao bg-verde-caminho px-5 font-display font-extrabold text-azul-noite hover:bg-[#00a576] xl:w-auto"
                            >
                                Participar
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
