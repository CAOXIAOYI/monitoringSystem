'use strict';

require('./real-line-l.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
let moment = require('moment');
const RealLine = React.createClass({
  
  getInitialState() {
    this.myChart="";
    this.data=[];
    this.currentMeterId="";
    this.option = {
        title: {
          text: '',
          x: 'left',
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#283b56'
              }
          }
        },
        legend: {
          data: [],
          textStyle:{
            color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2']
          }
        },
        dataZoom : {
          show : false,
        },
        grid: {
          x: '50px',
          y: '50px',
          x2: '40px',
          y2: '40px',
        },
        color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2'],
        xAxis: [{
          type: 'category',
          data : [],
          boundaryGap: true,
          show:false,
          axisLabel: {
            interval: 0,
            rotate:0
          },
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            textStyle:{
              color: '#979797'
            }
          },
          axisLine:{
            lineStyle:{
              color: '#979797'
            }
          },
          axisTick:{
            lineStyle:{
               color: '#979797',   
            }
          }
        }],
        series: []
      }
    return {
      
    };
  },
  componentWillReceiveProps(nextProps) {
    var _echartData = nextProps.data;
    let _newState = _.cloneDeep(this.state.option);
    if (_echartData) {
      if(this.currentMeterId != _echartData.meterId){
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.series[2].data = [];
        this.currentMeterId = _echartData.meterId;
      }
     if(_echartData.data[0] || _echartData.data[1] || _echartData.data[2]){  
      //if(this.option.series[0].data.length > _echartData.data[0].length*2){
      if(this.option.series[0].data.length > _echartData.data[0].length*60){
        this.option.series[0].data.splice(0,_echartData.data[0].length);
      }
      if(this.option.series[1].data.length > _echartData.data[1].length*60){
        this.option.series[1].data.splice(0,_echartData.data[1].length);
      }
      if(this.option.series[2].data.length > _echartData.data[2].length*60){
        this.option.series[2].data.splice(0,_echartData.data[2].length);
      }
      this.option.legend.data = _echartData.legend;
      this.option.xAxis[0].data = _echartData.item;
      this.option.series[0].data = _.concat(this.option.series[0].data, _echartData.data[0] );
      this.option.series[1].data = _.concat(this.option.series[1].data, _echartData.data[1] );
      this.option.series[2].data = _.concat(this.option.series[2].data, _echartData.data[2]);
     }
      this.myChart.setOption(this.option);
    }
  },
  
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    this.myChart = myChart;
    
    let currentEchartData = {
      legend:['Ia','Ib','Ic'],
      item:[],
      data:[[],[],[]]
    };
    this.updateDOM(currentEchartData);
    window.onresize = myChart.resize;

  },
  updateDOM(_echartData){
    // let stringLength = _echartData.item.toString().length;
    // var conversionAngle = 0;
    // if(stringLength>50){
    //   conversionAngle = -90;
    // }else{
    //   conversionAngle = 0;
    // }
    //let _newState = _.cloneDeep(this.state.option);
    let _newState = this.option;
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.legend);
    _.set(_newState, "xAxis[0].data", _echartData.item);
    //_.set(_newState, "xAxis[0].axisLabel.rotate", conversionAngle);
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        type: 'line',
        data: _echartData.data[index],
        symbol:null,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ],
          itemStyle: {
            normal: {
              label: {
                textStyle: { color: '#fff' }
              }
            }
          }
        }
      };
    });
    _.set(_newState, "series", _data);
    //myChart.setOption(_newState);
    this.option = _newState;
    // this.setState({
    //   option: _newState,
    // });
  },
  render() {
    return (
      <div className="echarts-real-line-style">
       </div>
    );
  },
});

module.exports = RealLine;
