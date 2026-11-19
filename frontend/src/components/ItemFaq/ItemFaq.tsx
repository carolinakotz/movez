import { useState } from 'react';
import type { PerguntaFaq } from '../../types/faq';
import Icone from '../Icone/Icone';

type ItemFaqProps = {
    item: PerguntaFaq;
    abertoInicialmente?: boolean;
};

// Acordeão acessível: o botão controla a região da resposta.
export default function ItemFaq({ item, abertoInicialmente = false }: ItemFaqProps) {
    const [aberto, setAberto] = useState(abertoInicialmente);
    const idResposta = `resposta-${item.id}`;

    return (
        <div className="rounded-cartao border border-linha bg-white">
            <h3 className="text-lg md:text-xl">
                <button
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={idResposta}
                    onClick={() => setAberto((atual) => !atual)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 rounded-cartao px-5 py-4 text-left font-extrabold text-azul-noite hover:text-verde-texto"
                >
                    {item.pergunta}
                    <Icone
                        nome="chevron-baixo"
                        className={`size-6 text-verde-texto transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
                    />
                </button>
            </h3>
            <div id={idResposta} role="region" aria-label={item.pergunta} hidden={!aberto} className="px-5 pb-5 text-tinta">
                <p className="max-w-[70ch]">{item.resposta}</p>
            </div>
        </div>
    );
}
