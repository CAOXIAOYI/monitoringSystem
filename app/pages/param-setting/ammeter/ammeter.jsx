'use strict';

let React = require('react');

let connect = require('react-redux').connect;

import { Input,Table,Button,Row,Col,message,Modal } from 'antd';

let confirm = Modal.confirm;
let AddParamSetting = require('../../../coms/param-setting/ammeter/add-param-modal.jsx');

var classnames = require('classnames');
require('./ammeter.less');

let ElectricEquipment = React.createClass({

  getInitialState: function(){
    this.tableColumns = this.tableColumns = [
    {title: '名称',
      dataIndex: 'meter_name',
      key: 'meter_name',
      width:100,
      fixed:"left",
      sorter: (a, b) => a.deviceName.length - b.deviceName.length,
    }, 
    {title: '电表地址',
      dataIndex: 'meter_address',
      key: 'meter_address',
      width:100,
      sorter: (a, b) => parseInt(a.meter_address) - parseInt(b.meter_address),
    },
    {title: 'IP地址',dataIndex: 'meter_ip_address',key: 'meter_ip_address',width:100}, 
    {title: '子网掩码',dataIndex: 'subnet_mask',key: 'subnet_mask',width:100}, 
    {title: '网关地址',dataIndex: 'gateway_address',key: 'gateway_address',width:100}, 
    {title: 'SNTP对时',dataIndex: 'sntp_enable',key: 'sntp_enable',width:100},
    {title: 'SNTP对时时区',dataIndex: 'sntp_sync_timezone',key: 'sntp_sync_timezone',width:150},
    {title: 'SNTP对时间隔',dataIndex: 'sntp_sync_interval',key: 'sntp_sync_interval',width:150},
    {title: 'SNTP对时服务器',dataIndex: 'sntp_sync_server',key: 'sntp_sync_server',width:150},
    {title: '发送者邮箱地址',dataIndex: 'sender_email',key: 'sender_email',width:100},
    {title: '接收者邮箱地址',dataIndex: 'acceptor_email',key: 'acceptor_email',width:100},
    {title: 'SMTP服务器端口',dataIndex: 'smtp_port',key: 'smtp_port',width:110},
    {title: 'SMTP服务器地址',dataIndex: 'smtp_server',key: 'smtp_server',width:120},
    {title: '操作',key: 'operation',width:100,fixed:"right",
      render: (text, record) => (
        <span>
          <a className="detail-data" onClick={this.showAddParamModal.bind(this,record,"edit")} > 编辑 </a>
          <a> ｜ </a>
          <a className="detail-data" onClick={this.deleteParam.bind(this,record)} > 删除</a>
        </span>
      ),
    }];
    return {
      loading:false,
      addModal:{
        isShowCreateParamModal:false,
        data:{}
      }
    }
  },
  deleteParam(record) {
    var self = this;
    confirm({
      title: '确认要删除这条数据吗?',
      content: '请确认是否删除，删除后不能回复',
      onOk() {
        self.props.delMeterParameters({},{meterId:record. id}).then((result) => {
          message.success("删除成功");
        });
      },
      onCancel() {},
    });
  },
  showAddParamModal(record,type) {
    let newState = _.cloneDeep(this.state);
    newState.addModal.data = {
      "smtp_port":25,
      "smtp_server":"202.108.5.83",
    };
    if(type === "edit"){
      newState.addModal.data = record;
    }
    newState.addModal.isShowCreateParamModal = true;
    
    this.setState(newState);
  },
  
  onHideAddParamModal() {
    let newState = _.cloneDeep(this.state);
    newState.addModal.isShowCreateParamModal = false;
    newState.addModal.data = {};
    this.setState(newState);
  },
 
  onSubmitAddParamModal(param) {
    if(param.id){
      return this.props.updateMeterParameters(param).then((result) => {
        //result &&  messageService.ordinary("TC-ENTITY-ADD-SUCCESS");
        //return result;
        message.success("保存成功");
        this.props.meterParametersSetting();
        this.onHideAddParamModal();
       
      })
    }else{
      return this.props.addMeterParameters(param).then((result) => {
        //result &&  messageService.ordinary("TC-ENTITY-ADD-SUCCESS");
        //return result;
        message.success("保存成功");
        this.props.meterParametersSetting();
        this.onHideAddParamModal();
      })
    }
    // return this.props.adddeviceParameters(param).then((result) => {
    //   //result &&  messageService.ordinary("TC-ENTITY-ADD-SUCCESS");
    //   return result;
    // })
  },
  gotoThispage(page, pageSize) {
    let param = {
      page: page,
      pageSize: pageSize
    };
    this.props.meterParametersSetting(param)
  },


  toSelectchange(page, pageSize) {
    let param = {
      page: page,
      pageSize: pageSize
    };
    this.props.meterParametersSetting(param).then((result) => {
      //console.log("getSchemaList----result-->",result);
    });
  },
  onChange(pagination, filters, sorter) {
    //console.log('params--->', pagination, filters, sorter);
  },
  render: function () {
    let self = this;
    let _dataMeta = this.props.ammeterMeta.result.map((item, index) => {
      return _.assign({
        key: index,
      }, this.props.ammeterMeta.ammeterDatas[item]);
    })
    let addClass = classnames({
      "btn-row": true,
      "btn-row-margin": _dataMeta.length === 0
    });
    return (
      <div className="page-ammeter-setting">
        <Table 
          rowKey={record => record.id}
          loading={this.state.loading} 
          columns={this.tableColumns} 
          dataSource={_dataMeta} 
          scroll={{ x: 1700, y: "100%" }} 
          onChange={this.onChange} 
          pagination={{
                total: this.props.ammeterMeta.num,
                  pageSize: this.props.ammeterMeta.pageSize,
                  defaultPageSize: this.props.ammeterMeta.pageSize,
                  showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
              self.toSelectchange(current, pageSize);
          },
          onChange(current) {
              self.gotoThispage(current, self.props.ammeterMeta.pageSize);
          },                            
          showTotal: function () {
                return '共 ' + self.props.ammeterMeta.num + ' 条数据';
              }
          }}
        />
        <div className={addClass}>
          <div className="add-chageBtn" onClick={this.showAddParamModal}>
            <span>新增</span>
          </div>
        </div>
        <AddParamSetting 
          visible={this.state.addModal.isShowCreateParamModal}
          onHide={this.onHideAddParamModal}
          onSubmit={this.onSubmitAddParamModal}
          data={this.state.addModal.data}
          datatypeMeta={this.props.datatypeMeta}
        />
      </div>
    );
  },

});

var ammeterAction = require('../../../actions/page-action/param-setting/ammeter');

function mapStateToProps(state, ownProps) {
  return {
    ammeterMeta: state.ammeter
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
  
  addMeterParameters: ammeterAction.addMeterParameters,
  updateMeterParameters: ammeterAction.updateMeterParameters,
  meterParametersSetting: ammeterAction.meterParametersSetting,
  delMeterParameters:ammeterAction.delMeterParameters
})(ElectricEquipment);
