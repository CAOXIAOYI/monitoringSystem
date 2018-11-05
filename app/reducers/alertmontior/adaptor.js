"use strict";

var _ = require('lodash');

var normalize = require('normalizr').normalize;
var arrayOf = require('normalizr').arrayOf;
var Schema = require('normalizr').Schema;

function tranformHomeList(data){
  var ammeter = new Schema('ammeters', {idAttribute: 'id'});
  var schemaMap = normalize(data.data, arrayOf(ammeter));
  var actionData = {
    result: schemaMap.result,
    ammeterDatas: schemaMap.entities.ammeters,
    num:data.count
  };
  return actionData;
}
module.exports = {
  tranformHomeList
}
