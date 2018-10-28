
'use strict';


import { deviceCharacteristics } from "../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(deviceCharacteristics.bigPowerLeftMenu())
    .then((data) => {
        if(data.data.length>0){
          dispatch(deviceCharacteristics.deviceFeaturesData({},{meterId:data.data[0].meterId})).catch((err) => {
            console.log(err);
          });

          dispatch(deviceCharacteristics.deviceTHDData({
            meterId:data.data[0].meterId,
            thdNum:-1,
            timeStamp:''
          }, {meterId:data.data[0].meterId})).catch((err) => {
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
exports.deviceFeaturesData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(deviceCharacteristics.deviceFeaturesData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};

//右侧THD
exports.deviceTHDData = function(param, pathParams) {
  return (dispatch) => {
    return dispatch(deviceCharacteristics.deviceTHDData(param, pathParams)).catch((err) => {
      console.log(err);
    });
  }
};
