"use strict";

var React = require('react');

require('./current-time.less');

let moment = require("moment");
var baseCom = require("../base/baseCom.jsx");
class CurrentTime extends baseCom {
  constructor(props) {
    super(props);
    this.difference = 0;
    this.state = {
      currentTime: ''
    };
  }
  componentDidMount() {
    let bt = moment().valueOf();
    this.props.systemTime().then((result)=>{
      let ct = moment().valueOf();
      this.difference = ct -bt;

      
      this.timer = setInterval(() => this.tick(result.data.time), 1000);


      //this.system = setInterval(() => this.system(), 1800000);
    });
  }
  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.system);
  }
  system(){
    let bt = moment().valueOf();
    this.props.systemTime().then((result)=>{
      let ct = moment().valueOf();
      this.difference = ct -bt;
      this.tick(result.data.time);
      //this.timer = setInterval(() => this.tick(result.data.time), 1000);
      //this.system = setInterval(() => this.system(), 1000);
    });
  }
  tick(longTime) {
    // 每1s执行一次
    let time = longTime + this.difference;
    let currentTime = moment(moment(time)).format("YYYY-MM-DD HH:mm:ss");
    this.difference = this.difference+1000;
    this.setState({
      currentTime:currentTime
    });
  }
  render() {
    return (
      <span>
        {this.state.currentTime}
      </span>
    );
  }
}
module.exports = CurrentTime;
