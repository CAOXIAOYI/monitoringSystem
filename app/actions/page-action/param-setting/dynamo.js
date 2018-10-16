
'use strict';


import { paramSetting } from "../../store-action";


exports.onEnter = function(dispatch) {

  return () => {
    dispatch(paramSetting.deviceParametersSetting())
    .then((data) => {
    })
    .catch((err) => {
      console.log(err);
    });
  };
};


//获取设备数据
exports.deviceParametersSetting = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.deviceParametersSetting(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};

//更新设备数据
exports.updatedeviceParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.updatedeviceParameters(param, pathParams))
    .then((data) => {
      dispatch(paramSetting.deviceParametersSetting());
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

//添加设备数据
exports.adddeviceParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.adddeviceParameters(param, pathParams))
    .then((data) => {
      dispatch(paramSetting.deviceParametersSetting());
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

//添加设备数据
exports.delDeviceParameters = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(paramSetting.delDeviceParameters(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};


