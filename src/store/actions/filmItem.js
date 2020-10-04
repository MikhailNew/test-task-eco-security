import Axios from 'axios'
import { FETCH_FILM_START, FETCH_FILM_SUCCESS, FETCH_SEARCH_SUCCESS, CLOSE_SEARCH_MENU, CHANGE_SEARCH_HANDLER } from './actionTypes'

export default function fetchFilm (film_id) {
    return async dispatch => {
        dispatch(fetchFilmStart())
        try {
            const response = await Axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&i=${film_id}`)
            const description = await response.data
            dispatch(fetchFilmSuccess(description))
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchSearchFilm (search) {
    return async dispatch => {
        try {
            const response = await Axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&type=movie&s=${search}&page=1`)
            let films = [] 
            response.data.Search.map(item => {
                films.push(item)
            })
            dispatch(fetchSearchSuccess(films))
        } catch (e) {
            console.log(e)
        }
    }
}

export function closeSearchMenu () {
    return {
        type: CLOSE_SEARCH_MENU
    }
}

export function closeSearchHandler (event) {
    return dispatch => {
        event.stopPropagation();
        dispatch(closeSearchMenu())
    }
}

export function changeSearchHandler (value) {
    return {
        type: CHANGE_SEARCH_HANDLER,
        search: value
    }
}

export function fetchFilmStart () {
    return {
        type: FETCH_FILM_START
    }
}

export function fetchFilmSuccess (description) {
    return {
        type: FETCH_FILM_SUCCESS,
        description
    }
}

export function fetchSearchSuccess (films) {
    return {
        type: FETCH_SEARCH_SUCCESS,
        films
    }
}