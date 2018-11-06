"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(slidebarMeta) {
  
  return {
    title: '标题',
    defaultOpenKeys: ["dynamo"],
    menu: [{
      key: "ammeter",
      name: "电表",
      url: "/monitoringSystem/pages/param_setting/ammeter"
    },{
      key: "dynamo",
      name: "设备",
      url: "/monitoringSystem/pages/param_setting/dynamo"
    },{
      key: "alertmontior",
      name: "监测告警值",
      url: "/monitoringSystem/pages/param_setting/alertmontior"
    }]
  }
}

module.exports = genConfig;
