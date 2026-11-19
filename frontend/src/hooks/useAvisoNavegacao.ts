import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { AvisoNavegacao } from '../types/api';

function lerAviso(state: unknown): AvisoNavegacao | null {
    return (state as { aviso?: AvisoNavegacao } | null)?.aviso ?? null;
}

// Lê o aviso enviado pela página anterior (ex.: "Trecho cadastrado") e limpa o state do histórico,
// para a mensagem não reaparecer ao recarregar ou voltar para a página.
export function useAvisoNavegacao() {
    const location = useLocation();
    const navigate = useNavigate();
    const [aviso, setAviso] = useState<AvisoNavegacao | null>(() => lerAviso(location.state));

    useEffect(() => {
        if (lerAviso(location.state)) {
            navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
        }
    }, [location, navigate]);

    return { aviso, fecharAviso: () => setAviso(null) };
}
