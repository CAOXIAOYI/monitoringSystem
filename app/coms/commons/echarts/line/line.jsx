'use strict';

require('./line.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Line = React.createClass({
  getInitialState() {
    this.myChart = "";
    this.option =  {
        title: {
          text: '',
          left:'45%',
          top:'10px',
          textStyle: {
            fontSize: 14,
            color: '#fff'
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          data: [],
          textStyle:{
            color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2']
          }
        },
        calculable: true,
        // grid: {
        //   x: '50px',
        //   right:'20px',
        //   y: '20px',
        //   x2: '20px',
        //   y2: '20px',
        //   containLabel:true
        // },
        color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2'],
        xAxis: [{
          type: 'category',
          name:'',
          boundaryGap:false,
          data: [],
          axisLabel: {
            textStyle:{
              color: '#979797'
            }
          },
          axisTick:{
            inside:true,
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
    let _newState = _.cloneDeep(this.option);
    if (_echartData) {
     this.updateDOM(_echartData);
     this.myChart.setOption(this.option);
    }
  },
  // componentDidUpdate() {
  //   var element = ReactDOM.findDOMNode(this);
  //   var myChart = echarts.init($(element)[0], 'macarons');
  //   myChart.setOption(this.state.option);
  // },
  componentWillMount() {
    var _echartData = this.props.data;
    if(_echartData){
      this.updateDOM(_echartData);
    }
    
  },
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    myChart.setOption(this.option);
    this.myChart = myChart;
  },
  updateDOM(_echartData){
    let _newState = _.cloneDeep(this.option);

    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "xAxis[0].name", _echartData.xAxisName);
    _.set(_newState, "legend.data", _echartData.legend);
    _.set(_newState, "xAxis[0].data", _echartData.item);
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        type: 'line',
        data: _echartData.data[index],
        symbolSize:2,//标志大小
      };
    });
    _.set(_newState, "series", _data);
    this.option = _newState;
    // this.setState({
    //   option: _newState,
    // });
  },
  render() {
    return (
      <div className="echarts-line-style">
       </div>
    );
  },
});

module.exports = Line;
