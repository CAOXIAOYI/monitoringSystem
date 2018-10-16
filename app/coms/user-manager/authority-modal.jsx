'use strict';

var React = require('react');

import { Modal, Spin, Button,Checkbox, Row, Col,message } from 'antd';
let PRIVILEGE = require("../../services/privilege.js");
require('./authority-modal.less');
let _ = require("lodash");
let BaseCom = require("../commons/base/baseCom.jsx");

class AuthorityModal extends BaseCom{

  constructor(props) {
    super(props);
    this.state = {
      checkedList:[],
      privilege:""
    };
  }
  componentWillReceiveProps(nextProps) {
    
    if(nextProps.modalState.data.id !== this.props.modalState.data.id){
       this.setState({
         privilege: nextProps.modalState.data.privilege || 0
      }); 
    }
   
  }
  onChange(e) {
    let _checkedList = _.cloneDeep(this.state.checkedList);
    let _privilege = PRIVILEGE.setPrivilege(parseInt(this.state.privilege),parseInt(e.target.value));
    this.setState({
      privilege:_privilege
    });
  }
  submitPrivilege(){
    let userInfo = this.props.modalState.data;
    userInfo.privilege = this.state.privilege;
    this.props.updateUser(userInfo).then((result)=>{
      message.success("授权成功");
      this.handleCancel();
    });
  }
  render() {
    var privilege = this.state.privilege;
    let modalState = this.props.modalState;
    return (
      <div>
        <Modal title={modalState.data.name + ' 用户权限设置'} width={800} visible={modalState.show} 
          className="authority-modal"
          onCancel={this.handleCancel.bind(this)}
          okText="授权"
          onOk={this.submitPrivilege.bind(this)}>
            <div className="authority-container">
              <Row>
                <Col span={12}>
                  <span className="menu">首页</span>
                  <Checkbox value="10" checked={PRIVILEGE.isPrivilege(parseInt(privilege),10)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
                <Col span={12}>
                  <span className="menu">参数设置</span>
                  <Checkbox value="4" checked={PRIVILEGE.isPrivilege(parseInt(privilege),1)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="menu">子系统监测</span> 
                  <Checkbox value="9" checked={PRIVILEGE.isPrivilege(parseInt(privilege),9)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
                <Col span={12}>
                  <span className="menu">电机启停特性</span>
                  <Checkbox value="3" checked={PRIVILEGE.isPrivilege(parseInt(privilege),3)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="menu">电能质量</span> 
                  <Checkbox value="8" checked={PRIVILEGE.isPrivilege(parseInt(privilege),8)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
                <Col span={12}>
                  <span className="menu">历史数据</span>
                  <Checkbox value="2" checked={PRIVILEGE.isPrivilege(parseInt(privilege),2)} onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="menu">设备特性</span> 
                  <Checkbox value="7" checked={PRIVILEGE.isPrivilege(parseInt(privilege),7)}  onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
                <Col span={12}>
                  <span className="menu">监测系统状态</span>
                  <Checkbox value="1" checked={PRIVILEGE.isPrivilege(parseInt(privilege),4)}  onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="menu">谐波查询</span> 
                  <Checkbox value="6" checked={PRIVILEGE.isPrivilege(parseInt(privilege),6)}  onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
                <Col span={12}>
                  <span className="menu">系统设置</span>
                  <Checkbox value="0" checked={PRIVILEGE.isPrivilege(parseInt(privilege),0)}  onChange={this.onChange.bind(this)}></Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="menu">设备接入管控 </span>
                  <Checkbox value="5" checked={PRIVILEGE.isPrivilege(parseInt(privilege),5)}  onChange={this.onChange.bind(this)}></Checkbox>
                </Col> 
              </Row>
            </div> 
        </Modal>
      </div>
    );
  }
  handleCancel() {
    this.props.onHide && this.props.onHide();
  }
}

module.exports = AuthorityModal;
