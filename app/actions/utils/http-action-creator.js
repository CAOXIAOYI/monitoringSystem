'use strict';

var ajax = require('../../httpCenter').request;
var urls = require('../../httpCenter').url;
var errors = require('../../httpCenter').error;
let Modal = require("antd").Modal;

var processorMap = {
  onFail: null,
  onSuccess: null
};


module.exports = (ns) => (name, processors = processorMap) => {
  let u = urls[name] || {};
  let url = u.url;
  let method = u.method;
  let defaultParam = u.defaultParam;
  let actions = {
    start: ns(name + '_REQUEST'),
    success: ns(name + '_SUCCESS'),
    fail: ns(name + '_FAIL')
  };

  let grep = /#([\w\.\-\+]+)/;
  function actionCreater(param, urlReplaceMap, option = {}) {
    // url中的 :param_id
    let u = url;
    let m = grep.exec(u);
    while (m) {
      //u = u.replace(':' + m[1], urlReplaceMap[m[1]]);//时间格式问题不能有冒号
      u = u.replace('#' + m[1], urlReplaceMap[m[1]]);
      m = grep.exec(u);
    }
    param = Object.assign({}, defaultParam, param);

    return (dispatch, state) => {
      dispatch({ type: actions.start, data: param, option: option});

      //使用原生的promise放弃ajax的拓展promise
      return new Promise(function(resolve,reject){
        ajax.request(method, u, param, function(error, data) {
          // console.log("thisError=",error);
          if (error) {
            if (error.code === "NOT_LOGIN") {
              Modal.error({
                title: '登陆错误',
                content: '您的登陆信息已过期，请点击确认重新登录',
                okText: '确定',
                onOk: function() {
                  window.location.href = error.data + window.location.href;
                }
              });
            } else {
              errors.process(name, error);
            }

            dispatch({ 
              type: actions.fail, 
              data: error,
              params: param,
              pathParams: urlReplaceMap,
              option: option
            });

            reject({
              type: actions.fail, 
              data: error
            });
            return;
          }

          dispatch({ type: actions.success, data: data, params: param, pathParams: urlReplaceMap, option:option});
          resolve({ type: actions.success, data: data, params: param, pathParams: urlReplaceMap, option:option});

        });
      })
    }
  }
  return {
    actions,
    actionCreater
  };
};
