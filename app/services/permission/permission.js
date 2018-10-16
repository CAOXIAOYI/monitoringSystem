"use strict";

let User = require("../login/user");
let _ = require("lodash");

module.exports = function(expression){
	return true;
/*  let _user = User.getUserSync();
  let _privileges = _user.privileges || [];
  return _privileges.indexOf(expression) !== -1;*/
}
