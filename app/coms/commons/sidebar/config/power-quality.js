"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(powerQualityMeta) {

  let _powerGridMenu = [];
  let _labGridMenu = [];
  powerQualityMeta.menus && powerQualityMeta.menus.map((item,index)=>{
    if(item.grid === 1){
      _powerGridMenu.push({
        key: item.meterId+"_"+item.grid,
        meterId:item.meterId,
        grid:item.grid,
        name: item.deviceName,
        icon: <i className="iconfont circle">&#xe61f;</i>
      });
    }
    if(item.grid === 2){
      _labGridMenu.push({
        key: item.meterId+"_"+item.grid,
        meterId:item.meterId,
        name: item.deviceName,
        grid:item.grid,
        icon: <i className="iconfont circle">&#xe61f;</i>
      });
    }
  });
  return {
    title: '标题',
    defaultOpenKeys: ["introduction"],
    menu: [{
      key: "introduction",
      name: "690V动力电网",
      url:"",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_powerGridMenu
    },{
      key: "history",
      name: "重要实验室电网",
      url:"",
      icon: <i className="iconfont">&#xe61a;</i>,
      children:_labGridMenu
    }]
  }
}

module.exports = genConfig;
