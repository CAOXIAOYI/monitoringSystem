'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').paramSetting.actions;

var initState = {
  alertMontiorData:[]
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.getWarnParameter.success:
      
      newState = _.assign(newState, {
        alertMontiorData:action.data
      })
      return newState;
    case actions.async.updateWarnParameter.success:
      return newState;
    default:
      return newState;
  }
};

