module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 10000,
        allowNull: false,
      },
    }, {});
    return User;
  };
  