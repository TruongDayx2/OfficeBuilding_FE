import {combineReducers} from 'redux';
import floorReducers from './floor';
import loginReducers from './login';
import roomReducers from './room';
import equipReducers from './equip';
import companyReducers from './company';
import rentalReducers from './rental';
import serviceReducers from './service';
import serviceContractReducers from './serviceContract';
const reducers = combineReducers({
    login: loginReducers,
    room:roomReducers,
    floors: floorReducers,
    equip: equipReducers,
    company:companyReducers,
    rental:rentalReducers,
    service:serviceReducers,
    serviceContract:serviceContractReducers

});

export default (state, action) => reducers(state, action);  