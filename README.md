# Karhub | Desafio Backend

### Project Features

- _CRUD_ para estilos de cervejas e suas temperaturas
- Integração com API da Spotify para encontrar a playlist e cerveja mais adequada para a temperatura fornecida

## Getting Started

Para ter uma cópia local e executá-la, siga os seguinte passos:

### Pré-requisitos

- Node.js (Version: >=14.x <17)
- Yarn _(recommended)_
- MongoDB
- Spotify APP

### Setup

1. Clone o repositório (ou fork https://github.com/JMTiburcio/karhub-backend-test/fork)

   ```sh
   git clone https://github.com/JMTiburcio/karhub-backend-test
   ```

1. Vá para a pasta do projeto

   ```sh
   cd karhub-backend
   ```

1. Instale packages com yarn

   ```sh
   yarn
   ```

1. Set up `.env` file

   ```sh
   cp .env.example .env
   ```

1. Configure as variáveis de ambiente no arquivo `.env`.
1. Execute localmente a aplicação

   ```sh
   yarn dev
   ```

### API Endpoints

| HTTP Verbs | Endpoints     | Action                                     |
| ---------- | ------------- | ------------------------------------------ |
| GET        | /beer         | Listar todas as cervejas                   |
| GET        | /beer/:beerId | Listar única cerveja por ID                |
| POST       | /beer         | Criar uma cerveja                          |
| PUT        | /beer/:beerId | Atualizar cerveja por ID                   |
| DELETE     | /beer/:beerId | Deletar cerveja por ID                     |
|            |               |                                            |
| POST       | /party        | Encontrar cerveja e playlist mais adequada |

### Executando os Testes

Este projeto usa o Jest para testes unitários. Para executar os testes, use o seguinte comando:

```sh
yarn test
```

Foram realizados testes para verificar a execução do `CRUD`, validação do `body` dos Requests, e o controller da rota `party`

### GET /beer/:id

Recupera informações sobre uma cerveja específica.

#### Parâmetros

- `id`: O ID da cerveja.

#### Respostas

- `200 OK`: Retorna a cerveja solicitada.
- `404 Not Found`: Retorna uma mensagem de erro se a cerveja não for encontrada.
- `500 Internal Server Error`: Retorna uma mensagem de erro se ocorrer um erro ao buscar a cerveja.

### GET /beer

Recupera informações sobre todas as cervejas.

#### Respostas

- `200 OK`: Retorna uma lista de todas as cervejas.
- `500 Internal Server Error`: Retorna uma mensagem de erro se ocorrer um erro ao buscar as cervejas.

### POST /beer

Cria uma nova cerveja.

#### Parâmetros

- `beerStyle`: O estilo da cerveja.
- `minTemp`: A temperatura mínima ideal para servir a cerveja.
- `maxTemp`: A temperatura máxima ideal para servir a cerveja.

#### Respostas

- `201 Created`: Retorna a cerveja recém-criada.
- `400 Bad Request`: Retorna uma mensagem de erro se o corpo do request é inválido.
- `500 Internal Server Error`: Retorna uma mensagem de erro se ocorrer um erro ao criar a cerveja.

### PUT /beer/:id

Atualiza uma cerveja existente.

#### Parâmetros

- `id`: O ID da cerveja.
- `beerStyle`: O estilo da cerveja (opcional).
- `minTemp`: A temperatura mínima ideal para servir a cerveja (opcional).
- `maxTemp`: A temperatura máxima ideal para servir a cerveja (opcional).

#### Respostas

- `200 OK`: Retorna a cerveja atualizada.
- `404 Not Found`: Retorna uma mensagem de erro se a cerveja não for encontrada.
- `500 Internal Server Error`: Retorna uma mensagem de erro se ocorrer um erro ao atualizar a cerveja.

### DELETE /beer/:id

Exclui uma cerveja.

#### Parâmetros

- `id`: O ID da cerveja.

#### Respostas

- `204 No Content`: Retorna uma resposta sem corpo após a exclusão bem-sucedida da cerveja.
- `404 Not Found`: Retorna uma mensagem de erro se a cerveja não for encontrada.
- `500 Internal Server Error`: Retorna uma mensagem de erro se ocorrer um erro ao excluir a cerveja.

### Tecnologias utilizadas

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://www.expresjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)
