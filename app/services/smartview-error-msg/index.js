"use strict";

var message = require("antd").message;
var notification = require("antd").notification;
var _ = require("lodash");
var errorMsgs = require("./error-msg");
var SHORT_DURATION = 4;
var MIDDLE_DURATION = 8;

function Level1 (code, duration) {
  var msg = _.find(errorMsgs,function(obj){
    return obj && obj.code === code;
  });
  if(msg){
    switch(msg.type){
      case "success":
      message.success(msg.msg, duration || SHORT_DURATION);
      break;
      case "error":
      message.error(msg.msg, duration || SHORT_DURATION);
      break;
      case "warning":
      message.warning(msg.msg, duration || SHORT_DURATION);
      break;
      case "loading":
      message.loading(msg.msg, duration || SHORT_DURATION);
      break;
      case "info":
      default:
      message.info(msg.msg, duration || SHORT_DURATION);
      break; 
    }
  } else {
    console.error("frontend unKnown error, error code: " + code);
  }
}

function Level2 (option) {
  if(!option.message || !option.description){
    try{
      console.error("backend unKnown error, error msg: " + JSON.stringify(option));
    } catch(e){
      console.error("backend unKnown error");
    }
    return;
  } 
  option.duration = option.duration || MIDDLE_DURATION;
  switch(option.type){
    case "success":
    notification.success(config);
    break;
    case "error":
    notification.error(config);
    break;
    case "warning":
    notification.warning(config);
    break;
    case "info":
    default:
    notification.info(config);
    break;
  }
}

function Level3 (option) {
  if(!option.message || !option.description){
    try{
      console.error("backend unKnown error, error msg: " + JSON.stringify(option));
    } catch(e){
      console.error("backend unKnown error");
    }
    return;
  } 
  option.duration = null;
  switch(option.type){
    case "success":
    notification.success(config);
    break;
    case "error":
    notification.error(config);
    break;
    case "warning":
    notification.warning(config);
    break;
    case "info":
    default:
    notification.info(config);
    break;
  }
}

module.exports = {
  ordinary: Level1,
  backend: Level2,
  unKnown: Level3
}

