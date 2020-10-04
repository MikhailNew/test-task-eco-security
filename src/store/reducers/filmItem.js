import {FETCH_FILM_START, FETCH_FILM_SUCCESS, FETCH_SEARCH_SUCCESS, CLOSE_SEARCH_MENU, CHANGE_SEARCH_HANDLER} from '../actions/actionTypes'

const initialState = {
    loading: false,
    description: [],
    isOpen: false,
    search: '',
    films: []
}

export default function filmItemReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILM_START:
            return {
                ...state, loading: true
            }
        case FETCH_FILM_SUCCESS: 
            return {
                ...state, loading: false, description: action.description, isOpen: false, search: ''
            }
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state, films: action.films
            }    
        case CLOSE_SEARCH_MENU:
            return {
                ...state, search: '', isOpen: false
            }   
        case CHANGE_SEARCH_HANDLER:
            return {
                ...state, isOpen: true, search: action.search
            }    
        default: 
            return state
    }
}