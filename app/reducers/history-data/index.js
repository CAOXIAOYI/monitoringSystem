'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').historyData.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  menus:{},
  historyData:{
    eventList:[],
    hdList:[]
  },
  historyEvent:[],
  historyEventData:{},
  currentMeterId:"",
  currentKey:"",

};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.historyDataLeftMenu.success:
      
      newState.menus = _.assign(newState.menus, action.data);
      return newState;
    case actions.async.historyData.success:

      newState.historyData = action.data;
      newState.currentMeterId = action.pathParams.meterId;
      newState.currentKey = "meterId"+action.pathParams.meterId;
      return newState;
    case actions.async.historyEventData.success:
 
       newState.historyEventData = action.data;

      return newState;
    case actions.async.historyEvent.success:
       newState.currentKey = "eventId"+action.pathParams.eventId;
       newState.currentMeterId = action.pathParams.eventId;
       newState.historyEvent = action.data;
      return newState;
    default:
      return newState;
  }
};
