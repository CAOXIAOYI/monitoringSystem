'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').userManage.actions;
var Adaptor = require("./adaptor.js");
var initState = {
  result: [],
  users: {},
  page: 1,
  num: 0,
  pageSize: 10,
  loginHistory:[]
};

// "login",
//     "selectUsers",
//     "addUser",
//     "updateUser",
//     "addUser",
//     "deleteUser",
//     "userLoginHistory",

module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    // case actions.async.login.start:
    //   newState.isRedirecting = false;
    //   newState.isFetching = true;
     // return newState;
    case actions.async.selectUsers.success:
      let _usersData = Adaptor.tranformHomeList(action.data);

      newState = _.assign(newState, {
        result: _.cloneDeep(_usersData.result),
        users: _.assign({}, newState.users, _usersData.users),
        num:_usersData.num,
        page:action.params.page,
        pageSize:action.params.pageSize,
      });
      return newState;
    case actions.async.addUser.success:
      //newState.isFetching = true;
      return newState;
    case actions.async.updateUser.success:
      //newState.isFetching = false;
      return newState;
    case actions.async.deleteUser.success:
      //newState = Object.assign(newState, action.data);
      newState.isFetching = false;
      
      let resultIndex = newState.result.indexOf(action.pathParams.id);
        newState.result.splice(resultIndex, 1);
        delete newState.users[action.pathParams.id];
        // if (!_.get(action, 'data.un_init')) {
        //   window.location = '/monitoringSystem/login';
        // }
      return newState;
    case actions.async.userLoginHistory.success:
      //newState.isRedirecting = true;
      newState.loginHistory = action.data;
      return newState;
      // setTimeout(function () {
      //   window.location = '/console/pages';
      // }, 2000);
    // case actions.async.getUserInfo.start:
    //   newState.isFetching = true;
    //   return newState;
    // case actions.async.getUserInfo.success:
    //   newState.isFetching = false;
    //   newState.userInfo = action.data;
    //   return newState;
    default:
      return newState;
  }
};
