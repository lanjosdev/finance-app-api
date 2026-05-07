# Finance App API

Este é o repositório da API do aplicativo de finanças (atualmente usado para estudos e em estágio inicial de desenvolvimento).

## 🚀 Tecnologias e Ferramentas

O projeto utiliza as seguintes tecnologias em seu ambiente:

- **[Node.js](https://nodejs.org/pt-br/)** (configurado com ES Modules `type: "module"`)
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

3. **Execute o projeto**
   Atualmente, o entrypoint do projeto é o `index.js`. Para testar a execução inicial:
   ```bash
   node index.js
   ```

## 📐 Padrões de Código (Linting & Formatação)

Com o uso do **Husky** juntamente ao **Lint-Staged**, cada vez que você tentar realizar um `git commit`, os arquivos modificados passarão por uma verificação automática pelo ESLint e formatação pelo Prettier, garantindo que nenhum código mal formatado entre no repositório.

## 📝 Licença

O projeto está sob a licença [ISC](https://opensource.org/licenses/ISC).
