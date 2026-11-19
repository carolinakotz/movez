import type { Avaliacao } from './avaliacao';
import type { Interdicao } from './interdicao';

// Espelha o TrechoDto da API (GET /trechos).
export interface Trecho {
    cdTrecho: number;
    nmLogradouro: string;
    nmBairro: string;
    nmCidade: string;
    vlExtensaoM: number;
}

// Corpo do POST /trechos e do PUT /trechos/{id}.
export type DadosTrecho = Omit<Trecho, 'cdTrecho'>;

// Médias de cada critério de conforto, calculadas no front a partir das avaliações.
export interface MediasCriterios {
    nrSombra: number;
    nrIluminacao: number;
    nrCalcada: number;
    nrSeguranca: number;
    nrSilencio: number;
}

// Trecho com o resumo usado nas listagens: avaliações, médias e aviso ativo.
export interface TrechoComResumo {
    trecho: Trecho;
    avaliacoes: Avaliacao[];
    medias: MediasCriterios | null;
    interdicaoAtiva: Interdicao | null;
}

// Valores do formulário de trecho (extensão como texto para validar antes de converter).
export interface FormularioTrechoValores {
    nmLogradouro: string;
    nmBairro: string;
    nmCidade: string;
    vlExtensaoM: string;
}
