import { ERROR } from "../constants/base";
import { CREATE_SERVICE_CONTRACT, DELETE_SERVICE_CONTRACT, GET_ALL_SERVICE_CONTRACT, UPDATE_SERVICE_CONTRACT } from "../constants/serviceContract";

const initState = {
  data: [],
  data1: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const serviceContractReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_SERVICE_CONTRACT:
      return {
        ...state,
        data1: action.data,
        success: true,
        error: false
      }
    case CREATE_SERVICE_CONTRACT:
      return {
        ...state,
        success: true,
        error: false
      }
    case UPDATE_SERVICE_CONTRACT:
      return {
        ...state,
        success: true,
        error: false
      }
      case DELETE_SERVICE_CONTRACT:
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

export default serviceContractReducers;