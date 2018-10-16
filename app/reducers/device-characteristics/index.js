'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').deviceCharacteristics.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  menus:[],
  deviceDatas:{},
  currentMeterId:""
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.bigPowerLeftMenu.success:
      

       newState.menus = _.assign(newState.menus, action.data);
      return newState;
     case actions.async.deviceFeaturesData.success:
      
      newState.currentMeterId = action.pathParams.meterId+"";
      newState.deviceDatas[action.pathParams.meterId] = action.data;
      return newState;
    case actions.async.deviceFeaturesData.fail:
      newState.currentMeterId = action.pathParams.meterId+"";
      return newState;
    default:
      return newState;
  }
};
