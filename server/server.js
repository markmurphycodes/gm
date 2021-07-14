const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const users = require("./routes/api/users");
const files = require("./routes/api/files");
const { checkToken } = require("./middleware/auth");

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(checkToken);
app.use("/api/users", users);
app.use("/api/files", files);

const port = process.env.DB_PORT || 27017;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
