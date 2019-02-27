export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'userProfile',
    });
  };

  return User;
};
