import { ERROR } from "../constants/base";
import { GET_ALL_ROOM, GET_ALL_ROOM_FLOOR } from "../constants/room";

const initState = {
  data: [],
  data1:[],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const roomReducers = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_ROOM_FLOOR:
      return {
        ...state,
        data: action.data,
        success: true,
        error: false
      }
    case GET_ALL_ROOM:
      return{
        ...state,
        data1: action.data,
        success:true,
        error:false
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

export default roomReducers;