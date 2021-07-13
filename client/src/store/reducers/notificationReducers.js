import { ERROR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFICATIONS } from "../types";

export default function notificationReducer(state = {}, action) {
  switch (action.type) {
    case ERROR_GLOBAL:
      return { ...state, error: true, message: action.payload };
    case SUCCESS_GLOBAL:
      return { ...state, success: true, message: action.payload };
    case CLEAR_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
}
