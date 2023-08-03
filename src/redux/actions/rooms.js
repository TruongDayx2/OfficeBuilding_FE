import axios from "axios";
import { ERROR } from "../constants/base";
import {  GET_ALL_ROOM, GET_ALL_ROOM_FLOOR} from "../constants/room";


export const getAllRoomsByFloorID = (floorId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `room/getAllByFloorId/${floorId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: GET_ALL_ROOM_FLOOR,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const getAllRooms = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `room/getAll`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: GET_ALL_ROOM,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

