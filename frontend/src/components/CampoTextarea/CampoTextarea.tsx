import type { UseFormRegisterReturn } from 'react-hook-form';
import { classesControle, idsDescricao } from '../../utils/formulario';
import CampoBase from '../CampoBase/CampoBase';

type CampoTextareaProps = {
    id: string;
    label: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
    linhas?: number;
    ajuda?: string;
    erro?: string;
    opcional?: boolean;
    limite?: number;
    totalDigitado?: number;
};

export default function CampoTextarea({
    id,
    label,
    register,
    placeholder,
    linhas = 4,
    ajuda,
    erro,
    opcional,
    limite,
    totalDigitado = 0,
}: CampoTextareaProps) {
    return (
        <CampoBase id={id} label={label} ajuda={ajuda} erro={erro} opcional={opcional}>
            <textarea
                id={id}
                rows={linhas}
                placeholder={placeholder}
                aria-invalid={Boolean(erro)}
                aria-describedby={idsDescricao(id, ajuda, erro)}
                aria-required={!opcional}
                className={`${classesControle(erro)} resize-y`}
                {...register}
            />
            {limite && (
                <p className={`-mt-1 text-right text-sm ${totalDigitado > limite ? 'font-bold text-interditado' : 'text-ardosia'}`}>
                    {totalDigitado}/{limite} caracteres
                </p>
            )}
        </CampoBase>
    );
}
