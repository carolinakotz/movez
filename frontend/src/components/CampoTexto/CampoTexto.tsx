import type { UseFormRegisterReturn } from 'react-hook-form';
import { classesControle, idsDescricao } from '../../utils/formulario';
import CampoBase from '../CampoBase/CampoBase';

type CampoTextoProps = {
    id: string;
    label: string;
    register: UseFormRegisterReturn;
    type?: 'text' | 'email' | 'number' | 'date' | 'search';
    placeholder?: string;
    autoComplete?: string;
    inputMode?: 'text' | 'decimal' | 'numeric' | 'email';
    ajuda?: string;
    erro?: string;
    opcional?: boolean;
    min?: string;
    max?: string;
};

export default function CampoTexto({
    id,
    label,
    register,
    type = 'text',
    placeholder,
    autoComplete,
    inputMode,
    ajuda,
    erro,
    opcional,
    min,
    max,
}: CampoTextoProps) {
    return (
        <CampoBase id={id} label={label} ajuda={ajuda} erro={erro} opcional={opcional}>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                min={min}
                max={max}
                aria-invalid={Boolean(erro)}
                aria-describedby={idsDescricao(id, ajuda, erro)}
                aria-required={!opcional}
                className={classesControle(erro)}
                {...register}
            />
        </CampoBase>
    );
}
