import React, { useEffect, useState } from "react";
import { Slide } from "@material-ui/core";
import Loader from "../utils/loader";

import XTerminal from "../utils/terminal";
import io from "socket.io-client";

const serverAddress = "http://localhost:8080";

const connectToSocket = (serverAddress) => {
  return new Promise((res) => {
    const socket = io(serverAddress);
    res(socket);
  });
};

const TerminalDrawer = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(true);
  const [retSocket, setRetSocket] = useState();

  useEffect(() => {
    connectToSocket(serverAddress).then((socket) => {
      setRetSocket(socket);
      setLoading(false);
    });
  }, []);

  return (
    <Slide
      style={{ position: "fixed" }}
      direction={"up"}
      in={open}
      onExit={() => setOpen(false)}
    >
      <div id="terminal">
        {loading ? <Loader /> : <XTerminal socket={retSocket} />}
      </div>
    </Slide>
  );
};

export default TerminalDrawer;
