export type AssuntoContato = 'duvida' | 'sugestao' | 'parceria' | 'problema';

export interface FormularioContatoValores {
    nome: string;
    email: string;
    assunto: AssuntoContato | '';
    mensagem: string;
}
