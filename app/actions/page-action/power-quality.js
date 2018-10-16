
'use strict';


import { powerQuality } from "../store-action";


exports.onEnter = function(dispatch) {
  // return () => {
  //   dispatch(powerQuality.generalLeftMenu())
  //   .then((data) => {
  //       console.log('generalLeftMenu-222-data.data-->',data.data);
  //       // if(data.data.length>0){
  //       //    console.log('generalLeftMenu-222->',data);
  //       //   dispatch(powerQuality.powerQualityData({grid:data.data[0].grid},{meterId:data.data[0].meterId})).catch((err) => {
  //       //     console.log(err);
  //       //   });
  //       // }
  //     })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };
};

exports.generalLeftMenu = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(powerQuality.generalLeftMenu(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};

//展示数据
exports.powerQualityData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(powerQuality.powerQualityData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
