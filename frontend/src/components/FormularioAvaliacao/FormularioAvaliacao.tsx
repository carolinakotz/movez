import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { useEnvioFormulario } from '../../hooks/useEnvioFormulario';
import type { DadosAvaliacao, FormularioAvaliacaoValores } from '../../types/avaliacao';
import type { Usuario } from '../../types/usuario';
import { CRITERIOS } from '../../utils/conforto';
import { nomePerfil } from '../../utils/texto';
import Botao from '../Botao/Botao';
import CampoSelect from '../CampoSelect/CampoSelect';
import CampoTextarea from '../CampoTextarea/CampoTextarea';
import type { NomeIcone } from '../Icone/Icone';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';
import SeletorNota from '../SeletorNota/SeletorNota';

type FormularioAvaliacaoProps = {
    usuarios: Usuario[];
    aoEnviar: (dados: DadosAvaliacao) => Promise<void>;
};

const ICONES: Record<string, NomeIcone> = {
    nrSombra: 'sombra',
    nrIluminacao: 'iluminacao',
    nrCalcada: 'calcada',
    nrSeguranca: 'seguranca',
    nrSilencio: 'silencio',
};

const LIMITE_COMENTARIO = 200;

export default function FormularioAvaliacao({ usuarios, aoEnviar }: FormularioAvaliacaoProps) {
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormularioAvaliacaoValores>({
        defaultValues: {
            cdUsuario: '',
            nrSombra: '',
            nrIluminacao: '',
            nrCalcada: '',
            nrSeguranca: '',
            nrSilencio: '',
            dsComentario: '',
        },
    });

    const { erroEnvio, tentouInvalido, marcarInvalido, executar } = useEnvioFormulario(setError);
    const valores = useWatch({ control });

    function enviar(dados: FormularioAvaliacaoValores) {
        return executar(() =>
            aoEnviar({
                cdUsuario: Number(dados.cdUsuario),
                nrSombra: Number(dados.nrSombra),
                nrIluminacao: Number(dados.nrIluminacao),
                nrCalcada: Number(dados.nrCalcada),
                nrSeguranca: Number(dados.nrSeguranca),
                nrSilencio: Number(dados.nrSilencio),
                dsComentario: dados.dsComentario.trim() || undefined,
            }),
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit(enviar, marcarInvalido)} className="flex flex-col gap-6">
            {erroEnvio && (
                <MensagemRetorno tipo="erro" titulo="A avaliação não foi enviada">
                    {erroEnvio}
                </MensagemRetorno>
            )}
            {tentouInvalido && !erroEnvio && Object.keys(errors).length > 0 && (
                <MensagemRetorno tipo="atencao">Falta pouco: confira os campos destacados.</MensagemRetorno>
            )}

            <div>
                <CampoSelect
                    id="avaliacao-usuario"
                    label="Quem está avaliando?"
                    textoVazio="Escolha seu nome"
                    opcoes={usuarios.map((usuario) => ({
                        valor: String(usuario.cdUsuario),
                        rotulo: `${usuario.nmUsuario} (${nomePerfil(usuario.nmPerfil)})`,
                    }))}
                    register={register('cdUsuario', { required: 'Escolha quem está avaliando.' })}
                    erro={errors.cdUsuario?.message}
                />
                <p className="mt-2 text-base text-ardosia">
                    Não está na lista?{' '}
                    <Link to="/participar" className="font-bold text-verde-texto underline underline-offset-4">
                        Cadastre-se como morador
                    </Link>
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {CRITERIOS.map(({ chave, rotulo, dica }) => (
                    <SeletorNota
                        key={chave}
                        id={`avaliacao-${chave}`}
                        rotulo={rotulo}
                        dica={dica}
                        icone={ICONES[chave]}
                        valorAtual={valores[chave]}
                        register={register(chave, { required: `Dê uma nota de 1 a 5 para ${rotulo.toLowerCase()}.` })}
                        erro={errors[chave]?.message}
                    />
                ))}
            </div>

            <CampoTextarea
                id="avaliacao-comentario"
                label="Comentário"
                opcional
                placeholder="Ex.: calçada larga, mas fica escura depois das 19h."
                limite={LIMITE_COMENTARIO}
                totalDigitado={valores.dsComentario?.length ?? 0}
                register={register('dsComentario', {
                    maxLength: { value: LIMITE_COMENTARIO, message: `Use no máximo ${LIMITE_COMENTARIO} caracteres.` },
                })}
                erro={errors.dsComentario?.message}
            />

            <div>
                <Botao type="submit" carregando={isSubmitting} larguraTotal className="md:w-auto">
                    {isSubmitting ? 'Enviando…' : 'Enviar avaliação'}
                </Botao>
            </div>
        </form>
    );
}
