'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').subSystem.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  monitorDatas:{},
  currentDeviceType:""
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.subSystemMonitor.success:
      
      if(action.pathParams.deviceType){
        newState.monitorDatas[action.pathParams.deviceType] = action.data;
        newState.currentDeviceType = action.pathParams.deviceType;
      }
      return newState;
      
    case actions.async.subSystemMonitorExtend.success:
      
      if(action.pathParams.deviceType){
        newState.monitorDatas['tableData'] = action.data;
        newState.currentDeviceType = action.pathParams.deviceType;
      }
      return newState;

    default:
      return newState;
  }
};
