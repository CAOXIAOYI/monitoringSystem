'use strict';

let React = require('react');

let connect = require('react-redux').connect;

let Line = require("../../../coms/commons/echarts/line/line.jsx");

let Area = require("../../../coms/commons/echarts/area/area.jsx");

import { InputNumber,Button,Row,Col,Select } from 'antd';

require('./electric.less');
let Electric = React.createClass({
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

      //"title":title,"item":item,"data":data,"legend":legend

    }
    let currentEchartUUData = {
      title:'',
      legend:['Ua','Ub','Uc'],
      item:[],
      data:[]
    };
    let currentEchartIIData = {
      title:'',
      legend:['Ia','Ib','Ic'],
      item:[],
      data:[]
    };
    let _powerDatas = this.props.electricalMachineMeta.powerDatas;
    let _currentMeterId = this.props.electricalMachineMeta.currentMeterId;
    if(_powerDatas && _currentMeterId){
      let _data = _powerDatas[_currentMeterId] || {};
      currentEchartUUData.data[0] = _data && _data.ua?_data.ua : [];
      currentEchartUUData.data[1] = _data && _data.ub?_data.ub : [];
      currentEchartUUData.data[2] = _data && _data.uc?_data.uc : [];
      currentEchartIIData.data[0] = _data && _data.ia?_data.ia : [];
      currentEchartIIData.data[1] = _data && _data.ib?_data.ib : [];
      currentEchartIIData.data[2] = _data && _data.ic?_data.ic : [];
      currentEchartData.data[0] = _data && _data.vd?_data.vd : [];
    }
    return (
      <div className="page-electric-machine">
        <div className="electric-equipment-container">
            <div className="electric-echarts">
              <Line data = {currentEchartData}/>
            </div>
            <div className="electric-echarts">
              <Line data = {currentEchartUUData}/>
            </div>
             <div className="electric-echarts">
              <Line data = {currentEchartIIData}/>
            </div>
        </div>
      </div>
    );
  },

});

var electricalMachineAction = require('../../../actions/page-action/electrical-machine');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};

  return {
    electricalMachineMeta:state.electricalMachine,
  };
}


module.exports = connect(
  mapStateToProps, {
     motorOnOffData: electricalMachineAction.motorOnOffData,
     menuItemTimestamp:electricalMachineAction.menuItemTimestamp
  }
)(Electric);
