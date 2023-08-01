# SALE-API

## Installation

```bash
npm install
```

Configure .env for database connection

```text
JWT_SECRET="Your Password"
DB_USERNAME="postgres"
DB_PASSWORD="Your Password"
DB_DATABASE="Database Name"
DB_HOST="Your Host"
DB_PORT="Your Port"
NODE_ENV="test"
URL_CEP_CORREIO="http://viacep.com.br/ws/{CEP}/json"
CEP_COMPANY='01029010'
```

## Running  migrate

```bash
npm run migrate:up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev
```

## auth login

### root

```txt
password="111111" email="root@gmail.com"
```

### user

```txt
password="111111" email='jd@gmail.com'
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Swagger UI

```bash
http://localhost:3000/api
```

## devDependencies

- jest
- supertest
- typescript

## dependencies

- postgres
- rxjs
- typeorm
