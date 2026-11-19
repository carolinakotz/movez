# MovEz: mapa de conforto das ruas

> **Global Solution 2026/2 · Front-End Design Engineering.** Aplicação **React + Vite + TypeScript** (SPA), estilizada com **Tailwind CSS**, integrada à API REST em Java desenvolvida na disciplina de Domain Driven Design Using Java.

<p align="center">
  <img src="./frontend/public/img/movez-logo.png" width="320" alt="Logotipo do MovEz" />
</p>

## 🎯 Objetivo

Os aplicativos de mapa mostram o caminho mais curto, mas não dizem se a calçada é esburacada, se a rua fica escura à noite ou se há sombra no meio da tarde. Para uma pessoa idosa, para quem empurra um carrinho de bebê ou para quem usa cadeira de rodas, esses detalhes decidem se dá para sair de casa a pé.

O **MovEz** é um mapa de conforto feito pelos próprios moradores. Ele junta duas informações:

- **Nota de conforto:** moradores avaliam cada trecho de rua de 1 a 5 em sombra, iluminação, calçada, segurança e silêncio. Mostra como o trecho *costuma ser*.
- **Aviso de interdição:** moradores avisam obras, alagamentos e bloqueios, com previsão de término e passagem alternativa. Mostra como o trecho *está hoje*.

Com o perfil de quem anda (idoso, carrinho de bebê, cadeirante ou pedestre), o MovEz ordena os trechos pelo que mais importa para cada pessoa e tira das rotas sugeridas tudo o que estiver interditado. Tema da Global Solution: **CitizenTech, cidades e comunidades**.

### ✨ Funcionalidades

- Mapa de conforto com os trechos ordenados por nota, **ponderada pelo perfil** escolhido (o perfil fica na URL: `/trechos?perfil=3`)
- Busca por rua ou bairro, sem diferenciar acentos
- Detalhe do trecho com nota por critério, nota para cada perfil, avaliações e histórico de interdições
- Cadastro, edição e exclusão de trechos (POST, PUT e DELETE)
- Avaliação de trechos com notas de 1 a 5 por critério (POST)
- Avisos de interdição com filtro por situação (ativos, liberados, todos)
- Publicação de aviso de interdição (POST) e **confirmação de liberação por outro morador** (PATCH)
- Cadastro de morador já vinculado ao perfil (POST na rota aninhada `/perfis/{id}/usuarios`)
- Carregando, erro de requisição e ausência de dados tratados em todas as telas que usam a API
- Formulários validados com React Hook Form, com mensagens de erro por campo e retorno da API
- Menu responsivo (hambúrguer) para celular e tablet, link "Pular para o conteúdo" e foco do teclado sempre visível

## ⚙️ Tecnologias

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" title="React" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" title="TypeScript" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" title="Vite" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind CSS" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" title="Java" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" title="Git" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" title="GitHub" width="40" height="40" />
</p>

| Tecnologia | Função no projeto |
|---|---|
| **React 19** | Interface em componentes reutilizáveis |
| **Vite** | Servidor de desenvolvimento e build |
| **TypeScript** | Tipagem de props, estados, formulários e respostas da API |
| **Tailwind CSS v4** | Estilização e responsividade, com os tokens da identidade visual em `@theme` |
| **React Router** | SPA com rotas estáticas e dinâmicas (`useParams`, `useSearchParams`, `useNavigate`) |
| **React Hook Form** | Validação dos formulários |
| **Fetch API** | Todas as requisições HTTP à API Java (**sem Axios**) |
| **oxlint** | Checagem de qualidade do código |
| **Vercel** | Publicação do front-end |
| **Render** | Publicação da API Java (Spring Boot) |

> Nenhuma biblioteca de componentes prontos (Bootstrap, Material UI) nem de requisição HTTP (Axios) foi usada. Os ícones são SVGs próprios, no componente `Icone`.

## 🎨 Identidade visual

| Token | Cor | Uso |
|---|---|---|
| Azul Noite | `#022256` | Texto, títulos, cabeçalho e rodapé |
| Verde Caminho | `#00BC86` | Botões e destaques, sempre com texto Azul Noite por cima |
| Verde Texto | `#007A57` | Links e textos verdes sobre fundo claro |
| Interditado | `#B42318` sobre `#FEE4E2` | Avisos de interdição, com listras e ícone |

Títulos em **Nunito** e texto em **Atkinson Hyperlegible** (fonte criada para baixa visão), com texto base de 18 px. A nota de conforto usa sempre **cor + número + palavra**, para ser lida sem depender da cor. Botões têm no mínimo 48 px de altura.

## 📁 Estrutura de pastas

