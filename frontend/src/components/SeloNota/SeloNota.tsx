import { classificarNota, formatarNota } from '../../utils/conforto';

type SeloNotaProps = {
    nota: number | null;
    tamanho?: 'pequeno' | 'grande';
};

// Nota de conforto: sempre cor + número + palavra, para ser lida sem depender da cor.
export default function SeloNota({ nota, tamanho = 'pequeno' }: SeloNotaProps) {
    const grande = tamanho === 'grande';

    if (nota === null) {
        return (
            <div
                className={`flex shrink-0 flex-col items-center justify-center rounded-botao border-2 border-dashed border-linha bg-neblina text-center text-ardosia ${
                    grande ? 'h-24 w-28 px-2' : 'h-16 w-[4.75rem] px-1'
                }`}
            >
                <span className={`font-display font-extrabold ${grande ? 'text-xl' : 'text-sm leading-tight'}`}>Sem nota</span>
            </div>
        );
    }

    const { rotulo, fundo, texto } = classificarNota(nota);

    return (
        <div
            className={`flex shrink-0 flex-col items-center justify-center rounded-botao text-center ${fundo} ${texto} ${
                grande ? 'h-24 w-28' : 'h-16 w-[4.75rem]'
            }`}
            aria-label={`Nota de conforto ${formatarNota(nota)} de 5, ${rotulo}`}
            role="img"
        >
            <span className={`font-display leading-none font-black ${grande ? 'text-[2.5rem]' : 'text-[1.625rem]'}`}>
                {formatarNota(nota)}
            </span>
            <span className={`font-bold ${grande ? 'mt-1 text-base' : 'text-sm'}`}>{rotulo}</span>
        </div>
    );
}
