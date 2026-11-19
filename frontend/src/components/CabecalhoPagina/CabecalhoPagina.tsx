import type { ReactNode } from 'react';
import { Link } from 'react-router';
import Icone from '../Icone/Icone';

type CabecalhoPaginaProps = {
    titulo: string;
    descricao?: ReactNode;
    voltar?: { para: string; rotulo: string };
    acoes?: ReactNode;
};

export default function CabecalhoPagina({ titulo, descricao, voltar, acoes }: CabecalhoPaginaProps) {
    return (
        <header className="mb-8 md:mb-10">
            {voltar && (
                <Link
                    to={voltar.para}
                    className="mb-4 inline-flex min-h-12 items-center gap-2 font-bold text-verde-texto underline underline-offset-4 hover:text-azul-noite"
                >
                    <Icone nome="seta-esquerda" className="size-5" />
                    {voltar.rotulo}
                </Link>
            )}
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                    <h1 className="text-[2rem] leading-tight font-extrabold md:text-[2.5rem] md:leading-[3rem]">{titulo}</h1>
                    {descricao && <div className="mt-3 text-[1.125rem] text-ardosia md:text-[1.25rem]">{descricao}</div>}
                </div>
                {acoes && <div className="flex flex-wrap gap-3">{acoes}</div>}
            </div>
        </header>
    );
}
