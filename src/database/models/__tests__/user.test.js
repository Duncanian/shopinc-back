import {
  sequelize,
  dataTypes,
  checkModelName,
} from 'sequelize-test-helpers';

import UserModel from '../user';

describe('Test User Model', () => {
  const Model = UserModel(sequelize, dataTypes);
  checkModelName(Model)('User');
});
