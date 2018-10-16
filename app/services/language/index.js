"use strict";

let LANGUAGE = window.localStorage.getItem("language");

if(LANGUAGE === "chinese"){
  module.exports = require("./aliyun_dtboost_zh_CN");
} else if(LANGUAGE === "english"){
  module.exports = require("./aliyun_dtboost_en_US");
} else {
  module.exports = require("./aliyun_dtboost_zh_CN");
}


