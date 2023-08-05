import {combineReducers} from 'redux';
import floorReducers from './floor';
import loginReducers from './login';
import roomReducers from './room';
import equipReducers from './equip';
import companyReducers from './company';
const reducers = combineReducers({
    login: loginReducers,
    room:roomReducers,
    floors: floorReducers,
    equip: equipReducers,
    company:companyReducers
});

export default (state, action) => reducers(state, action);  