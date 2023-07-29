import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const dataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  entities: [],

  synchronize: process.env.NODE_ENV === 'development',

  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;
