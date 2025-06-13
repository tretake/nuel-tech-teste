# API + Frontend de Gerenciamento de Produtos

Aplicação full stack para gerenciamento de produtos, com autenticação JWT, backend em Node.js + Express + Prisma e frontend em Angular. Permite cadastro/login de usuários e CRUD de produtos protegidos por autenticação.

### 📚 Índice

- [ Tecnologias Utilizadas](#tecnologias-utilizadas)
- [ Autenticação](#autenticacao-jwt)
- [ Rotas da API](#rotas-da-api)
- [ Como rodar o projeto](#como-rodar-o-projeto)
- [ Rodando os testes](#rodando-os-testes)

## Tecnologias Utilizadas

- **Node.js + Express**
- **Prisma**
- **MySQL**
- **JSON Web Token (JWT)**
- **Zod (validações de entrada)**
- **Bcrypt (hash de senhas)**
- **Dotenv (variáveis de ambiente)**
- **Jest e Supertest (testes unitarios backend)**
- **Angular**

## Autenticação JWT

Após o cadastro ou login, o backend retorna um token JWT que deve ser enviado no cabeçalho das requisições protegidas:

```
Authorization: Bearer <token>
```

# Rotas da API

## criar usuarios e gerar tokens(log in):

### 🔸post-users [POST /users]

Cria um novo usuário.

Body:

    {
      "email": "usuario@email.com",
      "password": "senha123"
    }

Response:

    {
      "user": {
        "id": 1,
        "email": "usuario@email.com"
      },
      "token": "JWT_TOKEN"
    }

### 🔸[POST /sessions]

Login de usuário (cria uma sessão).

Body:

    {
      "email": "usuario@email.com",
      "password": "senha123"
    }

Response:

    {
      "user": {
        "id": 1,
        "email": "usuario@email.com"
      },
      "token": "JWT_TOKEN"
    }

## Produtos:

### 🔸 [GET /products]

Retorna todos os produtos.
Requer token JWT no header.

Headers:

    Authorization: Bearer [access_token]

Response:

    [
      {
          "id": 2,
          "name": "caneca",
          "description": "caneca com estampa",
          "price": 10.99,
          "category": "kitchen",
          "stock": 300
      },
      {
          "name": "Camiseta",
          "description": "Produto de algodão",
          "price": 29.9,
          "category": "Roupas",
          "stock": 10
      },
      ...
    ]

### 🔸 [POST /products]

Cria um novo produto. Requer token JWT no header.

Body:

    {
      "name": "Camiseta",
      "description": "Produto de algodão",
      "price": 29.9,
      "category": "Roupas",
      "stock": 10
    }

### 🔸 PUT /products/:id

Atualiza um produto. Requer token JWT no header.

Body:

    {
      "name": "Camiseta",
      "description": "Produto de algodão",
      "price": 29.9,
      "category": "Roupas",
      "stock": 10
    }

### 🔸 DELETE /products/:id

Deleta um produto. Requer token JWT no header.

# como rodar o projeto:

### 1. Clone o repositório

```bash
  git clone https://github.com/tretake/nuel-tech-teste.git
```

### 2. backend

```bash
  cd backend
  npm install
```

Crie um banco de dados MYSQL local

Crie um arquivo .env para suas variáveis de ambiente na pasta backend com o seguinte conteúdo:

```
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/BD_NOME"
JWT_SECRET=uma_chave_secreta_para_jwt
```

Execute as migrações do Prisma e popule o banco de dados

```bash
  npx prisma migrate dev
  node seed.js
```

inicie o servidor

```bash
  node index.js
```

### 3. frontend

em outro terminal:

```bash
  cd frontend
  npm install
  ng serve
```

Acesse em `http://localhost:4200`

# Rodando os testes

### backend:

```bash
  cd backend
  npx jest
```

## frontend:

```bash
  cd frontend
  ng test
```
