import * as files from "./index";
import {
  SAVE_FILE,
  GET_FILE,
  GET_FILES,
  COMPILE_FILE,
  RUN_FILE,
} from "../types";

export const saveFile = (file) => ({
  type: SAVE_FILE,
  payload: file,
});

export const loadFile = (file) => ({
  type: GET_FILE,
  payload: file,
});

export const viewFiles = (files) => ({
  type: GET_FILES,
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
