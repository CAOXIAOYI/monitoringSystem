"use strict";

require('./column.less');
var echarts = require('echarts');
require('echarts/theme/macarons.js');
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'echarts';
const Column = React.createClass({
  getInitialState() {
    this.myChart = "";
    this.option =  {
      title: {
        text: "",
        textStyle: {
          fontSize: 10,
          color: '#fff'
        }
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      legend: {
        data: "",
        show: false,
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   },
      //   orient: 'vertical',
      //   x: 'right',
      //   y: 'top'
      // },
      calculable: true,
      //color:['#E221C3', '#41A9D0', '#79CC15', '#D07541', '#E2CF21','#218CE2'],
      //color:['#E407C5', '#FAAC23', '#76CE00', '#D07541', '#E2CF21','#218CE2'],
      color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2'],
      grid: {
        x: '10px',
        y: '20%',
        x2: '20px',
        y2: '25px',
      },
      xAxis: [{
        type: 'category',
        axisLabel: {
          textStyle:{
            color: '#E4E4E4'
          }
        },
        axisTick:{
          lineStyle:{
             color: '#E4E4E4',   
          }
        },
        axisLine:{
          lineStyle:{
            color: '#E4E4E4'
          }
        },
        data: []
      }],
      yAxis: [{
        type: 'value',
        name:'%',
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          margin:-20,
          textStyle:{
            color: '#E4E4E4'
          }
        },
        axisLine:{
          lineStyle:{
            color: '#E4E4E4'
          }
        },
        axisTick:{
          inside:true,
          lineStyle:{
             color: '#E4E4E4',   
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
  //   myChart.setOption(this.option);
  // },
  componentWillMount() {
    var _echartData = this.props.data;
    if (_echartData) {
      this.updateDOM(_echartData);
    }
  },
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);
    var myChart = echarts.init($(element)[0], 'macarons');
    myChart.setOption(this.option);
    this.myChart = myChart;
  },
  updateDOM(_echartData) {
    let stringLength = _echartData.item.toString().length;
    var conversionAngle = 0;
    if (stringLength > 50) {
      conversionAngle = -90;
    } else {
      conversionAngle = 0;
    }
    let _newState = _.cloneDeep(this.option);
    _.set(_newState, "title.text", _echartData.title);
    _.set(_newState, "legend.data", _echartData.legend);
    _.set(_newState, "xAxis[0].data", _echartData.item);
    _.set(_newState, "xAxis[0].axisLabel.rotate", conversionAngle);
    let normal0 =  [{offset: 0, color: '#99D7FF'}, {offset: 0.5, color: '#4D8EBA'},{offset: 1, color: '#99D7FF'}];
    let normal1 =  [{offset: 0, color: '#A2D62D'}, {offset: 0.5, color: '#6C802C'},{offset: 1, color: '#A4D52D'}];
    let normal2 =  [{offset: 0, color: '#F2585F'}, {offset: 0.5, color: '#A5272C'},{offset: 1, color: '#BD444F'}];
    let emphasis0 =  [{offset: 0, color: '#2FDECA'},{offset: 0.5, color: '#4D8EBA'},{offset: 1, color: '#2FDECA'}]
    let emphasis1 =  [{offset: 0, color: '#2FDECA'},{offset: 0.5, color: '#6C802C'},{offset: 1, color: '#2FDECA'}]
    let emphasis2 =  [{offset: 0, color: '#2FDECA'},{offset: 0.5, color: '#A5272C'},{offset: 1, color: '#2FDECA'}]
    let _data = _echartData.legend.map(function(itemTemp, index) {
      let _normal = index == 0?normal0:index == 1?normal1:normal2;
      let _emphasis = index == 0?emphasis0:index == 1?emphasis1:emphasis2;
      return {
        name: itemTemp,
        type: 'bar',
        barWidth: 20,
        data: _echartData.data[index],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,_normal)
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,_emphasis)
          }
        }
        // silent: true,
        // itemStyle: {
        //     normal: {
        //         barBorderRadius: 20,
        //         //color: '#D34445',
        //         shadowColor: 'rgba(0, 0, 0, 0.8)',
        //         shadowBlur: 20
        //     }
        // }
        // markPoint: {
        //   data: [
        //     { type: 'max', name: '最大值' },
        //     { type: 'min', name: '最小值' }
        //   ],
        //   itemStyle: {
        //     normal: {
        //       label: {
        //         textStyle: { color: '#fff' }
        //       }
        //     }
        //   }
        // }
      };
    });
    _.set(_newState, "series", _data);
    this.option = _newState;
    // this.setState({
    //   option: _newState,
    // });
    //this.myChart.setOption(this.option);
  },
  render() {
    return (
      <div className="echarts-column-style ">
       </div>
    );
  },
});

module.exports = Column;
