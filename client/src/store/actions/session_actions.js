import * as sessions from "./index";
import axios from "axios";
import {
  getHeaders,
  getTokenCookie,
  removeTokenCookie,
} from "../../components/utils/tools";


axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerSession = (values) => {
  return async (dispatch) => {
    try {
      const session = await axios.post(`/api/sessions/register`, {
        owner: values.owner,
        alias: values.alias,
        signed_message: values.signed_message,
        pub_key: values.pub_key,
        session_length: values.session_length,
        session_type: values.session_type
      });

      dispatch(sessions.authSession({ data: session.data }));
      dispatch(sessions.successGlobal("Welcome!"));
    } catch (e) {
      console.log(e);
      dispatch(sessions.errorGlobal(e.response.data.message));
    }
  };
};

export const signInUser = (values) => {
  return async (dispatch) => {
    try {
      const session = await axios.post("/api/users/signin", {
        email: values.email,
        password: values.password,
      });

      dispatch(sessions.authUser({ data: session.data, auth: true }));
      dispatch(sessions.successGlobal("Welcome back!"));
    } catch (e) {
      dispatch(sessions.errorGlobal(e.response.data.message));
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(sessions.signOut());
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error("Not logged in");
      }

      const session = await axios.get("/api/users/isauth", getHeaders());
      dispatch(sessions.authUser({ data: session.data, auth: true }));
    } catch (e) {
      dispatch(sessions.authUser({ data: {}, auth: false }));
    }
  };
};
