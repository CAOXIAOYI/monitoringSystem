'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");
require('./dynamo.less');
let classnames = require("classnames");
class Dynamo extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }
  getSwitch(value,type){
    value = parseInt(value);
    let switchClass = classnames({
      "switch":true,
      "left-switch":type === "left",
      "right-switch":type === "right",
      "switch-on":value < 0.1,
      "switch-off":value >= 0.1
    });
    return(
      <div className={switchClass}></div>
    )
  }
  getCircle(value,type){
    value = parseInt(value);
    let circleClass = classnames({
      "circle":true,
      "left-circle":type === "left",
      "right-circle":type === "right",
      "circle-on":value < 0.1,
      "circle-off":value >= 0.1
    });
    return(
      <div className={circleClass}></div>
    )
  }
  getValue(value){
    if(value){
      return Number(value.toString().match(/^\d+(?:\.\d{0,2})?/)) || 0;
    }
    return value || 0;
  }
  render() {
    let monPoint1 = {};
    let monPoint2 = {};
    let monPoint3 = {};
    let monPoint4 = {};
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 1){
          monPoint1 = item;
        }
        if(item.meterId === 2){
          monPoint2 = item;
        }
        if(item.meterId === 3){
          monPoint3 = item;
        }
        if(item.meterId === 4){
          monPoint4 = item;
        }
      });
    }
    return (
      <div className="dynamo-page">
        <div className="dynamo-legend">
         <span className="circle-legend circle-off"></span>
         <span>投入</span>
         <span className="circle-legend circle-on"></span>
         <span>停止</span>
         <span className="switch-legend switch-on"></span>
         <span>分</span>
         <span className="switch-legend switch-off"></span>
         <span>合</span>
        </div>
        <div className="unit-legend">
         <span>电流(I)：</span>
         <span className="unit">A</span>
         <span>有功(P)：</span>
         <span className="unit">kW</span>
         <span>无功(Q)：</span>
         <span className="unit">kVar</span>
        </div>
        <div className="dynamo-top">
        </div>
        <div className="dynamo-middle">
          <div className="dynamo-middle-left">
            <div className="u-left">Busbar A</div>
            <div className="dynamo-line">
              <div className="dynamo-lable-left">
                <div>I: {this.getValue(monPoint2.i)}</div>
                <div>P: {this.getValue(monPoint2.p)}</div>
                <div>Q: {this.getValue(monPoint2.q)}</div>
              </div>
              {this.getSwitch(monPoint2.i,"left")}
              {this.getCircle(monPoint2.i,"left")}
              <div className="first-circle">
                <img src={require('../../assets/img/fdj.png')} width="75" height="75"/>
                <div className="circle-text">1号发电机</div>
              </div>
              <div className="dynamo-lable-right">
                <div>I: {this.getValue(monPoint1.i)}</div>
                <div>P: {this.getValue(monPoint1.p)}</div>
                <div>Q: {this.getValue(monPoint1.q)}</div>
              </div>
              {this.getSwitch(monPoint1.i,"right")}
              {this.getCircle(monPoint1.i,"right")}
              <div className="sec-circle">
                <img src={require('../../assets/img/fdj.png')} width="75" height="75"/>
                <div className="circle-text">停泊发电机</div>
              </div>
            </div>
          </div>
          <div className="dynamo-middle-right">
            <div className="div-left"><span>Busbar B</span></div>
            <div className="div-right"><span>Busbar C</span></div>
            <div className="dynamo-line">
              <div className="dynamo-lable-left">
                <div>I: {this.getValue(monPoint3.i)}</div>
                <div>P: {this.getValue(monPoint3.p)}</div>
                <div>Q: {this.getValue(monPoint3.q)}</div>
              </div>
              {this.getSwitch(monPoint3.i,"left")}
              {this.getCircle(monPoint3.i,"left")}
              <div className="first-circle">
                <img src={require('../../assets/img/fdj.png')} width="75" height="75"/>
                <div className="circle-text">2号发电机</div>
              </div>
              <div className="dynamo-lable-right">
                <div>I: {this.getValue(monPoint4.i)}</div>
                <div>P: {this.getValue(monPoint4.p)}</div>
                <div>Q: {this.getValue(monPoint4.q)}</div>
              </div>
              {this.getSwitch(monPoint4.i,"right")}
              {this.getCircle(monPoint4.i,"right")}
              <div className="sec-circle">
                <img src={require('../../assets/img/fdj.png')} width="75" height="75"/>
                <div className="circle-text">3号发电机</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

module.exports = Dynamo;
