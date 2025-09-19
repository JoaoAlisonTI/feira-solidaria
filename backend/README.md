# Backend do feira solidária

---


## Inicializando o Backend

Siga os passos abaixo para rodar o backend localmente:

### 1️⃣ Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <PASTA_DO_BACKEND>
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

* Crie um arquivo `.env` na raiz do projeto.
* Exemplo de conteúdo (substitua pelos valores reais do seu banco e secret do JWT):

```env
DATABASE_URL="postgresql://usuario:senha@host:porta/nome_db"
JWT_SECRET="sua_chave_secreta"
PORT=3001
```

### 4️⃣ Gerar Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Aplicar migrations no banco

```bash
npx prisma migrate dev --name init
```

### 6️⃣ Rodar o backend

```bash
npm run dev
```

* O servidor estará rodando em: `http://localhost:3001`
* Todas as rotas têm o prefixo `/api` (ex: `http://localhost:3001/api/usuarios`)

---

💡 **Dicas extras:**

* Sempre que alterar o `schema.prisma`, rode novamente `npx prisma generate` e `npx prisma migrate dev --name <nome>`.
* Para testar rotas protegidas, use o **token JWT** retornado no login.

---

## Usuários

### 1️⃣ Criar usuário (Cadastro)

**Endpoint:** `POST /api/usuarios`
**Descrição:** Cria um novo usuário.
**Body (JSON):**

```json
{
  "nome": "João",
  "email": "joao@teste.com",
  "senha": "123456",
  "telefone": "123456789"
}
```

**Resposta de sucesso (201):**

```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@teste.com"
}
```

---

### 2️⃣ Login

**Endpoint:** `POST /api/usuarios/login`
**Descrição:** Faz login e retorna um token JWT para rotas protegidas.
**Body (JSON):**

```json
{
  "email": "joao@teste.com",
  "senha": "123456"
}
```

**Resposta de sucesso (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3️⃣ Usando o token JWT

Para acessar **rotas protegidas**, envie o token no header `Authorization`:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

**Exemplo com `curl`:**

```bash
curl -X POST http://localhost:3001/api/categorias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"nome":"Alimentos"}'
```

---