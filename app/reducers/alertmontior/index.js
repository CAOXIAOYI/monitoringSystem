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
    case actions.async.addMeterParameters.success:
      return newState;
    case actions.async.delMeterParameters.success:
      let resultIndex = newState.result.indexOf(action.pathParams.meterId);
        newState.result.splice(resultIndex, 1);
        delete newState.ammeterDatas[action.pathParams.meterId];
      return newState;
    
    default:
      return newState;
  }
};

