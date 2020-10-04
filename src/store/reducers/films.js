import { FETCH_FILMS_START, FETCH_FILMS_ERROR, FETCH_FILMS_SUCCESS, FETCH_SEARCH_FILMS_SUCCESS, PAGE_SET_STATE, SEARCH_SET_STATE } from "../actions/actionTypes"

const initialState = {
    isLoading: false,
    page: 1,
    search: 'film',
    isChangeSearch: false,
    totalResults: 0,
    films: [],
    error: null
}

export default function filmsReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILMS_START:
            return {
                ...state, isLoading: true
            }
        case FETCH_FILMS_SUCCESS:
            return {
                ...state, isLoading: false, films: action.films, totalResults: action.totalResults, page: action.page
            }
        case FETCH_SEARCH_FILMS_SUCCESS:
            return {
                ...state, isLoading: false, films: action.films, totalResults: action.totalResults, page: 1
            }    
        case FETCH_FILMS_ERROR:
            return {
                ...state, isLoading: false, error: action.error
            }
        case PAGE_SET_STATE:
            return {
                ...state, isLoading: true, page: action.page
            }    
        case SEARCH_SET_STATE: 
            return {
                ...state, isLoading: true, search: action.search
            }    
        default: 
            return state
    }
}