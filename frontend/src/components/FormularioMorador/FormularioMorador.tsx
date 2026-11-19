import { useForm, useWatch } from 'react-hook-form';
import { useEnvioFormulario } from '../../hooks/useEnvioFormulario';
import type { Perfil } from '../../types/perfil';
import type { FormularioMoradorValores } from '../../types/usuario';
import { nomePerfil } from '../../utils/texto';
import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';

type FormularioMoradorProps = {
    perfis: Perfil[];
    aoEnviar: (valores: FormularioMoradorValores) => Promise<void>;
};

const removerEspacos = (valor: string) => valor.trim();

export default function FormularioMorador({ perfis, aoEnviar }: FormularioMoradorProps) {
    const {
        register,
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormularioMoradorValores>({ defaultValues: { nmUsuario: '', dsEmail: '', cdPerfil: '' } });

    const { erroEnvio, tentouInvalido, marcarInvalido, executar } = useEnvioFormulario(setError);
    const perfilEscolhido = useWatch({ control, name: 'cdPerfil' });

    function enviar(valores: FormularioMoradorValores) {
        return executar(async () => {
            await aoEnviar(valores);
            reset();
        });
    }

    return (
        <form noValidate onSubmit={handleSubmit(enviar, marcarInvalido)} className="flex flex-col gap-6">
            {erroEnvio && (
                <MensagemRetorno tipo="erro" titulo="O cadastro não foi concluído">
                    {erroEnvio}
                </MensagemRetorno>
            )}
            {tentouInvalido && !erroEnvio && Object.keys(errors).length > 0 && (
                <MensagemRetorno tipo="atencao">Confira os campos destacados.</MensagemRetorno>
            )}

            <CampoTexto
                id="morador-nome"
                label="Nome completo"
                autoComplete="name"
                register={register('nmUsuario', {
                    setValueAs: removerEspacos,
                    required: 'Informe seu nome.',
                    minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
                    maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
                })}
                erro={errors.nmUsuario?.message}
            />

            <CampoTexto
                id="morador-email"
                label="E-mail"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="voce@email.com"
                ajuda="Cada e-mail só pode ser cadastrado uma vez."
                register={register('dsEmail', {
                    setValueAs: removerEspacos,
                    required: 'Informe seu e-mail.',
                    maxLength: { value: 120, message: 'Use no máximo 120 caracteres.' },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Esse e-mail parece incompleto. Ex.: nome@email.com' },
                })}
                erro={errors.dsEmail?.message}
            />

            <fieldset aria-describedby={errors.cdPerfil ? 'erro-morador-perfil' : undefined}>
                <legend className="mb-2 font-bold text-azul-noite">Como você anda?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                    {perfis.map((perfil) => {
                        const marcado = perfilEscolhido === String(perfil.cdPerfil);
                        return (
                            <label
                                key={perfil.cdPerfil}
                                className={`flex cursor-pointer gap-3 rounded-cartao border-2 p-4 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-azul-noite ${
                                    marcado ? 'border-azul-noite bg-azul-50' : 'border-linha bg-white hover:border-azul-noite'
                                }`}
                            >
                                <input
                                    type="radio"
                                    value={String(perfil.cdPerfil)}
                                    className="mt-1 size-5 accent-azul-noite"
                                    {...register('cdPerfil', { required: 'Escolha o perfil que mais combina com você.' })}
                                />
                                <span>
                                    <span className="block font-display text-lg font-extrabold text-azul-noite">
                                        {nomePerfil(perfil.nmPerfil)}
                                    </span>
                                    <span className="block text-base text-ardosia">{perfil.dsPerfil}</span>
                                </span>
                            </label>
                        );
                    })}
                </div>
                {errors.cdPerfil && (
                    <p id="erro-morador-perfil" className="mt-2 text-base font-bold text-interditado">
                        {errors.cdPerfil.message}
                    </p>
                )}
            </fieldset>

            <div>
                <Botao type="submit" carregando={isSubmitting} larguraTotal className="md:w-auto">
                    {isSubmitting ? 'Cadastrando…' : 'Quero participar'}
                </Botao>
            </div>
        </form>
    );
}
