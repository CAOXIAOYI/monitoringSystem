"use strict";

let _ = require("lodash");
let namespace = require('../utils/namespace');
let httpActionCreator = require('../utils/http-action-creator');
let syncActionCreator = require('../utils/sync-action-creator');

// sync action creator
function SyncActionCreator(actions,namespace){
  let result = {
    actions: {
      sync: {}
    }
  };
  let _syncActionCreator = syncActionCreator(namespace);
  actions.sync.forEach((name) => {
    let s = _syncActionCreator(name);
    result.actions.sync[name] = s.action;
    result[name] = s.actionCreater
  });

  return result;
}

// async action creator
function AsyncActionCreator(actions,namespace){
  let result = {
    actions: {
      async: {}
    }
  };
  let _httpActionCreator = httpActionCreator(namespace);
  actions.async.forEach((name) => {
    let s = _httpActionCreator(name);
    result.actions.async[name] = s.actions;
    result[name] = s.actionCreater
  });
  return result;
}

// 配置这里就可以了
[{
  name: "appIndex",
  actions: require("./app-index")
},{
  name:"user",
  actions:require("./user")
},{
  name:"header",
  actions:require("./header")
},{
  name:"subSystem",
  actions:require("./sub-system")
},{
  name:"powerQuality",
  actions:require("./power-quality")
},{
  name:"deviceControl",
  actions:require("./device-control")
},{
  name:"deviceCharacteristics",
  actions:require("./device-characteristics")
},{
  name:"paramSetting",
  actions:require("./param-setting")
},{
  name:"harmonic",
  actions:require("./harmonic")
},{
  name:"electricalMachine",
  actions:require("./electrical-machine")
},{
  name:"historyData",
  actions:require("./history-data")
},{
  name:"monitorStatus",
  actions:require("./monitor-status")
},{
  name:"userManage",
  actions:require("./user-manage")
}].map((item) => {
  let ns = namespace(item.name);
  exports[item.name] = _.merge({},
    SyncActionCreator(item.actions,ns),
    AsyncActionCreator(item.actions,ns)
  )
})
