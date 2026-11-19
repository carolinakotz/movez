import type { DadosTrecho, Trecho, TrechoComResumo } from '../types/trecho';
import { calcularMedias } from '../utils/conforto';
import { enviar, obter, remover } from './api';
import { listarAvaliacoes, listarAvaliacoesDoTrecho } from './avaliacoes';
import { listarInterdicoes, listarInterdicoesDoTrecho } from './interdicoes';

const ENDPOINT = '/trechos';

// GET /trechos
export function listarTrechos(signal?: AbortSignal): Promise<Trecho[]> {
    return obter<Trecho[]>(ENDPOINT, signal);
}

// GET /trechos/{id}
export function buscarTrecho(id: number, signal?: AbortSignal): Promise<Trecho> {
    return obter<Trecho>(`${ENDPOINT}/${id}`, signal);
}

// POST /trechos
export function cadastrarTrecho(trecho: DadosTrecho): Promise<Trecho> {
    return enviar<Trecho>(ENDPOINT, trecho, 'POST');
}

// PUT /trechos/{id}
export function alterarTrecho(id: number, trecho: DadosTrecho): Promise<Trecho> {
    return enviar<Trecho>(`${ENDPOINT}/${id}`, trecho, 'PUT');
}

// DELETE /trechos/{id} (a API recusa com 409 se o trecho tiver avaliações ou interdições)
export function excluirTrecho(id: number): Promise<void> {
    return remover(`${ENDPOINT}/${id}`);
}

// Junta trechos, avaliações e interdições em 3 requisições paralelas (em vez de uma por trecho).
export async function listarTrechosComResumo(signal?: AbortSignal): Promise<TrechoComResumo[]> {
    const [trechos, avaliacoes, interdicoes] = await Promise.all([
        listarTrechos(signal),
        listarAvaliacoes(signal),
        listarInterdicoes(signal),
    ]);

    return trechos.map((trecho) => {
        const doTrecho = avaliacoes.filter((avaliacao) => avaliacao.cdTrecho === trecho.cdTrecho);
        return {
            trecho,
            avaliacoes: doTrecho,
            medias: calcularMedias(doTrecho),
            interdicaoAtiva:
                interdicoes.find((item) => item.cdTrecho === trecho.cdTrecho && item.stInterdicao === 'ATIVA') ?? null,
        };
    });
}

// Detalhe de um trecho: dados + avaliações + histórico de interdições (rotas aninhadas da API).
export async function buscarTrechoCompleto(id: number, signal?: AbortSignal) {
    const [trecho, avaliacoes, interdicoes] = await Promise.all([
        buscarTrecho(id, signal),
        listarAvaliacoesDoTrecho(id, signal),
        listarInterdicoesDoTrecho(id, signal),
    ]);

    return {
        trecho,
        avaliacoes,
        interdicoes,
        medias: calcularMedias(avaliacoes),
        interdicaoAtiva: interdicoes.find((item) => item.stInterdicao === 'ATIVA') ?? null,
    };
}
