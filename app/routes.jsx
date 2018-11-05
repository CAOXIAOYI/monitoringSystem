'use strict';

var React = require('react');
import { Route, Redirect, IndexRoute } from 'react-router';

import App from './pages/app/app.jsx';
var iframeManager = require("./pages/index.js").iframeManager;
var IntroductionPage = require("./pages/index.js").IntroductionPage;
var dataManagerPage = require("./pages/index.js").dataManagerPage;


var subSystemPage = require("./pages/index.js").subSystemPage;

var subSystemElectricPage = require("./pages/index.js").subSystemElectricPage;

var systemConfigPage = require("./pages/index.js").systemConfigPage;
var dataBackupPage = require("./pages/index.js").dataBackupPage;
var userManagePage = require("./pages/index.js").userManagePage;
var alarmConfigPage = require("./pages/index.js").alarmConfigPage;

var deviceCharacteristicsPage = require("./pages/index.js").deviceCharacteristicsPage;
var electricEquipmentPage = require("./pages/index.js").electricEquipmentPage;

var historyDataPage = require("./pages/index.js").historyDataPage;
var historyDataElectricPage = require("./pages/index.js").historyDataElectricPage;
var historyEventPage = require("./pages/index.js").historyEventPage;


var harmonicPage = require("./pages/index.js").harmonicPage;
var harmonicElectricPage = require("./pages/index.js").harmonicElectricPage;

var paramSettingPage = require("./pages/index.js").paramSettingPage;
var dynamoPage = require("./pages/index.js").dynamoPage;
var ammeterPage = require("./pages/index.js").ammeterPage;
var alertmontiorPage = require("./pages/index.js").alertmontiorPage;

var powerQualityPage = require("./pages/index.js").powerQualityPage;
var powerQualityElectricPage = require("./pages/index.js").powerQualityElectricPage;


var electricalMachinePage = require("./pages/index.js").electricalMachinePage;
var electricalMachineElectricPage = require("./pages/index.js").electricalMachineElectricPage;


var monitorStatusPage = require("./pages/index.js").monitorStatusPage;

var deviceControlPage = require("./pages/index.js").deviceControlPage;

var groundMonitorPage = require("./pages/index.js").groundMonitorPage;
var jammingIntensityPage = require("./pages/index.js").jammingIntensityPage;
var radiateMonitorPage = require("./pages/index.js").radiateMonitorPage;
 

var IndexPage = require("./pages/index.js").IndexPage;
var LoginPage = require("./pages/index.js").LoginPage;


import {
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
} from "./actions/page-action/index.js";

let User = require("./services/login/user");
//检验新用户
function _checkNewUser(nextState, replaceState) {
   console.log("_checkNewUser-nextState-->",nextState);
   console.log("_checkNewUser-replaceState-->",replaceState);

  let user = User.getUser();
   //console.log("_checkNewUser-replaceState--user－－－>",user);
   //console.log("_checkNewUser-replaceState--appAction－－－>",appAction);
  // if (!user.wsList || user.wsList.length === 0) {
  //   if (window.location.pathname.indexOf("/console/pages/system_config/workspace_config") === -1) {
  //     messageService.ordinary("CONSOLE-WS-ADD-ERROR");
  //     replaceState(null, "/console/pages/system_config/workspace_config");
  //   }
  // }
  // let user={
  //   info:{"dssd":"sd"}
  // };
  //if (!user.wsList || user.wsList.length === 0) {
    // console.log("user->",user);
    // console.log("user.info->",user.info);
    //  console.log("!user.info->",!user.info);
    //   console.log("!!user.info->",!!user.info);
 
    //  console.log("!!!user.info->",!!!user.info);
    // console.log("window.location.pathname-->",window.location.pathname);
    //console.log("user-->",user);
     //console.log("!!!user.name-->",!!!user.name);
    if(!!!user.name){
      replaceState(null, "/monitoringSystem/login");
    }
    // if (window.location.pathname.indexOf("/monitoringSystem/pages/index/") === -1) {
    //   replaceState(null, "/monitoringSystem/pages/index/");
    // }
  //}
}

class GenRouter{
  constructor(option){
    this.store = option.store;
    this.dispatch = option.dispatch;
  }

