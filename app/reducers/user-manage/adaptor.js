"use strict";

var _ = require('lodash');

var normalize = require('normalizr').normalize;
var arrayOf = require('normalizr').arrayOf;
var Schema = require('normalizr').Schema;

function tranformHomeList(data){
  var user = new Schema('users', {idAttribute: 'id'});
  var schemaMap = normalize(data.data, arrayOf(user));
  var actionData = {
    result: schemaMap.result,
    users: schemaMap.entities.users,
    num:data.count,
  };
  return actionData;
}
module.exports = {
  tranformHomeList
}
