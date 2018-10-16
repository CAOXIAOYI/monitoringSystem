
'use strict';


import { historyData } from "../store-action";


exports.onEnter = function(dispatch) {
  return () => {
    dispatch(historyData.homePageData());
  };
};

exports.onEnter = function(dispatch) {
  return () => {
    dispatch(historyData.historyDataLeftMenu())
    .then((data) => {
        //console.log('generalLeftMenu-222-data.data-->',data.data);
        // if(data.data.length>0){
        //    console.log('generalLeftMenu-222->',data);
        //   dispatch(historyData.historyData({},{meterId:data.data[0].meterId,start:"2017-08-01",end:"2017-08-05"})).catch((err) => {
        //     console.log(err);
        //   });
        // }
      })
    .catch((err) => {
      console.log(err);
    });

    // dispatch(powerQuality.powerQualityData()).catch((err) => {
    //   console.log(err);
    // });
  };
};

// 
exports.historyDataLeftMenu = (param,urlParam,opt) => {
  return (dispatch) => {
    return dispatch(historyData.historyDataLeftMenu(param,urlParam,opt)).catch((err) => {
      console.log(err);
    });
  };
};


// 
exports.historyData = (param,urlParam,opt) => {
  return (dispatch) => {
    return dispatch(historyData.historyData(param,urlParam,opt)).catch((err) => {
      console.log(err);
    });
  };
};

// 
exports.historyEventData = (param,urlParam,opt) => {

  return (dispatch) => {
    return dispatch(historyData.historyEventData(param,urlParam,opt)).catch((err) => {
      console.log(err);
    });
  };
};

// 
exports.historyEvent = (param,urlParam,opt) => {
  return (dispatch) => {
    return dispatch(historyData.historyEvent(param,urlParam,opt)).catch((err) => {
      console.log(err);
    });
  };
};



