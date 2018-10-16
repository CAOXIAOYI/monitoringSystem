'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').deviceControl.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  deviceDatas:{
    warningList:[],
    warningRoom:[]
  }
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.deviceControlData.success:
      
      newState.deviceDatas = action.data;
      return newState;
    default:
      return newState;
  }
};

