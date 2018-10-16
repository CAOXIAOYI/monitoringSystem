"use strict";

require('./radar.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Radar = React.createClass({
  getInitialState() {
    return {
      option: {
        title: {
          text: [],
          x: 'center',
          y: 'top'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          orient: 'vertical',
          x: 'right',
          y: 'top'
        },
        polar: [{
          name: {
            show: true,
            textStyle: {
              color: '#333'
            }
          },
          indicator: []
        }],
        calculable: true,
        series: [{
          type: 'radar',
          data: []
        }]
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
    _.set(_newState, "legend.data", _echartData.legend);
    let _indicator = _echartData.item.map(function(item, index) {
      return { text: item };
    });
    _.set(_newState, "polar[0].indicator", _indicator);
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        value: _echartData.data[index],
      };
    });
    _.set(_newState, "series[0].data", _data);
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

module.exports = Radar;
