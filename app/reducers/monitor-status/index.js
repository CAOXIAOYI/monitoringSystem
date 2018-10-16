'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').monitorStatus.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  monitorDatas:[],
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.monitorSystemstatus.success:
      
      newState.monitorDatas = _.assign(newState.monitorDatas, action.data);
      return newState;
    default:
      return newState;
  }
};
