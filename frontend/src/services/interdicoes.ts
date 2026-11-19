import type { DadosEncerramento, DadosInterdicao, Interdicao } from '../types/interdicao';
import { enviar, obter } from './api';

// GET /interdicoes
export function listarInterdicoes(signal?: AbortSignal): Promise<Interdicao[]> {
    return obter<Interdicao[]>('/interdicoes', signal);
}

// GET /trechos/{id}/interdicoes
export function listarInterdicoesDoTrecho(cdTrecho: number, signal?: AbortSignal): Promise<Interdicao[]> {
    return obter<Interdicao[]>(`/trechos/${cdTrecho}/interdicoes`, signal);
}

// POST /trechos/{id}/interdicoes
export function cadastrarInterdicao(cdTrecho: number, interdicao: DadosInterdicao): Promise<Interdicao> {
    return enviar<Interdicao>(`/trechos/${cdTrecho}/interdicoes`, interdicao, 'POST');
}

// PATCH /interdicoes/{id}/encerrar (regra R3: quem confirma não pode ser quem avisou)
export function encerrarInterdicao(cdInterdicao: number, dados: DadosEncerramento): Promise<Interdicao> {
    return enviar<Interdicao>(`/interdicoes/${cdInterdicao}/encerrar`, dados, 'PATCH');
}
