import { ERROR } from "../constants/base";
import { GET_ALL_ROOM_FLOOR } from "../constants/room";

const initState = {
  data: [],
  room: {},
  error: false,
  success: true,
  restArea: 0,
}

const roomReducers = (state = initState, payload) => {
  switch (payload.type) {
    case GET_ALL_ROOM_FLOOR:
      return {
        ...state,
        data: payload.data,
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

export default roomReducers;