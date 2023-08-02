import {combineReducers} from 'redux';
import companyReducers from './company';
import floorReducers from './floor';
import loginReducers from './login';
import rentedAreaReducers from './rented_area';
import roomReducers from './room';
const reducers = combineReducers({
    login: loginReducers,
    room:roomReducers,
    company: companyReducers,
    floors: floorReducers,
    rentedAreas: rentedAreaReducers,
});

export default (state, action) => reducers(state, action);  