'use strict';

var _ = require('lodash');
var actions = require('../../actions/store-action/').user.actions;

var initState = {
  isFetching: false,
  error: {},
  tenant: '',
  isRedirecting: false,
  userInfo: []
};
module.exports = function(state = initState, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    // case actions.async.login.start:
    //   newState.isRedirecting = false;
    //   newState.isFetching = true;
     // return newState;
    case actions.async.login.success:
      //newState.isFetching = false;
      return newState;

    default:
      return newState;
  }
};
