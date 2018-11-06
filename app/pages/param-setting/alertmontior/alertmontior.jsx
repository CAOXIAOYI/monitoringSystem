'use strict';

let React = require('react');

let connect = require('react-redux').connect;

let _ = require('lodash');

import { Input,Table,Button,Row,Col,message,Modal } from 'antd';

let confirm = Modal.confirm;

let EditAlertMontior = require('../../../coms/param-setting/alertmontior/edit-alert-montior.jsx');

var classnames = require('classnames');
require('./alertmontior.less');

let ElectricEquipment = React.createClass({

  getInitialState: function(){
    this.tableColumns = this.tableColumns = [
    {title: '监测内容',
      dataIndex: 'montiorName',
      key: 'montiorName',
      width:120
      
    }, 
    {title: '黄色告警值',
      dataIndex: 'yellowValue',
      key: 'yellowValue',
      width:120, 
    }, 
    {title: '红色告警值',
      dataIndex: 'redValue',
      key: 'redValue',
      width:120, 
    }, 
    
    {title: '操作',key: 'operation',width:100,
      render: (text, record) => (
        <span>
          <a className="detail-data" onClick={this.showAddParamModal.bind(this,record,"edit")} > 编辑 </a>
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

  formatListData(list){
    let target = {};
    return list.map((item,idx)=>{
      target = {};
      if(item.key == 'emi'){

        target = {
          montiorName:'接地电阻监测',
          yellowValue:item.upperLimit || 0,
          redValue:item.upperUpperLimit || 0,
          key:'emi'
        }


      }else if(item.key == "resistance"){
        target = {
          montiorName:'实验室电磁干扰监测',
          yellowValue:item.upperLimit || 0,
          redValue:item.upperUpperLimit || 0,
          key:'resistance'
        }
      }else{
        target = {
          montiorName:'甲板辐射监测',
          yellowValue:item.upperLimit || 0,
          redValue:item.upperUpperLimit || 0,
          key:"radiation"
        }
      }
      return target
    })


  },
  
  showAddParamModal(record,type) {


    let newState = _.cloneDeep(this.state);
    newState.addModal.data = {};
    
    newState.addModal.data = record;
    newState.addModal.title = record.montiorName + '告警值';
    

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

    const _param = {
      key:param.key,
      upperLimit:param.yellowValue,
      upperUpperLimit:param.redValue
    }
    return this.props.updateWarnParameter(_param).then((result) => {
      message.success("保存成功");

      this.onHideAddParamModal();
    })
  },
  
  render: function () {
    let self = this;
    let tableData = this.formatListData(this.props.alertmontior.alertMontiorData || []);

    let addClass = classnames({
      "btn-row": true,
      "btn-row-margin": this.props.alertmontior.alertMontiorData.length === 0
    });
    return (
      <div className="page-alert-setting">
        <Table
          loading={this.state.loading} 
          columns={this.tableColumns} 
          dataSource={tableData} 
          scroll={{ x: '100%', y: "100%" }} 
          pagination={false}
        />
        
        {<EditAlertMontior
          visible={this.state.addModal.isShowCreateParamModal}
          onHide={this.onHideAddParamModal}
          onSubmit={this.onSubmitAddParamModal}
          data={this.state.addModal.data}
          title={this.state.addModal.title}
        />}
      </div>
    );
  },

});

var alertmontiorAction = require('../../../actions/page-action/param-setting/alertmontior');

function mapStateToProps(state, ownProps) {
  return {
    alertmontior: state.alertmontior
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
  getWarnParameter: alertmontiorAction.getWarnParameter,
  updateWarnParameter: alertmontiorAction.updateWarnParameter,
  
})(ElectricEquipment);
