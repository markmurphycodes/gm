import * as users from "./index";
import axios from "axios";
import {
  getHeaders,
  getTokenCookie,
  removeTokenCookie,
} from "../../components/utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post("/api/users/register", {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal("Welcome!"));
    } catch (e) {
      console.log(e);
      dispatch(users.errorGlobal(e.response.data.message));
    }
  };
};

export const signInUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post("/api/users/signin", {
        email: values.email,
        password: values.password,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal("Welcome back!"));
    } catch (e) {
      dispatch(users.errorGlobal(e.response.data.message));
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(users.signOut());
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error("Not logged in");
      }

      const user = await axios.get("/api/users/isauth", getHeaders());
      dispatch(users.authUser({ data: user.data, auth: true }));
    } catch (e) {
      dispatch(users.authUser({ data: {}, auth: false }));
    }
  };
};
