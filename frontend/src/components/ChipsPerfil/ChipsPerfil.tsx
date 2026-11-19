import type { Perfil } from '../../types/perfil';
import { nomePerfil } from '../../utils/texto';
import Icone from '../Icone/Icone';

type ChipsPerfilProps = {
    perfis: Perfil[];
    selecionado: number | null;
    aoSelecionar: (cdPerfil: number | null) => void;
    titulo?: string;
    mostrarTodos?: boolean;
};

// "Como você anda?": escolhe o perfil que pondera a nota de conforto dos trechos.
export default function ChipsPerfil({
    perfis,
    selecionado,
    aoSelecionar,
    titulo = 'Como você anda?',
    mostrarTodos = true,
}: ChipsPerfilProps) {
    const opcoes = [
        ...(mostrarTodos ? [{ id: null as number | null, rotulo: 'Sem preferência' }] : []),
        ...perfis.map((perfil) => ({ id: perfil.cdPerfil as number | null, rotulo: nomePerfil(perfil.nmPerfil) })),
    ];

    return (
        <div role="group" aria-labelledby="titulo-perfis">
            <p id="titulo-perfis" className="mb-3 font-bold text-azul-noite">
                {titulo}
            </p>
            <div className="flex flex-wrap gap-2">
                {opcoes.map((opcao) => {
                    const ativo = opcao.id === selecionado;
                    return (
                        <button
                            key={opcao.id ?? 'todos'}
                            type="button"
                            aria-pressed={ativo}
                            onClick={() => aoSelecionar(opcao.id)}
                            className={`inline-flex min-h-12 items-center gap-1.5 rounded-full border-2 px-5 font-display font-extrabold transition-colors ${
                                ativo
                                    ? 'border-azul-noite bg-azul-noite text-white'
                                    : 'border-linha bg-white text-azul-noite hover:border-azul-noite'
                            }`}
                        >
                            {ativo && <Icone nome="check" className="size-4" />}
                            {opcao.rotulo}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
