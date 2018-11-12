'use strict';

var $ = require('jquery');
import {
  message,
  Button
} from 'antd';
var UrlPoxy = '';

exports.request = function request(method, url, data, callback) {
  if (!callback && typeof data === 'function') {
    callback = data;
    data = null;
  }
  function httpRequest(method, url, params, callback) {
    var setting = {
      url: UrlPoxy + url,
      // url: url,
      data: params,
      type: method,
      dataType: 'json',
      error: function(xhr, textStatus, error) {
        if (xhr.responseJSON) {
          return callback && callback(xhr.responseJSON.error || xhr.responseJSON, []);
        }
        if (textStatus) {
          return callback && callback(textStatus, []);
        }
        callback && callback(null, []);
      },
      success: function(data) {
        // console.log("httpRequest---ajax---success--->",data);
        if(!data.code){
          data.code = 'SUCCESS';
        }
        if (data.code && data.code !== 'SUCCESS' && data.code !== 'sucess') {
          return callback && callback(data, []);
        }
        if (!data.code && data.errorCode !== 0 && data.SUCCESS !== true) {
          message.error(data.msg);
          return callback && callback(data, []);
        }
        if (data.code === 'SUCCESS' || data.code === 'sucess' || data.SUCCESS === true) {
          if (data.SUCCESS === true) {
            //message.success(data.msg);
            return callback && callback(null, data.data);
          }
          if (data.msg) {
            //message.success(data.msg);
            return callback && callback(null, data.data);
          }
          return callback && callback(null, data.data);
          //return callback && callback(null, data);
        }
        callback && callback(null, data);
      }
    };
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      setting.data = JSON.stringify(setting.data);
      setting.contentType = 'application/json; charset=utf-8';
    }
    // console.log("setting--->",setting);
    return $.ajax(setting);
  }
  // console.log("url=", url);

  var mockData = {};
  if (url) {
    var NumTest = isNaN(url.substring(url.length - 1, url.length));
    if (NumTest === false) {
      if (url.indexOf('ModelEntity/entitydetails') > 0) {
        return httpRequest(method, '/smartView/ModelEntity/entitydetails', data, callback);
      }
      if (url.indexOf('ModelRelation/relationdetails') > 0) {
        return httpRequest(method, '/smartView/ModelRelation/relationdetails', data, callback);
      }
    }
  }
  // switch (url) {
  //   case '/smartView/Category/getChildCategories':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getModelDiagram':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getNodes':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getNodes':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/exploreModelNode':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/getNodeTableDetail':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/View/exploreViewNode':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/insertDiagram':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/dragNode':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/View/ViewTreeList':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/tableDetail':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/View/getViewById':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/View/getViewById':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/tableColumns':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/identifyList':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/identifyList':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/deleteTableIdentify':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/deleteTableIdentify':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/insertEIdentify':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/insertRIdentify':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getNodes':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getAllNodeList?type=relation':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/api/v2/common/allSuitableType':
  //     mockData = getDataType.data;
  //     break;
  //   case '/api/v2/categories':
  //     mockData = getCategories.data;
  //     break;
  //   case '/smartView/ModelEntity/getNodeTableDetai':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/sourceList':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/tableList':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/Category/addRootCategory':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/saveModel':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/Category/deleteCategory':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelExplore/getAllNodeList?type=entity':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/Category/updateCategory':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/insertEntity':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/updateEntity':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/insertRelation':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/deleteById':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/addRelation':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/tableSumInfo':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/CloudSource/tableGraph':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/DataInstance':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/getDataDisDiagram':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/saveInstance':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/addTask':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/dtScheduler':
  //     mockData = GetInstanceRecord.data;
  //     break;
  //   case '/smartView/DataDisc/showTask':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/addEntity':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/getInstanceStatus':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/getDetails':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelEntity/entitydetails':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/ModelRelation/relationdetails':
  //     return httpRequest(method, url, data, callback);
  //     break;
  //   case '/smartView/DataDisc/saveInformation':
  //     return httpRequest(method, url, data, callback);
  //     break;
  // }

  switch (url) {
    default:
      return httpRequest(method, url, data, callback);
  }
  return callback && callback(null, mockData);
};
