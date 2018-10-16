
'use strict';


import { electricalMachine } from "../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(electricalMachine.bigPowerLeftMenu())
    .then((data) => {
        if(data.data.length>0){
          dispatch(electricalMachine.menuItemTimestamp({},{meterId:data.data[0].meterId})).catch((err) => {
            console.log(err);
          });
        }
      })
    .catch((err) => {
      console.log(err);
    });
  };
};


//展示数据
exports.menuItemTimestamp = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(electricalMachine.menuItemTimestamp(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
//展示数据
exports.motorOnOffData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(electricalMachine.motorOnOffData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
