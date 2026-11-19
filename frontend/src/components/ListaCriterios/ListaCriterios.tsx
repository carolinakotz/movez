import type { MediasCriterios } from '../../types/trecho';
import { CRITERIOS, classificarNota, formatarNota } from '../../utils/conforto';
import Icone, { type NomeIcone } from '../Icone/Icone';

const ICONES: Record<string, NomeIcone> = {
    nrSombra: 'sombra',
    nrIluminacao: 'iluminacao',
    nrCalcada: 'calcada',
    nrSeguranca: 'seguranca',
    nrSilencio: 'silencio',
};

type ListaCriteriosProps = {
    medias: MediasCriterios;
};

// Uma linha por critério: ícone, rótulo, barra proporcional e "nota · palavra".
export default function ListaCriterios({ medias }: ListaCriteriosProps) {
    return (
        <dl className="flex flex-col gap-4">
            {CRITERIOS.map(({ chave, rotulo, dica }) => {
                const nota = medias[chave];
                const { rotulo: palavra, fundo } = classificarNota(nota);

                return (
                    <div key={chave} className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5">
                        <span className="grid size-10 place-items-center rounded-botao bg-verde-50 text-verde-texto">
                            <Icone nome={ICONES[chave]} />
                        </span>
                        <dt>
                            <span className="font-bold text-azul-noite">{rotulo}</span>
                            <span className="block text-sm text-ardosia">{dica}</span>
                        </dt>
                        <dd className="text-right font-display font-extrabold whitespace-nowrap text-azul-noite">
                            {formatarNota(nota)} · {palavra}
                        </dd>
                        <div className="col-span-3 h-2 overflow-hidden rounded-full bg-azul-50" aria-hidden="true">
                            <div className={`h-full rounded-full ${fundo}`} style={{ width: `${(nota / 5) * 100}%` }} />
                        </div>
                    </div>
                );
            })}
        </dl>
    );
}
