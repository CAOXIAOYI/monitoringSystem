'use strict';

let user = require('../store-action/').user;

exports.onEnter = function(dispatch) {
  console.log("初始化用户信息");
  // return () => {
  //   dispatch(user.getRootTenant());
  // };
};

exports.login = function(param,urlParam,opt) {
  return dispatch => {
    return dispatch(user.login(param,urlParam,opt));
  };

  // return () => {
  //   dispatch(electricalMachine.bigPowerLeftMenu())
  //   .then((data) => {
  //       if(data.data.length>0){
  //         dispatch(electricalMachine.menuItemTimestamp({},{meterId:data.data[0].meterId})).catch((err) => {
  //           console.log(err);
  //         });
  //       }
  //     })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

};
