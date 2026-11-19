import type { Perfil } from '../types/perfil';
import type { DadosUsuario, Usuario } from '../types/usuario';
import { enviar, obter } from './api';

const ENDPOINT = '/perfis';

// GET /perfis
export function listarPerfis(signal?: AbortSignal): Promise<Perfil[]> {
    return obter<Perfil[]>(ENDPOINT, signal);
}

// POST /perfis/{id}/usuarios (rota aninhada: cadastra o morador já no perfil escolhido).
// O cdPerfil vai também no corpo porque a API valida o DTO (@NotNull) antes de ler o id da URL.
export function cadastrarUsuarioNoPerfil(cdPerfil: number, usuario: DadosUsuario): Promise<Usuario> {
    return enviar<Usuario>(`${ENDPOINT}/${cdPerfil}/usuarios`, { ...usuario, cdPerfil }, 'POST');
}