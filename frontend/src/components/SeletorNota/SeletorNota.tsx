import type { UseFormRegisterReturn } from 'react-hook-form';
import { classificarNota } from '../../utils/conforto';
import Icone, { type NomeIcone } from '../Icone/Icone';

type SeletorNotaProps = {
    id: string;
    rotulo: string;
    dica: string;
    icone: NomeIcone;
    register: UseFormRegisterReturn;
    valorAtual?: string;
    erro?: string;
};

const NOTAS = [1, 2, 3, 4, 5];

// Grupo de 5 opções (radio) para dar nota de 1 a 5 em um critério.
export default function SeletorNota({ id, rotulo, dica, icone, register, valorAtual, erro }: SeletorNotaProps) {
    return (
        <fieldset
            className={`rounded-cartao border-2 p-4 md:p-5 ${erro ? 'border-interditado bg-interditado-fundo' : 'border-linha bg-white'}`}
            aria-describedby={erro ? `erro-${id}` : `dica-${id}`}
        >
            <legend className="sr-only">{rotulo}</legend>
            <div className="mb-3 flex items-center gap-3" aria-hidden="true">
                <span className="grid size-10 place-items-center rounded-botao bg-verde-50 text-verde-texto">
                    <Icone nome={icone} />
                </span>
                <span>
                    <span className="block font-bold text-azul-noite">{rotulo}</span>
                    <span id={`dica-${id}`} className="block text-sm text-ardosia">
                        {dica}
                    </span>
                </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {NOTAS.map((nota) => {
                    const { rotulo: palavra, fundo, texto } = classificarNota(nota);
                    const marcado = valorAtual === String(nota);
                    return (
                        <label
                            key={nota}
                            className={`flex min-h-12 sm:min-h-14 cursor-pointer flex-col items-center justify-center rounded-botao border-2 px-0.5 py-1.5 text-center has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-azul-noite ${
                                marcado ? `${fundo} ${texto} border-azul-noite` : 'border-linha bg-white text-azul-noite hover:border-azul-noite'
                            }`}
                        >
                            <input type="radio" value={String(nota)} className="sr-only" {...register} />
                            <span className="font-display text-xl leading-none font-black">{nota}</span>
                            {/* No celular a palavra fica só para leitor de tela; a legenda abaixo explica a escala */}
                            <span className="sr-only mt-0.5 text-sm leading-tight font-bold sm:not-sr-only">{palavra}</span>
                        </label>
                    );
                })}
            </div>

            <p className="mt-2 flex justify-between text-sm text-ardosia sm:hidden" aria-hidden="true">
                <span>1 = Péssimo</span>
                <span>5 = Ótimo</span>
            </p>

            {erro && (
                <p id={`erro-${id}`} className="mt-2 text-base font-bold text-interditado">
                    {erro}
                </p>
            )}
        </fieldset>
    );
}
