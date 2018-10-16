'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').paramSetting.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  page: 1,
  num: 0,
  pageSize: 10,
  dynamoDatas:{}
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.deviceParametersSetting.success:
      
      let _data = Adaptor.tranformHomeList(action.data); 
      newState = _.assign(newState, {
        page: action.params.page,
        pageSize: action.params.pageSize,
        num: _.cloneDeep(_data.num),
        result: _.cloneDeep(_data.result),
        dynamoDatas: _.assign({}, newState.dynamoDatas, _data.dynamoDatas),
      });
      return newState;
    case actions.async.updatedeviceParameters.success:

      return newState;
    case actions.async.adddeviceParameters.success:
      
      return newState;
    case actions.async.delDeviceParameters.success:
      debugger;
      let resultIndex = newState.result.indexOf(action.pathParams.deviceId);
        newState.result.splice(resultIndex, 1);
        delete newState.dynamoDatas[action.pathParams.deviceId];
      return newState;
    default:
      return newState;
  }
};

