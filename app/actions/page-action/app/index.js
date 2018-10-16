"use strict";

import { appIndex } from "../../store-action";

exports.onEnter = function (dispatch) {
  return () => {
    dispatch(appIndex.homePageData({},{grid:1})).catch((err) => {
      console.log(err);
    }) 
    dispatch(appIndex.homePageData({},{grid:2})).catch((err) => {
      console.log(err);
    })
  }
};

//展示数据
exports.homePageData = function(param, pathParams) {
  return (dispatch) => {
     dispatch(appIndex.homePageData("", {grid:1})).catch((err) => {
      console.log(err);
    });
    dispatch(appIndex.homePageData("", {grid:2})).catch((err) => {
      console.log(err);
    });
  }
};

exports.systemTime = function(param, pathParams) {
  return (dispatch) => {
     return dispatch(appIndex.systemTime()).catch((err) => {
      console.log(err);
    });
  }
};
exports.latestEvent = function(param, pathParams) {
  return (dispatch) => {
     return dispatch(appIndex.latestEvent()).catch((err) => {
      console.log(err);
    });
  }
};
