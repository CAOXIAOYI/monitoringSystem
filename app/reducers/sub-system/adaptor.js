"use strict";

var _ = require('lodash');

var normalize = require('normalizr').normalize;
var arrayOf = require('normalizr').arrayOf;
var Schema = require('normalizr').Schema;

function tranformHomeList(data){
  var home = new Schema('homes', {idAttribute: 'deviceId'});
  var schemaMap = normalize(data, arrayOf(home));
  var actionData = {
    result: schemaMap.result,
    homes: schemaMap.entities.homes,
  };
  return actionData;
}
module.exports = {
  tranformHomeList
}
