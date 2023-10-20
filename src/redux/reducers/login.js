import { ERROR, MESSAGE_ERROR, SWITCH_ERROR } from "../constants/base";
import { ERRORBE, LOGIN, SIGNUP } from "../constants/login";


const initState = {
    data: {},
    error: false,
    dataError: {}
}
const loginReducers = (state = initState, payload) => {
    switch (payload.type) {
        case LOGIN:
            return {
                ...state,
                data: payload.data,
                error: false
            }
        case SIGNUP:
            return {
                ...state,
                data: payload.data,
                error: false
            }
        case ERROR:
            return {
                ...state,
                data: {},
                error: true
            }
        case SWITCH_ERROR:
            return {
                ...state,
                data: {},
                error: false,
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                // error: false,
                dataError: payload.data
            }
        case ERRORBE:
            return {
                data: {},
                error: false,
                dataError: {}
            }
        default:
            return state;
            }
    }


    export default loginReducers;