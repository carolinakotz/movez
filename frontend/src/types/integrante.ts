export interface Integrante {
    id: string;
    nome: string;
    rm: string;
    turma: string;
    // Caminho da foto dentro de public/ (ex.: '/img/carolina.jpg'). Vazio mostra as iniciais.
    foto: string;
    // Links vazios não aparecem na página.
    github: string;
    linkedin: string;
}
