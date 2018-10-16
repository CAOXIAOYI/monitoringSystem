'use strict';
let languageProvider = require("../../../../services/language/index.js");
module.exports = {
  title: languageProvider["console.header.operation_center"] || '运维中心',
  menu: [{
    key: '1',
    name: languageProvider["console.operation_center.data_sync"] || '标签同步结果',
    url: '/pages/operation_center/data_sync',
    icon: ''
  }, {
    key: '2',
    name: languageProvider["console.operation_center.sync_detail"] || '我的同步任务',
    url: '/pages/operation_center/sync_detail',
    icon: ''
  }]
};
