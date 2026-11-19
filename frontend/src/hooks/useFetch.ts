import { useCallback, useEffect, useState } from 'react';
import { ErroApi } from '../services/api';

// Executa uma busca assíncrona e controla dados, carregamento e erro.
// "buscar" precisa ser estável (função de módulo ou useCallback); senão a busca repete a cada render.
export function useFetch<T>(buscar: (signal: AbortSignal) => Promise<T>) {
    const [dados, setDados] = useState<T | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<ErroApi | null>(null);
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();

        async function carregar() {
            try {
                setCarregando(true);
                setErro(null);
                const resultado = await buscar(controlador.signal);
                setDados(resultado);
            } catch (erroCapturado) {
                if (controlador.signal.aborted) return;
                setErro(
                    erroCapturado instanceof ErroApi
                        ? erroCapturado
                        : new ErroApi(0, 'Algo inesperado aconteceu ao carregar os dados.'),
                );
            } finally {
                if (!controlador.signal.aborted) setCarregando(false);
            }
        }

        carregar();
        return () => controlador.abort();
    }, [buscar, tentativa]);

    const recarregar = useCallback(() => setTentativa((atual) => atual + 1), []);

    return { dados, carregando, erro, recarregar };
}
