const Sequelize = require('sequelize');

const sequelize = new Sequelize('restful_api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;