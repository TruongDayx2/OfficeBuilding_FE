import { ERROR } from "../constants/base";
import { CREATE_COMPANY, DELETE_COMPANY, GET_ALL_COMPANY, UPDATE_COMPANY } from "../constants/company";

const initState = {
  data: [],
  data1: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const companyReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_COMPANY:
      return {
        ...state,
        data1: action.data,
        success: true,
        error: false
      }
    case CREATE_COMPANY:
      return {
        ...state,
        success: true,
        error: false
      }
    case UPDATE_COMPANY:
      return {
        ...state,
        success: true,
        error: false
      }
      case DELETE_COMPANY:
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

export default companyReducers;