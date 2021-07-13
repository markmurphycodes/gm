import { combineReducers } from "redux";

import files from "./fileReducers";
import site from "./siteReducers";
import gdb from "./gdbReducers";
import notifications from "./notificationReducers";

const appReducers = combineReducers({
  files,
  site,
  gdb,
  notifications,
});

export default appReducers;
