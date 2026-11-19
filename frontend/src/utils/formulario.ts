// Classes do controle (input, select, textarea), com estado de erro.
export function classesControle(erro?: string): string {
    return `w-full min-h-12 rounded-campo border-2 px-4 py-2.5 text-lg text-tinta outline-none transition-colors placeholder:text-ardosia/80 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-azul-noite ${
        erro ? 'border-interditado bg-interditado-fundo' : 'border-azul-noite/70 bg-white hover:border-azul-noite'
    }`;
}

export function idsDescricao(id: string, ajuda?: string, erro?: string): string | undefined {
    if (erro) return `erro-${id}`;
    if (ajuda) return `ajuda-${id}`;
    return undefined;
}
