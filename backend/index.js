const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userController = require("./controllers/userController");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares...
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/users", userController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
