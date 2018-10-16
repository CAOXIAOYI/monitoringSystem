"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(menuMeta) {
  let _menus = [];
  menuMeta.menus && menuMeta.menus.map((item,index)=>{
      _menus.push({
        key: item.meterId,
        meterId:item.meterId,
        deviceId:item.deviceId,
        name: item.deviceName,
        deviceType:item.deviceType,
        icon: <i className="iconfont circle">&#xe61f;</i>
      });
  });
  return {
    title: '标题',
    defaultOpenKeys: ["device"],
    menu: [{
      key: "device",
      name: "大功率用电设备",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_menus
    }]
  }
}

module.exports = genConfig;
