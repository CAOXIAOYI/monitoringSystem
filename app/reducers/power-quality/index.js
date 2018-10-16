'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').powerQuality.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  menus:[],
  powerDatas:{},
  currentMeterId:"",
  currentGrid:"",
  currentKey:""
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.generalLeftMenu.success:
      
      newState.menus = _.assign(newState.menus, action.data);

      return newState;
     case actions.async.powerQualityData.success:
      // if(newState.currentMeterId != action.pathParams.meterId){

      // }
      newState.currentMeterId = action.pathParams.meterId;
      newState.currentGrid = action.params.grid;
      newState.currentKey = action.pathParams.meterId +"_"+ action.params.grid;
      newState.powerDatas[action.pathParams.meterId] = action.data;
      return newState;
    case actions.async.powerQualityData.fail:
      newState.currentMeterId = action.pathParams.meterId+"";
      return newState;
    default:
      return newState;
  }
};
