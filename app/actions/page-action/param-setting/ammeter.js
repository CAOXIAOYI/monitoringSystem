
'use strict';


import { paramSetting } from "../../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(paramSetting.meterParametersSetting())
    .then((data) => {
    })
    .catch((err) => {
      console.log(err);
    });
  };
};


//添加电表数据
exports.addMeterParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.addMeterParameters(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
//更新电表数据
exports.updateMeterParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.updateMeterParameters(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
//获取电表数据
exports.meterParametersSetting = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.meterParametersSetting(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
//删除电表数据
exports.delMeterParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.delMeterParameters(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};


