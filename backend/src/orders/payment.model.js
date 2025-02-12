const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.config"); // Sequelize instance
const Order = require("./order.model");
const Customer = require("../users/customer/customer.model");

const Payment = sequelize.define(
  "Payments",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "order_id",
      },
      onDelete: "CASCADE",
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Can be null for Cash on Delivery
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    pidx: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

// Sync the table
(async () => {
  await sequelize.sync({ alter: true });
  console.log("Payments table synced!");
})();

module.exports = Payment;
