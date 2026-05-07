# Finance App API

Este é o repositório da API do aplicativo de finanças (atualmente usado para estudos e em estágio inicial de desenvolvimento).

## 🚀 Tecnologias e Ferramentas

O projeto utiliza as seguintes tecnologias em seu ambiente:

- **[Node.js](https://nodejs.org/pt-br/)** (configurado com ES Modules `type: "module"`)
- **[Express](https://expressjs.com/)** para o roteamento e criação da API REST
- **[PostgreSQL](https://www.postgresql.org/)** (`pg`) como banco de dados relacional
- **[dotenv](https://github.com/motdotla/dotenv)** para gerenciamento de variáveis de ambiente
- **[ESLint](https://eslint.org/)** para padronização de código
- **[Prettier](https://prettier.io/)** para formatação do código
- **[Husky](https://typicode.github.io/husky/)** para Git Hooks
- **[Lint-Staged](https://github.com/lint-staged/lint-staged)** para executar linting apenas nos arquivos que estão no *stage* do Git antes do commit

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
   PGUSER=seu_usuario
   PGHOST=localhost
   PGPASSWORD=sua_senha
   PGDATABASE=seu_banco
   PGPORT=5432
   ```

4. **Execute o projeto**
   Atualmente, o entrypoint do projeto é o `src/index.js`. Para testar a execução inicial:
   ```bash
   node src/index.js
   ```

## 📐 Padrões de Código (Linting & Formatação)

Com o uso do **Husky** juntamente ao **Lint-Staged**, cada vez que você tentar realizar um `git commit`, os arquivos modificados passarão por uma verificação automática pelo ESLint e formatação pelo Prettier, garantindo que nenhum código mal formatado entre no repositório.

## 📝 Licença

O projeto está sob a licença [ISC](https://opensource.org/licenses/ISC).
