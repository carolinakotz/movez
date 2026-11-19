import type { UseFormRegisterReturn } from 'react-hook-form';
import { classesControle, idsDescricao } from '../../utils/formulario';
import CampoBase from '../CampoBase/CampoBase';
import Icone from '../Icone/Icone';

export type OpcaoSelect = {
    valor: string;
    rotulo: string;
    desabilitada?: boolean;
};

type CampoSelectProps = {
    id: string;
    label: string;
    register: UseFormRegisterReturn;
    opcoes: OpcaoSelect[];
    textoVazio?: string;
    ajuda?: string;
    erro?: string;
    desabilitado?: boolean;
};

export default function CampoSelect({
    id,
    label,
    register,
    opcoes,
    textoVazio = 'Selecione',
    ajuda,
    erro,
    desabilitado,
}: CampoSelectProps) {
    return (
        <CampoBase id={id} label={label} ajuda={ajuda} erro={erro}>
            <div className="relative">
                <select
                    id={id}
                    disabled={desabilitado}
                    aria-invalid={Boolean(erro)}
                    aria-describedby={idsDescricao(id, ajuda, erro)}
                    aria-required
                    className={`${classesControle(erro)} appearance-none pr-12 disabled:cursor-wait disabled:opacity-70`}
                    {...register}
                >
                    <option value="">{textoVazio}</option>
                    {opcoes.map((opcao) => (
                        <option key={opcao.valor} value={opcao.valor} disabled={opcao.desabilitada}>
                            {opcao.rotulo}
                        </option>
                    ))}
                </select>
                <Icone
                    nome="chevron-baixo"
                    className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-azul-noite"
                />
            </div>
        </CampoBase>
    );
}
