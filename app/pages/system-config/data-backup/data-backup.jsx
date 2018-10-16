'use strict';

var React = require('react');

require("./data-backup.less");

import { Form, Input, Button, Select,Row,Col } from 'antd';
let languageProvider = require("../../../services/language/index.js");
let baseCom = require("../../../coms/commons/base/baseCom.jsx");
const FormItem = Form.Item;
const Option = Select.Option;
var classnames = require('classnames');

let validService = require("../../../services/validate/validate.js");

class DataBackup extends baseCom {
  constructor(props) {
    super(props);
    this.state = {
      cancelBtn: true,
      data: {
        IP: "",
        name: "",
        password: "",
        path: ""
      },
      dataStatus: {
        name: {
          status: "",
          explain: ""
        },
        password: {
          status: "",
          explain: ""
        },
        IP: {
          status: "",
          explain: ""
        },
        path: {
          status: "",
          explain: ""
        }
      },
    };
   
  }
  chanageHandleClick(type){
    
    if(type === "cancel" && !this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn
      })
    }
    if(type === "confirm" && this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn
      })
    }
  }
  onInputChange(evt) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    let _dataStatus = _state.dataStatus;
    switch (evt.target.name) {
      case "IP":
        var _result = validService.validateRequired(evt.target.value);
        if (_result.status === "success") {
          _dataStatus[evt.target.name] = validService.validateName(evt.target.value);
        } else if (_result.status === "error") {
          _dataStatus[evt.target.name] = _result;
        }
        break;
      case "name":
        var _result = validService.validateRequired(evt.target.value);
        if (_result.status === "success") {
          _dataStatus[evt.target.name] = validService.validateName(evt.target.value);
        } else if (_result.status === "error") {
          _dataStatus[evt.target.name] = _result;
        }
        break;
    }
    _data[evt.target.name] = evt.target.value;
    this.setState({
      "data": _data,
      "dataStatus": _dataStatus
    });
  }
  render() {
    var meta = this.state.data;
    var metaStatus = this.state.dataStatus;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    let selectedClass = classnames({
      "selected": true,
    })
    return (
       <div className="data-backup-page">
          <div className="data-backup-container">
            <Row>
              <Col>
                <h3 className="sub-title">数据备份设置</h3>
              </Col>
            </Row>
            <Form layout="horizontal" className="add-data-backup-form">
              <FormItem id="control-input" label={"IP地址"} {...formItemLayout} validateStatus={metaStatus.IP.status}
          help={metaStatus.IP.explain} hasFeedback>
                <Input type="text" value={meta.IP} name="IP" placeholder={"请输入IP地址"} onChange={this.onInputChange.bind(this)}/>
              </FormItem>
              <FormItem id="control-input" label={languageProvider["console.common.name"]||"用户名"} {...formItemLayout} validateStatus={metaStatus.name.status}
          help={metaStatus.name.explain} hasFeedback>
                <Input type="text" value={meta.name} name="name" placeholder={languageProvider["console.common.name_tip"] || "请输入用户名"} onChange={this.onInputChange.bind(this)}/>
              </FormItem>
              <FormItem id="control-input" label={"密  码"} {...formItemLayout} validateStatus={metaStatus.password.status}
        help={metaStatus.password.explain} hasFeedback>
                <Input type="password" value={meta.password} name="password" disabled={this.state.editWsForm} placeholder={"请输入密码"} onChange={this.onInputChange.bind(this)}/>
              </FormItem>
              <FormItem id="control-input" label={"路  径"} {...formItemLayout} validateStatus={metaStatus.path.status}
          help={metaStatus.path.explain} hasFeedback>
                <Input type="text" value={meta.path} name="path" disabled={this.state.editWsForm} placeholder={"请输入邮箱"} onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Form>
            <div className="btn-row">
              <div className="index-chageBtn">
                <div className={!!!this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"confirm")}>
                  <span>确认</span>
                </div>
                <div className={this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"cancel")}>
                  <span>取消</span>
                </div>
             </div>
            </div>
        </div>
      </div>
    );
  }
};

module.exports = DataBackup;
