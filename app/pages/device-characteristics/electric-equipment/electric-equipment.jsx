'use strict';

let React = require('react');

let connect = require('react-redux').connect;

import { Input,Modal,Button,Row,Col } from 'antd';
let Line = require("../../../coms/commons/echarts/line/line.jsx");
let Column = require("../../../coms/commons/echarts/column/column.jsx");

require('./electric-equipment.less');
let ElectricEquipment = React.createClass({
  getInitialState: function(){
    return {
      
    }
  },
  render: function () {
    
    let actEchartData = {
      title:'',
      legend:['有功功率特性曲线'],
      item:[],
      data:[[]]
    }
    let reactEchartData = {
      title:'',
      legend:['无功功率特性曲线'],
      item:[],
      data:[[]]
    }

    let deviceCharacteristicsData = {
      power:"",
      powerFactor:"",
      thd:"",
      current:""
    };

    let hdColumnData = {
      title:'THD',
      legend:['a','b','c'],
      item:['U 电压','I 电流'],
      data:[[0,0],[0,0],[0,0]]
    };

    let _deviceCharacteristicsMeta = this.props.deviceCharacteristicsMeta;
    let _cid = this.props.deviceCharacteristicsMeta.currentMeterId;
    if(_deviceCharacteristicsMeta && _cid && _deviceCharacteristicsMeta.deviceDatas[_cid]){
      deviceCharacteristicsData = _deviceCharacteristicsMeta.deviceDatas[_cid];

      let data = [];
      (deviceCharacteristicsData.actPowerDistr || []).forEach(item=>{
        actEchartData['item'].push(item.frequency);
        data.push(item.actiPower)
      })
      actEchartData.data[0] = data;


      data = [];
      (deviceCharacteristicsData.reactPowerDistr || []).forEach(item=>{
        reactEchartData['item'].push(item.effevolt);
        data.push(item.reacPower)
      })
      reactEchartData.data[0] = data;
      const thdDistr = deviceCharacteristicsData.thdDistr || {};
      hdColumnData.data = [[thdDistr.uanhd,thdDistr.ianhd],[thdDistr.ubnhd,thdDistr.ibnhd],[thdDistr.ucnhd,thdDistr.icnhd]];

    }



    // const t

    return (
      <div className="page-electric-equipment">
        <div className="electric-equipment-container">
          <h2>设备相关参数:</h2>
          <Row className="device-param">
             <Col span={6} >
                功率因数
             </Col>
             <Col span={6} >
               {deviceCharacteristicsData.powerFactor || 0}
             </Col>
          </Row>
          <div className="electric-echarts">
            <div className='content-left'>
              <div className='row-top'>
                <Line data={actEchartData}/>
              </div>
              <div className='row-bottom'>
                <Line data={reactEchartData}/>
              </div>
              
            </div>
            <div className='content-right'>
              <Column data = {hdColumnData}/>
            </div>
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

