
'use strict';


import { deviceControl } from "../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(deviceControl.deviceControlData()).catch((err) => {
      console.log(err);
    });
  };
};

//展示数据
exports.deviceControlData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(deviceControl.deviceControlData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
