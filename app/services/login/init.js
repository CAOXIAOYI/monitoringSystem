"use strict";

import User from "./user.js";
import docCookies from "../cookie/cookie";

let _ = require("lodash");
//let HttpRequest = require("../../httpCenter").otm.request;
//let urlResolve = require("@ali/dtboost-url-helper").urlResolve;
//let HttpRequestURL = require("@ali/dtboost-url-helper").otm.url;

var HttpRequest = require("../../httpCenter/request");
let urlResolve = require("../../httpCenter/resolve");
let HttpRequestURL = require("../../httpCenter/url");

function init() {
  //所有模块必须返回一个promise
  let queue = [];
  // 用户信息登录
  let userPromise = User.getUser();
   //HttpRequest.getCanvas({id: canvasId}).then((data) => {});

  let wsPromise = HttpRequest.request("GET", urlResolve("/api/v2/luser/workspaces/",true), "");
  let privileges = HttpRequest.request(HttpRequestURL.getPrivileges.method, HttpRequestURL.getPrivileges.url, "");
  queue.push(userPromise);
  queue.push(wsPromise);
  queue.push(privileges);
  return Promise.all(queue).then((data) => {
    if(data[1].code === "SUCCESS"){
      if (data[1].data.length > 0) {
        let _wsId = window.localStorage.getItem("wsId");
        if (_wsId) {
          let hasWs = !!(data[1].data.filter((item) => {
            return item.id == _wsId;
          }).length);
          !hasWs && (window.localStorage.setItem("wsId",data[1].data[0].id));
        } else {
          User.setUserInfo({
            wsId: data[0].id 
          });
          window.localStorage.setItem("wsId",data[1].data[0].id);
        }
      }
    }
    if(data[2].code === "SUCCESS"){
      User.setUserInfo({
        privileges: data[2].data 
      });
    }
  })
}

module.exports = init;
