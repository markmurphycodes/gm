import {
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  CREATE_SESSION,
  END_SESSION,
  SITE_LAYOUT,
} from "../types";


/*
 * Notifications
 */
export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotifications = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};

/*
 * Users
 */
export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

/*
 * Sessions
 */
export const authSession = (session) => ({
  type: CREATE_SESSION,
  payload: session,
});

export const endSession = () => ({
  type: END_SESSION,
});

/*
 * Site
 */

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});
