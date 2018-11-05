"use strict";

let appAction = require("./app");

let userManageAction = require('./user-manage');
let initUserAction = require("./init-user.js");

let subSystemAction = require("./sub-system");

let powerQualityAction = require("./power-quality");

let electricalMachineAction = require("./electrical-machine");

let deviceControlAction = require("./device-control");

let historyDataAction = require("./history-data");

let deviceCharacteristicsAction = require("./device-characteristics");

let harmonicAction = require("./harmonic");

let monitorStatusAction = require("./monitor-status");


//let paramSettingAction = require("./param-setting");

let dynamoAction = require("./param-setting/dynamo");
let ammeterAction = require("./param-setting/ammeter");
let alertmontiorAction = require("./param-setting/alertmontior");


var actions = {
  appAction,
  userManageAction,
  initUserAction,
  subSystemAction,
  powerQualityAction,
  electricalMachineAction,
  deviceControlAction,
  deviceCharacteristicsAction,
  harmonicAction,
  historyDataAction,
  dynamoAction,
  ammeterAction,
  alertmontiorAction,
  monitorStatusAction
}

module.exports = actions;


