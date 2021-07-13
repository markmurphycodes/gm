const { spawn } = require("child_process");
const { GDB } = require("gdb-js");

class GDBInstance {
  constructor(socket) {
    this.child = null;
    this.socket = socket;
    this.inst = null;
    this.buf = null;
  }

  startGDBProcess = (action) => {
    this.child = spawn("gdb", ["-i=mi", action, "main"], {
      // this.child = spawn("gcc", ["-g", action], {
      shell: true,
      stdio: "pipe",
      cwd: "/home/mrf/vos/client/src/userFiles",
    });

    this.child.stdin.on("data", (data) => {
      console.log("stdin: ", data);
    });

    this.child.stdout.on("data", (data) => {
      var fs = require("fs");
      fs.appendFile(
        "/home/mrf/vos/client/src/userFiles/test.out",
        data,
        (err) => {
          if (err) throw err;
        }
      );
      console.log("stdout: ", data);
    });

    this.child.stderr.on("data", (data) => {
      var fs = require("fs");
      fs.appendFile(
        "/home/mrf/vos/client/src/userFiles/test.out",
        data,
        (err) => {
          if (err) throw err;
        }
      );
      console.log("stderr: ", data);
    });

    this.gdb = new GDB(this.child);

    //this.gdb.init();
    //this.gdb.enableAsync();

    //this.gdb.on("data", (data) => {
    //  this.sendToClient(data);
    //});
  };

  write = (data) => {
    this.startGDBProcess(data);
  };

  sendToClient = (data) => {
    this.socket.emit("output", data);
  };
}

module.exports = GDBInstance;
