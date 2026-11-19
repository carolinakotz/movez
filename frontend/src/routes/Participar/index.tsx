import { useState } from 'react';
import Botao from '../../components/Botao/Botao';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import EstadoRequisicao from '../../components/EstadoRequisicao/EstadoRequisicao';
import FormularioMorador from '../../components/FormularioMorador/FormularioMorador';
import MensagemRetorno from '../../components/MensagemRetorno/MensagemRetorno';
import Pagina from '../../components/Pagina/Pagina';
import { useFetch } from '../../hooks/useFetch';
import { cadastrarUsuarioNoPerfil, listarPerfis } from '../../services/perfis';
import type { Usuario, FormularioMoradorValores } from '../../types/usuario';
import { nomePerfil } from '../../utils/texto';

export default function Participar() {
    const { dados: perfis, carregando, erro, recarregar } = useFetch(listarPerfis);
    const [cadastrado, setCadastrado] = useState<Usuario | null>(null);

    async function cadastrar(valores: FormularioMoradorValores) {
        setCadastrado(null);
        const usuario = await cadastrarUsuarioNoPerfil(Number(valores.cdPerfil), {
            nmUsuario: valores.nmUsuario,
            dsEmail: valores.dsEmail,
        });
        setCadastrado(usuario);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Pagina titulo="Participar" estreita>
            <CabecalhoPagina
                titulo="Participe do MovEz"
                descricao="Cadastre-se como morador para avaliar trechos e avisar interdições. Pedimos só o essencial."
            />

            {cadastrado && (
                <div className="mb-6">
                    <MensagemRetorno tipo="sucesso" titulo={`Boas-vindas, ${cadastrado.nmUsuario.split(' ')[0]}!`} aoFechar={() => setCadastrado(null)}>
                        <p>
                            Seu cadastro como {nomePerfil(cadastrado.nmPerfil ?? perfis?.find((p) => p.cdPerfil === cadastrado.cdPerfil)?.nmPerfil).toLowerCase()} foi
                            criado. Agora você já aparece na lista de moradores ao avaliar um trecho.
                        </p>
                        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                            <Botao para="/trechos">Avaliar um trecho</Botao>
                            <Botao para="/avisos/novo" variante="secundario">
                                Avisar interdição
                            </Botao>
                        </div>
                    </MensagemRetorno>
                </div>
            )}

            {carregando && <EstadoRequisicao tipo="carregando" titulo="Carregando os perfis…" />}
            {erro && <EstadoRequisicao tipo="erro" titulo="Não conseguimos carregar os perfis" texto={erro.message} aoTentarNovamente={recarregar} />}
            {perfis && perfis.length === 0 && (
                <EstadoRequisicao tipo="vazio" titulo="Nenhum perfil disponível" texto="A equipe ainda não cadastrou os perfis de pedestre." />
            )}
            {perfis && perfis.length > 0 && (
                <div className="rounded-cartao border border-linha bg-white p-5 md:p-8">
                    <FormularioMorador perfis={perfis} aoEnviar={cadastrar} />
                </div>
            )}
        </Pagina>
    );
}
