require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productsRouter = require("./routes/Product");
const favoritesRouter = require("./routes/Favorite");

app.use("/products", productsRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/favorites", favoritesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
