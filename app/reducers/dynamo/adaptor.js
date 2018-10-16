"use strict";

var _ = require('lodash');

var normalize = require('normalizr').normalize;
var arrayOf = require('normalizr').arrayOf;
var Schema = require('normalizr').Schema;

function tranformHomeList(data){
  var home = new Schema('dynamoDatas', {idAttribute: 'id'});
  var schemaMap = normalize(data.data, arrayOf(home));
  var actionData = {
    result: schemaMap.result,
    dynamoDatas: schemaMap.entities.dynamoDatas,
    num:data.count,
  };
  return actionData;
}
module.exports = {
  tranformHomeList
}
