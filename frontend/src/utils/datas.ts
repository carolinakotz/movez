import type { DataApi } from '../types/api';

// Converte a data da API ("2026-11-10" ou [2026, 11, 10]) para "10/11/2026".
export function formatarData(data?: DataApi | null): string {
    if (!data) return '—';
    if (Array.isArray(data)) {
        const [ano, mes, dia] = data;
        return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
    }
    const [ano, mes, dia] = data.slice(0, 10).split('-');
    return dia && mes && ano ? `${dia}/${mes}/${ano}` : data;
}

// Data de hoje no formato do input type="date" (yyyy-mm-dd), no fuso do navegador.
export function hojeIso(): string {
    const agora = new Date();
    const ajuste = agora.getTimezoneOffset() * 60_000;
    return new Date(agora.getTime() - ajuste).toISOString().slice(0, 10);
}

// Verifica se o texto é uma data real (evita 31/02, por exemplo).
export function dataValida(valor: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
    const [ano, mes, dia] = valor.split('-').map(Number);
    const data = new Date(ano, mes - 1, dia);
    return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
}
