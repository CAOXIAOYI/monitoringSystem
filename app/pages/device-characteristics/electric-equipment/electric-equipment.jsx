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
      title:'有功功率特性曲线',
      xAxisName:'功率',
      legend:[''],
      item:[],
      data:[[]]
    }
    let reactEchartData = {
      title:'无功功率特性曲线',
      xAxisName:'电压',
      legend:[''],
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
    var date = new Date();
    var year = date.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = date.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var day = date.getDate();  
    const currentDay = year + '-' + month + '-' + day;

    const topCloumnData = {
      title:'功率因数',
      legend:['功率因数'],
      item:[currentDay],
      data:[[deviceCharacteristicsData.powerFactor || 0]]
    };


    // const t

    return (
      <div className="page-electric-equipment">
        <div className="electric-equipment-container">
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
              <div className='top-content'>
                <Column data = {topCloumnData} hideYAxisName={true}/>
              </div>
              <div className='bottom-content'>
                <Column data = {hdColumnData} hideYAxisName={true}/>
              </div>
              
              
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

