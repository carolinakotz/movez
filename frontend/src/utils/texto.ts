import type { TipoInterdicao } from '../types/interdicao';

const NOMES_PERFIL: Record<string, string> = {
    IDOSO: 'Idoso',
    'CARRINHO DE BEBE': 'Carrinho de bebê',
    CADEIRANTE: 'Cadeirante',
    'PEDESTRE COMUM': 'Pedestre',
};

// "CARRINHO DE BEBE" -> "Carrinho de bebê". Perfis novos ficam só com a primeira letra maiúscula.
export function nomePerfil(nmPerfil?: string | null): string {
    if (!nmPerfil) return 'Sem perfil';
    const chave = nmPerfil.trim().toUpperCase();
    if (NOMES_PERFIL[chave]) return NOMES_PERFIL[chave];
    const minusculo = nmPerfil.trim().toLowerCase();
    return minusculo.charAt(0).toUpperCase() + minusculo.slice(1);
}

export const TIPOS_INTERDICAO: { valor: TipoInterdicao; rotulo: string }[] = [
    { valor: 'OBRA', rotulo: 'Obra' },
    { valor: 'ALAGAMENTO', rotulo: 'Alagamento' },
    { valor: 'BLOQUEIO', rotulo: 'Bloqueio' },
];

export function nomeTipoInterdicao(tipo: TipoInterdicao): string {
    return TIPOS_INTERDICAO.find((item) => item.valor === tipo)?.rotulo ?? tipo;
}

export function formatarMetros(valor: number): string {
    return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} m`;
}
