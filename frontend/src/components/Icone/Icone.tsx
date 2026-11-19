// Ícones de traço de 2 px e cantos arredondados (guia de componentes do MovEz).
// Desenhados em SVG próprio para não depender de biblioteca externa.
const CAMINHOS = {
    sombra: 'M22 12a10 10 0 0 0-20 0Z M12 12v8a2 2 0 0 0 4 0 M12 2v1',
    iluminacao:
        'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5 M9 18h6 M10 22h4',
    calcada: 'M4 20 10 4 M20 20 14 4 M12 6v2 M12 12v2 M12 18v2',
    seguranca:
        'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    silencio: 'M11 5 6 9H2v6h4l5 4V5z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14',
    menu: 'M4 6h16 M4 12h16 M4 18h16',
    fechar: 'M18 6 6 18 M6 6l12 12',
    alerta: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z M12 9v4 M12 17h.01',
    check: 'M20 6 9 17l-5-5',
    'seta-esquerda': 'm12 19-7-7 7-7 M19 12H5',
    'seta-direita': 'M5 12h14 M12 5l7 7-7 7',
    pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    usuario: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    mais: 'M5 12h14 M12 5v14',
    lapis: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z',
    lixeira: 'M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2',
    info: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M12 16v-4 M12 8h.01',
    carregando: 'M21 12a9 9 0 1 1-6.219-8.56',
    vazio: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
    email: 'M22 7l-10 6L2 7 M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    github:
        'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2',
    linkedin:
        'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    regua: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z M14.5 12.5l2-2 M11.5 9.5l2-2 M8.5 6.5l2-2 M17.5 15.5l2-2',
    calendario: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    comentario: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
    busca: 'M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0 M21 21l-4.3-4.3',
    'chevron-baixo': 'm6 9 6 6 6-6',
    rota: 'M6 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15 M18 5m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
} as const;

export type NomeIcone = keyof typeof CAMINHOS;

type IconeProps = {
    nome: NomeIcone;
    className?: string;
    // Ícones decorativos ficam ocultos para leitores de tela; informe um título quando o ícone carregar sentido sozinho.
    titulo?: string;
};

export default function Icone({ nome, className = 'size-5', titulo }: IconeProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 ${nome === 'carregando' ? 'animate-spin' : ''} ${className}`}
            aria-hidden={titulo ? undefined : true}
            role={titulo ? 'img' : undefined}
        >
            {titulo && <title>{titulo}</title>}
            <path d={CAMINHOS[nome]} />
        </svg>
    );
}
