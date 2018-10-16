'use strict';
import { Collapse, Form, Select, Modal, Input, Button, Row, Col, Icon, Table,AutoComplete } from 'antd';

var React = require('react');
require("./alarm-config.less");
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const AutoCompleteOption = AutoComplete.Option;
const Panel = Collapse.Panel;
let connect = require('react-redux').connect;
let User = require("../../../services/login/user.js");
let baseCom = require("../../../coms/commons/base/baseCom.jsx");
let languageProvider = require("../../../services/language/index.js");
let _ = require("lodash");

let perService = require("../../../services/permission");
const confirm = Modal.confirm;
let validService = require("../../../services/validate/validate.js");
var classnames = require('classnames');

class AlarmConfig extends baseCom {
  constructor(props) {
    super(props);
    this.UserInfo = User.getUserSync();
    this.state = {
      data: {
        id: "",
        mail: "",
      },
      dataStatus: {
        mail: {
          status: "",
          explain: ""
        }
      },
      showCreateForm: false,
      showEditForm: false,
      cancelBtn: true,
      deletesBtn:false,
    };
    this.usersColumns = [{
      title: "告警邮箱地址",
      dataIndex: "mail",
      width: "70%",
      key: 1
    }, {
      title: languageProvider["console.common.operation"] || "操作",
      width: "20%",
      key: 5,
      render: (text, record) => (
        <span>
          <a href="#"  data-i18n="console.common.edit" onClick={this.showEditWorkspace.bind(this,record)} >编辑</a> 
          <span className = "ant-divider" ></span>
          <a href="#"   data-i18n="console.common.delete" onClick={this.deleteWorkspace.bind(this,record)}>删除</a> 
        </span>
      )
    }];
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
    if(type === "cancelDeletes" && !this.state.deletesBtn){
      this.setState({
        deletesBtn:!this.state.deletesBtn
      })
    }
    if(type === "deletes" && this.state.deletesBtn){
      this.setState({
        deletesBtn:!this.state.deletesBtn
      })
    }
  }
  validInit() {
    let _dataStatus = {
      mail: {
        status: "",
        explain: ""
      }
    }
    this.setState({ dataStatus: _dataStatus });
  }
  deleteWorkspace(record) {
    confirm({
      title: languageProvider["workspace.content.confirm_delete_workspace"] || '确认要删除此项记录吗?',
      content: languageProvider["workspace.content.confirm_content_workspace"] || '请确认是否删除记录,删除后不能恢复',
      width: "355px",
      style: { position: "absolute", left: "40%", top: "30%" },
      okText: languageProvider["console.button.confirm"] || "确定",
      cancelText: languageProvider["console.button.cancel"] || "取消",
      onOk: () => {
        this.props.deleteWorkspace({ workspaceId: record.id }, { workspaceId: record.id }).then((data) => {
          //messageService.ordinary("COMMON-REMOVE-SUCCESS");
        });
      },
      onCancel() {},
    })
    
  }
  saveWorkspace() {
    let _user = User.getUserSync();
    let _state = _.cloneDeep(this.state);
    let meta = _state.data;
    let _dataStatus = _state.dataStatus;
    var param = {
      id: meta.id,
      name: meta.name,
      code: meta.code,
      description: meta.description,
      owner: meta.owner
    };
    for (var item in param) {
      switch (item) {
        case "name":
          var _result = validService.validateRequired(param[item]);
          if (_result.status === "success") {
            _dataStatus[item] = validService.validateName(param[item]);
          } else if (_result.status === "error") {
            _dataStatus[item] = _result;
          }
          break;
        case "code":
          var _result = validService.validateRequired(param[item]);
          if (_result.status === "success") {
            _dataStatus[item] = validService.validateCode(param[item]);
          } else if (_result.status === "error") {
            _dataStatus[item] = _result;
          }
          break;
        case "owner":
          _dataStatus[item] = validService.validateRequired(param[item]);
          break;
      }
    }
    this.setState({ "dataStatus": _dataStatus });
    for (let status in _dataStatus) {
      if (_dataStatus[status].status !== "success") {
        return;
      }
    }
    if (this.state.showEditForm) {
      let pathParam = { workspaceId: param.id };
      param["workspaceId"] = param.id ;
      this.props.updateWorkspace(param, pathParam).then((data) => {
        //messageService.ordinary("COMMON-MODIFY-SUCCESS");
        this.validInit();
      })
    } else {
      this.props.createWorkspace(param).then((data) => {
        this.setState({ showCreateForm: false });
        if (_user.wsList.length === 0 && _user.userId === param.owner) {
          //messageService.ordinary("CONSOLE-WS-RELOAD");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          //messageService.ordinary("COMMON-ADD-SUCCESS");
          this.validInit();
        }
      });
    }
  }
  onInputChange(evt) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    let _dataStatus = _state.dataStatus;
    switch (evt.target.name) {
      case "name":
        var _result = validService.validateRequired(evt.target.value);
        if (_result.status === "success") {
          _dataStatus[evt.target.name] = validService.validateName(evt.target.value);
        } else if (_result.status === "error") {
          _dataStatus[evt.target.name] = _result;
        }
        break;
      case "code":
        var _result = validService.validateRequired(evt.target.value);
        if (_result.status === "success") {
          _dataStatus[evt.target.name] = validService.validateCode(evt.target.value);
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
  showEditWorkspace(record, event) {
    this.props.getMembers({ pageSize: 10000 });
    let _data = {
      id: record["id"],
      name: record["name"],
      password: record["password"],
      description: record["description"],
      mail: record["mail"],
    }
    let _stateData = _.cloneDeep(this.state);
    _stateData.showCreateForm = true;
    _stateData.showEditForm = true;
    _stateData.data = _data;
    this.setState(_stateData);
  }
  showCreateForm() {
    let _stateData = _.cloneDeep(this.state);
    this.props.getMembers({ pageSize: 10000 });
    let _data = {
      id: "",
      mail: "",
    }
    _stateData.data = _data,
      _stateData.showCreateForm = true;
    _stateData.showEditForm = false;
    this.setState(_stateData);
  }
  hideForm() {
    let _stateData = _.cloneDeep(this.state);
    _stateData.showCreateForm = false;
    _stateData.showEditForm = false;
    this.setState(_stateData);
  }
  createEditFormDOM() {
    var meta = this.state.data;
    var metaStatus = this.state.dataStatus;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    var membersList = [];
    // if (this.props.memberMeta.result) {
    //   membersList = this.props.memberMeta.result.map((item, index) => {
    //     return _.assign({
    //       key: index
    //     }, this.props.memberMeta.members[item]);
    //   }).map((members, index) => {
    //     return (
    //       <Option value={members.user} key={members.user}>{members.nickName}</Option>
    //     )
    //   });
    // }
    let selectedClass = classnames({
      "selected": true,
    })
    return (
      <div className="users-list">
       <Row>
          <Col>
            <h3 data-i18n="console.workspace_config.member_list" className="sub-title">{this.state.showEditForm?"编辑邮箱":"添加邮箱"}</h3>
          </Col>
        </Row>
        <Form layout="horizontal" className="add-user-form">
          <FormItem id="control-input" label={"添加告警邮箱地址"} {...formItemLayout} validateStatus={metaStatus.mail.status}
      help={metaStatus.mail.explain} hasFeedback>
            <Input type="text" value={meta.mail} name="mail" disabled={this.state.editWsForm} placeholder={"请输入邮箱"} onChange={this.onInputChange.bind(this)}/>
          </FormItem>
        </Form>
        <div className="btn-row">
          <div className="index-chageBtn">
            <div className={!!!this.state.cancelBtn?selectedClass:""} onClick={this.saveWorkspace.bind(this)} onMouseOver={this.chanageHandleClick.bind(this,"confirm")}>
              <span>确认</span>
            </div>
            <div className={this.state.cancelBtn?selectedClass:""} onClick={this.hideForm.bind(this)} onMouseOver={this.chanageHandleClick.bind(this,"cancel")}>
              <span>取消</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    var usersList = [{
      "id":1,
      "mail":"112291@qq.com",
    },{
      "id":2,
      "mail":"112291@qq.com",
    },{
      "id":3,
      "mail":"112291@qq.com",
    },{
      "id":4,
      "mail":"112291@qq.com",
    },{
      "id":11,
      "mail":"112291@qq.com",
    },{
      "id":322,
      "mail":"112291@qq.com",
    },{
      "id":122,
      "mail":"112291@qq.com",
    },{
      "id":222,
      "mail":"112291@qq.com",
    },{
      "id":33,
      "mail":"112291@qq.com",
    },{
      "id":333,
      "mail":"112291@qq.com"
    }];
    // if (this.props.workspaceConfigMeta.result) {
    //   workspaceList = this.props.workspaceConfigMeta.result.map((item, index) => {
    //     return _.assign({
    //       key: index
    //     }, this.props.workspaceConfigMeta.workspaces[item]);
    //   })
    // }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    let createFormDOM = () => {
      if (this.state.showCreateForm) {
        return this.createEditFormDOM();
      }
    };
    let selectedClass = classnames({
      "selected": true,
    })
    return (
      <div className="alarm-config-page">
      <div className="alarm-config-container">
        {createFormDOM()} 
        <div className="members">
          <Row>
            <Col>
              <h3 data-i18n="console.workspace_config.member_list" className="sub-title">已添加邮箱列表:</h3>
            </Col>
          </Row>
        </div>
        <div className="memberList">
          <Table rowSelection={rowSelection} rowKey={record => record.id}  pagination={false} scroll={{ y: 300 }} dataSource={usersList} columns={this.usersColumns} />
        </div>
        <div className="btn-row">
          <div className="add-chageBtn" onClick={this.showCreateForm.bind(this)} >
            <span>新增</span>
          </div>
          <div className="index-chageBtn">
            <div className={!!!this.state.deletesBtn?selectedClass:""} onClick={this.saveWorkspace.bind(this)} onMouseOver={this.chanageHandleClick.bind(this,"deletes")}>
              <span>批量删除</span>
            </div>
            <div className={this.state.deletesBtn?selectedClass:""} onClick={this.hideForm.bind(this)} onMouseOver={this.chanageHandleClick.bind(this,"cancelDeletes")}>
              <span>取消</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
};

//var workspaceConfigAction = require("../../../actions/page-action/system-config/workspace-config");
var userManagerAction = require("../../../actions/page-action/user-manage");

function mapStateToProps(state, ownProp) {
  // let workspaceConfigMeta = state.workspaceConfig;
  // let memberMeta = state.userManager.member;
  // let roleMeta = state.userManager.role;
  // let userMeta = state.userManager.user;
  return {
    // workspaceConfigMeta,
    // memberMeta,
    // roleMeta,
    // userMeta,
  };
}
module.exports = connect(
  mapStateToProps, {
    getMembers: userManagerAction.getMembers,
    getUsers: userManagerAction.getUsers,
    getRoles: userManagerAction.getRoles,
    grantRoleToUser: userManagerAction.grantRoleToUser,
    revokeRoleFromUser: userManagerAction.revokeRoleFromUser,
    removeUser: userManagerAction.removeUser,
    addUser: userManagerAction.addUser,
  }
)(AlarmConfig);
