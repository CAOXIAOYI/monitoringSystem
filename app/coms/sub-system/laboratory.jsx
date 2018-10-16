'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");
require('./laboratory.less');
let classnames = require("classnames");
class Transformer extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
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
    let monPoint31 = {};
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 31){
          monPoint31 = item;
        }
      });
    }
    return (
      <div className="laboratory-page">
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
        <div className="dynamo-middle">
          <div className="dynamo-middle-left">
            <div className="dynamo-line">
              <div className="dynamo-lable-left">
                <div>I: {this.getValue(monPoint31.i)}</div>
                <div>P: {this.getValue(monPoint31.p)}</div>
                <div>Q: {this.getValue(monPoint31.q)}</div>
              </div>
              {this.getCircle(monPoint31.i,"left")}
            </div>
            <div className="div-bg">
              <div className="div-text">全船UPS系统</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

module.exports = Transformer;
