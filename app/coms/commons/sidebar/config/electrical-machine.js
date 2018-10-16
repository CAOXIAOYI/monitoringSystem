"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(menuMeta) {
  let _menu = [];
  menuMeta.menus && menuMeta.menus.map((item,index)=>{
      _menu.push({
        key: item.meterId+"",
        meterId:item.meterId,
        name: item.deviceName,
        deviceId:item.deviceId,
        deviceType:item.deviceType,
        icon: <i className="iconfont circle">&#xe61f;</i>,
        children:item.children || []
      });
  });
  return {
    title: '标题',
    defaultOpenKeys: ["introduction"],
    menu: [{
      key: "introduction",
      name: "大功率用电设备",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_menu
    }]
  }
}

module.exports = genConfig;
