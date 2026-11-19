import type { DataApi } from './api';

export type CriterioConforto = 'nrSombra' | 'nrIluminacao' | 'nrCalcada' | 'nrSeguranca' | 'nrSilencio';

// Espelha o AvaliacaoDto da API. Notas de 1 a 5 (no silêncio, 5 é o mais silencioso).
export interface Avaliacao {
    cdAvaliacao: number;
    cdTrecho: number;
    cdUsuario: number;
    nrSombra: number;
    nrIluminacao: number;
    nrCalcada: number;
    nrSeguranca: number;
    nrSilencio: number;
    dsComentario?: string | null;
    dtAvaliacao: DataApi;
    mediaConforto?: number | null;
}

// Corpo do POST /trechos/{id}/avaliacoes.
export interface DadosAvaliacao {
    cdUsuario: number;
    nrSombra: number;
    nrIluminacao: number;
    nrCalcada: number;
    nrSeguranca: number;
    nrSilencio: number;
    dsComentario?: string;
}

// Valores do formulário (os selects e radios trabalham com texto).
export interface FormularioAvaliacaoValores {
    cdUsuario: string;
    nrSombra: string;
    nrIluminacao: string;
    nrCalcada: string;
    nrSeguranca: string;
    nrSilencio: string;
    dsComentario: string;
}
