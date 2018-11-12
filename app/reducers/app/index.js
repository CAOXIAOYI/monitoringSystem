'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').appIndex.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  homeDatas:{},
  latestEvents:[],
  alertData:{}
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.homePageData.success:
      if(action.pathParams.grid){
        newState.homeDatas[action.pathParams.grid] = action.data;
      }
      return newState;
    case actions.async.latestEvent.success:
      newState.latestEvents = action.data;
      return newState;

    case actions.async.alertData.success:
      if(action.pathParams.grid){
        newState.alertData[action.pathParams.grid] = action.data;
      }
      
      return newState;
      
    default:
      return newState;
  }
};
