'use strict';

let _ = require("lodash");
let combineReducers = require('redux').combineReducers;
let routing = require('react-router-redux').routerReducer;

let config = require("./config");

let rootReducer = combineReducers(
    _.extend({
        routing: routing
    },config)
);

module.exports = rootReducer;
