'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').electricalMachine.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  menus:[],
  powerDatas:{},
  currentMeterId:""
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.bigPowerLeftMenu.success:

      newState.menus = _.assign(newState.menus, action.data);
      return newState;
    case actions.async.menuItemTimestamp.success:

      var _index = _.findIndex(newState.menus, {
        meterId: action.pathParams.meterId
      });
      newState.currentMeterId = action.pathParams.meterId+"";
      //newState.menus[_index]["children"] =  action.data;
      newState.menus[_index]["children"] = action.data.map((item, index) => {
        return _.assign({
            key: index,
            meterId: action.pathParams.meterId
          },
          {name:item.childMenu});
      });
      return newState;
      
    case actions.async.motorOnOffData.success:
      
      newState.currentMeterId = action.pathParams.meterId+"";
      newState.powerDatas[action.pathParams.meterId] = action.data;

      return newState;
    case actions.async.motorOnOffData.fail:
      newState.currentMeterId = action.pathParams.meterId+"";

      return newState;
    default:
      return newState;
  }
};
