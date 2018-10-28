'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");
let connect = require('react-redux').connect;

var Captcha = require("../../coms/commons/captcha/captcha.jsx");

import { createHashHistory } from 'history'
const history = createHashHistory();

import { browserHistory } from 'react-router'


import { Form, Icon, Input, Button, Checkbox,Tooltip,Row,Col,message } from 'antd';
const FormItem = Form.Item;
let User = require("../../services/login/user.js");

var classnames = require('classnames');

require('./login.less');
class NormalLoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      captchaStatus:""
    };
  }
  handleSubmit(e){
   
    e.preventDefault();
    let self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(self.state.captchaStatus !== "success"){
          return;
        }
        this.props.login(values).then((userData)=>{
           if(userData.data.login){
            window.localStorage.setItem("name",values.name);
            window.localStorage.setItem("privilege",userData.data.privilege);
            window.localStorage.setItem("privilegeLevel",userData.data.privilege_level);
            window.localStorage.setItem("uid",userData.data.uid);
            const path = '/monitoringSystem/pages/index';
            browserHistory.push(path);
           }else{
            message.error("用户名或密码错误！");
           }
        });
      }else{
        //console.log('错误 ', values);
      }
    });
  }
  onCallBackState(_captchaStatus){
    this.setState({
      captchaStatus:_captchaStatus
    });
  }

  render() {

    let props = this.props;
    let indexMeta = props.indexMeta;
    const { getFieldDecorator } = props.form;
    
    return (
      <div className="page-login">
        <div className="login-container">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Captcha color="red" bgImage={require('../../assets/img/captcha_bg.jpg')} onCallBackState={this.onCallBackState.bind(this)} captchaType="Normal" size="4"/>
            </FormItem>
            <FormItem>
              <div className="login-form-remember">
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                   <Checkbox>下次自动登录</Checkbox>
                  )}
              </div>
              <div className="login-form-forgot">
                <Tooltip placement="right" title="请联系管理员，重置密码">
                  <a className="forgot">忘记密码?</a>
                </Tooltip>
              </div>
            </FormItem>
            <FormItem>
              <div className="login-btn">
                <Button type="primary" htmlType="submit" className="login-form-button">
                登录
                </Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
      
    );
  }
 
};
var userAction = require('../../actions/page-action/init-user');
function mapStateToProps(state, ownProps) {
  return {
    indexMeta: {
     
    }
  };
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

module.exports = connect(mapStateToProps, {
  //page-action
  login:userAction.login
})(WrappedNormalLoginForm);
