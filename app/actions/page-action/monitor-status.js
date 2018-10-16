
'use strict';


import { monitorStatus } from "../store-action";


exports.onEnter = function(dispatch,nextState) {
  return () => {
    dispatch(monitorStatus.monitorSystemstatus());
  };
};


//展示数据
exports.monitorSystemstatus = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(monitorStatus.monitorSystemstatus(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
