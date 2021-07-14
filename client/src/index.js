import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

import Routes from "./routes";
import {Provider} from "react-redux"; 
import ReduxStore from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
    <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
