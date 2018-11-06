
'use strict';


import { paramSetting } from "../../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(paramSetting.getWarnParameter())
    .then((data) => {
    })
    .catch((err) => {
      console.log(err);
    });
  };
};


//添加告警值设置
exports.updateWarnParameter = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.updateWarnParameter(param,pathParams))
    .then((data) => {
      dispatch(paramSetting.getWarnParameter());
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

// 获取当前所有告警值  接地电阻  电磁强度  甲班电磁场
exports.getWarnParameter = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.getWarnParameter(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};

