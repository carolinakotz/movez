import type { RespostaErroApi } from '../types/api';

// URL base da API Java. Vem do .env (VITE_API_URL) ou das variáveis de ambiente da Vercel.
// Sem a variável, usa a API publicada no Render.
export const API_URL: string = (import.meta.env.VITE_API_URL ?? 'https://api-rest-movez.onrender.com').replace(/\/+$/, '');

export class ErroApi extends Error {
    status: number;
    errosCampos?: Record<string, string>;

    constructor(status: number, mensagem: string, errosCampos?: Record<string, string>) {
        super(mensagem);
        this.name = 'ErroApi';
        this.status = status;
        this.errosCampos = errosCampos;
    }
}

function mensagemPorStatus(status: number): string {
    if (status === 404) return 'Não encontramos o que você procurou. Ele pode ter sido removido.';
    if (status === 409) return 'Essa ação conflita com uma regra do MovEz.';
    if (status >= 500) return 'O servidor do MovEz encontrou um problema. Tente de novo em instantes.';
    return `Não foi possível concluir a ação (código ${status}).`;
}

// Erros 4xx trazem a mensagem de negócio da API (ex.: "O trecho 2 já possui uma interdição ativa").
async function lerErro(resposta: Response): Promise<ErroApi> {
    if (resposta.status >= 500) return new ErroApi(resposta.status, mensagemPorStatus(resposta.status));

    try {
        const corpo = (await resposta.json()) as Partial<RespostaErroApi>;
        const mensagem = typeof corpo.message === 'string' && corpo.message !== '' ? corpo.message : mensagemPorStatus(resposta.status);
        return new ErroApi(resposta.status, mensagem, corpo.errosValidacao);
    } catch {
        // Corpo vazio ou não-JSON: usa a mensagem padrão do status.
        return new ErroApi(resposta.status, mensagemPorStatus(resposta.status));
    }
}

async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
    let resposta: Response;

    try {
        resposta = await fetch(`${API_URL}${caminho}`, opcoes);
    } catch (erro) {
        if (erro instanceof DOMException && erro.name === 'AbortError') throw erro;
        throw new ErroApi(0, 'Não foi possível falar com o servidor do MovEz. Confira sua conexão e tente de novo.');
    }

    if (!resposta.ok) throw await lerErro(resposta);

    // DELETE devolve 204 sem corpo.
    if (resposta.status === 204) return undefined as T;

    return (await resposta.json()) as T;
}

export function obter<T>(caminho: string, signal?: AbortSignal): Promise<T> {
    return requisitar<T>(caminho, { signal });
}

export function enviar<T>(caminho: string, corpo: unknown, metodo: 'POST' | 'PUT' | 'PATCH' = 'POST'): Promise<T> {
    return requisitar<T>(caminho, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
    });
}

export function remover(caminho: string): Promise<void> {
    return requisitar<void>(caminho, { method: 'DELETE' });
}
