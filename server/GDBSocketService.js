const socketIO = require("socket.io");
const GDBService = require("./GDBService");

class GDBSocketService {
  constructor() {
    this.socket = null;
    this.gdb = null;
  }

  attachServer(server) {
    if (!server) {
      throw new Error("Server not found...");
    }

    const io = socketIO(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    console.log("Created GDB socket server. Waiting for client connection..");

    io.on("connection", (socket) => {
      console.log("Client connect to GDB socket: ", socket.id);

      this.socket = socket;

      this.socket.on("disconnect", () => {
        console.log("Disconnected GDB socket: ", socket.idh);
      });

      this.gdb = new GDBService(this.socket);

      this.socket.on("input", (input) => {
        this.gdb.write(input);
      });

      this.socket.on("output", (output) => {
        this.socket.write(output);
      });
    });
  }
}

module.exports = GDBSocketService;
