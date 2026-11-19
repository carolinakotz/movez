import { useForm } from 'react-hook-form';
import { useEnvioFormulario } from '../../hooks/useEnvioFormulario';
import type { DadosTrecho, FormularioTrechoValores } from '../../types/trecho';
import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';

type FormularioTrechoProps = {
    modo: 'cadastro' | 'edicao';
    valoresIniciais?: DadosTrecho;
    aoEnviar: (dados: DadosTrecho) => Promise<void>;
};

const removerEspacos = (valor: string) => valor.trim();

function paraFormulario(trecho?: DadosTrecho): FormularioTrechoValores {
    return {
        nmLogradouro: trecho?.nmLogradouro ?? '',
        nmBairro: trecho?.nmBairro ?? '',
        nmCidade: trecho?.nmCidade ?? 'São Paulo',
        vlExtensaoM: trecho ? String(trecho.vlExtensaoM).replace('.', ',') : '',
    };
}

export default function FormularioTrecho({ modo, valoresIniciais, aoEnviar }: FormularioTrechoProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormularioTrechoValores>({ defaultValues: paraFormulario(valoresIniciais) });

    const { erroEnvio, tentouInvalido, marcarInvalido, executar } = useEnvioFormulario(setError);

    function enviar(valores: FormularioTrechoValores) {
        return executar(() =>
            aoEnviar({
                nmLogradouro: valores.nmLogradouro,
                nmBairro: valores.nmBairro,
                nmCidade: valores.nmCidade,
                vlExtensaoM: Number(valores.vlExtensaoM.replace(',', '.')),
            }),
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit(enviar, marcarInvalido)} className="flex flex-col gap-6">
            {erroEnvio && (
                <MensagemRetorno tipo="erro" titulo="O trecho não foi salvo">
                    {erroEnvio}
                </MensagemRetorno>
            )}
            {tentouInvalido && !erroEnvio && Object.keys(errors).length > 0 && (
                <MensagemRetorno tipo="atencao">Confira os campos destacados antes de salvar.</MensagemRetorno>
            )}

            <CampoTexto
                id="trecho-logradouro"
                label="Rua e numeração do trecho"
                placeholder="Ex.: Rua Augusta, 500 a 800"
                ajuda="Diga a rua e entre quais números fica o trecho."
                register={register('nmLogradouro', {
                    setValueAs: removerEspacos,
                    required: 'Informe a rua do trecho.',
                    minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
                    maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
                })}
                erro={errors.nmLogradouro?.message}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <CampoTexto
                    id="trecho-bairro"
                    label="Bairro"
                    placeholder="Ex.: Consolação"
                    register={register('nmBairro', {
                        setValueAs: removerEspacos,
                        required: 'Informe o bairro.',
                        maxLength: { value: 60, message: 'Use no máximo 60 caracteres.' },
                    })}
                    erro={errors.nmBairro?.message}
                />
                <CampoTexto
                    id="trecho-cidade"
                    label="Cidade"
                    register={register('nmCidade', {
                        setValueAs: removerEspacos,
                        required: 'Informe a cidade.',
                        maxLength: { value: 60, message: 'Use no máximo 60 caracteres.' },
                    })}
                    erro={errors.nmCidade?.message}
                />
            </div>

            <CampoTexto
                id="trecho-extensao"
                label="Extensão em metros"
                placeholder="Ex.: 350"
                inputMode="decimal"
                ajuda="Um quarteirão costuma ter entre 100 e 150 metros."
                register={register('vlExtensaoM', {
                    setValueAs: removerEspacos,
                    required: 'Informe a extensão do trecho.',
                    pattern: { value: /^\d{1,5}([.,]\d{1,2})?$/, message: 'Use só números, como 350 ou 350,5.' },
                    validate: (valor) => {
                        const numero = Number(valor.replace(',', '.'));
                        if (numero <= 0) return 'A extensão precisa ser maior que zero.';
                        if (numero > 99999.99) return 'Use no máximo 99.999 metros.';
                        return true;
                    },
                })}
                erro={errors.vlExtensaoM?.message}
            />

            <div>
                <Botao type="submit" carregando={isSubmitting} larguraTotal className="md:w-auto">
                    {isSubmitting ? 'Salvando…' : modo === 'cadastro' ? 'Cadastrar trecho' : 'Salvar alterações'}
                </Botao>
            </div>
        </form>
    );
}
