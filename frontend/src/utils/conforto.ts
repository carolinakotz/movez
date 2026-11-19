import type { Avaliacao, CriterioConforto } from '../types/avaliacao';
import type { MediasCriterios, TrechoComResumo } from '../types/trecho';

export const CRITERIOS: { chave: CriterioConforto; rotulo: string; dica: string }[] = [
    { chave: 'nrSombra', rotulo: 'Sombra', dica: 'Árvores, marquises e proteção do sol' },
    { chave: 'nrIluminacao', rotulo: 'Iluminação', dica: 'Como fica a rua à noite' },
    { chave: 'nrCalcada', rotulo: 'Calçada', dica: 'Piso regular, largura e rampas' },
    { chave: 'nrSeguranca', rotulo: 'Segurança', dica: 'Sensação de segurança ao passar' },
    { chave: 'nrSilencio', rotulo: 'Silêncio', dica: '5 é o mais silencioso' },
];

export type Pesos = Record<CriterioConforto, number>;

const PESOS_IGUAIS: Pesos = { nrSombra: 1, nrIluminacao: 1, nrCalcada: 1, nrSeguranca: 1, nrSilencio: 1 };

// Peso de cada critério por perfil de quem anda. Os nomes vêm da tabela tb_perfil da API.
// Ex.: para quem usa cadeira de rodas, a calçada vale 4 vezes mais que o silêncio.
const PESOS_POR_PERFIL: Record<string, Pesos> = {
    IDOSO: { nrSombra: 2, nrIluminacao: 2, nrCalcada: 3, nrSeguranca: 2, nrSilencio: 1 },
    'CARRINHO DE BEBE': { nrSombra: 2, nrIluminacao: 1, nrCalcada: 3, nrSeguranca: 2, nrSilencio: 1 },
    CADEIRANTE: { nrSombra: 1, nrIluminacao: 1, nrCalcada: 4, nrSeguranca: 2, nrSilencio: 1 },
    'PEDESTRE COMUM': { nrSombra: 1, nrIluminacao: 1, nrCalcada: 1, nrSeguranca: 2, nrSilencio: 1 },
};

export function pesosDoPerfil(nmPerfil?: string | null): Pesos {
    if (!nmPerfil) return PESOS_IGUAIS;
    return PESOS_POR_PERFIL[nmPerfil.trim().toUpperCase()] ?? PESOS_IGUAIS;
}

function arredondar(valor: number): number {
    return Math.round(valor * 10) / 10;
}

// Média de cada critério. Sem avaliações, devolve null (a interface mostra "sem avaliações").
export function calcularMedias(avaliacoes: Avaliacao[]): MediasCriterios | null {
    if (avaliacoes.length === 0) return null;

    const soma = (criterio: CriterioConforto) =>
        avaliacoes.reduce((total, avaliacao) => total + Number(avaliacao[criterio] ?? 0), 0);

    return {
        nrSombra: arredondar(soma('nrSombra') / avaliacoes.length),
        nrIluminacao: arredondar(soma('nrIluminacao') / avaliacoes.length),
        nrCalcada: arredondar(soma('nrCalcada') / avaliacoes.length),
        nrSeguranca: arredondar(soma('nrSeguranca') / avaliacoes.length),
        nrSilencio: arredondar(soma('nrSilencio') / avaliacoes.length),
    };
}

// Nota de conforto geral, ponderada pelos pesos do perfil escolhido.
export function notaConforto(medias: MediasCriterios | null, pesos: Pesos = PESOS_IGUAIS): number | null {
    if (!medias) return null;

    let total = 0;
    let somaPesos = 0;
    for (const { chave } of CRITERIOS) {
        total += medias[chave] * pesos[chave];
        somaPesos += pesos[chave];
    }
    return arredondar(total / somaPesos);
}

export interface ClassificacaoNota {
    rotulo: string;
    fundo: string;
    texto: string;
}

// A nota usa sempre cor + número + palavra (guia de cores do MovEz).
export function classificarNota(nota: number): ClassificacaoNota {
    if (nota >= 4.5) return { rotulo: 'Ótimo', fundo: 'bg-nota-5', texto: 'text-azul-noite' };
    if (nota >= 3.5) return { rotulo: 'Bom', fundo: 'bg-nota-4', texto: 'text-azul-noite' };
    if (nota >= 2.5) return { rotulo: 'Regular', fundo: 'bg-nota-3', texto: 'text-azul-noite' };
    if (nota >= 1.5) return { rotulo: 'Ruim', fundo: 'bg-nota-2', texto: 'text-azul-noite' };
    return { rotulo: 'Péssimo', fundo: 'bg-nota-1', texto: 'text-white' };
}

export function formatarNota(nota: number): string {
    return nota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export interface TrechoOrdenado {
    resumo: TrechoComResumo;
    nota: number | null;
}

// Ordena do mais para o menos confortável. Trechos interditados e sem avaliação vão para o fim,
// porque não entram nas rotas sugeridas.
export function ordenarPorConforto(resumos: TrechoComResumo[], pesos: Pesos): TrechoOrdenado[] {
    const grupo = (item: TrechoOrdenado) => (item.resumo.interdicaoAtiva ? 2 : item.nota === null ? 1 : 0);

    return resumos
        .map((resumo) => ({ resumo, nota: notaConforto(resumo.medias, pesos) }))
        .sort((a, b) => grupo(a) - grupo(b) || (b.nota ?? 0) - (a.nota ?? 0));
}
