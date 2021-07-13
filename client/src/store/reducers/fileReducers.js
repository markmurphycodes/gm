import { SAVE_FILE, LOAD_FILE, COMPILE_FILE, RUN_FILE } from "../types";

export default function fileReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_FILE:
      return { ...state, contents: action.payload };
    case LOAD_FILE:
      return { ...state, contents: action.payload };
    case COMPILE_FILE:
      return { ...state, success: action.payload };
    case RUN_FILE:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
