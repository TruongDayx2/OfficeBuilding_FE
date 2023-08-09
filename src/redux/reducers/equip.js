import { ERROR } from "../constants/base";
import { GET_ALL_EQUIP, GET_ALL_EQUIP_FLOOR, CREATE_EQUIP, UPDATE_EQUIP, DELETE_EQUIP } from "../constants/equip";

const initState = {
  data: [],
  data1: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const equipReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_EQUIP_FLOOR:
      return {
        ...state,
        data: action.data,
        success: true,
        error: false
      }
    case GET_ALL_EQUIP:
      return {
        ...state,
        data1: action.data,
        success: true,
        error: false
      }
    case CREATE_EQUIP:
      return {
        ...state,
        success: true,
        error: false
      }
    case UPDATE_EQUIP:
      return {
        ...state,
        success: true,
        error: false
      }
    case DELETE_EQUIP:
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

export default equipReducers;