/* @flow */

import * as typeorm from 'typeorm';

import TaskSchema from '../entities/TaskSchema';
import UserSchema from '../entities/UserSchema';

import User from '../models/User';

if (typeof afterEach !== 'undefined') {
  // afterEach(resetCache);
}

export function createConnection(options = {}) {
  const env = process.env;
  const type = env.TYPE || 'sqlite';
  const config = Object.assign({
    host: 'localhost',
    username: 'graphql_typeorm_test',
    password: 'graphql_typeorm_test',
    database: 'graphql_typeorm_test',
  },
  type === 'postgres' && {
    host: env.POSTGRES_PORT_5432_TCP_ADDR,
    username: env.POSTGRES_ENV_POSTGRES_USER,
    password: env.POSTGRES_ENV_POSTGRES_PASSWORD,
    database: env.POSTGRES_ENV_POSTGRES_DATABASE,
  },
  type === 'mysql' && {
    host: env.MYSQL_PORT_3306_TCP_ADDR,
    user: env.MYSQL_ENV_MYSQL_USER,
    password: env.MYSQL_ENV_MYSQL_PASSWORD,
    database: env.MYSQL_ENV_MYSQL_DATABASE,
  },
  type === 'postgres' && env.CI && {
    user: 'postgres',
    password: '',
    database: 'test',
  },
  type === 'mysql' && env.CI && {
    user: 'travis',
    password: '',
    database: 'test',
  });

  const driverOptions = {
    type,
    port: 5432,
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    ...options,
  };

  return typeorm.createConnection({
    driver: driverOptions,
    entities: [User],
    entitySchemas: [
      // here we load all entity schemas we need
      TaskSchema,
      UserSchema,
    ],
    logging: {
      logQueries: false,
      logFailedQueryError: true,
    },
    autoSchemaSync: true,
  });
}

export function beforeRemoveAllTables() {
  before(function () {
    if (sequelize.dialect.name === 'mysql') {
      this.timeout(10000);
      return removeAllTables(sequelize);
    }
  });
}

// Not nice too, MySQL does not supports same name for foreign keys
// Solution ? Force remove all tables!
export function removeAllTables(sequelize) {
  function getTables() {
    return sequelize.query('show tables').then((tables) => tables[0].map((table) => table.Tables_in_test));
  }

  return getTables()
    .then((tables) => Promise.all(tables.map(table => {
        return sequelize.query('drop table ' + table).catch(() => {});
      })))
    .then(() => getTables())
    .then((tables) => {
      if (tables.length) {
        return removeAllTables(sequelize);
      }
    });
}
