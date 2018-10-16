"use strict";

let React = require('react');
let languageProvider = require("../../../../services/language/index.js");

function genConfig(slidebarMeta) {

  let _dataSyncJobs = slidebarMeta.dataSyncMeta && slidebarMeta.dataSyncMeta.result.map((item,index)=>{
      let _job = slidebarMeta.dataSyncMeta.jobs[item];
      return {
          key: index,
          url: '/mergeTableTools/pages/task_manager/data_sync_detail?jobId='+_job.jobId,
          name: _job.name,
          icon: <i className="iconfont circle">&#xe61f;</i>
        };
  });
  let _tableMergeJobs = slidebarMeta.tableMergeMeta && slidebarMeta.tableMergeMeta.result.map((item,index)=>{
      let _job = slidebarMeta.tableMergeMeta.jobs[item];
      return {
          key: index,
          url: '/mergeTableTools/pages/task_manager/table_merge_detail?jobId='+_job.jobId,
          name: _job.name,
          icon: <i className="iconfont circle">&#xe61f;</i>
        };
  });
  return {
    title: '标题',
    defaultOpenKeys: ["introduction"],
    menu: [{
      key: "introduction",
      name: languageProvider["console.data_manager.introduction"] || "概览",
      url: '/mergeTableTools/pages/introduction/',
      icon: <i className="iconfont">&#xe61a;</i>,
      children:[]
  },{
      key: "data_source_manage",
      name: languageProvider["smartview.data_manager.source"] || "数据源管理",
      url: "\/mergeTableTools\/pages\/schema_manager\/",
      icon: <i className="iconfont">&#xe650;</i>,
      children:[]
  },{
      key: "task_manager",
      name: "任务管理",
      icon: <i className="iconfont">&#xe61e;</i>,
      children:[{
        key: "data_sync",
        url: '/mergeTableTools/pages/task_manager/data_sync/',
        name: languageProvider["console.operations_center"] || "数据同步",
        icon: <i className="iconfont circle">&#xe61f;</i>,
        children:_dataSyncJobs
      },{
        key: "table_merge",
        url: '/mergeTableTools/pages/task_manager/table_merge',
        name: languageProvider["console.operations_center"] || "表合并",
        icon: <i className="iconfont circle">&#xe61f;</i>,
        children:_tableMergeJobs
      }]
  },{
      key: "workflow",
      name: languageProvider["smartview.data_manager.source"] || "工作流管理",
      url: "\/mergeTableTools\/pages\/work_flow\/",
      icon: <i className="iconfont">&#xe784;</i>,
  }]
  }
}

module.exports = genConfig;
