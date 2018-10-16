'use strict';

var meta = {
  odps: {
    enName: 'MaxCompute',
    cnName: '大数据计算服务'
  },
  ads: {
    enName: 'Analytic DB',
    cnName: '分析型数据库'
  },
  rds: {
    enName: 'ApsaraDB for RDS',
    cnName: '云数据库RDS版'
  },
  ots: {
    enName: 'Table Store',
    cnName: '表格存储'
  },
  streamsql: {
    enName: 'StreamCompute',
    cnName: '流式计算'
  },
  oss: {
    enName: 'Object Storage Service',
    cnName: '对象存储'
  },
  datahub: {
    enName: 'Datahub Service',
    cnName: 'Datahub服务'
  }
};

exports.getEnName = function (driverType) {
  if (typeof driverType !== 'string') return '';
  driverType = driverType.toLowerCase();
  if (driverType === 'mysql') driverType = 'rds';
  let aMeta = meta[driverType] || {};
  return aMeta.enName || driverType;
};

exports.getMeta = function (driverType) {
  if (typeof driverType !== 'string') return '';
  driverType = driverType.toLowerCase();
  if (driverType === 'mysql') driverType = 'rds';
  let aMeta = meta[driverType] || {};
  return aMeta;
};
