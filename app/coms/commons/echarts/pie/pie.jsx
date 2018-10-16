"use strict";

require('./pie.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Pie = React.createClass({
  getInitialState() {
    return {
      option: {
        title: {
          text: "",
          x: 'center',
          y: 'top'
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: "{a}<br/>{b}:{c}({d}%)"
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
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  funnelAlign: 'left'
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          orient: 'vertical',
          x: 'right',
          y: 'top'
        },
        calculable: true,
        series: [{

        }]
      }
    };
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
  updateDOM(_echartData){
    let _newState = _.cloneDeep(this.state.option);
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.item);
    var data0 = [];
    for (var a = 0; a < _echartData.data[0].length; a++) {
      var temp = {};
      temp.value = _echartData.data[0][a];
      temp.name = _echartData.item[a];
      data0.push(temp);
    }
    let _data = _echartData.legend.map(function(itemTemp, index) {
      return {
        name: itemTemp,
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: data0,
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

module.exports = Pie;
