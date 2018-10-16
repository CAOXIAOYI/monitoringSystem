'use strict';

module.exports = ns => name => {
  var action = ns(name);
  var actionCreater = function (data) {
    return (dispatch) => {
      dispatch({
        type: action,
        data: data
      });
      return Promise.resolve();
    };
  };
  return {
    action,
    actionCreater
  };
};
