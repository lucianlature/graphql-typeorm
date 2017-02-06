import * as typeorm from 'typeorm';

import { Task } from '../entities/Task';
import { User } from '../entities/User';

if (afterEach !== undefined) {
  // To implement: afterEach(resetCache);
}

export interface IEnvironment {
  CI: boolean;
  TYPE: string;
  POSTGRES_PORT_5432_TCP_ADDR: string;
  POSTGRES_ENV_POSTGRES_USER: string;
  POSTGRES_ENV_POSTGRES_PASSWORD: string;
  POSTGRES_ENV_POSTGRES_DATABASE: string;
  MYSQL_PORT_3306_TCP_ADDR: string;
  MYSQL_ENV_MYSQL_USER: string;
  MYSQL_ENV_MYSQL_PASSWORD: string;
  MYSQL_ENV_MYSQL_DATABASE: string;
}

export interface IDriver {
  host: string;
  username: string;
  password: string;
  database: string;
}

export function createConnection(options: Object = {}): Promise<void> {
  const env: IEnvironment = process.env;
  const dialect: string = env.TYPE || 'sqlite';
  let driver: IDriver = {
    host: '',
    username: '',
    database: '',
    password: '',
  };

  switch (dialect) {
    case 'postgres':
      driver = {
        host: env.POSTGRES_PORT_5432_TCP_ADDR,
        username: env.POSTGRES_ENV_POSTGRES_USER,
        password: env.POSTGRES_ENV_POSTGRES_PASSWORD,
        database: env.POSTGRES_ENV_POSTGRES_DATABASE,
      };
      if (env.CI) {
        driver = Object.assign(driver, {
          username: 'postgres',
          password: '',
          database: 'test',
        });
      }
      break;
    case 'mysql':
      driver = {
        host: env.MYSQL_PORT_3306_TCP_ADDR,
        username: env.MYSQL_ENV_MYSQL_USER,
        password: env.MYSQL_ENV_MYSQL_PASSWORD,
        database: env.MYSQL_ENV_MYSQL_DATABASE,
      };
      if (env.CI) {
        driver = Object.assign(driver, {
          username: 'travis',
          password: '',
          database: 'test',
        });
      }
      break;
    default:
  }

  const config: IDriver = Object.assign(
    {
      host: 'localhost',
      username: 'graphql_typeorm_test',
      password: 'graphql_typeorm_test',
      database: 'graphql_typeorm_test',
    },
    driver,
  );

  const driverOptions: Object = {
    type: dialect,
    port: 5432,
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    ...options,
  };

  return typeorm.createConnection({
    driver: driverOptions,
    entities: [
      Task,
      User,
    ],
    logging: {
      logQueries: false,
      logFailedQueryError: true,
    },
    autoSchemaSync: true,
  });
}
