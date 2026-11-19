// Espelha o UsuarioDto da API (GET /usuarios).
export interface Usuario {
    cdUsuario: number;
    nmUsuario: string;
    dsEmail: string;
    cdPerfil: number;
    nmPerfil?: string;
}

// Corpo enviado no POST /perfis/{id}/usuarios.
export interface DadosUsuario {
    nmUsuario: string;
    dsEmail: string;
}

// Valores do formulário de cadastro de morador.
export interface FormularioMoradorValores extends DadosUsuario {
    cdPerfil: string;
}
