# Karhub | Desafio Backend

### Project Support Features

- _CRUD_ para estilos de cervejas e suas temperaturas
- Integração com API da Spotify para encontrar a playlist e cerveja mais adequada para a temperatura fornecida

### Installation Guide

- Clone this repository [here](https://github.com/JMTiburcio/karhub-backend-test/).
- The develop branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

### Usage

- Execute `yarn dev` para iniciar a aplicação.

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

- [NodeJS](https://nodejs.org/) Esta é uma plataforma de tempo de execução multiplataforma construída no motor JavaScript V8 do Chrome, usada para executar códigos JavaScript no servidor. Ela permite a instalação e o gerenciamento de dependências e a comunicação com bancos de dados.
- [ExpressJS](https://www.expresjs.org/) Este é um framework de aplicação web para o NodeJS.
- [Typescript](https://www.typescriptlang.org/) TypeScript é uma linguagem de programação de código aberto que estende a sintaxe JavaScript, adicionando tipos estáticos opcionais. É frequentemente usado com o NodeJS para desenvolvimento de aplicativos escaláveis e robustos.
- [MongoDB](https://www.mongodb.com/) Este é um banco de dados de documentos NoSQL gratuito e de código aberto, com escalabilidade e flexibilidade. Os dados são armazenados em documentos flexíveis semelhantes a JSON.
- [Mongoose ODM](https://mongoosejs.com/) O Mongoose é uma biblioteca que facilita a escrita de validações para o MongoDB, fornecendo uma solução baseada em esquema para modelar os dados da aplicação.
- [Jest](https://jestjs.io/) Jest é um framework de teste de código aberto desenvolvido para JavaScript. Ele fornece uma experiência de teste agradável e intuitiva, com suporte para testes de unidade, integração e snapshot, entre outros recursos. Jest é frequentemente usado com o NodeJS para testar aplicativos e bibliotecas JavaScript.
