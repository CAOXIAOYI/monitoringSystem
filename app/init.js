'use strict';

let $ = require('jquery');

$.ajaxSetup({
	headers: window.ajaxHeader || {}
});