```
movez/
├── backend/movez/                   # API REST em Java (Spring Boot)
└── frontend/                        # Aplicação React (este README descreve esta parte)
    ├── public/
    │   ├── favicon/                 # Ícone da aba
    │   └── img/                     # Logo e fotos da equipe
    ├── src/
    │   ├── main.tsx                 # Ponto de entrada e definição das rotas
    │   ├── App.tsx                  # Layout raiz (Cabeçalho + Outlet + Rodapé)
    │   ├── globals.css              # Tailwind, tokens da identidade visual e estilos base
    │   ├── components/              # Componentes reutilizáveis (um por pasta)
    │   │   ├── Botao/ Icone/ Logo/ Pagina/ CabecalhoPagina/
    │   │   ├── Cabecalho/ Rodape/                     # Layout e menu responsivo
    │   │   ├── CampoBase/ CampoTexto/ CampoTextarea/ CampoSelect/ SeletorNota/
    │   │   ├── EstadoRequisicao/ MensagemRetorno/     # Carregando, erro, vazio e feedback
    │   │   ├── SeloNota/ ListaCriterios/ ChipsPerfil/
    │   │   ├── CardTrecho/ CardAvaliacao/ CardInterdicao/ CardIntegrante/
    │   │   ├── FormularioTrecho/ FormularioAvaliacao/ FormularioInterdicao/
    │   │   ├── FormularioEncerramento/ FormularioMorador/ FormularioContato/
    │   │   ├── IlustracaoRota/ ItemFaq/
    │   ├── routes/                  # Páginas (uma pasta por rota)
    │   ├── services/                # Camada de integração com a API (Fetch)
    │   │   ├── api.ts               # URL base, fetch e tratamento de erros
    │   │   ├── trechos.ts  avaliacoes.ts  interdicoes.ts  usuarios.ts  perfis.ts
    │   ├── hooks/                   # useFetch, useEnvioFormulario, useAvisoNavegacao, useTituloPagina
    │   ├── types/                   # Interfaces TypeScript (espelham os DTOs Java)
    │   ├── utils/                   # Nota de conforto, datas, textos e formulários
    │   └── data/                    # Dados estáticos (integrantes, FAQ, menu)
    ├── .env.example                 # Modelo da variável VITE_API_URL
    ├── vercel.json                  # Redireciona todas as rotas para a SPA
    ├── index.html  package.json  vite.config.ts  tsconfig*.json  .oxlintrc.json
```

## 🗺️ Rotas

| Rota | Página | Tipo |
|---|---|---|
| `/` | Início, com os trechos mais confortáveis e o aviso ativo vindos da API | Estática |
| `/sobre` | Problema, solução, regras e pesos por perfil | Estática |
| `/integrantes` | Equipe | Estática |
| `/integrantes/:id` | Detalhe de um integrante | **Dinâmica** |
| `/faq` | Perguntas frequentes (acordeão) | Estática |
| `/contato` | Formulário de contato | Estática |
| `/trechos` | Mapa de conforto (GET) | Estática |
| `/trechos/novo` | Cadastro de trecho (POST) | Estática |
| `/trechos/:id` | Detalhe do trecho (GET), liberação (PATCH) e exclusão (DELETE) | **Dinâmica** |
| `/trechos/:id/editar` | Edição de trecho (GET + PUT) | **Dinâmica** |
| `/trechos/:id/avaliar` | Avaliação de trecho (POST) | **Dinâmica** |
| `/avisos` | Avisos de interdição (GET) e liberação (PATCH) | Estática |
| `/avisos/novo` | Novo aviso de interdição (POST) | Estática |
| `/participar` | Cadastro de morador (POST) | Estática |
| `*` | Página 404 | — |

## 🔌 API Java

**URL publicada:** https://api-rest-movez.onrender.com

| Método | Endpoint | Uso no front-end |
|---|---|---|
| GET | `/trechos`, `/trechos/{id}` | Mapa, detalhe e edição |
| GET | `/trechos/{id}/avaliacoes`, `/trechos/{id}/interdicoes` | Detalhe do trecho |
| GET | `/avaliacoes`, `/interdicoes` | Médias do mapa e página Avisos |
| GET | `/usuarios`, `/perfis` | Seleção de morador e de perfil |
| POST | `/trechos` | Cadastro de trecho |
| PUT | `/trechos/{id}` | Edição de trecho |
| DELETE | `/trechos/{id}` | Exclusão (a API recusa com 409 se houver avaliações ou interdições) |
| POST | `/trechos/{id}/avaliacoes` | Avaliação |
| POST | `/trechos/{id}/interdicoes` | Aviso de interdição (409 se o trecho já tiver um aviso ativo) |
| PATCH | `/interdicoes/{id}/encerrar` | Liberação confirmada por outro morador |
| POST | `/perfis/{id}/usuarios` | Cadastro de morador |

