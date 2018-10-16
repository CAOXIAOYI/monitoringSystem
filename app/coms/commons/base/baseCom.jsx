"use strict";

var React = require('react');
let Component = React.Component;
let PropTypes = React.PropTypes;

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
let ReactDom = require('react-dom');

let languageProvider = require("../../../services/language/index.js");

class baseCom extends Component {
  constructor(props) {
    super(props);
    // 性能优化插件开关
    if(!!!props.__closeAutoUpdate){
      //浅比较 的性能优化
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    // 国际化开关
    this.__isTranslate = true;
    // 权限控制开关
    this.__isPermision = true;
  }
  componentDidMount() {
    var dom = ReactDom.findDOMNode(this);
    this.dealWithDom(dom);
  }
  // 遍历组件的所有dom元素
  dealWithDom(dom) {
/*    let self = this;
    let queue = [dom];
    while(queue.length > 0){
      let currentDom = queue.shift();
      $(currentDom).each(function(){
        if(self.__isTranslate){
          self.translate(this);
        }
        if(self.__isPermision){
          self.permision(this);
        }
      });
      let _children = $(currentDom).children();
      if(_children && _children.length > 0) {
        queue = queue.concat(_children || []);
      }
    }*/
  }
  // 国际化替换
  translate(dom) {
    let i18n = $(dom).attr("data-i18n");
    if(i18n){
      let _text = languageProvider[i18n];
      _text && $(dom).text(_text);
    }
  }
  // 权限控制
  permision(dom) {
    let resultPromise = null;
    let _perObj = {};
    // 数据权限
    let dataPer = $(dom).attr("data-per");
    // 用户权限
    let userPer = $(dom).attr("data-user-per");

    if(userPer){
      _perObj = this._dealWithPerString(userPer);
      resultPromise = Promise.resolve(true); //_perObj.expr === User.permision
    }
    if(dataPer){
      _perObj = this._dealWithPerString(dataPer);
      resultPromise = Promise.resolve(false); //等军浪来对
    }
   if(userPer || dataPer){
     resultPromise.then((hasPermision) => {
       if(hasPermision) {
         if(_perObj.hasPermisionClass){
           $(dom).addClass(_perObj.hasPermisionClass);
         }
       } else {
         if(_perObj.hasNoPermisionClass){
           $(dom).addClass(_perObj.hasNoPermisionClass);
         } else {
           $(dom).css("display","none");
         }
       }
    });
   }
  }
  _dealWithPerString(str){
    let strArray = str.split(" | ");
    let result = {
      expr: "",
      hasPermisionClass: null,
      hasNoPermisionClass: null
    };
    if(strArray.length === 1){
      result.expr = strArray[0];
    } else if(strArray.length === 2){
      result.expr = strArray[0];
      let _classes =  strArray[1].split(":");
      result.hasPermisionClass = _classes[0];
      result.hasNoPermisionClass = _classes[1];
  }
    return result;
  }
}

module.exports = baseCom;
