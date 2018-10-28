"use strict";

import { userManage } from "../store-action";


exports.onEnter = function(dispatch,nextState,pp) {
  var uid = window.localStorage.getItem('uid');
  return () => {
    dispatch(userManage.selectUsers({uid:parseFloat(uid)}));
  };
};

// // 授权角色给用户
// exports.grantRoleToUser = function(param, pathParams,opts) {
//   return (dispatch) => {
//     return dispatch(userManager.grantRoleToUser(param, pathParams,opts)).catch((err) => {
//       console.log(err);
//     });
//   }
// };
exports.selectUsers = function(param,urlParam,opt) {
  return dispatch => {
    return dispatch(userManage.selectUsers(param,urlParam,opt));
  };
};
exports.addUser = function(param,urlParam,opt) {
  return dispatch => {
      return dispatch(userManage.addUser(param,urlParam,opt)).then((data) => {
        dispatch(userManage.selectUsers()).catch((err) => {
          console.log(err);
        });
      });
  };
};
exports.updateUser = function(param,urlParam,opt) {
  return dispatch => {
      return dispatch(userManage.updateUser(param,urlParam,opt)).then((data) => {
        dispatch(userManage.selectUsers()).catch((err) => {
          console.log(err);
        });
      });
  };
};
exports.deleteUser = function(param,urlParam,opt) {
  return dispatch => {
    return dispatch(userManage.deleteUser(param,urlParam,opt));
  };
};
exports.userLoginHistory = function(param,urlParam,opt) {
  return dispatch => {
    return dispatch(userManage.userLoginHistory(param,urlParam,opt));
  };
};

