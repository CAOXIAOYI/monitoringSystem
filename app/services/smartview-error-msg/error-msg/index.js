"use strict";

var commonMsg = require("./common.js");
var consoleMsg = require("./console");
var svMsg = require("./sv");
var tcMsg = require("./tc");

module.exports = commonMsg.concat(consoleMsg).concat(svMsg).concat(tcMsg);