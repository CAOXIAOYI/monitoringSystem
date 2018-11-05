"use strict";

var user = require('./user');
var app = require('./app');//首页
var subSystem = require('./sub-system');//子系统

var powerQuality = require('./power-quality');//电能质量

var deviceCharacteristics = require('./device-characteristics');//设备特性

var harmonic = require('./harmonic');//谐波查询

var deviceControl = require('./device-control');//设备管控

//var paramSetting = require('./param-setting');//参数设置
var ammeter = require('./ammeter');//参数设置
var dynamo = require('./dynamo');//参数设置
var alertmontior = require('./alertmontior');//参数设置

var electricalMachine = require('./electrical-machine');//电机启停特性

var historyData = require('./history-data');//历史数据

var monitorStatus = require('./monitor-status');//监测状态

var userManage = require('./user-manage');//用户管理

module.exports = {
  user,
  app,
  subSystem,
  powerQuality,
  deviceCharacteristics,
  harmonic,
  deviceControl,
  electricalMachine,
  historyData,
  dynamo,
  ammeter,
  alertmontior,
  monitorStatus,
  userManage

};
