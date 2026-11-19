import { useEffect } from 'react';

// Atualiza o título da aba a cada página: ajuda leitores de tela e o histórico do navegador.
export function useTituloPagina(titulo: string) {
    useEffect(() => {
        document.title = `${titulo} | MovEz`;
    }, [titulo]);
}
