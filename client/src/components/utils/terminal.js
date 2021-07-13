import React, { useEffect } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const XTerminal = ({ socket }) => {
  //  const [cmd, setCmd] = useState("");

  useEffect(() => {
    var terminal = new Terminal();
    terminal.open(document.getElementById("terminal"));
    terminal.onData((data) => {
      sendInput(data);
    });

    //terminal.onKey((event) => processInput(event.key, event.domEvent));

    terminal.setOption("theme", {
      background: "#202B33",
      foreground: "#F5F8FA",
    });

    socket.on("output", (data) => {
      recieveFromSocket(data);
    });

    //  const prompt = () => {
    //    terminal.write("\r\n$ ");
    //  };

    const sendInput = (input) => {
      socket.emit("input", input);
    };

    const recieveFromSocket = (data) => {
      terminal.write(data);
    };

    //  const processInput = (key, ev) => {
    //    var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
    //    if (ev.keyCode === 13) {
    //      if (cmd === "clear") {
    //        terminal.clear();
    //      }
    //      console.log("Entered command: ", cmd);
    //      setCmd("");
    //      prompt();
    //    } else if (ev.keyCode === 8) {
    //      // Do not delete the prompt
    //      if (cmd.length > 0) {
    //        setCmd(cmd.slice(0, cmd.length - 1));
    //        terminal.write("\b \b");
    //      }
    //    } else if (printable) {
    //      setCmd(cmd + key);
    //      terminal.write(key);
    //    }
    //  };

    terminal.writeln("Hello There!");
    terminal.writeln("How are you?");
    terminal.setOption("cursorBlink", true);
  }, []);
  return <div />;
};

export default XTerminal;
