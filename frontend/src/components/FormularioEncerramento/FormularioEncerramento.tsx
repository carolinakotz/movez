import { useForm } from 'react-hook-form';
import { useEnvioFormulario } from '../../hooks/useEnvioFormulario';
import type { DadosEncerramento, FormularioEncerramentoValores, Interdicao } from '../../types/interdicao';
import type { Usuario } from '../../types/usuario';
import { dataValida, formatarData, hojeIso } from '../../utils/datas';
import Botao from '../Botao/Botao';
import CampoSelect from '../CampoSelect/CampoSelect';
import CampoTexto from '../CampoTexto/CampoTexto';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';

type FormularioEncerramentoProps = {
    interdicao: Interdicao;
    usuarios: Usuario[];
    aoEnviar: (dados: DadosEncerramento) => Promise<void>;
    aoCancelar: () => void;
};

function paraIso(data: Interdicao['dtInicio']): string {
    if (Array.isArray(data)) return data.map((parte, i) => (i === 0 ? String(parte) : String(parte).padStart(2, '0'))).join('-');
    return data.slice(0, 10);
}

// Confirma que o trecho foi liberado. Regra R3 da API: quem confirma não pode ser quem avisou.
export default function FormularioEncerramento({ interdicao, usuarios, aoEnviar, aoCancelar }: FormularioEncerramentoProps) {
    const inicio = paraIso(interdicao.dtInicio);
    const hoje = hojeIso();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormularioEncerramentoValores>({
        defaultValues: { cdUsuarioConfirma: '', dtEncerramento: hoje < inicio ? inicio : hoje },
    });

    const { erroEnvio, executar } = useEnvioFormulario(setError);
    const id = interdicao.cdInterdicao;

    function enviar(valores: FormularioEncerramentoValores) {
        return executar(() =>
            aoEnviar({ cdUsuarioConfirma: Number(valores.cdUsuarioConfirma), dtEncerramento: valores.dtEncerramento }),
        );
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit(enviar)}
            aria-label="Confirmar que o trecho foi liberado"
            className="flex flex-col gap-5 rounded-cartao border border-linha bg-white p-5"
        >
            <p className="font-display text-lg font-extrabold text-azul-noite">Confirmar que o trecho foi liberado</p>
            <p className="-mt-3 text-base text-ardosia">
                Outro morador, diferente de quem avisou, precisa confirmar a liberação.
            </p>

            {erroEnvio && (
                <MensagemRetorno tipo="erro" titulo="A liberação não foi registrada">
                    {erroEnvio}
                </MensagemRetorno>
            )}

            <CampoSelect
                id={`encerrar-usuario-${id}`}
                label="Quem está confirmando?"
                textoVazio="Escolha seu nome"
                opcoes={usuarios.map((usuario) => ({
                    valor: String(usuario.cdUsuario),
                    rotulo:
                        usuario.cdUsuario === interdicao.cdUsuarioAviso ? `${usuario.nmUsuario} (fez o aviso)` : usuario.nmUsuario,
                    desabilitada: usuario.cdUsuario === interdicao.cdUsuarioAviso,
                }))}
                register={register('cdUsuarioConfirma', {
                    required: 'Escolha quem está confirmando.',
                    validate: (valor) =>
                        Number(valor) !== interdicao.cdUsuarioAviso || 'Quem fez o aviso não pode confirmar a liberação.',
                })}
                erro={errors.cdUsuarioConfirma?.message}
            />

            <CampoTexto
                id={`encerrar-data-${id}`}
                label="Liberado em"
                type="date"
                min={inicio}
                max={hoje}
                register={register('dtEncerramento', {
                    required: 'Informe quando o trecho foi liberado.',
                    validate: (valor) => {
                        if (!dataValida(valor)) return 'Essa data não existe.';
                        if (valor < inicio) return `A liberação não pode ser antes do início (${formatarData(inicio)}).`;
                        if (valor > hoje) return 'A liberação não pode ser numa data futura.';
                        return true;
                    },
                })}
                erro={errors.dtEncerramento?.message}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
                <Botao type="submit" icone="check" carregando={isSubmitting}>
                    {isSubmitting ? 'Confirmando…' : 'Confirmar liberação'}
                </Botao>
                <Botao variante="secundario" onClick={aoCancelar}>
                    Cancelar
                </Botao>
            </div>
        </form>
    );
}
