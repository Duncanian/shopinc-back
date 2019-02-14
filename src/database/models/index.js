import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import envConfig from '../../config/config';
import dbConfig from '../../config/database';

const envDbConfig = dbConfig[envConfig.env];
const db = {};
const basename = path.basename(__filename);
const sequelize = new Sequelize(envDbConfig.database, envDbConfig.username, envDbConfig.password, {
  host: envDbConfig.host,
  dialect: envDbConfig.dialect,
});

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
