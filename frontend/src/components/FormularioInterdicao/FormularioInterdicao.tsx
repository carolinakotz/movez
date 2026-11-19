import { useForm, useWatch } from 'react-hook-form';
import { useEnvioFormulario } from '../../hooks/useEnvioFormulario';
import type { DadosInterdicao, FormularioInterdicaoValores } from '../../types/interdicao';
import type { TrechoComResumo } from '../../types/trecho';
import type { Usuario } from '../../types/usuario';
import { dataValida, hojeIso } from '../../utils/datas';
import { TIPOS_INTERDICAO } from '../../utils/texto';
import Botao from '../Botao/Botao';
import CampoSelect from '../CampoSelect/CampoSelect';
import CampoTextarea from '../CampoTextarea/CampoTextarea';
import CampoTexto from '../CampoTexto/CampoTexto';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';

type FormularioInterdicaoProps = {
    trechos: TrechoComResumo[];
    usuarios: Usuario[];
    trechoInicial?: string;
    aoEnviar: (cdTrecho: number, dados: DadosInterdicao) => Promise<void>;
};

const removerEspacos = (valor: string) => valor.trim();

export default function FormularioInterdicao({ trechos, usuarios, trechoInicial = '', aoEnviar }: FormularioInterdicaoProps) {
    const {
        register,
        control,
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<FormularioInterdicaoValores>({
        defaultValues: {
            cdTrecho: trechoInicial,
            cdUsuarioAviso: '',
            tpInterdicao: '',
            dsInterdicao: '',
            dtInicio: hojeIso(),
            dtPrevisaoFim: '',
            dsPassagemAlternativa: '',
        },
    });

    const { erroEnvio, tentouInvalido, marcarInvalido, executar } = useEnvioFormulario(setError);
    const descricao = useWatch({ control, name: 'dsInterdicao' }) ?? '';
    const passagem = useWatch({ control, name: 'dsPassagemAlternativa' }) ?? '';

    function enviar(valores: FormularioInterdicaoValores) {
        return executar(() =>
            aoEnviar(Number(valores.cdTrecho), {
                cdUsuarioAviso: Number(valores.cdUsuarioAviso),
                tpInterdicao: valores.tpInterdicao as DadosInterdicao['tpInterdicao'],
                dsInterdicao: valores.dsInterdicao,
                dtInicio: valores.dtInicio,
                dtPrevisaoFim: valores.dtPrevisaoFim,
                dsPassagemAlternativa: valores.dsPassagemAlternativa || undefined,
            }),
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit(enviar, marcarInvalido)} className="flex flex-col gap-6">
            {erroEnvio && (
                <MensagemRetorno tipo="erro" titulo="O aviso não foi publicado">
                    {erroEnvio}
                </MensagemRetorno>
            )}
            {tentouInvalido && !erroEnvio && Object.keys(errors).length > 0 && (
                <MensagemRetorno tipo="atencao">Confira os campos destacados antes de publicar.</MensagemRetorno>
            )}

            <CampoSelect
                id="aviso-trecho"
                label="Qual trecho está interditado?"
                textoVazio="Escolha o trecho"
                ajuda="Trechos que já têm um aviso ativo aparecem bloqueados."
                opcoes={trechos.map(({ trecho, interdicaoAtiva }) => ({
                    valor: String(trecho.cdTrecho),
                    rotulo: `${trecho.nmLogradouro} (${trecho.nmBairro})${interdicaoAtiva ? ' · já interditado' : ''}`,
                    desabilitada: Boolean(interdicaoAtiva),
                }))}
                register={register('cdTrecho', {
                    required: 'Escolha o trecho interditado.',
                    validate: (valor) =>
                        !trechos.find((item) => String(item.trecho.cdTrecho) === valor)?.interdicaoAtiva ||
                        'Esse trecho já tem um aviso ativo. Veja o aviso na página do trecho.',
                })}
                erro={errors.cdTrecho?.message}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <CampoSelect
                    id="aviso-usuario"
                    label="Quem está avisando?"
                    textoVazio="Escolha seu nome"
                    opcoes={usuarios.map((usuario) => ({ valor: String(usuario.cdUsuario), rotulo: usuario.nmUsuario }))}
                    register={register('cdUsuarioAviso', { required: 'Escolha quem está avisando.' })}
                    erro={errors.cdUsuarioAviso?.message}
                />
                <CampoSelect
                    id="aviso-tipo"
                    label="O que está acontecendo?"
                    textoVazio="Escolha o tipo"
                    opcoes={TIPOS_INTERDICAO.map((tipo) => ({ valor: tipo.valor, rotulo: tipo.rotulo }))}
                    register={register('tpInterdicao', { required: 'Escolha o tipo de interdição.' })}
                    erro={errors.tpInterdicao?.message}
                />
            </div>

            <CampoTextarea
                id="aviso-descricao"
                label="Descreva a interdição"
                placeholder="Ex.: reforma do piso da calçada pela prefeitura."
                linhas={3}
                limite={200}
                totalDigitado={descricao.length}
                register={register('dsInterdicao', {
                    setValueAs: removerEspacos,
                    required: 'Conte o que está bloqueando o trecho.',
                    minLength: { value: 5, message: 'Use pelo menos 5 caracteres.' },
                    maxLength: { value: 200, message: 'Use no máximo 200 caracteres.' },
                })}
                erro={errors.dsInterdicao?.message}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <CampoTexto
                    id="aviso-inicio"
                    label="Início"
                    type="date"
                    register={register('dtInicio', {
                        required: 'Informe quando a interdição começou.',
                        validate: (valor) => dataValida(valor) || 'Essa data não existe. Tente algo como 10/11/2026.',
                    })}
                    erro={errors.dtInicio?.message}
                />
                <CampoTexto
                    id="aviso-previsao"
                    label="Previsão de término"
                    type="date"
                    register={register('dtPrevisaoFim', {
                        required: 'Informe a previsão de término.',
                        validate: (valor) => {
                            if (!dataValida(valor)) return 'Essa data não existe. Tente algo como 28/02/2027.';
                            if (valor < getValues('dtInicio')) return 'A previsão de término não pode ser antes do início.';
                            return true;
                        },
                    })}
                    erro={errors.dtPrevisaoFim?.message}
                />
            </div>

            <CampoTextarea
                id="aviso-passagem"
                label="Passagem alternativa"
                opcional
                placeholder="Ex.: use a calçada oposta pela faixa de pedestres."
                linhas={2}
                limite={200}
                totalDigitado={passagem.length}
                register={register('dsPassagemAlternativa', {
                    setValueAs: removerEspacos,
                    maxLength: { value: 200, message: 'Use no máximo 200 caracteres.' },
                })}
                erro={errors.dsPassagemAlternativa?.message}
            />

            <div>
                <Botao type="submit" variante="perigo" icone="alerta" carregando={isSubmitting} larguraTotal className="md:w-auto">
                    {isSubmitting ? 'Publicando…' : 'Publicar aviso de interdição'}
                </Botao>
            </div>
        </form>
    );
}
