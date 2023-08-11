import { ERROR } from "../constants/base";
import { CREATE_SERVICE, DELETE_SERVICE, GET_ALL_SERVICE, UPDATE_SERVICE } from "../constants/service";

const initState = {
  data: [],
  data1: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const serviceReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_SERVICE:
      return {
        ...state,
        data1: action.data,
        success: true,
        error: false
      }
    case CREATE_SERVICE:
      return {
        ...state,
        success: true,
        error: false
      }
    case UPDATE_SERVICE:
      return {
        ...state,
        success: true,
        error: false
      }
      case DELETE_SERVICE:
        return {
          ...state,
          success: true,
          error: false
        }
    case ERROR:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default serviceReducers;