import {combineReducers}  from 'redux';
import FavsReducer from './Favs';

const initialState = {}

const rootReducer = combineReducers({FavsReducer , initialState});


export {rootReducer, initialState};