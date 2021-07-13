const express = require("express");
const SocketService = require("./SocketService");
const GDBSocketService = require("./GDBSocketService");
const app = express();
const server = require("http").Server(app);
const gdbServer = require("http").Server(app);
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const socketPort = 8080;

server.listen(socketPort, () => {
  console.log(`Server listening on port ${socketPort}`);
  const socketService = new SocketService();

  socketService.attachServer(server);
});

const gdbPort = 8081;

gdbServer.listen(gdbPort, () => {
  console.log(`GDB listening on port ${gdbPort}`);
  const gdbSocketService = new GDBSocketService();
  gdbSocketService.attachServer(gdbServer);
});
