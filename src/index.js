import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer';
import {BrowserRouter, Route} from 'react-router-dom'
import FilmItem from './FilmItem/FilmItem'

const store = createStore(rootReducer) 
 
ReactDOM.render( 
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/film/:id"  component={FilmItem} />
            <Route path="/" exact component={App} />
        </BrowserRouter>
    </Provider>, 
    document.querySelector( '#app' ) 
);