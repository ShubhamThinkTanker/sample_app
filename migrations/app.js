const { Sequelize, DataTypes } = require('sequelize');
const Umzug = require('umzug');
const db = require('./models');

const sequelize = db.sequelize;

const umzug = new Umzug({
  migrations: {
    path: './migrations',
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },
});

umzug.up().then(() => {
  console.log('Migrations complete.');
});
