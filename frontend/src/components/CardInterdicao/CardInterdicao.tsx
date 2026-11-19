import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { Interdicao } from '../../types/interdicao';
import { formatarData } from '../../utils/datas';
import { nomeTipoInterdicao } from '../../utils/texto';
import Icone from '../Icone/Icone';

type CardInterdicaoProps = {
    interdicao: Interdicao;
    nomeTrecho?: string;
    nomeQuemAvisou?: string;
    nomeQuemConfirmou?: string;
    mostrarLinkTrecho?: boolean;
    children?: ReactNode;
};

// Aviso de interdição: vermelho + listras + ícone quando ativo; verde "Liberado" quando encerrado.
export default function CardInterdicao({
    interdicao,
    nomeTrecho,
    nomeQuemAvisou,
    nomeQuemConfirmou,
    mostrarLinkTrecho = true,
    children,
}: CardInterdicaoProps) {
    const ativa = interdicao.stInterdicao === 'ATIVA';
    const tipo = nomeTipoInterdicao(interdicao.tpInterdicao);
    const titulo = nomeTrecho ? `${tipo} na ${nomeTrecho}` : tipo;

    return (
        <article
            id={`aviso-${interdicao.cdInterdicao}`}
            className={`flex flex-col gap-4 rounded-cartao border-2 p-5 md:p-6 ${
                ativa ? 'listras-interdicao border-interditado' : 'border-verde-texto/40 bg-verde-50'
            }`}
        >
            <p className={`inline-flex items-center gap-2 font-bold ${ativa ? 'text-interditado' : 'text-verde-texto'}`}>
                <Icone nome={ativa ? 'alerta' : 'check'} />
                {ativa ? 'Trecho interditado' : 'Acesso liberado'}
            </p>

            <h3 className="text-xl leading-snug font-extrabold md:text-2xl">{titulo}</h3>
            <p className="text-tinta">{interdicao.dsInterdicao}</p>

            <dl className="grid gap-x-6 gap-y-1 text-base sm:grid-cols-2">
                <div>
                    <dt className="inline font-bold text-azul-noite">Início: </dt>
                    <dd className="inline">{formatarData(interdicao.dtInicio)}</dd>
                </div>
                <div>
                    <dt className="inline font-bold text-azul-noite">{ativa ? 'Previsão de término: ' : 'Liberado em: '}</dt>
                    <dd className="inline">{formatarData(ativa ? interdicao.dtPrevisaoFim : interdicao.dtEncerramento)}</dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="inline font-bold text-azul-noite">Passagem alternativa: </dt>
                    <dd className="inline">{interdicao.dsPassagemAlternativa || 'não informada'}</dd>
                </div>
                {nomeQuemAvisou && (
                    <div>
                        <dt className="inline font-bold text-azul-noite">Avisado por: </dt>
                        <dd className="inline">{nomeQuemAvisou}</dd>
                    </div>
                )}
                {!ativa && nomeQuemConfirmou && (
                    <div>
                        <dt className="inline font-bold text-azul-noite">Confirmado por: </dt>
                        <dd className="inline">{nomeQuemConfirmou}</dd>
                    </div>
                )}
            </dl>

            {ativa && (
                <p className="text-sm text-interditado">Este trecho sai das rotas sugeridas enquanto o aviso estiver ativo.</p>
            )}

            {(children || mostrarLinkTrecho) && (
                <div className="flex flex-col gap-4">
                    {mostrarLinkTrecho && (
                        <Link
                            to={`/trechos/${interdicao.cdTrecho}`}
                            className="inline-flex min-h-12 w-fit items-center gap-2 font-bold text-azul-noite underline underline-offset-4 hover:text-verde-texto"
                        >
                            Ver o trecho
                            <Icone nome="seta-direita" className="size-4" />
                        </Link>
                    )}
                    {children}
                </div>
            )}
        </article>
    );
}
