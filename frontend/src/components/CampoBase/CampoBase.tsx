import type { ReactNode } from 'react';

type CampoBaseProps = {
    id: string;
    label: string;
    ajuda?: string;
    erro?: string;
    opcional?: boolean;
    children: ReactNode;
};

// Estrutura comum a todos os campos: rótulo, ajuda e mensagem de erro ligadas por aria-describedby.
export default function CampoBase({ id, label, ajuda, erro, opcional, children }: CampoBaseProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-bold text-azul-noite">
                {label}
                {opcional && <span className="ml-1 font-normal text-ardosia">(opcional)</span>}
            </label>
            {children}
            {ajuda && !erro && (
                <p id={`ajuda-${id}`} className="text-base text-ardosia">
                    {ajuda}
                </p>
            )}
            {erro && (
                <p id={`erro-${id}`} className="text-base font-bold text-interditado">
                    {erro}
                </p>
            )}
        </div>
    );
}
