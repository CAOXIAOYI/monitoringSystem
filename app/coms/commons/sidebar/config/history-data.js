"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(menuMeta) {

  let _qualityMenu = [];
  let _eventMenu = [];
  for(var key in menuMeta.menus){

    if(key === "powerQuality"){
      _qualityMenu = menuMeta.menus[key].map((item,index)=>{
         return {
            key: "meterId"+item.meterId,
            meterId:item.meterId,
            deviceId:item.deviceId,
            name: item.deviceName,
            type:1,
            url: '/monitoringSystem/pages/history_data/electric',
            children:item.children || [],
            icon: <i className="iconfont circle">&#xe61f;</i>
          }
      });
    }
    if(key === "historyEvent"){
     _eventMenu = menuMeta.menus[key].map((item,index)=>{
          return {
            key: "eventId"+item.event_id,
            event_id:item.event_id,
            name: item.event_type,
            type:2,
            url: '/monitoringSystem/pages/history_data/event',
            children:item.children || [],
            icon: <i className="iconfont circle">&#xe61f;</i>
          }
      });
    }
 
  }
  return {
    title: '标题',
    defaultOpenKeys: ["introduction"],
    menu: [{
      key: "introduction",
      name: "电能质量监测",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_qualityMenu
    },{
      key: "history",
      name: "历史事件",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_eventMenu
    }]
  }
}

module.exports = genConfig;
