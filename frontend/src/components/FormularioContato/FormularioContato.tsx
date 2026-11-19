import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { FormularioContatoValores } from '../../types/contato';
import Botao from '../Botao/Botao';
import CampoSelect from '../CampoSelect/CampoSelect';
import CampoTextarea from '../CampoTextarea/CampoTextarea';
import CampoTexto from '../CampoTexto/CampoTexto';
import MensagemRetorno from '../MensagemRetorno/MensagemRetorno';

const ASSUNTOS = [
    { valor: 'duvida', rotulo: 'Dúvida sobre o MovEz' },
    { valor: 'sugestao', rotulo: 'Sugestão de melhoria' },
    { valor: 'parceria', rotulo: 'Parceria com o bairro ou a prefeitura' },
    { valor: 'problema', rotulo: 'Algo não funcionou' },
];

const removerEspacos = (valor: string) => valor.trim();

// A API Java não tem endpoint de contato: o envio é simulado e a mensagem não é guardada.
function simularEnvio(): Promise<void> {
    return new Promise((resolver) => setTimeout(resolver, 900));
}

export default function FormularioContato() {
    const [enviado, setEnviado] = useState<string | null>(null);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormularioContatoValores>({ defaultValues: { nome: '', email: '', assunto: '', mensagem: '' } });

    const mensagem = useWatch({ control, name: 'mensagem' }) ?? '';

    async function enviar(valores: FormularioContatoValores) {
        await simularEnvio();
        setEnviado(valores.nome.split(' ')[0]);
        reset();
    }

    return (
        <form noValidate onSubmit={handleSubmit(enviar)} className="flex flex-col gap-6">
            {enviado && (
                <MensagemRetorno tipo="sucesso" titulo={`Obrigado, ${enviado}!`} aoFechar={() => setEnviado(null)}>
                    Recebemos sua mensagem. A equipe responde pelo e-mail informado.
                </MensagemRetorno>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <CampoTexto
                    id="contato-nome"
                    label="Nome"
                    autoComplete="name"
                    register={register('nome', {
                        setValueAs: removerEspacos,
                        required: 'Informe seu nome.',
                        minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
                    })}
                    erro={errors.nome?.message}
                />
                <CampoTexto
                    id="contato-email"
                    label="E-mail"
                    type="email"
                    autoComplete="email"
                    register={register('email', {
                        setValueAs: removerEspacos,
                        required: 'Informe seu e-mail para receber a resposta.',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Esse e-mail parece incompleto. Ex.: nome@email.com' },
                    })}
                    erro={errors.email?.message}
                />
            </div>

            <CampoSelect
                id="contato-assunto"
                label="Assunto"
                textoVazio="Escolha o assunto"
                opcoes={ASSUNTOS}
                register={register('assunto', { required: 'Escolha o assunto.' })}
                erro={errors.assunto?.message}
            />

            <CampoTextarea
                id="contato-mensagem"
                label="Mensagem"
                linhas={5}
                limite={500}
                totalDigitado={mensagem.length}
                register={register('mensagem', {
                    setValueAs: removerEspacos,
                    required: 'Escreva sua mensagem.',
                    minLength: { value: 10, message: 'Conte um pouco mais: use pelo menos 10 caracteres.' },
                    maxLength: { value: 500, message: 'Use no máximo 500 caracteres.' },
                })}
                erro={errors.mensagem?.message}
            />

            <div>
                <Botao type="submit" icone="email" carregando={isSubmitting} larguraTotal className="md:w-auto">
                    {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
                </Botao>
            </div>
        </form>
    );
}
