"use strict";

function validateRequired(value) {
  if(value.length > 0){
    return {
      status:"success",
      explain:""
    }
  }else{
    return {
      status:"error",
      explain:"此项必填"
    }
  }
}

function validateCode(value) {
  var patrnCode = /^[a-zA-Z]\w*$/;
  if (!patrnCode.test(value)){
    return {
      status:"warning",
      explain:"此项必须以英文字母开头；并由字母，数字或下划线组成"
    }
  }else{
    return {
      status:"success",
      explain:""
    }
  }
}

function validateName(value) {
 var patrnName = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/;
 if (!patrnName.test(value)){
    return {
      status:"warning",
      explain:"此项必须以中文、英文字母开头；并由字母，数字，下划线或中文组成"
    }
  }else{
    return {
      status:"success",
      explain:""
    }
  }
}

module.exports = {
  validateRequired,
  validateCode,
  validateName
};
