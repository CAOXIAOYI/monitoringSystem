"use strict";

var React = require('react');
let Component = React.Component;
let PropTypes = React.PropTypes;

import { Input, Button,Form } from 'antd';

let ReactDom = require('react-dom');

var FormItem = Form.Item;
require('./captcha.less');

var Captcha = React.createClass({
  propTypes: {
    bgImage: React.PropTypes.string,
    size: React.PropTypes.string,
    captchaType: React.PropTypes.oneOf(['Calculation', 'Normal']),
    color: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      size: 4,
      captchaType: 'Normal'
    };
  },
  getInitialState: function() {
    return {
      expression: '',
      validate: '',
      validateInput: '',
      status:''
    };
  },
  renderCode: function() {
    //定义expression和result，expression是字符串，result可能是字符串也可能是数字
    var expression = '',
      result;
    //判断验证码类型    
    if (this.props.captchaType == 'Calculation') {
      result = 0; //计算类型则result为数字，初始化为0
      //获取随机的两个两位数
      var Calpre = Math.round(Math.random() * 100);
      var Calafter = Math.round(Math.random() * 100);

      var codeCal = ['-', '+', 'x']; //运算符
      var i = Math.round(Math.random() * 2); //获得随机运算符

      switch (codeCal[i]) { //判断运算符并计算
        case '-':
          expression = Calpre + '-' + Calafter;
          result = Calpre - Calafter;
          break;
        case '+':
          expression = Calpre + '+' + Calafter;
          result = Calpre + Calafter;
          break;
        case 'x':
          expression = Calpre + 'x' + Calafter;
          result = Calpre * Calafter;
          break;
      }
    } else if (this.props.captchaType == 'Normal') {
      result = '';
      var codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //字母库
      for (var i = 0; i < this.props.size; i++ ) {
        result = result + codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
      } //随机获取字母四个

      expression = result.toLowerCase(); //忽略大小写
    }
    let _status = this.validate(this.state.validateInput,result);
    // if(!!!_status){
    //   _status = "error"
    // }
    // this.props.onCallBackState(_status);
    if(this.state.validateInput.length>0){
      this.props.onCallBackState(_status);
    }
    this.setState({ //设置更新状态
      expression: expression,
      validate: result,
      status: _status,
      validateInput:""
    });
  },
  componentDidMount: function() {
    this.renderCode();
  },
  validate: function(value,validate) {
    //var thisInput = this.state.validateInput;
    //var validateCode = this.state.validate;
    if (value.toLowerCase() == validate.toString().toLowerCase()) {
      return 'success';
    } else if (value != '') {
      return 'error';
    }
  },
  onInputChange(evt) {
    // let _state = _.cloneDeep(this.state);
    // let _data = _state.data;
    // let _dataStatus = _state.dataStatus;
    // if(this.validate(evt.target.name,evt.target.value)){
    //    _dataStatus[evt.target.name] = this.validate(evt.target.name,evt.target.value);
    // }
    // _data[evt.target.name] = evt.target.value;
    // this.setState({
    //   "data": _data,
    //   "dataStatus": _dataStatus
    // });
    let _status = this.validate(evt.target.value,this.state.validate);
    if(!!!_status){
      _status = "error"
    }
    this.props.onCallBackState(_status);
    this.setState({
      validateInput:evt.target.value,
      status: _status
    });
  },
  render: function() {
    var inlineStyle = {
      color: this.props.color,
      backgroundImage: 'url(' + this.props.bgImage + ')'
    };
    let captchaExplain = this.state.status === "error"?"请输入正确的验证码":"";
    return (
      <div className="captcha">
        <div className="input">
          <FormItem validateStatus={this.state.status} help={captchaExplain} hasFeedback>
            <Input
              value={this.state.validateInput}
              placeholder="请输入验证码"
              onChange={this.onInputChange}/>
          </FormItem>
          
        </div>
        <div className="button">
          <Button style={inlineStyle} 
            className="am-btn" 
            onClick={this.renderCode}>
            {this.state.expression}</Button>
        </div>       
      </div>
    );
  }

})

module.exports = Captcha;
