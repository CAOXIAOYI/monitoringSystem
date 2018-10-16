'use strict';
import { Collapse, Form, Select, Modal, Input, Button, Row, Col, Icon, Table,AutoComplete,message } from 'antd';

var React = require('react');
require("./user-manage.less");
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
let HistoryLoginModal = require("../../../coms/user-manager/history-login-modal.jsx");

let AuthorityModal = require("../../../coms/user-manager/authority-modal.jsx");

class UserManage extends baseCom {
  constructor(props) {
    super(props);
    this.UserInfo = User.getUserSync();
    this.state = {
      data: {
        id: "",
        name: "",
        password: "",
        email: "",
        privilege:"",
        phone:"",
        privilege:1
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
        repassword: {
          status: "",
          explain: ""
        },
        email: {
          status: "",
          explain: ""
        }
      },
      showCreateForm: false,
      showEditForm: false,
      showHistoryLoginModal: {
        show: false,
        data: ""
      },
      showAuthorityModal:{
        show: false,
        data: ""
      },
      passwordStatus:false,
      cancelBtn: true,
      deletesBtn:false,
    };
    this.usersColumns = [{
      title: "用户名",
      dataIndex: "name",
      width: "15%",
      key: 1
    },{
      title: "电话",
      dataIndex: "phone",
      width: "15%",
      key: 2
    },{
      title: "邮箱",
      dataIndex: "email",
      width:"20%",
      key: 3
    }, {
      title: "创建时间",
      dataIndex: "create_time",
      width: "20%",
      key: 4
    }, {
      title: languageProvider["console.common.operation"] || "操作",
      width: "30%",
      key: 5,
      render: (text, record) => (
        <span>
          <a data-i18n="console.common.editMember" onClick={this.showHistoryLoginModal.bind(this,record)} >历史登录查询</a> 
          <span className = "ant-divider" ></span>
          <a data-i18n="console.common.edit" onClick={this.showEditUserInfo.bind(this,record)} >编辑</a> 
          <span className = "ant-divider" ></span>
          <a data-i18n="console.common.edit" onClick={this.showAuthorityModal.bind(this,record)} >权限设置</a> 
          <span className = "ant-divider" ></span>
          <a data-i18n="console.common.delete" onClick={this.deleteWorkspace.bind(this,record)}>删除</a> 
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
      name: {
        status: "",
        explain: ""
      },
      password: {
        status: "",
        explain: ""
      },
      repassword: {
        status: "",
        explain: ""
      },
      mail: {
        status: "",
        explain: ""
      }
    }
    this.setState({ dataStatus: _dataStatus });
  }
  ownerChange(value) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    let _dataStatus = _state.dataStatus;
    _dataStatus.owner = validService.validateRequired(value);
    _data.owner = value;
    this.setState({
      data: _data,
      dataStatus: _dataStatus
    });
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
        this.props.deleteUser({}, { id: record.id }).then((data) => {
          message.success("删除成功！");
        });
      },
      onCancel() {},
    })
    
  }
  saveWorkspace() {
    if(this.state.passwordStatus){
      if(!this.state.data.repassword || this.state.data.password !== this.state.data.repassword){
        message.warning("密码不一致！");
        return;
      }
    }
    if(this.state.showCreateForm){
      this.props.addUser(this.state.data).then((result)=>{
        message.success("添加成功！");
        this.hideForm();
      });
    }
    if(this.state.showEditForm){
      this.props.updateUser(this.state.data).then((result)=>{
        message.success("修改成功！");
        this.hideForm();
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
      case "password":
        var _result = validService.validateRequired(evt.target.value);
        if (_result.status === "success") {
          _dataStatus[evt.target.name] = validService.validateCode(evt.target.value);
        } else if (_result.status === "error") {
          _dataStatus[evt.target.name] = _result;
        }
        _state.passwordStatus = true;
        break;
      case "repassword":
        _state.passwordStatus = true;
        break;
    }
    _data[evt.target.name] = evt.target.value;
    this.setState({
      "data": _data,
      "dataStatus": _dataStatus
    });
  }
  showEditUserInfo(record, event) {
    //this.props.getMembers({ pageSize: 10000 });
    // let _data = {
    //   id: record["id"],
    //   name: record["name"],
    //   password: record["password"],
    //   phone: record["phone"],
    //   email: record["email"],
    // }
    let _stateData = _.cloneDeep(this.state);
    _stateData.showCreateForm = false;
    _stateData.showEditForm = true;
    _stateData.data = record;
    this.setState(_stateData);
  }
  showHistoryLoginModal(record, event) {
    let _stateData = _.cloneDeep(this.state);
    this.props.userLoginHistory({},{userId:record.id});
    _stateData.showHistoryLoginModal.show = true;
    _stateData.showHistoryLoginModal.data = record;
    this.setState(_stateData);
  }
  onHideHistoryLoginModal() {
    let _stateData = _.cloneDeep(this.state);
    _stateData.showHistoryLoginModal.show = false;
    _stateData.showHistoryLoginModal.data = {};
    this.setState(_stateData);
  }
  showAuthorityModal(record, event) {
    let _stateData = _.cloneDeep(this.state);
    _stateData.showAuthorityModal.show = true;
    _stateData.showAuthorityModal.data = record;
    this.setState(_stateData);
  }
  onHideAuthorityModal() {
    let _stateData = _.cloneDeep(this.state);
    _stateData.showAuthorityModal.show = false;
    _stateData.showAuthorityModal.data = {};
    this.setState(_stateData);
  }
  showCreateForm() {
    let _stateData = _.cloneDeep(this.state);
    //this.props.getMembers({ pageSize: 10000 });
    let _data = {
      id: "",
      name: "",
      password: "",
      email: "",
      privilege:1,
      phone:""
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
  getManagerListDOM(list) {
    return (
      <ul className="manager-list-ul">
        {
          list&&list.map((item,index)=>{
            return <li className="manager-list-li" key={index}>{item}</li>
          })
        }
      </ul>
    )
  }
  createEditFormDOM() {
    var meta = this.state.data;
    var metaStatus = this.state.dataStatus;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    const formItemLayout2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
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
            <h3 data-i18n="console.workspace_config.member_list" className="sub-title">{this.state.showEditForm?"编辑用户":"添加用户"}</h3>
          </Col>
        </Row>
        <Form layout="horizontal" className="add-user-form">
          <FormItem id="control-input" label={languageProvider["console.common.name"]||"用户名"} {...formItemLayout} validateStatus={metaStatus.name.status}
      help={metaStatus.name.explain} hasFeedback>
            <Input type="text" value={meta.name} name="name" placeholder={languageProvider["console.common.name_tip"] || "请输入用户名"} onChange={this.onInputChange.bind(this)}/>
          </FormItem>
          <div className="passwordDiv">
            <FormItem id="control-input" label={"密  码"} {...formItemLayout2} validateStatus={metaStatus.password.status}
      help={metaStatus.password.eaxplain} hasFeedback>
              <Input type="password" value={meta.password} name="password" disabled={this.state.editWsForm} placeholder={"请输入密码"} onChange={this.onInputChange.bind(this)}/>
            </FormItem>
             <FormItem id="control-input" label={"确认密码"} {...formItemLayout2} validateStatus={metaStatus.repassword.status}
        help={metaStatus.repassword.explain} hasFeedback>
              <Input type="password" value={meta.repassword} name="repassword" disabled={this.state.editWsForm} placeholder={"请输入确认密码"} onChange={this.onInputChange.bind(this)}/>
            </FormItem>
          </div>
            <FormItem id="control-input" label={"电  话"} {...formItemLayout}>
              <Input type="text" value={meta.phone} name="phone" disabled={this.state.editWsForm} placeholder={"请输入电话"} onChange={this.onInputChange.bind(this)}/>
            </FormItem>
          <FormItem id="control-input" label={"邮  箱"} {...formItemLayout} validateStatus={metaStatus.email.status}
      help={metaStatus.email.explain} hasFeedback>
            <Input type="text" value={meta.email} name="email" disabled={this.state.editWsForm} placeholder={"请输入邮箱"} onChange={this.onInputChange.bind(this)}/>
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
  gotoThispage(page, pageSize) {
    let param = {
      page: page,
      pageSize: pageSize
    };
    this.props.selectUsers(param)
  }
  render() {
    let self = this;
    // if (this.props.workspaceConfigMeta.result) {
    //   workspaceList = this.props.workspaceConfigMeta.result.map((item, index) => {
    //     return _.assign({
    //       key: index
    //     }, this.props.workspaceConfigMeta.workspaces[item]);
    //   })
    // }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    let managerListDOM = this.getManagerListDOM(this.UserInfo.adminList);
    let createFormDOM = () => {
      if (this.state.showCreateForm || this.state.showEditForm) {
        return this.createEditFormDOM();
      }
    };
    let selectedClass = classnames({
      "selected": true,
    })

    let _usersMeta = this.props.userManageMeta.result.map((item, index) => {
      return _.assign({
        key: index,
      }, this.props.userManageMeta.users[item]);
    })

    return (
      <div className="user-manage-page">
      <div className="user-manage-container">
        {createFormDOM()} 
        <div className="members">
          <Row>
            <Col>
              <h3 data-i18n="console.workspace_config.member_list" className="sub-title">用户列表:</h3>
            </Col>
          </Row>
        </div>
        <div className="memberList">
          <Table 
            //rowSelection={rowSelection} 
            rowKey={record => record.id}
            dataSource={_usersMeta} 
            columns={this.usersColumns}
            pagination={{
                total: this.props.userManageMeta.num,
                pageSize: this.props.userManageMeta.pageSize,
                defaultPageSize: this.props.userManageMeta.pageSize,
                showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
              self.gotoThispage(current, pageSize);
            },
            onChange(current,pageSize) {
              self.gotoThispage(current, pageSize);
            },                            
            showTotal: function () {
                  return '共 ' + self.props.userManageMeta.num + ' 条数据';
                }
            }}
            />
        </div>
        <div className="btn-row">
          <div className="add-chageBtn" onClick={this.showCreateForm.bind(this)} >
            <span>新增</span>
          </div>
        </div>
      </div>
      <HistoryLoginModal 
      modalState={Object.assign({}, this.state.showHistoryLoginModal)}
      userManageMeta={this.props.userManageMeta}
      onHide={this.onHideHistoryLoginModal.bind(this)} />
      <AuthorityModal 
      modalState={Object.assign({}, this.state.showAuthorityModal)} 
      onHide={this.onHideAuthorityModal.bind(this)}
      updateUser={this.props.updateUser} />

    </div>
    );
  }
};

//var workspaceConfigAction = require("../../../actions/page-action/system-config/workspace-config");
var userManageAction = require("../../../actions/page-action/user-manage");

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
    userManageMeta:state.userManage
  };
}
module.exports = connect(
  mapStateToProps, {
    selectUsers: userManageAction.selectUsers,
    addUser: userManageAction.addUser,
    updateUser: userManageAction.updateUser,
    deleteUser: userManageAction.deleteUser,
    userLoginHistory: userManageAction.userLoginHistory,
  }
)(UserManage);
