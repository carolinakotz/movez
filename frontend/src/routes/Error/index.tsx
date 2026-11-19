import { isRouteErrorResponse, useRouteError } from 'react-router';
import Botao from '../../components/Botao/Botao';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Icone from '../../components/Icone/Icone';
import Pagina from '../../components/Pagina/Pagina';
import Rodape from '../../components/Rodape/Rodape';

// Página exibida para rotas inexistentes (404) ou erros inesperados de navegação.
export default function PaginaErro() {
    const erro = useRouteError();
    const naoEncontrada = isRouteErrorResponse(erro) && erro.status === 404;

    return (
        <>
            <Cabecalho />
            <Pagina titulo={naoEncontrada ? 'Página não encontrada' : 'Algo deu errado'} estreita>
                <div className="flex flex-col items-center py-10 text-center md:py-16">
                    <span className="grid size-20 place-items-center rounded-full bg-atencao-fundo text-atencao">
                        <Icone nome={naoEncontrada ? 'pin' : 'alerta'} className="size-10" />
                    </span>
                    <p className="mt-6 font-display text-6xl font-black text-azul-noite">{naoEncontrada ? '404' : 'Ops'}</p>
                    <h1 className="mt-2 text-[2rem] leading-tight font-extrabold">
                        {naoEncontrada ? 'Esse caminho não existe' : 'Algo deu errado nesta página'}
                    </h1>
                    <p className="mt-3 max-w-[50ch] text-lg text-ardosia">
                        {naoEncontrada
                            ? 'O endereço pode ter sido digitado errado ou a página mudou de lugar. Volte ao início ou vá direto para o mapa.'
                            : 'Recarregue a página. Se o problema continuar, conte para a equipe pela página Contato.'}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Botao para="/">Voltar ao início</Botao>
                        <Botao para="/trechos" variante="secundario">
                            Ver mapa de conforto
                        </Botao>
                    </div>
                </div>
            </Pagina>
            <Rodape />
        </>
    );
}
