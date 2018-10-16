'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').paramSetting.actions;
var Adaptor = require("./adaptor.js");

var initState = {
  result:[],
  page: 1,
  num: 0,
  pageSize: 10,
  ammeterDatas:{}
};

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    
    case actions.async.meterParametersSetting.success:
      
      let _data = Adaptor.tranformHomeList(action.data);
      newState = _.assign(newState, {
        page: action.params.page,
        pageSize: action.params.pageSize,
        num: _.cloneDeep(_data.num),
        result: _.cloneDeep(_data.result),
        ammeterDatas: _.assign({}, newState.ammeterDatas, _data.ammeterDatas),
      });
      return newState;
    case actions.async.updateMeterParameters.success:
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

