export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'profiles',
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Profile;
};
