import type { DataApi } from './api';

export type TipoInterdicao = 'OBRA' | 'ALAGAMENTO' | 'BLOQUEIO';
export type StatusInterdicao = 'ATIVA' | 'ENCERRADA';

// Espelha o InterdicaoDto da API (GET /interdicoes).
export interface Interdicao {
    cdInterdicao: number;
    cdTrecho: number;
    cdUsuarioAviso: number;
    cdUsuarioConfirma?: number | null;
    tpInterdicao: TipoInterdicao;
    dsInterdicao: string;
    dtInicio: DataApi;
    dtPrevisaoFim: DataApi;
    dtEncerramento?: DataApi | null;
    dsPassagemAlternativa?: string | null;
    stInterdicao: StatusInterdicao;
}

// Corpo do POST /trechos/{id}/interdicoes.
export interface DadosInterdicao {
    cdUsuarioAviso: number;
    tpInterdicao: TipoInterdicao;
    dsInterdicao: string;
    dtInicio: string;
    dtPrevisaoFim: string;
    dsPassagemAlternativa?: string;
}

// Corpo do PATCH /interdicoes/{id}/encerrar.
export interface DadosEncerramento {
    cdUsuarioConfirma: number;
    dtEncerramento: string;
}

export interface FormularioInterdicaoValores {
    cdTrecho: string;
    cdUsuarioAviso: string;
    tpInterdicao: TipoInterdicao | '';
    dsInterdicao: string;
    dtInicio: string;
    dtPrevisaoFim: string;
    dsPassagemAlternativa: string;
}

export interface FormularioEncerramentoValores {
    cdUsuarioConfirma: string;
    dtEncerramento: string;
}
