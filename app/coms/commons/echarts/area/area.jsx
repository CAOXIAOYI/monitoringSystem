"use strict";

require('./area.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Area = React.createClass({
  getInitialState() {
    this.myChart = "";
    this.option =  {
        title: {
          text: "",
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [],
          textStyle:{
            color:['#218CE2','#E221C3', '#41A9D0', '#79CC15', '#D07541', '#E2CF21']
          }
        },
        calculable: true,
        color:['#218CE2','#E221C3', '#41A9D0', '#79CC15', '#D07541', '#E2CF21'],
        grid: {
          x: '20px',
          y: '20px',
          x2: '20px',
          y2: '20px',
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
           show:false,
          data: [],
          axisLabel: {
            textStyle:{
              color: '#979797'
            }
          },
          axisTick:{
            lineStyle:{
               color: '#979797',   
            }
          },
          axisLine:{
            lineStyle:{
              color: '#979797'
            }
          },
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            margin:-20,
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
            inside:true,
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
    if (_echartData) {
      this.updateDOM(_echartData);
      this.myChart.setOption(this.option);
    }
  },
  // componentDidUpdate() {
  //   var element = ReactDOM.findDOMNode(this);
  //   var myChart = echarts.init($(element)[0], 'macarons');
  //   let self = this;
  //   myChart.on('click',function(params){ // 控制台打印数据
  //     self.props.onClickEchart && self.props.onClickEchart(params.dataIndex);
  //   });
  //   myChart.setOption(this.state.option);
  // },
  componentWillMount() {
    var _echartData = this.props.data;
     
    if (_echartData) {
      this.updateDOM(_echartData);
    }

  },
  updateDOM(_echartData){
    let stringLength = _echartData.item.toString().length;
    var conversionAngle = 0;
    if(stringLength>50){
      conversionAngle = -90;
    }else{
      conversionAngle = 0;
    }
    let _newState = _.cloneDeep(this.option);
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.legend);
    _.set(_newState, "xAxis[0].data", _echartData.item);
    _.set(_newState, "xAxis[0].axisLabel.rotate", conversionAngle);
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        type: 'line',
        smooth: true,
        symbolSize:6,//标志大小
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: _echartData.data[index],
      };
    });
    _.set(_newState, "series", _data);
    // this.setState({
    //   option: _newState,
    // });
    this.option = _newState;
  },
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    //myChart.setOption(this.state.option);
    let self = this;
    myChart.on('click',function(params){ // 控制台打印数据
      self.props.onClickEchart && self.props.onClickEchart(params.dataIndex);
    });
    myChart.setOption(this.option);
    this.myChart = myChart;
  },
  render() {
    return (
      <div className="echarts-area-style">
       </div>
    );
  },
});

module.exports = Area;
