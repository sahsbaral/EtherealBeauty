const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT, // From .env
    storage: process.env.DB_STORAGE, // From .env
    logging: false, // Disable Sequelize logging if unnecessary
    pool: {
      max: 1, // SQLite works better with a single connection
      idle: 10000, // Close idle connections after 10 seconds
    },
});

module.exports = sequelize;
