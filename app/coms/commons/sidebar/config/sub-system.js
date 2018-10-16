"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(slidebarMeta) {

  // let _dataSyncJobs = slidebarMeta.dataSyncMeta && slidebarMeta.dataSyncMeta.result.map((item,index)=>{
  //     let _job = slidebarMeta.dataSyncMeta.jobs[item];
  //     return {
  //         key: index,
  //         url: '/mergeTableTools/pages/task_manager/data_sync_detail?jobId='+_job.jobId,
  //         name: _job.name,
  //         icon: <i className="iconfont circle">&#xe61f;</i>
  //       };
  // });
  return {
    title: '标题',
    defaultOpenKeys: ["dynamo"],
    menu: [{
      key: "dynamo",
      name: "发电机",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:1
    },{
      key: "propulsion",
      name: "推进电机",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:2
    },{
      key: "scientific",
      name: "作业功能电机",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:3
    },{
      key: "distribution",
      name: "配电变压器",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:4
    },{
      key: "laboratory",
      name: "科考设备",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:5
    },{
      key: "UPS",
      name: "实验室与UPS",
      icon: <i className="iconfont">&#xe61a;</i>,
      id:6
    }]
  }
}

module.exports = genConfig;
