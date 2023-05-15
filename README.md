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

### Tecnologias utilizadas

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://www.expresjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)
