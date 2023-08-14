import { ERROR } from "../constants/base";
import { CANCEL_RENTAL, CREATE_RENTAL, DELETE_RENTAL, GET_ALL_RENTAL, GET_ALL_RENTAL_BY_MONTH, GET_ALL_RENTAL_BY_STATUS, UPDATE_RENTAL } from "../constants/rental";

const initState = {
  data: [],
  data1: [],
  dataStatus: [],
  dataMonth: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const rentalReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_RENTAL:
      return {
        ...state,
        data1: action.data,
        success: true,
        error: false
      }
    case GET_ALL_RENTAL_BY_STATUS:
      return {
        ...state,
        dataStatus: action.data,
        success: true,
        error: false
      }
    case GET_ALL_RENTAL_BY_MONTH:
      return {
        ...state,
        dataMonth: action.data,
        success: true,
        error: false
      }
    case CREATE_RENTAL:
      return {
        ...state,
        success: true,
        error: false
      }
    case UPDATE_RENTAL:
      return {
        ...state,
        success: true,
        error: false
      }
    case DELETE_RENTAL:
      return {
        ...state,
        success: true,
        error: false
      }
    case CANCEL_RENTAL:
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

export default rentalReducers