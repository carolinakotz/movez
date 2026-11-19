import type { Integrante } from '../../types/integrante';

type FotoIntegranteProps = {
    integrante: Integrante;
    tamanho?: 'medio' | 'grande';
    decorativa?: boolean;
};

function iniciais(nome: string): string {
    const partes = nome.trim().split(/\s+/);
    return `${partes[0]?.[0] ?? ''}${partes.length > 1 ? partes[partes.length - 1][0] : ''}`.toUpperCase();
}

// Mostra a foto do integrante; enquanto ela não for adicionada, mostra as iniciais do nome.
export default function FotoIntegrante({ integrante, tamanho = 'medio', decorativa = false }: FotoIntegranteProps) {
    const classesTamanho = tamanho === 'grande' ? 'size-44 md:size-56' : 'size-32 md:size-36';

    if (integrante.foto) {
        return (
            <img
                src={integrante.foto}
                alt={decorativa ? '' : `Foto de ${integrante.nome}`}
                width={224}
                height={224}
                loading="lazy"
                className={`${classesTamanho} rounded-full border-4 border-verde-50 object-cover`}
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className={`${classesTamanho} grid place-items-center rounded-full border-4 border-verde-50 bg-azul-50 font-display font-black text-azul-noite ${
                tamanho === 'grande' ? 'text-5xl' : 'text-4xl'
            }`}
        >
            {iniciais(integrante.nome)}
        </span>
    );
}
