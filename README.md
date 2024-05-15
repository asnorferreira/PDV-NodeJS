# Documentação do código - PDV

---

![Languages used](https://img.shields.io/github/languages/count/asnorferreira/desafio-backend-modulo-05-sistema-pdv-dds-t14-dbe-t05?style=flat-square)
![Repository size](https://img.shields.io/github/repo-size/asnorferreira/desafio-backend-modulo-05-sistema-pdv-dds-t14-dbe-t05?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/asnorferreira/desafio-backend-modulo-05-sistema-pdv-dds-t14-dbe-t05?style=flat-square)

## Introdução

Este documento descreve os requisitos, endpoints e demais informações necessárias para o desenvolvimento de uma API para um PDV (Ponto de Venda) como parte do Desafio do Módulo 5 - Backend.

### Equipe 8: Error 404: Team Name Not Found

## Objetivo

O objetivo deste projeto é criar uma API para um PDV (Frente de Caixa), que será o piloto para futuras implementações. A API permitirá a gestão de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação de PDV.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Insomnia
- PostgreSQL
- ElephantSQL (hospedagem do banco de dados)
- Biblioteca para gestão de status codes HTTP (por exemplo: `http-status-codes`)

## Como rodar o projeto

Para rodar o projeto localmente, você precisara de:

- Instalar as dependências do backend

```shell
npm install
```

- Rodar o projeto com:

```shell=
npm run start
npm run dev
```

---

## Contribuindo

Este repositório utiliza [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), portanto, se você deseja contribuir:

- Clone o repositório em sua máquina local
  - git clone https://github.com/asnorferreira/desafio-backend-modulo-05-sistema-pdv-dds-t14-dbe-t05.git
- Crie um branch a partir do branch `main`.
- Antes de qualquer modificação sempre utilize um `git pull`
- Faça suas contribuições.
- Abra um [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) para o branch `develop`.
- Aguarde discussão e aprovação futura.

Agradeço antecipadamente por qualquer contribuição.

---

## Banco de dados

### Nome do banco de dados

- pdv (PostgreSQL)
  - Utilizar o ElephantSQL para hospedagem do banco de dados.

#### Tabelas

1. **usuarios**
   - id (chave primária, auto incremento)
   - nome
   - email (único)
   - senha
2. **categorias**
   - id (chave primária, auto incremento)
   - descricao
3. **produtos**
   - id
   - descricao
   - quantidade_estoque
   - valor
   - categoria_id
4. **clientes**
   - id
   - nome
   - email (campo único)
   - cpf (campo único)
   - cep
   - rua
   - numero
   - bairro
   - cidade
   - estado

---

## Requisitos obrigatórios

- A API deve ser capaz de acessar o banco de dados `pdv` para persistir e manipular os dados.
- Manipulação de dados de:
  - clientes
  - categorias
  - pedidos
  - produtos
  - usuários
- O campo 'id' das tabelas deve ser auto incremento.
- Todo valor monetário deve ser representado em centavos. Ex: R$ 10 = 1000 centavos.

## Utilização correta de status codes HTTP

- Utilizar biblioteca para gestão dos status codes.

---

## Endpoints

### 1. Listar categorias

- Método: `GET`
- Rota: `/categoria`

#### Requisição

- Critérios: Não exige autenticação.

#### Resposta

- Lista de objetos de categorias
  - Listagem de todas as categorias cadastradas.
  - Script SQL para alimentar as categorias automaticamente.

---

### 2. Cadastrar usuário

- Método: `POST`
- Rota: `/usuario`
- Descrição: Cadastra um novo usuário.

#### Requisição

- Nome de usuário
- Email
- Senha

#### Critérios de validação

- Campos obrigatórios: nome, email, senha.
- Senha deve ser criptografada.
- Email deve ser único.

#### Resposta

- Sucesso / erro.

---

### 3. Efetuar login do usuário

- Método: `POST`
- Rota: `/login`
- Descrição: Permite que um usuário cadastrado faça login no sistema.

#### Requisição

- Token de autenticação (contendo id ou username)
- Email
- Senha

#### Critérios de validação

- Verificar se a senha é igual à cadastrada.
- Verificar se o email é único.

#### Resposta

- Sucesso / erro.

---

### 4. Detalhar perfil do usuário logado

- Método: `GET`
- Rota: `/usuario`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Resposta

- Visualização dos dados do próprio perfil.

---

### 5. Editar perfil do usuário logado

- Método: `PUT`
- Rota: `/usuario`

#### Requisição

- Nome de usuário
- Email
- Senha

#### Critérios de validação

- Campos obrigatórios: nome, email, senha.
- Senha deve ser criptografada.
- Email deve ser único.

---

### 6. Cadastrar produto

- Método: `POST`
- Rota: `/produto`

#### Requisição

- Token de autenticação (contendo id ou username)
- Descrição do produto
- Quantidade em estoque
- Valor do produto
- ID da categoria do produto

#### Critérios de validação

- Campos obrigatórios: descrição, quantidade_estoque, valor, categoria_id.
- Verificar se a categoria informada existe no banco de dados.

---

### 7. Editar dados do produto

- Método: `PUT`
- Rota: `/produto/:id`

#### Requisição

- Token de autenticação (contendo id ou username)
- Descrição do produto
- Quantidade em estoque
- Valor do produto
- ID da categoria do produto

#### Critérios de validação

- Verificar se o produto com o ID fornecido existe no banco de dados.
- Campos obrigatórios: descrição, quantidade_estoque, valor, categoria_id.
- Verificar se a categoria informada existe no banco de dados.

---

### 8. Listar Produtos

- Método: `GET`
- Rota: `/produto`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Critérios de validação

- Lista de todos os produtos cadastrados no banco de dados.

---

### 9. Detalhar Produto

- Método: `GET`
- Rota: `/produto/:id`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Critérios de validação

- Verificar se o produto com o ID fornecido existe no banco de dados.

---

### 10. Excluir Produto por ID

- Método: `DELETE`
- Rota: `/produto/:id`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Critérios de validação

- Verificar se o produto com o ID fornecido existe no banco de dados.

---

### 11. Cadastrar Cliente

- Método: `POST`
- Rota: `/cliente`

#### Requisição

- Token de autenticação (contendo id ou username)
- Nome do cliente
- Email do cliente
- CPF do cliente
- CEP do cliente
- Rua do cliente
- Número da residência do cliente
- Bairro do cliente
- Cidade do cliente
- Estado do cliente

#### Critérios de validação

- Campos obrigatórios: nome, email, cpf.
- Email e CPF devem ser únicos no banco de dados.

---

### 12. Editar dados do cliente

- Método: `PUT`
- Rota: `/cliente/:id`

#### Requisição

- Token de autenticação (contendo id ou username)
- Nome do cliente
- Email do cliente
- CPF do cliente
- CEP do cliente
- Rua do cliente
- Número da residência do cliente
- Bairro do cliente
- Cidade do cliente
- Estado do cliente

#### Critérios de validação

- Verificar se o cliente com o ID fornecido existe no banco de dados.
- Campos obrigatórios: nome, email, cpf.
- Email e CPF devem ser únicos no banco de dados.

---

### 13. Listar Clientes

- Método: `GET`
- Rota: `/cliente`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Critérios de validação

- Lista de todos os clientes cadastrados.

---

### 14. Detalhar Cliente

- Método: `GET`
- Rota: `/cliente/:id`

#### Requisição

- Token de autenticação (contendo id ou username)

#### Critérios de validação

- Verificar se o cliente com o ID fornecido existe no banco de dados.

#### Resposta

- Sucesso / erro.

---

## Validação de endpoints

- [x] GET categoria
- [x] POST usuario
- [x] POST login
- [x] GET usuario
- [x] PUT usuario
- [x] POST produto
- [x] PUT produto/:id
- [x] GET produto
- [x] GET produto/:id
- [x] DELETE produto/:id
- [x] POST cliente
- [x] PUT cliente/:id
- [x] GET cliente
- [x] GET cliente/:id

---

## Realizar deploy da aplicação

### Plataforma

- Utilizar plataforma gratuita (Cyclic)

---

## Status

Em andamento

## License

[MIT](./LICENSE)
