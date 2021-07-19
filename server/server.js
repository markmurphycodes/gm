const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const sessions = require("./routes/api/sessions");
const users = require("./routes/api/users");
const { checkToken } = require("./middleware/auth");

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/${process.env.DB_NAME}?authSource=admin`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());
app.use(checkToken);
app.use(`/api/sessions`, sessions);
app.use(`/api/users`, users);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
