const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/db.config"); // Use Sequelize instance from db.config

const port = process.env.PORT || 5000; // Use PORT from .env
const corsOrigin = process.env.corsOrigin; // Use CORS_ORIGIN from .env
// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// Import routes
const productRoutes = require("./src/products/products.route");
const orderRoutes = require("./src/orders/orders.route");

// Routes setup
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes); //this is the baseurl for products


// Sync database and start server
async function main() {
  try {
    await sequelize.authenticate(); // Authenticate database connection
    await sequelize.sync(); // Synchronize models with the database
    console.log("Database connected and synced successfully!");

    app.get("/", (req, res) => {
      res.send("Ethereal Beauty Server is Running..!");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}

// Start the application
main();


//10:03
