import type { Avaliacao } from '../../types/avaliacao';
import { CRITERIOS, calcularMedias, notaConforto } from '../../utils/conforto';
import { formatarData } from '../../utils/datas';
import { nomePerfil } from '../../utils/texto';
import SeloNota from '../SeloNota/SeloNota';

type CardAvaliacaoProps = {
    avaliacao: Avaliacao;
    nomeUsuario?: string;
    perfilUsuario?: string;
};

export default function CardAvaliacao({ avaliacao, nomeUsuario, perfilUsuario }: CardAvaliacaoProps) {
    const media = avaliacao.mediaConforto ?? notaConforto(calcularMedias([avaliacao]));

    return (
        <article className="flex flex-col gap-4 rounded-cartao border border-linha bg-white p-5">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-extrabold">{nomeUsuario ?? `Morador nº ${avaliacao.cdUsuario}`}</h3>
                    <p className="text-base text-ardosia">
                        {perfilUsuario && `${nomePerfil(perfilUsuario)}, `}em {formatarData(avaliacao.dtAvaliacao)}
                    </p>
                </div>
                <SeloNota nota={media ?? null} />
            </header>

            {avaliacao.dsComentario && <p className="border-l-4 border-verde-caminho pl-3 text-tinta">{avaliacao.dsComentario}</p>}

            <ul className="flex flex-wrap gap-2 text-sm" aria-label="Notas por critério">
                {CRITERIOS.map(({ chave, rotulo }) => (
                    <li key={chave} className="rounded-full bg-azul-50 px-3 py-1 text-azul-noite">
                        {rotulo} <strong>{avaliacao[chave]}</strong>
                    </li>
                ))}
            </ul>
        </article>
    );
}
