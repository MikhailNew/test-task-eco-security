import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer';
import {BrowserRouter, Route} from 'react-router-dom'
import FilmItem from './FilmItem/FilmItem'
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))) 
 
ReactDOM.render( 
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/film/:id"  component={FilmItem} />
            <Route path="/" exact component={App} />
        </BrowserRouter>
    </Provider>, 
    document.querySelector( '#app' ) 
);