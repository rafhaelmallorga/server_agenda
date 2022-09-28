# Agenda API

## Sumário:

- [Agenda API](#agenda-api)
  - [Sumário:](#sumário)
  - [1. Início Rápido](#1-início-rápido)
  - [2. Tecnologias Usadas](#2-tecnologias-usadas)
  - [3. Documentação da API](#3-documentação-da-api)
  - [4. Relatórios](#4-relatórios)
  - [5. Testes](#5-testes)
  - [6. Diagrama Agenda API](#6-diagrama-agenda-api)

## 1. Início Rápido

[Voltar ao topo.](#sumário)

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

Este projeto possui ambiente Docker, no arquivo **docker-compose.yml** há a configuração padrão do banco de dados, caso queira alterar este é o momento.

Suba o ambiente Docker com o comando abaixo:

```shell
docker compose up
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variaveis de ambiente com suas credenciais do Postgres.

```env
DATABASE_URL="postgres://user:password@localhost:5432/database"
```

Rode as migrations com o comando a seguir:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

E por fim inicia a aplicação com o comando:

```shell
yarn dev
```

## 2. Tecnologias Usadas

[Voltar ao topo.](#sumário)

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [SQLite 3](https://www.sqlite.org/index.html)
- [Sucrase](https://sucrase.io/)
- [TypeORM](https://typeorm.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Puppeteer](https://pptr.dev/)
- [Swagger](https://swagger.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [UUID](https://www.npmjs.com/package/uuid)
- [pg](https://www.npmjs.com/package/pg)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [Commitizen](https://www.npmjs.com/package/commitizen)
- [Jest](https://www.npmjs.com/package/jest)

## 3. Documentação da API

[Voltar ao topo.](#sumário)

Para acessar a documentação da API [clique aqui](https://api-agenda-typescript.herokuapp.com/docs/).

## 4. Relatórios

[Voltar ao topo.](#sumário)

Nesta aplicação é possivel gerar o relatório dos clientes cadastrados com seus respectivos contatos.

Para isso podemos utilizar dois end-points diferentes.

- [Abrir no navegador](https://api-agenda-typescript.herokuapp.com/report/clients)
- [Gerar um arquivo PDF](https://api-agenda-typescript.herokuapp.com/report/clients/pdf)

<img src="./src/assets/report_example.png" alt="Report Image">

## 5. Testes

[Voltar ao topo.](#sumário)

Para rodar os testes do Jest basta utilizar o comando abaixo:

```shell
yarn test
```

<img src="./src/assets/tests_jest.png" alt="Tests Jest Image">

## 6. Diagrama Agenda API

[Voltar ao topo.](#sumário)

<img src="./src/assets/relations_diagram.png" alt="Relations Diagram Image">
