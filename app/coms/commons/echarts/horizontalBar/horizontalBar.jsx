"use strict";

require('./horizontalBar.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const HorizontalBar = React.createClass({
  getInitialState() {
    return {
      option: {
        title: {
          text: "",
          x: 'center',
          y: 'bottom'
        },
        tooltip: {
          show: true,
          trigger: "axis"
        },
        legend: {
          data: [],
          x: 'left'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'pie'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          orient: 'vertical',
          x: 'right',
          y: 'top'
        },
        grid: {
          x: '12%'
        },
        xAxis: [{
          type: 'value'
        }],
        yAxis: [{
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate:0
          },
        }],
        series: []
      }
    };
  },

  componentWillReceiveProps(nextProps) {
    var _echartData = nextProps.data;
    if (_echartData) {
      this.updateDOM(_echartData);
    }
  },
  componentDidUpdate() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    myChart.setOption(this.state.option);
  },
  componentWillMount() {
    var _echartData = this.props.data;
    if (_echartData) {
      this.updateDOM(_echartData);
    }
  },
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    myChart.setOption(this.state.option);
  },
  updateDOM(_echartData){
    let stringLength = _echartData.item.toString().length;
    var conversionAngle = 0;
    if(stringLength>50){
      conversionAngle = -90;
    }else{
      conversionAngle = 0;
    }
    let _newState = _.cloneDeep(this.state.option);
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.legend);
    _.set(_newState, "yAxis[0].data", _echartData.item);
    _.set(_newState, "yAxis[0].axisLabel.rotate", conversionAngle);
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: _echartData.legend[index],
        type: 'bar',
        data: _echartData.data[index],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ],
          itemStyle: {
            normal: {
              label: {
                textStyle: { color: '#208d8e' }
              }
            }
          }
        }
      };
    });
    _.set(_newState, "series", _data);
    this.setState({
      option: _newState,
    });
  },
  render() {
    return (
      <div className="echarts-style">
       </div>
    );
  },
});

module.exports = HorizontalBar;
