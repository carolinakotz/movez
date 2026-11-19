import type { PerguntaFaq } from '../types/faq';

export const perguntasFaq: PerguntaFaq[] = [
    {
        id: 'o-que-e',
        pergunta: 'O que é o MovEz?',
        resposta:
            'É um mapa de conforto das ruas feito pelos próprios moradores. Cada trecho recebe notas de sombra, iluminação, calçada, segurança e silêncio, e quem anda por ali pode avisar quando o trecho está interditado por obra, alagamento ou bloqueio.',
    },
    {
        id: 'nota',
        pergunta: 'Como a nota de conforto é calculada?',
        resposta:
            'Cada avaliação dá notas de 1 a 5 aos cinco critérios. O MovEz tira a média de cada critério e depois uma média geral. Quando você escolhe como anda, os critérios que mais importam para você ganham mais peso: para quem usa cadeira de rodas, por exemplo, a calçada pesa quatro vezes mais que o silêncio.',
    },
    {
        id: 'silencio',
        pergunta: 'No silêncio, 5 é barulhento ou silencioso?',
        resposta: 'Silencioso. Em todos os critérios, 5 é sempre a melhor experiência para quem caminha.',
    },
    {
        id: 'perfil',
        pergunta: 'Para que serve escolher um perfil?',
        resposta:
            'Uma rua boa para um pedestre apressado pode ser ruim para quem empurra um carrinho de bebê. O perfil reordena o mapa de conforto pelo que importa para o seu jeito de andar: idoso, carrinho de bebê, cadeirante ou pedestre.',
    },
    {
        id: 'avaliar',
        pergunta: 'Preciso de cadastro para avaliar um trecho?',
        resposta:
            'Sim. Cada avaliação fica ligada a um morador, para que a comunidade saiba de onde vem a informação. O cadastro pede só nome, e-mail e perfil, na página Participar.',
    },
    {
        id: 'interdicao',
        pergunta: 'Posso avisar duas vezes a mesma interdição?',
        resposta:
            'Não. Cada trecho tem no máximo um aviso ativo por vez. Se o trecho já estiver interditado, o aviso aparece na página do trecho e na página Avisos.',
    },
    {
        id: 'liberado',
        pergunta: 'Quem pode dizer que um trecho foi liberado?',
        resposta:
            'Qualquer morador cadastrado, menos quem fez o aviso. Essa confirmação por outra pessoa evita que um aviso seja encerrado por engano.',
    },
    {
        id: 'lento',
        pergunta: 'Por que a primeira página demora para carregar?',
        resposta:
            'A API do MovEz roda em um servidor gratuito que “dorme” quando fica sem acessos. No primeiro carregamento ele pode levar até um minuto para acordar. Depois disso, as páginas abrem normalmente.',
    },
];
