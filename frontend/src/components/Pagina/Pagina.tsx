import type { ReactNode } from 'react';
import { useTituloPagina } from '../../hooks/useTituloPagina';

type PaginaProps = {
    titulo: string;
    children: ReactNode;
    estreita?: boolean;
};

// Conteúdo principal de cada rota: define o título da aba e o alvo do link "Pular para o conteúdo".
export default function Pagina({ titulo, children, estreita = false }: PaginaProps) {
    useTituloPagina(titulo);

    return (
        <main
            id="conteudo"
            tabIndex={-1}
            className={`mx-auto w-full px-5 py-10 outline-none md:px-8 md:py-14 ${estreita ? 'max-w-[840px]' : 'max-w-[1200px]'}`}
        >
            {children}
        </main>
    );
}