  genRouter(){
    let rootChildRouter = [{
      path: '/monitoringSystem/login',
      component: LoginPage,
    },{
      path: '/monitoringSystem/pages',
      component: App,
      onChange: function(nextState, newState, replaceState) {
        _checkNewUser(nextState, replaceState);
      },
      onEnter:function(nextState, replaceState) {
        let user = User.getUserSync();
        // if (user.name) {
        //   // appAction.onEnter(that.dispatch, {
        //   //   wsList: user.wsList
        //   // });
        // }
        _checkNewUser(nextState, replaceState);
        //  else {
        //   _checkNewUser(nextState, replaceState);
        // }
      },
      childRoutes: [{
          path: "index",
          component: IndexPage,
          onEnter: appAction.onEnter(this.dispatch)
        },{
          path: "data_manager",
          component: dataManagerPage,
          childRoutes: this._genDataManagerRouter()
        },{
          path: "sub_system",//子系统
          component: subSystemPage,
          childRoutes: this._genSubSystemRouter()
        },{
          path: "system_config",
          component: systemConfigPage,
          childRoutes: this._genSystemConfigRouter()
        },{
          path: "device_characteristics",
          component: deviceCharacteristicsPage,
          childRoutes: this._genDeviceCharacteristicsRouter()
        },{
          path: "history_data",
          component: historyDataPage,
          childRoutes: this._genHistoryDataRouter()
        },{
          path: "harmonic",
          component: harmonicPage,
          childRoutes: this._genHarmonicRouter()
        },{
          path: "param_setting",
          component: paramSettingPage,
          childRoutes: this._genParamSettingRouter()
        },{
          path: "power_quality",//电能质量
          component: powerQualityPage,
          childRoutes: this._genPowerQualityRouter()
        },{
          path: "electrical_machine",
          component: electricalMachinePage,
          childRoutes: this._genElectricalMachineRouter()
        },{
          path: "monitor_status",
          component: monitorStatusPage,
          onEnter: monitorStatusAction.onEnter(this.dispatch)
        },{
          path: "device_control",
          component: deviceControlPage,
          onEnter: deviceControlAction.onEnter(this.dispatch)
        },{
          path: "ground_monitor",
          component: groundMonitorPage,
          onEnter: null
        },{
          path: "jamming_intensity",
          component: jammingIntensityPage,
          onEnter: null
        },{
          path: "radiate_monitor",
          component: radiateMonitorPage,
          onEnter: null
        }]
    }];

    let rootRouterConfig = [
      {
        path: "/monitoringSystem/",
        onEnter: function(nextState,replace){
          if(nextState.location.pathname === "/monitoringSystem/"){
            replace("/monitoringSystem/pages/index");
          }
        },
        childRoutes: rootChildRouter
      },{
        path: "/monitoringSystem",
        onEnter: function(nextState,replace){
          if(nextState.location.pathname === "/monitoringSystem"){
            replace("/monitoringSystem/pages/index");
          }
        },
        childRoutes: rootChildRouter
      }];
    return rootRouterConfig;
  }
  _genSubSystemRouter(){
    return [{
      path: "electric",
      component: subSystemElectricPage,
      //onEnter: subSystemAction.onEnter(this.dispatch)
      onEnter: (nextState) => {
        subSystemAction.onEnter(this.dispatch, nextState.location.query)();
      },
      // onEnter={
      //   ({params}, replace) => replace(`/messages/${params.id}`)
      // } 
    }]
  }
  _genDataManagerRouter(){
    let router = [{
        path: "introduction",
        component: IntroductionPage
      }
    ];
    return router;
  }
  _genSystemConfigRouter(){
    let router = [{
      path: "user_manage",
      component: userManagePage,
      onEnter: userManageAction.onEnter(this.dispatch)
    },{
      path: "data_backup",
      component: dataBackupPage,
    },{
      path: "alarm_config",
      component: alarmConfigPage,
    }];
    return router;
  }
  _genDeviceCharacteristicsRouter(){
    return [{
      path: "electric_equipment",
      component: electricEquipmentPage,
      onEnter: deviceCharacteristicsAction.onEnter(this.dispatch)
    }]
  } 
  _genHistoryDataRouter(){
    return [{
      path: "electric",
      component: historyDataElectricPage,
      onEnter: historyDataAction.onEnter(this.dispatch)
    },{
      path: "event",
      component: historyEventPage,
      onEnter: historyDataAction.onEnter(this.dispatch)
    }]
    
  } 
  _genHarmonicRouter(){
    return [{
      path: "electric",
      component: harmonicElectricPage,
      onEnter: harmonicAction.onEnter(this.dispatch)
    }]
  }
  _genParamSettingRouter(){
    let router = [{
      path: "dynamo",
      component: dynamoPage,
      onEnter: dynamoAction.onEnter(this.dispatch)
    },{
      path: "ammeter",
      component: ammeterPage,
      onEnter: ammeterAction.onEnter(this.dispatch)
    },{
      path: "alertmontior",
      component: alertmontiorPage,
      onEnter: alertmontiorAction.onEnter(this.dispatch)
    }];
    return router;
  
  }
  _genPowerQualityRouter(){
    return [{
      path: "electric",
      component: powerQualityElectricPage,
      onEnter: powerQualityAction.onEnter(this.dispatch)
    }]
  }
  _genElectricalMachineRouter(){
    return [{
      path: "electric",
      component: electricalMachineElectricPage,
      onEnter: electricalMachineAction.onEnter(this.dispatch)
    }]
  }
}

module.exports = function(store, dispatch) {
  let genRouter = new GenRouter(store, dispatch);
  return genRouter.genRouter();
}
