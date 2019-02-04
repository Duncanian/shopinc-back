import config from './config';

const defaultConfig = {
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: config.databaseDialect,
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: 'test_db',
  },
  production: {
    ...defaultConfig,
  },
};

export default database;
