import { combineReducers } from "redux";
import users from "./users_reducer";
import site from "./site_reducer";
import notification from "./notification_reducer";

const appReducers = combineReducers({
  users,
  site,
  notification,
});

export default appReducers;
