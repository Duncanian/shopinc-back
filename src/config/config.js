require('dotenv').config();
const joi = require('joi');


const envVarsSchema = joi.object({
  port: joi.number().default(8000),
  database: joi.string().required(),
  username: joi.string().required(),
  databaseDialect: joi.string().default('postgres'),
  env: joi.string()
    .allow(['development', 'production', 'test', 'staging'])
    .required(),
  password: joi.string().default(null),
  host: joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT || 8000,
  database: envVars.DATABASE,
  username: envVars.DATABASE_USER,
  databaseDialect: envVars.DATABASE_DIALECT || 'postgres',
  env: envVars.NODE_ENV || 'development',
  password: envVars.PASSWORD || null,
  host: envVars.HOST,
};

module.exports = config;
