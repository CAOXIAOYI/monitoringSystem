'use strict';

let React = require('react');

let connect = require('react-redux').connect;

let _ = require('lodash');

import { Input,Table,Button,Row,Col,message,Modal } from 'antd';

let confirm = Modal.confirm;

let AddParamSetting = require('../../../coms/param-setting/dynamo/add-param-modal.jsx');
let DEVICETYPE = require("../../../services/deviceType.js");
let GRIDTYPE = require("../../../services/gridType.js");
var classnames = require('classnames');
require('./dynamo.less');

let ElectricEquipment = React.createClass({

  getInitialState: function(){
    this.tableColumns = this.tableColumns = [
    {title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width:120, 
      fixed:"left",
      sorter: (a, b) => a.deviceName.length - b.deviceName.length,
    }, 
    {title: '设备额定功率',
      dataIndex: 'ratedPower',
      key: 'ratedPower',
      width:130,
      sorter: (a, b) => parseInt(a.ratedPower) - parseInt(b.ratedPower),
    }, 
    {title: '设备所属房间',dataIndex: 'deviceRoom',key: 'deviceRoom',width:120}, 
    {title: '设备类型',dataIndex: 'deviceType',key: 'deviceType',width:100,
      sorter: (a, b) => parseInt(a.deviceType) - parseInt(b.deviceType),
      render: (item, record) => {
        let index = _.findIndex(DEVICETYPE, (device) => {
          return device.value === item;
        });

        return (
          <span>{index>-1?DEVICETYPE[index].name:"未知设备"}</span>
        );
      }
    },
    {title: '电网类型',dataIndex: 'grid',key: 'grid',width:100,
      render: (item, record) => {
        let index = _.findIndex(GRIDTYPE, (grid) => {
          return grid.value === item;
        });
        return (
          <span>{index>-1?GRIDTYPE[index].name:"未知设备"}</span>
        );
      }
    },
    {title: '电表名称',
      dataIndex: 'meterName',
      key: 'meterName',
      width:100,
      sorter: (a, b) => a.meterName.length - b.meterName.length,
    },
    {title: '过电压告警阈值上限',dataIndex: 'gdyUpperLimit',key: 'gdyUpperLimit',width:200}, 
    {title: '过电压告警阈值上上限',dataIndex: 'gdyUpperUpperLimit',key: 'gdyUpperUpperLimit',width:200},
    {title: '过电流告警阈值上限',dataIndex: 'gdlUpperLimit',key: 'gdlUpperLimit',width:200}, 
    {title: '过电流告警阈值上上限',dataIndex: 'gdlUpperUpperLimit',key: 'gdlUpperUpperLimit',width:200},
    {title: '三相不平衡告警阈值上限',dataIndex: 'sxbphUpperLimit',key: 'sxbphUpperLimit',width:200},
    {title: '三相不平衡告警阈值上上限',dataIndex: 'sxbphUpperUpperLimit',key: 'sxbphUpperUpperLimit',width:220},
    {title: '频率偏差告警阈值上限',dataIndex: 'plpcUpperLimit',key: 'plpcUpperLimit',width:200},
    {title: '频率偏差告警阈值上上限',dataIndex: 'plpcUpperUpperLimit',key: 'plpcUpperUpperLimit',width:200},
    {title: 'THD告警阈值上限',dataIndex: 'thdUpperLimit',key: 'thdUpperLimit',width:200},
    {title: 'THD告警阈值上上限',dataIndex: 'thdUpperUpperLimit',key: 'thdUpperUpperLimit',width:200},
    {title: '零序电流告警上限',dataIndex: 'lxdlUpperLimit',key: 'lxdlUpperLimit',width:200},
    {title: '零序电流告警上上限',dataIndex: 'lxdlUpperUpperLimit',key: 'lxdlUpperUpperLimit',width:200},
    {title: '负序电流告警阈值上限',dataIndex: 'fxdlUpperLimit',key: 'fxdlUpperLimit',width:200},
    {title: '负序电流告警阈值上上限',dataIndex: 'fxdlUpperUpperLimit',key: 'fxdlUpperUpperLimit',width:200},
    {title: '快速推进功率占比',dataIndex: 'ffwdPowerRatio',key: 'ffwdPowerRatio',width:200},
    {title: '中速推进功率占比',dataIndex: 'mediumSpeedPowerRatio',key: 'mediumSpeedPowerRatio',width:200},
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
        self.props.delDeviceParameters({},{deviceId:record.id}).then((result) => {
          message.success("删除成功");
        });
      },
      onCancel() {},
    });
  },
  showAddParamModal(record,type) {

    let newState = _.cloneDeep(this.state);
    newState.addModal.data = {};
    if(type === "edit"){
      newState.addModal.data = record;
    }
    newState.addModal.isShowCreateParamModal = true;
    this.props.meterParametersSetting({pageSize:200});
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
      return this.props.updatedeviceParameters(param).then((result) => {
        message.success("保存成功");
        this.onHideAddParamModal();
       
      })
    }else{
      return this.props.adddeviceParameters(param).then((result) => {
        message.success("保存成功");
        this.onHideAddParamModal();
      })
    }
  },
  gotoThispage(page, pageSize) {
    let param = {
      page: page,
      pageSize: pageSize
    };
    this.props.deviceParametersSetting(param)
  },


  toSelectchange(page, pageSize) {
    let param = {
      page: page,
      pageSize: pageSize
    };
    this.props.deviceParametersSetting(param).then((result) => {

    });
  },
  onChange(pagination, filters, sorter) {
    //console.log('params--->', pagination, filters, sorter);
  },
  render: function () {
    let self = this;
     let _dataMeta = this.props.dynamoMeta.result.map((item, index) => {
      return _.assign({
        key: index,
      }, this.props.dynamoMeta.dynamoDatas[item]);
    });

    let addClass = classnames({
      "btn-row": true,
      "btn-row-margin": _dataMeta.length === 0
    });
    return (
      <div className="page-dynamo-setting">
        <Table
          loading={this.state.loading} 
          columns={this.tableColumns} 
          dataSource={_dataMeta} 
          scroll={{ x: 3200, y: "100%" }} 
          onChange={this.onChange} 
          pagination={{
                total: this.props.dynamoMeta.num,
                  pageSize: this.props.dynamoMeta.pageSize,
                  defaultPageSize: this.props.dynamoMeta.pageSize,
                  showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
              self.toSelectchange(current, pageSize);
          },
          onChange(current) {
              self.gotoThispage(current, self.props.dynamoMeta.pageSize);
          },                            
          showTotal: function () {
                return '共 ' + self.props.dynamoMeta.num + ' 条数据';
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
          ammeterMeta={this.props.ammeterMeta}
          datatypeMeta={this.props.datatypeMeta}
        />
      </div>
    );
  },

});

var dynamoAction = require('../../../actions/page-action/param-setting/dynamo');
var ammeterAction = require('../../../actions/page-action/param-setting/ammeter');

function mapStateToProps(state, ownProps) {
  return {
    dynamoMeta: state.dynamo,
    ammeterMeta: state.ammeter
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
  meterParametersSetting: ammeterAction.meterParametersSetting,
  adddeviceParameters: dynamoAction.adddeviceParameters,
  updatedeviceParameters: dynamoAction.updatedeviceParameters,
  deviceParametersSetting: dynamoAction.deviceParametersSetting,
  delDeviceParameters:dynamoAction.delDeviceParameters,
})(ElectricEquipment);
