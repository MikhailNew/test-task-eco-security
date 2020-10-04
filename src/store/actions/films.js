import axios from 'axios'
import { FETCH_FILMS_ERROR, FETCH_FILMS_START, FETCH_FILMS_SUCCESS, FETCH_SEARCH_FILMS_SUCCESS, PAGE_SET_STATE, SEARCH_SET_STATE } from './actionTypes'

export default function fetchFilms (search, page, isChangeSearch) {
    return async dispatch => { 
        dispatch(fetchFilmsStart())
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&type=movie&s=${search}&page=${page}`)
            let films = []
            let totalResults = +response.data.totalResults 
            response.data.Search.map(item => {
                films.push(item)
            })
            if (isChangeSearch) {
                dispatch(fetchSearchFilmsSuccess(films, totalResults))
            } else {
                dispatch(fetchFilmsSuccess(films, totalResults, page))
            }
        } catch (e) {
            dispatch(fetchFilmsError(e))
        }
    }
}

export function fetchFilmsStart () {
    return {
        type: FETCH_FILMS_START
    }
}

export function fetchFilmsSuccess (films, totalResults, page) {
    return {
        type: FETCH_FILMS_SUCCESS,
        films,
        totalResults,
        page
    }
}

export function fetchSearchFilmsSuccess (films, totalResults) {
    return {
        type: FETCH_SEARCH_FILMS_SUCCESS,
        films,
        totalResults
    }
}

export function fetchFilmsError (e) {
    return {
        type: FETCH_FILMS_ERROR,
        error: e
    }
}

export function pageChangeClick (event, page) {
    return (dispatch, getState) => {
        const state = getState().films
        state.page === page 
        ?   null
        :   dispatch(pageSetState(page))
    }
} 

export function pageSetState (page) {
    return {
        type: PAGE_SET_STATE,
        page
    }
}

export function searchHandler (event) {
    return dispatch => {
        event.target.value.length >= 3
            ?   dispatch(searchSetState(event.target.value))
            :   null
    } 
}

export function searchSetState (search) {
    return {
        type: SEARCH_SET_STATE,
        search
    }
}