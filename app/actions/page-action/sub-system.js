
'use strict';


import { subSystem } from "../store-action";


exports.onEnter = function(dispatch,nextState,pp) {
  return () => {
    dispatch(subSystem.subSystemMonitor({},{deviceType:1}));
    dispatch(subSystem.subSystemMonitorExtend({},{deviceType:1}));
  };
};


//创建后增加到列表 
exports.subSystemMonitor = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(subSystem.subSystemMonitor(param, pathParams)).catch((err) => {
      console.log(err);
    });
    
  }
};

exports.subSystemMonitorExtend = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(subSystem.subSystemMonitorExtend(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
