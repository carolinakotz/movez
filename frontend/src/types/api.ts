// Formato do ErroDto devolvido pelo RestExceptionHandler da API Java.
export interface RespostaErroApi {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    errosValidacao?: Record<string, string>;
}

// Datas LocalDate chegam como "2026-11-10". Por segurança, aceitamos também o formato em array.
export type DataApi = string | [number, number, number];

// Aviso que uma página passa para outra pelo state da navegação (ex.: após excluir um trecho).
export interface AvisoNavegacao {
    mensagem: string;
    tipo: 'sucesso' | 'erro';
}
