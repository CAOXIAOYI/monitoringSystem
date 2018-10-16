'use strict';

let React = require('react');

let connect = require('react-redux').connect;

import { Input,Modal,Button,Row,Col } from 'antd';
let Line = require("../../../coms/commons/echarts/line/line.jsx");

require('./electric-equipment.less');
let ElectricEquipment = React.createClass({
  getInitialState: function(){
    return {
      
    }
  },
  render: function () {
    let currentEchartData = {
      title:'',
      legend:['电压概率分布曲线'],
      item:[],
      data:[[]]
    }
    let deviceCharacteristicsData = {
      power:"",
      powerFactor:"",
      thd:"",
      current:""
    };
    let _deviceCharacteristicsMeta = this.props.deviceCharacteristicsMeta;
    let _cid = this.props.deviceCharacteristicsMeta.currentMeterId;
    if(_deviceCharacteristicsMeta && _cid && _deviceCharacteristicsMeta.deviceDatas[_cid]){
      deviceCharacteristicsData = _deviceCharacteristicsMeta.deviceDatas[_cid];
      currentEchartData.data[0] = deviceCharacteristicsData.voltDistr || [];
    }

    return (
      <div className="page-electric-equipment">
        <div className="electric-equipment-container">
          <h2>设备相关参数:</h2>
          <Row className="device-param">
             <Col span={6}>
                功率(kW)
             </Col>
             <Col span={6} >
                功率因数
             </Col>
             <Col span={6}>
                THD(%)
             </Col>
             <Col span={6}>
                启动电流(A)
             </Col>
          </Row>
          <Row className="device-param">
             <Col span={6}>
               {deviceCharacteristicsData.power || 0}
             </Col>
             <Col span={6} >
               {deviceCharacteristicsData.powerFactor || 0}
             </Col>
             <Col span={6}>
               {deviceCharacteristicsData.thd || 0}
             </Col>
             <Col span={6}>
                {deviceCharacteristicsData.current || 0}
             </Col>
          </Row>
          <div className="electric-echarts">
            <Line data = {currentEchartData}/>
          </div>
        </div>
      </div>
    );
  },

});

function mapStateToProps(state, ownProps) {
  return {
     deviceCharacteristicsMeta:state.deviceCharacteristics
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
})(ElectricEquipment);

