const { DataTypes } = require('sequelize');
const sequelize = require("../database/db.config"); // Sequelize instance
// Define the Order model
const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  products: {
    type: DataTypes.JSON, // Store product data as JSON
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'completed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Sync the table
(async () => {
  await sequelize.sync({ alter: true });
  console.log('Orders table synced!');
})();

module.exports = Order;
