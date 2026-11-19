import type { Usuario } from '../types/usuario';
import { obter } from './api';

const ENDPOINT = '/usuarios';

// GET /usuarios
export function listarUsuarios(signal?: AbortSignal): Promise<Usuario[]> {
    return obter<Usuario[]>(ENDPOINT, signal);
}
