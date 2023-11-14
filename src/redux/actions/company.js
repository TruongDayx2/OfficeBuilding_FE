import axios from "axios";
import { ERROR } from "../constants/base";
import { COMPANY_FILTER_RENTAL, CREATE_COMPANY, DELETE_COMPANY, GET_ALL_COMPANY, UPDATE_COMPANY } from "../constants/company";

export const getAllCompanys = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `company/getAll`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: GET_ALL_COMPANY,
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


export const createCompany = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `company/create`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: CREATE_COMPANY,
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

export const updateCompany = (data, id) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `company/update/${id}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: UPDATE_COMPANY,
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

export const deleteCompany = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company/delete/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: DELETE_COMPANY,
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



