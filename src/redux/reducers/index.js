import {combineReducers} from 'redux';
import companyReducers from './company';
import floorReducers from './floor';
import loginReducers from './login';
import roomReducers from './room';
import equipReducers from './equip';
const reducers = combineReducers({
    login: loginReducers,
    room:roomReducers,
    company: companyReducers,
    floors: floorReducers,
    equip: equipReducers
});

export default (state, action) => reducers(state, action);  