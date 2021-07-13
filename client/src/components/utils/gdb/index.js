import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const GDBComponent = ({ socket }) => {
  const [text, setText] = useState("");

  const sendInput = (input) => {
    socket.emit("input", input);
  };
  useEffect(() => {
    socket.on("output", (data) => {
      recieveFromSocket(data);
    });

    const recieveFromSocket = (data) => {
      console.log("From socket: ", data);
    };
  }, []);
  return (
    <div>
      <TextField onChange={(event) => setText(event.target.value)} />
      <Button
        onClick={() => {
          sendInput(text);
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default GDBComponent;
