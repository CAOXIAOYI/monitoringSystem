
'use strict';


import { harmonic } from "../store-action";

let moment = require("moment");
exports.onEnter = function(dispatch) {
  return () => {
    dispatch(harmonic.generalLeftMenu())
    .then((data) => {
        if(data.data.length>0){
          
          //let timeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
          //dispatch(harmonic.harmonicQueryData({grid:data.data[0].grid},{meterId:data.data[0].meterId,thdNum:0,timeStamp:timeStamp})).catch((err) => {
            dispatch(harmonic.harmonicQueryData({grid:data.data[0].grid,meterId:parseInt(data.data[0].meterId),thdNum:0})).catch((err) => {
            console.log(err);
          });
        }
      })
    .catch((err) => {
      console.log(err);
    });

    // dispatch(powerQuality.powerQualityData()).catch((err) => {
    //   console.log(err);
    // });
  };
};


//展示数据
exports.harmonicQueryData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(harmonic.harmonicQueryData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
exports.getSpecifyHarmonic = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(harmonic.getSpecifyHarmonic(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
exports.setCurrentTimeStamp = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(harmonic.setCurrentTimeStamp(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};

