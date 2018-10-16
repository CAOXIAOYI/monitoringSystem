"use strict";

require('./scatter.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Scatter = React.createClass({
  getInitialState() {
    return {
      option: {
        title: {
          text: "",
          x: 'center',
          y: 'bottom'
        },
        tooltip: {
          trigger: 'axis',
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return params.seriesName + ':<br/>' + params.value[0] + " : " + params.value[1];
            } else {
              return params.seriesName + ':<br/>' + params.name + ':' + params.value;
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        legend: {
          data: [],
          x: 'left'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataZoom: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          orient: 'vertical',
          x: 'right',
          y: 'top'
        },
        xAxis: [{
          type: 'value',
          scale: true,
          axisLable: {
            formatter: '{value}'
          }
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          axisLable: {
            formatter: '{value}'
          }
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
    let _newState = _.cloneDeep(this.state.option);
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.item);
    let _data = _echartData.item.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        type: 'scatter',
        data: [_echartData.data[index]],
        symbolSize: 20
      }
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

module.exports = Scatter;
