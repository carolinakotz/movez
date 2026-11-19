import type { ReactNode } from 'react';
import Icone, { type NomeIcone } from '../Icone/Icone';

type TipoMensagem = 'sucesso' | 'erro' | 'atencao' | 'info';

type MensagemRetornoProps = {
    tipo: TipoMensagem;
    titulo?: string;
    children: ReactNode;
    aoFechar?: () => void;
};

const ESTILOS: Record<TipoMensagem, { caixa: string; icone: NomeIcone }> = {
    sucesso: { caixa: 'border-verde-texto/40 bg-verde-50 text-verde-texto', icone: 'check' },
    erro: { caixa: 'border-interditado/40 bg-interditado-fundo text-interditado', icone: 'alerta' },
    atencao: { caixa: 'border-atencao/40 bg-atencao-fundo text-atencao', icone: 'alerta' },
    info: { caixa: 'border-azul-600/30 bg-azul-50 text-azul-600', icone: 'info' },
};

// Feedback das operações (sucesso da API, falha, avisos). Sempre ícone + texto, nunca só cor.
export default function MensagemRetorno({ tipo, titulo, children, aoFechar }: MensagemRetornoProps) {
    const estilo = ESTILOS[tipo];

    return (
        <div
            role={tipo === 'erro' ? 'alert' : 'status'}
            className={`flex items-start gap-3 rounded-botao border px-4 py-3 ${estilo.caixa}`}
        >
            <Icone nome={estilo.icone} className="mt-0.5 size-5" />
            <div className="min-w-0 flex-1">
                {titulo && <p className="font-bold">{titulo}</p>}
                <div className="text-tinta">{children}</div>
            </div>
            {aoFechar && (
                <button
                    type="button"
                    onClick={aoFechar}
                    aria-label="Fechar mensagem"
                    className="-m-2 grid size-10 place-items-center rounded-full hover:bg-white/70"
                >
                    <Icone nome="fechar" className="size-5" />
                </button>
            )}
        </div>
    );
}