Exemplo de resposta de `GET /trechos/1`:

```json
{
  "cdTrecho": 1,
  "nmLogradouro": "Avenida Paulista, 1000 a 1400",
  "nmBairro": "Bela Vista",
  "nmCidade": "Sao Paulo",
  "vlExtensaoM": 400.0
}
```

Quando a API devolve erro, ela responde `{ timestamp, status, error, message, path, errosValidacao? }`. O front-end mostra `message` ao usuário e marca nos campos os erros de `errosValidacao`.

> A API usa o plano gratuito do Render. Depois de um tempo sem acessos, o primeiro carregamento pode levar até 1 minuto. A interface avisa isso enquanto carrega.

## 🚀 Como executar

### Links

| Item | Link |
|---|---|
| Repositório no GitHub | https://github.com/carolinakotz/movez |
| Aplicação na Vercel | PREECHER ⚠️ |
| API Java (Render) | https://api-rest-movez.onrender.com |
| Vídeo no YouTube | PREECHER ⚠️ |

### Instalação

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20.19+ ou 22.12+ (exigência do Vite 8) e npm.

```bash
# 1. Clone o repositório
git clone https://github.com/carolinakotz/movez.git

# 2. Entre na pasta do front-end
cd movez/frontend

# 3. Instale as dependências
npm install

# 4. Crie o arquivo de ambiente a partir do modelo
cp .env.example .env
# No Windows (cmd): copy .env.example .env

# 5. Rode em modo de desenvolvimento
npm run dev

# 6. Abra o endereço mostrado no terminal (padrão: http://localhost:5173)
```

O `.env.example` já aponta para a API publicada. Para usar a API rodando na sua máquina, troque `VITE_API_URL` por `http://localhost:8080` e reinicie o `npm run dev`. Sem o `.env`, a aplicação usa a API publicada.

Outros scripts:

```bash
npm run build     # Build de produção (tsc -b + vite build)
npm run preview   # Pré-visualiza a build
npm run lint      # oxlint
```

### Deploy na Vercel

Importe o repositório na Vercel e configure **Root Directory = `frontend`**. O framework Vite é detectado sozinho. Em *Environment Variables*, crie `VITE_API_URL = https://api-rest-movez.onrender.com`. O `vercel.json` faz as rotas da SPA (ex.: `/trechos/2`) abrirem direto, sem erro 404.

### Roteiro de uso

1. Em **Início**, escolha como você anda e clique em **Ver melhor caminho**.
2. No **Mapa de conforto**, troque o perfil para ver a ordem mudar e busque uma rua.
3. Em **Participar**, cadastre-se como morador.
4. Abra um trecho e use **Avaliar trecho** para dar suas notas.
5. Use **Avisar interdição** em um trecho e veja o aviso em **Avisos**.
6. Com outro morador, clique em **Já foi liberado** para encerrar o aviso.

## 👥 Integrantes

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
|:-:|---|---|---|---|---|
| <img src="https://github.com/carolinakotz.png" width="60"> | Carolina Kotz Rodrigues | 571876 | 1TDSPH | [carolinakotz](https://github.com/carolinakotz) | [carolina-kotz](https://www.linkedin.com/in/carolina-kotz/) |
| <img src="https://github.com/felipemotitsukitan.png" width="60"> | Felipe Motitsuki Tan | 570770 | 1TDSPH | [felipemotitsukitan](https://github.com/felipemotitsukitan) | [felipe-motitsuki-tan](https://www.linkedin.com/in/felipe-motitsuki-tan/) |
| <img src="https://github.com/gabefeitosa.png" width="60"> | Gabriel Feitosa de Lima | 573026 | 1TDSPH | [gabefeitosa](https://github.com/gabefeitosa) | [gabriel-feitosa-de-lima](https://www.linkedin.com/in/gabriel-feitosa-de-lima-915bb6267/) |
| <img src="https://github.com/Gabrieo367.png" width="60"> | João Gabriel Dantas Moura | 573101 | 1TDSPH | [Gabrieo367](https://github.com/Gabrieo367) | [joão-gabriel](https://www.linkedin.com/in/jo%C3%A3o-gabriel-059793310/) |
| <img src="https://github.com/Zayon101.png" width="60"> | Záyon Alves Marques | 571205 | 1TDSPH | [Zayon101](https://github.com/Zayon101) | [zayon-marques](https://www.linkedin.com/in/zayon-marques/) |

## 📬 Contato

Dúvidas ou sugestões: abra uma *issue* no [repositório](https://github.com/carolinakotz/movez/issues), use a página **Contato** da aplicação ou fale com a equipe pelos LinkedIns acima.
