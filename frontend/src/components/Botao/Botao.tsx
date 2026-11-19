import type { ReactNode } from 'react';
import { Link } from 'react-router';
import Icone, { type NomeIcone } from '../Icone/Icone';

type Variante = 'primario' | 'secundario' | 'perigo' | 'texto';

type BotaoBaseProps = {
    children: ReactNode;
    variante?: Variante;
    icone?: NomeIcone;
    larguraTotal?: boolean;
    className?: string;
};

// Com "para", vira um link de navegação; sem ele, um <button>.
type BotaoProps = BotaoBaseProps &
    (
        | { para: string; type?: never; onClick?: never; disabled?: never; carregando?: never }
        | {
              para?: undefined;
              type?: 'button' | 'submit';
              onClick?: () => void;
              disabled?: boolean;
              carregando?: boolean;
          }
    );

const ESTILOS: Record<Variante, string> = {
    // Primário em verde com texto Azul Noite (contraste 6,3:1)
    primario: 'bg-verde-caminho text-azul-noite hover:bg-[#00a576] border-2 border-verde-caminho hover:border-[#00a576]',
    secundario: 'bg-white text-azul-noite border-2 border-azul-noite hover:bg-azul-50',
    // O vermelho fica só para interdição e ações destrutivas
    perigo: 'bg-interditado text-white border-2 border-interditado hover:bg-[#93190f] hover:border-[#93190f]',
    texto: 'text-verde-texto underline underline-offset-4 decoration-2 hover:text-azul-noite px-1!',
};

export default function Botao(props: BotaoProps) {
    const { children, variante = 'primario', icone, larguraTotal = false, className = '' } = props;

    const classes = `inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-botao px-6 py-2.5 font-display text-[1.0625rem] font-extrabold transition-colors duration-200 disabled:cursor-not-allowed disabled:border-linha disabled:bg-linha disabled:text-ardosia ${
        ESTILOS[variante]
    } ${larguraTotal ? 'w-full' : ''} ${className}`;

    if (props.para !== undefined) {
        return (
            <Link to={props.para} className={classes}>
                {icone && <Icone nome={icone} />}
                {children}
            </Link>
        );
    }

    return (
        <button
            type={props.type ?? 'button'}
            onClick={props.onClick}
            disabled={props.disabled || props.carregando}
            aria-busy={props.carregando || undefined}
            className={classes}
        >
            {props.carregando ? <Icone nome="carregando" /> : icone && <Icone nome={icone} />}
            {children}
        </button>
    );
}
