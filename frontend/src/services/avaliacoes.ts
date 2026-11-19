import type { Avaliacao, DadosAvaliacao } from '../types/avaliacao';
import { enviar, obter } from './api';

// GET /avaliacoes
export function listarAvaliacoes(signal?: AbortSignal): Promise<Avaliacao[]> {
    return obter<Avaliacao[]>('/avaliacoes', signal);
}

// GET /trechos/{id}/avaliacoes
export function listarAvaliacoesDoTrecho(cdTrecho: number, signal?: AbortSignal): Promise<Avaliacao[]> {
    return obter<Avaliacao[]>(`/trechos/${cdTrecho}/avaliacoes`, signal);
}

// POST /trechos/{id}/avaliacoes
export function cadastrarAvaliacao(cdTrecho: number, avaliacao: DadosAvaliacao): Promise<Avaliacao> {
    return enviar<Avaliacao>(`/trechos/${cdTrecho}/avaliacoes`, avaliacao, 'POST');
}
