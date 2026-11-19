import { useState } from 'react';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ErroApi } from '../services/api';

// Padroniza o envio dos formulários: guarda a mensagem de erro da API e
// marca nos campos os erros de validação que a API Java devolver (errosValidacao).
export function useEnvioFormulario<T extends FieldValues>(setError: UseFormSetError<T>) {
    const [erroEnvio, setErroEnvio] = useState<string | null>(null);
    const [tentouInvalido, setTentouInvalido] = useState(false);

    async function executar(acao: () => Promise<void>) {
        setErroEnvio(null);
        setTentouInvalido(false);

        try {
            await acao();
        } catch (erro) {
            if (erro instanceof ErroApi) {
                if (erro.errosCampos) {
                    for (const [campo, mensagem] of Object.entries(erro.errosCampos)) {
                        setError(campo as Path<T>, { type: 'api', message: mensagem });
                    }
                }
                setErroEnvio(erro.message);
            } else {
                setErroEnvio('Não foi possível concluir a ação. Tente de novo.');
            }
        }
    }

    return {
        erroEnvio,
        limparErro: () => setErroEnvio(null),
        tentouInvalido,
        marcarInvalido: () => setTentouInvalido(true),
        executar,
    };
}
