require("dotenv").config();
const express = require("express");
const sequelize = require("../src/config/database");
const apiRoutes = require("../src/routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require('../src/middleware/error-middleware.js');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  // origin: 'https://final-project-4v8o.vercel.app',
 origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorMiddleware);

console.log("Starting the server...");
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err);
  });

module.exports = (req, res) => {
  sequelize
    .sync({ force: false })
    .then(() => {
      app(req, res);
    })
    .catch((err) => {
      console.error("Failed to sync database:", err);
      res.status(500).json({ error: 'Failed to sync database' });
    });
};
