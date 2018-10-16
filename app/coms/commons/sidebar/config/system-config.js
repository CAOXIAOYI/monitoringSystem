"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function SystemConfig() {
  return {
    title: '',
    defaultOpenKeys: ["user_manage"],
    menu: [{
        key: "user_manage",
        name: "用户管理",
        url: "/monitoringSystem/pages/system_config/user_manage"
    },{
        key: "data_source_manage",
        name: "数据备份设置",
         url: "/monitoringSystem/pages/system_config/data_backup"
    }]

    //{
    //   key: "alarm_mail",
    //   name: "告警邮件地址设置",
    //   url: "/monitoringSystem/pages/system_config/alarm_config"}
  }
}

module.exports = SystemConfig;
