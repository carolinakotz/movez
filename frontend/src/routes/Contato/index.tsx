import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import FormularioContato from '../../components/FormularioContato/FormularioContato';
import Icone from '../../components/Icone/Icone';
import Pagina from '../../components/Pagina/Pagina';

export default function Contato() {
    return (
        <Pagina titulo="Contato">
            <CabecalhoPagina
                titulo="Fale com a equipe"
                descricao="Dúvidas, sugestões ou uma rua que precisa de atenção? Escreva para a gente."
            />

            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                <section aria-label="Formulário de contato" className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                    <FormularioContato />
                </section>

                <aside className="flex h-fit flex-col gap-5 rounded-cartao bg-azul-50 p-6 md:p-7">
                    <h2 className="text-2xl font-extrabold">Outros caminhos</h2>
                    <div className="flex gap-3">
                        <Icone nome="github" className="mt-1 size-6 text-azul-600" />
                        <div>
                            <p className="font-bold text-azul-noite">Código no GitHub</p>
                            <a
                                href="https://github.com/carolinakotz/movez"
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-azul-600 underline underline-offset-4 hover:text-verde-texto"
                            >
                                github.com/carolinakotz/movez
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Icone nome="alerta" className="mt-1 size-6 text-azul-600" />
                        <div>
                            <p className="font-bold text-azul-noite">Viu uma obra ou alagamento?</p>
                            <p>Não precisa escrever para a gente: publique um aviso de interdição na página Avisos.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Icone nome="info" className="mt-1 size-6 text-azul-600" />
                        <div>
                            <p className="font-bold text-azul-noite">Projeto acadêmico</p>
                            <p>Global Solution 2026/2 da FIAP, turma 1TDSPH.</p>
                        </div>
                    </div>
                </aside>
            </div>
        </Pagina>
    );
}
