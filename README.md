
# Projeto Feira Solidária 🤝
## 📖 Sobre o Projeto

A **Feira Solidária** é uma plataforma full-stack desenvolvida como projeto final da imersão **Escola Atlântico Avanti Capacita Brasil**. O objetivo da aplicação é criar uma ponte entre doadores e receptores de itens, otimizando o processo de doação para que seja mais transparente, eficiente e rastreável.

A plataforma resolve um problema comum em grupos de doação: a falta de atualização sobre a disponibilidade dos itens. Com nosso sistema, um doador pode gerenciar o status de suas doações, marcando-as como "Disponível", "Reservada" ou "Entregue", garantindo que os usuários interessados tenham informações precisas e em tempo real.

## ✨ Funcionalidades Principais

* **Autenticação de Usuários:** Cadastro e Login seguros com uso de tokens JWT.
* **Gerenciamento de Doações (CRUD):** Usuários autenticados podem criar, listar, editar e deletar suas próprias doações.
* **Sistema de Status:** Controle total sobre o ciclo de vida da doação (`Disponível`, `Reservada`, `Entregue`, `Cancelada`) para manter a plataforma atualizada.
* **Histórico de Doações:** O sistema registra tanto o doador quanto o receptor de cada item, permitindo que os usuários acompanhem seu impacto e histórico na plataforma.
* **Filtro por Categoria:** As doações são organizadas por categorias, facilitando a busca por itens específicos.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

| Ferramenta | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução do back-end. |
| **Express** | Framework para construção da API RESTful. |
| **Prisma** | ORM para interação com o banco de dados. |
| **PostgreSQL** | Banco de dados relacional para armazenamento dos dados. |
| **JWT** | Geração de tokens para autenticação e proteção de rotas. |
| **Bcrypt.js** | Biblioteca para criptografia de senhas. |
| **React** | Biblioteca front-end para a interface do usuário. |
| **Axios** | Cliente HTTP para a comunicação entre front-end e back-end. |

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o back-end da aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando.
* Um gerenciador de pacotes como [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/).

### Passos para a Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/feira-solidaria.git](https://github.com/seu-usuario/feira-solidaria.git)
    ```

2.  **Navegue até a pasta do back-end:**
    ```bash
    cd feira-solidaria/backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env_example` para `.env`.
    * Abra o arquivo `.env` e preencha com as suas credenciais do banco de dados e uma chave secreta para o JWT.
    ```env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/SUA_DATABASE"
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_SECRETA"
    ```

5.  **Aplique as migrations do Prisma:**
    * Este comando irá criar as tabelas no seu banco de dados com base no `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

🎉 Pronto! O servidor back-end estará rodando em `http://localhost:3001` (ou na porta que você configurar).

## 👥 Equipe e Agradecimentos

Este projeto foi desenvolvido com a colaboração e dedicação de uma equipe incrível. Minha profunda gratidão a:

* **Gabriel Lima**
* **João Alison**
* **Lara Arruda**

Um agradecimento especial aos nossos mentores, que foram fundamentais para o sucesso do projeto:

* **Luiz Carlos** (Facilitador do Projeto)
* **Fernanda Nascimento** (Professora)

---


