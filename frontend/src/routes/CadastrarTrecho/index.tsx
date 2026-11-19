import { useNavigate } from 'react-router';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import FormularioTrecho from '../../components/FormularioTrecho/FormularioTrecho';
import Pagina from '../../components/Pagina/Pagina';
import { cadastrarTrecho } from '../../services/trechos';
import type { DadosTrecho } from '../../types/trecho';

export default function CadastrarTrecho() {
    const navigate = useNavigate();

    async function salvar(dados: DadosTrecho) {
        const criado = await cadastrarTrecho(dados);
        navigate(`/trechos/${criado.cdTrecho}`, {
            state: { aviso: { tipo: 'sucesso', mensagem: 'Trecho cadastrado! Agora ele pode receber avaliações.' } },
        });
    }

    return (
        <Pagina titulo="Cadastrar trecho" estreita>
            <CabecalhoPagina
                titulo="Cadastrar trecho"
                descricao="Um trecho é um pedaço de rua entre duas numerações, como um quarteirão. Depois de cadastrado, os moradores podem avaliá-lo."
                voltar={{ para: '/trechos', rotulo: 'Voltar ao mapa de conforto' }}
            />
            <div className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                <FormularioTrecho modo="cadastro" aoEnviar={salvar} />
            </div>
        </Pagina>
    );
}
