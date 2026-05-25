# Finance App API

Este é o repositório da API do aplicativo de finanças (atualmente usado para estudos e em estágio inicial de desenvolvimento).

## 🚀 Tecnologias e Ferramentas

O projeto utiliza as seguintes tecnologias em seu ambiente:

-   **[Node.js](https://nodejs.org/pt-br/)** (configurado com ES Modules `type: "module"`)
-   **[Express](https://expressjs.com/)** para o roteamento e criação da API REST
-   **[PostgreSQL](https://www.postgresql.org/)** (`pg`) como banco de dados relacional
-   **[dotenv](https://github.com/motdotla/dotenv)** para gerenciamento de variáveis de ambiente
-   **[ESLint](https://eslint.org/)** para padronização de código
-   **[Prettier](https://prettier.io/)** para formatação do código
-   **[Husky](https://typicode.github.io/husky/)** para Git Hooks
-   **[Lint-Staged](https://github.com/lint-staged/lint-staged)** para executar linting apenas nos arquivos que estão no _stage_ do Git antes do commit

## 🔧 Como instalar e executar

Siga os passos abaixo para clonar e rodar o projeto localmente:

1. **Clone o repositório**

    ```bash
    git clone <url-do-repositorio>
    cd finance-app-api
    ```

2. **Instale as dependências**
   Este comando instalará todas as bibliotecas necessárias e, através do script `postinstall`, configurará automaticamente os hooks do Husky e do lint-staged.

    ```bash
    npm install
    ```

3. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto contendo as credenciais de banco de dados e porta da aplicação, por exemplo:

    ```env
    PORT=3000
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB=seu_banco
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    ```

4. **Executando as Migrations**
   Antes de rodar a aplicação, execute as migrations para criar as tabelas necessárias:

    ```bash
    npm run migrations
    ```

5. **Execute o projeto**
   Para executar em ambiente de desenvolvimento (com autoreload usando a flag `--watch` nativa):

    ```bash
    npm run dev
    ```

    Para executar normalmente via entrypoint:

    ```bash
    npm start
    ```

## 🏗️ Estrutura e Arquitetura

O projeto adota uma arquitetura em camadas para isolar responsabilidades, simplificar a manutenção e facilitar a testabilidade. O fluxo típico de uma requisição percorre as seguintes camadas:

-   **Controllers** (`src/controllers`): Porta de entrada das requisições HTTP do Express. Validam os dados de entrada (`body`, `params`) e chamam o respectivo _Use Case_, formatando as respostas de sucesso ou erro (com o auxílio dos Helpers).
-   **Use Cases** (`src/use-cases`): Contêm as regras de negócio intrínsecas da aplicação. Orquestram a lógica e chamam as interfaces dos repositórios sem conhecer detalhes de banco de dados.
-   **Repositories** (`src/respositories`): Camada de acesso direto ao banco de dados. Isolam e lidam exclusivamente com as queries SQL e os recursos do PostgreSQL interagindo com os _Use Cases_.
-   **Database** (`src/db`): Contém scripts de _migrations_ e _helpers_ com a conectividade limpa e gerenciada (pool connections) voltadas para acesso pela aplicação.
-   **Helpers** (`src/controllers/helpers` ou em outras pastas): Reúnem funções utilitárias que estendem as camadas (ex.: retornos padronizados de status HTTP).

## 📐 Padrões de Código (Linting & Formatação)

Com o uso do **Husky** juntamente ao **Lint-Staged**, cada vez que você tentar realizar um `git commit`, os arquivos modificados passarão por uma verificação automática pelo ESLint e formatação pelo Prettier, garantindo que nenhum código mal formatado entre no repositório.

## 📝 Licença

O projeto está sob a licença [ISC](https://opensource.org/licenses/ISC).
