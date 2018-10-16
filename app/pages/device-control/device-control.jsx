'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");
let connect = require('react-redux').connect;

import { Row,Col,Select } from 'antd';
const Option = Select.Option;
var classnames = require('classnames');
require('./device-control.less');

class PonitorStatus extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  } 
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 3000);
  }
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  }
  tick() {
    // 每3s执行一次
    this.props.deviceControlData();
  }
  render() {
    let warningListDom = this.props.deviceControlMeta.deviceDatas.warningList.map((item,index)=>{
      return (
        <Row className="electric-status" key={index}>
           <Col span={24}>
              <span>{item.time_stamp} —— {item.device_room}， {item.event} ：{item.event_type}；</span>
           </Col>
         </Row>
      )
    });
    let noneWarningListDom = <Row className="electric-status" >
           <Col span={24}>
              <span>无异常数据</span>
           </Col>
         </Row>;

    let monPoint20 = {};
    let monPoint22 = {};
    let monPoint24 = {};
    let monPoint26 = {};
    let monPoint27 = {};
    let monPoint30 = {};

    let warningRoomStatus = this.props.deviceControlMeta.deviceDatas.warningRoom.map((item,index)=>{
        if(item.meterId === 20){
          monPoint20 = item;
        }
        if(item.meterId === 22){
          monPoint22 = item;
        }
        if(item.meterId === 24){
          monPoint24 = item;
        }
        if(item.meterId === 26){
          monPoint26 = item;
        }
        if(item.meterId === 27){
          monPoint27 = item;
        }
        if(item.meterId === 30){
          monPoint30 = item;
        }
    });
    let warningDom = <div className="warning">
                <div><img src={require('../../assets/img/lab_room.png')} width="110" height="90"/></div>
                <span className="icon"><i className="iconfont">&#xe639;</i></span>
                <span className="text">异常</span>
              </div>;
    let normalDom = <div className="normal">
                <div><img src={require('../../assets/img/lab_room.png')} width="110" height="90"/></div>
                <span className="icon"><i className="iconfont">&#xe61f;</i></span>
                <span className="text">正常</span>
              </div>;

    return (
      <div className="page-device-control">
       <div className="left-device-control">
          <div className="room-one">
            {monPoint20.status==1?warningDom:normalDom}
          </div>
          <div className="room-two">
            {monPoint22.status==1?warningDom:normalDom}
          </div>
          <div className="room-three">
            {monPoint27.status==1?warningDom:normalDom}
          </div>
          <div className="room-four">
            {monPoint26.status==1?warningDom:normalDom}
          </div>
          <div className="room-five">
            {monPoint24.status==1?warningDom:normalDom}
          </div>
          <div className="room-six">
            {monPoint30.status==1?warningDom:normalDom}
          </div>
       </div>
       <div className="right-device-control">
          <div className="electric-right">
             <Row className="electric-list">
               <Col span={22} offset={1}>
                  <span>设备监控历史</span>
               </Col>
             </Row>
             {warningListDom.length!=0?warningListDom:noneWarningListDom}  
          </div>
       </div>
      </div>
      
    );
  }
 
};


var deviceControlAction = require('../../actions/page-action/device-control');

function mapStateToProps(state, ownProps) {
  return {
    deviceControlMeta:state.deviceControl,
  };
}

module.exports = connect(mapStateToProps, {
  //page-action
  deviceControlData: deviceControlAction.deviceControlData,
})(PonitorStatus);

