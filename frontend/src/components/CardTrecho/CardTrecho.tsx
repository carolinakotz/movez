import { Link } from 'react-router';
import type { TrechoComResumo } from '../../types/trecho';
import { formatarData } from '../../utils/datas';
import { formatarMetros, nomeTipoInterdicao } from '../../utils/texto';
import Icone from '../Icone/Icone';
import SeloNota from '../SeloNota/SeloNota';

type CardTrechoProps = {
    resumo: TrechoComResumo;
    nota: number | null;
    posicao?: number;
};

export default function CardTrecho({ resumo, nota, posicao }: CardTrechoProps) {
    const { trecho, avaliacoes, interdicaoAtiva } = resumo;
    const totalAvaliacoes = avaliacoes.length;

    return (
        <article
            className={`relative flex h-full flex-col gap-4 rounded-cartao border bg-white p-5 transition-shadow focus-within:shadow-[0_8px_24px_rgb(2_34_86/0.12)] hover:shadow-[0_8px_24px_rgb(2_34_86/0.12)] md:p-6 ${
                interdicaoAtiva ? 'border-interditado/50' : 'border-linha'
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    {posicao !== undefined && <p className="mb-1 text-sm font-bold text-verde-texto">{posicao}º mais confortável</p>}
                    <h3 className="text-xl leading-snug font-extrabold md:text-2xl">
                        {/* O link cobre o cartão inteiro, mas o leitor de tela anuncia só o nome do trecho */}
                        <Link
                            to={`/trechos/${trecho.cdTrecho}`}
                            className="rounded-campo after:absolute after:inset-0 after:rounded-cartao after:content-[''] hover:text-verde-texto"
                        >
                            {trecho.nmLogradouro}
                        </Link>
                    </h3>
                    <p className="mt-1 text-ardosia">
                        {trecho.nmBairro}, {trecho.nmCidade}
                    </p>
                </div>
                <SeloNota nota={nota} />
            </div>

            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-1 text-base text-ardosia">
                <li className="inline-flex items-center gap-1.5">
                    <Icone nome="regua" className="size-4" />
                    {formatarMetros(trecho.vlExtensaoM)}
                </li>
                <li className="inline-flex items-center gap-1.5">
                    <Icone nome="comentario" className="size-4" />
                    {totalAvaliacoes === 0
                        ? 'Ainda sem avaliações'
                        : `${totalAvaliacoes} ${totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'}`}
                </li>
            </ul>

            {interdicaoAtiva && (
                <p className="listras-interdicao flex items-start gap-2 rounded-botao border border-interditado/40 px-3 py-2 text-base text-interditado">
                    <Icone nome="alerta" className="mt-0.5 size-5" />
                    <span>
                        <strong>Interditado:</strong> {nomeTipoInterdicao(interdicaoAtiva.tpInterdicao).toLowerCase()} até{' '}
                        {formatarData(interdicaoAtiva.dtPrevisaoFim)}
                    </span>
                </p>
            )}
        </article>
    );
}
