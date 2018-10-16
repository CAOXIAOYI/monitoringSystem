'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').harmonic.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  menus:[],
  deviceDatas:{},
  currentMeterId:"",
  currentKey:"",
  currentTimeStamp:""
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case actions.sync.setCurrentTimeStamp:
      newState.currentTimeStamp = action.data.currentTimeStamp;
      return newState;
    case actions.async.generalLeftMenu.success:
      
      newState.menus = _.assign(newState.menus, action.data);
      return newState;
     case actions.async.harmonicQueryData.success:
      
      newState.currentKey = newState.currentKey;
      if(action.params.grid){
        newState.currentKey = action.params.meterId +"_"+ action.params.grid;
      }
      newState.currentMeterId = action.params.meterId+"";
      newState.deviceDatas[action.params.meterId] = action.data;
      if(newState.currentTimeStamp){
        newState.currentTimeStamp = action.params.timeStamp;
      }
      return newState;
    case actions.async.harmonicQueryData.fail:
      newState.currentMeterId = action.params.meterId+"";
      newState.currentKey = action.params.meterId +"_"+ action.params.grid;
      return newState;
    case actions.async.getSpecifyHarmonic.success:
      // if(action.pathParams.timeStamp){
      //   newState.deviceDatas[action.pathParams.meterId] = [action.data];
      // }else{
      //   newState.deviceDatas[action.pathParams.meterId] = action.data;
      // }
      newState.deviceDatas[action.params.meterId] = action.data;
      
      return newState;

    
    default:
      return newState;
  }
};
