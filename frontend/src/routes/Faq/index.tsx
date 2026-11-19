import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import ItemFaq from '../../components/ItemFaq/ItemFaq';
import Pagina from '../../components/Pagina/Pagina';
import { perguntasFaq } from '../../data/faq';

export default function Faq() {
    return (
        <Pagina titulo="Perguntas frequentes" estreita>
            <CabecalhoPagina titulo="Perguntas frequentes" descricao="O que mais perguntam sobre notas, perfis e avisos de interdição." />

            <div className="flex flex-col gap-3">
                {perguntasFaq.map((item, indice) => (
                    <ItemFaq key={item.id} item={item} abertoInicialmente={indice === 0} />
                ))}
            </div>

            <div className="mt-10 rounded-cartao bg-azul-50 p-6">
                <h2 className="text-xl font-extrabold">Não achou sua resposta?</h2>
                <p className="mt-1">Mande sua pergunta para a equipe. Respondemos pelo e-mail.</p>
                <Botao para="/contato" variante="secundario" className="mt-4">
                    Falar com a equipe
                </Botao>
            </div>
        </Pagina>
    );
}
