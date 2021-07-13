import {
  SAVE_FILE,
  LOAD_FILE,
  VIEW_FILES,
  COMPILE_FILE,
  RUN_FILE,
  SUCCESS_GLOBAL,
  ERROR_GLOBAL,
  CLEAR_NOTIFICATIONS,
  SITE_LAYOUT,
} from "../types";

/*
 * FILES
 */

export const saveFile = (file) => ({
  type: SAVE_FILE,
  payload: file,
});

export const loadFile = (file) => ({
  type: LOAD_FILE,
  payload: file,
});

export const viewFiles = (files) => ({
  type: VIEW_FILES,
  payload: files,
});

export const compileFile = (file) => ({
  type: COMPILE_FILE,
  payload: file,
});

export const runFile = (file) => ({
  type: RUN_FILE,
  payload: file,
});

/*
 * NOTIFICATIONS
 */

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATIONS,
    });
  };
};

/*
 * SITE LAYOUT
 */

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});
