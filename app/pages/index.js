"use strict";

let pages = {
  IntroductionPage: require("./data-manager/introduction/introduction.jsx"),
  

  dataManagerPage: require("./data-manager/index.jsx"),

  

  
  IndexPage: require("./index/index.jsx"),
  LoginPage: require("./login/login.jsx"),

  /*** sub-system start ***/
  subSystemPage: require("./sub-system/index.jsx"),

  subSystemElectricPage: require("./sub-system/electric/electric.jsx"),
  /*** sub-system end ***/

  /*** sytem-config start ***/
  systemConfigPage: require("./system-config/index.jsx"),

  dataBackupPage: require("./system-config/data-backup/data-backup.jsx"), /***数据备份页面 ***/

  alarmConfigPage: require("./system-config/alarm-config/alarm-config.jsx"),/***告警邮件页面 ***/

  userManagePage: require("./system-config/user-manage/user-manage.jsx"),/***用户管理页面 ***/
  /*** sytem-config end ***/

  /*** device characteristics start ***/
  deviceCharacteristicsPage: require("./device-characteristics/index.jsx"),

  electricEquipmentPage: require("./device-characteristics/electric-equipment/electric-equipment.jsx"),
  /*** device characteristics end ***/

  /*** history-data  start ***/
  historyDataPage: require("./history-data/index.jsx"),

  historyDataElectricPage: require("./history-data/electric/electric.jsx"),
  historyEventPage:require("./history-data/event/event.jsx"),
  /*** history-data   end ***/

  /*** harmonic  start ***/
  harmonicPage: require("./harmonic/index.jsx"),

  harmonicElectricPage: require("./harmonic/electric/electric.jsx"),
  /*** harmonic end ***/

  /*** param setting 参数设置 start ***/
  paramSettingPage: require("./param-setting/index.jsx"),

  dynamoPage: require("./param-setting/dynamo/dynamo.jsx"),
  ammeterPage: require("./param-setting/ammeter/ammeter.jsx"),
  /*** param setting end ***/

   /*** power quality 电能质量 start ***/
  powerQualityPage: require("./power-quality/index.jsx"),

  powerQualityElectricPage: require("./power-quality/electric/electric.jsx"),
  /*** param setting end ***/

  /*** electrical machine 电机启停特性 start ***/
  electricalMachinePage: require("./electrical-machine/index.jsx"),

  electricalMachineElectricPage: require("./electrical-machine/electric/electric.jsx"),
  /*** electrical machine end ***/

  /*** monitor-status 监测状态 start ***/
  monitorStatusPage: require("./monitor-status/monitor-status.jsx"),

  /*** monitor-status end ***/

  /*** monitor-status 监测状态 start ***/
  deviceControlPage: require("./device-control/device-control.jsx"),

 
  /*** monitor-status end ***/

  
}


module.exports = pages;
