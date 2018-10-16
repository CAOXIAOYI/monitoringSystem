'use strict';

let redux = require('redux');
let createStore = redux.createStore;
let applyMiddleware = redux.applyMiddleware;
let thunk = require('redux-thunk').default;
let rootReducer = require('../reducers');

module.exports = function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}
