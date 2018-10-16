"use strict";

//let HttpRequest = require("@ali/dtboost-url-helper").otm.request;
let user = {};
let _ = require("lodash");
var HttpRequest = require("../../httpCenter/request");

// function getUser(userInfo) {
//   HttpRequest.getUser(userInfo,function(error,data){
//     user.name = data.nickname;
//     user.wsId = null;
//     user.privileges = null;
//   });
//   return Promise.resolve(user);
// }
function getUser(userInfo) {
  console.log("userInfo--->",userInfo);
  //return new Promise((resolve,reject) => {
    //console.log("resolve--->",resolve);
    //HttpRequest.request("GET","/console/api/tenant","",{},function(error,data){
    // HttpRequest.getUser({
    //  userInfo: userInfo,
    // }).then((data) => {
    //    if(data){
    //      user.name = data.databaseInfo;
    //    }
    //    window.localStorage.setItem("name",user.name);
    //    window.localStorage.setItem("userId",user.userId);
    //    resolve(user);
    // })
     let _name = window.localStorage.getItem("name");
     let _privilege = window.localStorage.getItem("privilege");
     user.name = _name;
     user.privilege = _privilege;
     return user;
     //resolve(user);
    // HttpRequest.getUser(userInfo,function(error,data){
    //   debugger;
    //   console.log("data--->",data);
    //   if(error){
    //     //reject();
    //     return;
    //   }
    //   if(data){
    //     user.name = data.nickname;
    //   }else{
    //     user.name = "unknown";
    //   }
    //   user.userId = data.userId;
    //   user.wsId = null; //这里接口没下来
    //   user.isAdmin = data.isAdmin;
    //   user.adminList = data.adminList;
    //   user.tenantCode = data.tenantCode;
    //   window.localStorage.setItem("name",user.name);
    //   window.localStorage.setItem("userId",user.userId);
    //   window.localStorage.setItem("tenantCode",user.tenantCode);
    //   //resolve(user);
    // });
  //})
}
function getUserSync() {
  return user;
}

function setUserInfo(info) {
  user = _.assign({},user,info);
}

module.exports = {
  getUser,
  getUserSync,
  setUserInfo
};
