import {combineReducers} from 'redux';
import floorReducers from './floor';
import loginReducers from './login';
import roomReducers from './room';
import equipReducers from './equip';
import companyReducers from './company';
import rentalReducers from './rental';
const reducers = combineReducers({
    login: loginReducers,
    room:roomReducers,
    floors: floorReducers,
    equip: equipReducers,
    company:companyReducers,
    rental:rentalReducers
});

export default (state, action) => reducers(state, action);  