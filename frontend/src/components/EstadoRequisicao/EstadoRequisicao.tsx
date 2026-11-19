import type { ReactNode } from 'react';
import Icone, { type NomeIcone } from '../Icone/Icone';

type EstadoRequisicaoProps = {
    tipo: 'carregando' | 'erro' | 'vazio';
    titulo: string;
    texto?: string;
    aoTentarNovamente?: () => void;
    acao?: ReactNode;
};

const ICONES: Record<EstadoRequisicaoProps['tipo'], NomeIcone> = {
    carregando: 'carregando',
    erro: 'alerta',
    vazio: 'vazio',
};

// Mostra carregamento, erro de requisição e ausência de dados com o mesmo visual.
export default function EstadoRequisicao({ tipo, titulo, texto, aoTentarNovamente, acao }: EstadoRequisicaoProps) {
    const ehErro = tipo === 'erro';

    return (
        <div
            role={ehErro ? 'alert' : 'status'}
            aria-live={ehErro ? 'assertive' : 'polite'}
            className={`mx-auto flex w-full max-w-xl flex-col items-center gap-3 rounded-cartao border px-6 py-10 text-center ${
                ehErro ? 'border-interditado/30 bg-interditado-fundo' : 'border-linha bg-white'
            }`}
        >
            <span
                className={`grid size-14 place-items-center rounded-full ${
                    ehErro ? 'bg-white text-interditado' : 'bg-verde-50 text-verde-texto'
                }`}
            >
                <Icone nome={ICONES[tipo]} className="size-7" />
            </span>
            <p className={`font-display text-xl font-extrabold ${ehErro ? 'text-interditado' : 'text-azul-noite'}`}>{titulo}</p>
            {texto && <p className="max-w-prose text-ardosia">{texto}</p>}
            {tipo === 'carregando' && (
                <p className="text-sm text-ardosia">
                    O servidor gratuito pode levar até 1 minuto para acordar no primeiro acesso.
                </p>
            )}
            {(aoTentarNovamente || acao) && (
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    {aoTentarNovamente && (
                        <button
                            type="button"
                            onClick={aoTentarNovamente}
                            className="min-h-12 rounded-botao border-2 border-azul-noite bg-white px-6 font-display font-extrabold text-azul-noite hover:bg-azul-50"
                        >
                            Tentar de novo
                        </button>
                    )}
                    {acao}
                </div>
            )}
        </div>
    );
}
