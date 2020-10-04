import {combineReducers} from 'redux'
import filmsReducer from './films'
import filmItemReducer from './filmItem'

export default combineReducers ({
    films: filmsReducer,
    filmItem: filmItemReducer
})