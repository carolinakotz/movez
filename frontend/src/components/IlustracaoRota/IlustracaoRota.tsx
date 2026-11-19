// Ilustração do conceito: ruas em grade, caminho confortável em verde e trecho interditado em vermelho pontilhado.
export default function IlustracaoRota() {
    return (
        <figure className="rounded-cartao border border-linha bg-white p-3 shadow-[0_12px_32px_rgb(2_34_86/0.10)] md:p-4">
            <svg
                viewBox="0 0 400 300"
                className="h-auto w-full rounded-botao bg-azul-50"
                role="img"
                aria-labelledby="titulo-ilustracao"
            >
                <title id="titulo-ilustracao">
                    Mapa ilustrativo: o caminho verde desvia de um trecho interditado por obra, marcado em vermelho.
                </title>
                <g stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round">
                    <line x1="24" y1="60" x2="376" y2="60" />
                    <line x1="24" y1="150" x2="376" y2="150" />
                    <line x1="24" y1="240" x2="376" y2="240" />
                    <line x1="90" y1="20" x2="90" y2="280" />
                    <line x1="210" y1="20" x2="210" y2="280" />
                    <line x1="320" y1="20" x2="320" y2="280" />
                </g>
                {/* Trecho interditado */}
                <path d="M90 240 V150 H210" fill="none" stroke="#B42318" strokeWidth="7" strokeLinecap="round" strokeDasharray="1 13" />
                {/* Caminho confortável sugerido */}
                <path d="M90 240 H210 V60 H320" fill="none" stroke="#00BC86" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                <g>
                    <rect x="88" y="116" width="152" height="34" rx="17" fill="#FEE4E2" stroke="#B42318" strokeWidth="2" />
                    <text x="164" y="139" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="16" fill="#B42318">
                        Obra: interditado
                    </text>
                </g>
                <circle cx="90" cy="240" r="11" fill="#022256" />
                <circle cx="320" cy="60" r="12" fill="#00BC86" stroke="#022256" strokeWidth="4" />
            </svg>
            <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 px-1 pt-3 text-base text-ardosia">
                <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-6 rounded-full bg-verde-caminho" aria-hidden="true" />
                    Caminho mais confortável
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-6 rounded-full border-t-4 border-dotted border-interditado" aria-hidden="true" />
                    Trecho interditado
                </span>
            </figcaption>
        </figure>
    );
}
