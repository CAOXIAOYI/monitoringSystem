'use strict';

let Line = require("./line/line.jsx");
let Pie = require("./pie/pie.jsx");
let Column = require("./column/column.jsx");
let Area = require("./area/area.jsx");
let Radar = require("./radar/radar.jsx");
let Scatter = require("./scatter/scatter.jsx");
let HorizontalBar = require("./horizontalBar/horizontalBar.jsx");

require('./index.less');
const Echarts = React.createClass({
  render() {
    var currentEchart = "";
    if (this.props.currentEchart === "pie") {
      currentEchart = <Pie data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "line") {
      currentEchart = <Line data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "column") {
      currentEchart = <Column data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "area") {
      currentEchart = <Area data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "radar") {
      currentEchart = <Radar data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "scatter") {
      currentEchart = <Scatter data = {this.props.currentEchartData}/>
    }
    if (this.props.currentEchart === "horizontalBar") {
      currentEchart = <HorizontalBar data = {this.props.currentEchartData}/>
    }
    return (
      <div className="gutter-box">
        {currentEchart}
       </div>
    );
  },
});

module.exports = Echarts;
