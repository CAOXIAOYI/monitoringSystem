'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");
require('./scientific.less');
let classnames = require("classnames");
class Transformer extends BaseCom {
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
      "left-top-circle":type === "left-top",
      "left-bottom-circle":type === "left-bottom",
      "right-top-circle":type === "right-top",
      "right-bottom-circle":type === "right-bottom",
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
    let monPoint16 = {};
    let monPoint17 = {};
    let monPoint18 = {};
    let monPoint19 = {};
    let monPoint20 = {};
    let monPoint21 = {};
    let monPoint22 = {};
    let monPoint23 = {};
    let monPoint24 = {};
    let monPoint25 = {};
    let monPoint26 = {};
    let monPoint27 = {};
    let monPoint28 = {};
    let monPoint29 = {};
    let monPoint30 = {};
   
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 16){
          monPoint16 = item;
        }
        if(item.meterId === 17){
          monPoint17 = item;
        }
        if(item.meterId === 18){
          monPoint18 = item;
        }
        if(item.meterId === 19){
          monPoint19 = item;
        }
        if(item.meterId === 20){
          monPoint20 = item;
        }
        if(item.meterId === 21){
          monPoint21 = item;
        }
        if(item.meterId === 22){
          monPoint22 = item;
        }
        if(item.meterId === 23){
          monPoint23 = item;
        }
        if(item.meterId === 24){
          monPoint24 = item;
        }
        if(item.meterId === 25){
          monPoint25 = item;
        }
        if(item.meterId === 26){
          monPoint26 = item;
        }
        if(item.meterId === 27){
          monPoint27 = item;
        }
        if(item.meterId === 28){
          monPoint28 = item;
        }
        if(item.meterId === 29){
          monPoint29 = item;
        }
        if(item.meterId === 30){
          monPoint30 = item;
        }
      });
    }
    return (
      <div className="scientific-page">
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
           {this.getSwitch(monPoint16.i,"left")}
           {this.getCircle(monPoint16.i,"left")}
           <div className="text left-top-text">
               清洁电源出口
           </div>
           <div className="dynamo-monPoint-left">
              <div>I: {this.getValue(monPoint16.i)}</div>
              <div>P: {this.getValue(monPoint16.p)}</div>
              <div>Q: {this.getValue(monPoint16.q)}</div>
           </div>
           <div className="dynamo-monPoint-right">
              <div>I: {this.getValue(monPoint17.i)}</div>
              <div>P: {this.getValue(monPoint17.p)}</div>
              <div>Q: {this.getValue(monPoint17.q)}</div>
           </div>
           <div className="text right-top-text">
               上级电网连接变出口
           </div>
            {this.getSwitch(monPoint17.i,"right")}
            {this.getCircle(monPoint17.i,"right")}
        </div>
        <div className="dynamo-middle">
          <div className="dynamo-line-top">
             <div>AUTO CHANGE</div>
          </div>
          <div className="dynamo-line-bottom">
             {this.getCircle(monPoint17.i,"left")}
            <div className="dynamo-monPoint-left">
              <div>I: {this.getValue(monPoint17.i)}</div>
              <div>P: {this.getValue(monPoint17.p)}</div>
              <div>Q: {this.getValue(monPoint17.q)}</div>
           </div>
          </div>
        </div>
        <div className="dynamo-bottom">
          <div className="dynamo-bottom-item">
             {this.getSwitch(monPoint19.i,"left")}
             {this.getCircle(monPoint19.i,"left-top")}
             {this.getCircle(monPoint19.i,"left-bottom")}
             <div className="lbq left-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text left-top-text">
                 无源滤波器1
               </div>
             </div>
             <div className="dynamo-monPoint-left-top">
                <div>I: {this.getValue(monPoint19.i)}</div>
                <div>P: {this.getValue(monPoint19.p)}</div>
                <div>Q: {this.getValue(monPoint19.q)}</div>
             </div>
             <div className="dynamo-monPoint-left-bottom">
                <div>I: {this.getValue(monPoint20.i)}</div>
                <div>P: {this.getValue(monPoint20.p)}</div>
                <div>Q: {this.getValue(monPoint20.q)}</div>
             </div>
             <div className="left-bottom-lab">
               <img src={require('../../assets/img/lab_room.png')} width="112" height="93"/>
                <div className="lab-text left-bottom-text">
                 通用干湿实验室2
                </div>
             </div>
             {this.getSwitch(monPoint21.i,"right")}
             {this.getCircle(monPoint21.i,"right-top")}
             {this.getCircle(monPoint21.i,"right-bottom")}
            
             <div className="lbq right-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text right-top-text">
                 无源滤波器2
               </div>
             </div>
             <div className="dynamo-monPoint-right-top">
                <div>I: {this.getValue(monPoint21.i)}</div>
                <div>P: {this.getValue(monPoint21.p)}</div>
                <div>Q: {this.getValue(monPoint21.q)}</div>
             </div>
             <div className="dynamo-monPoint-right-bottom">
                <div>I: {this.getValue(monPoint22.i)}</div>
                <div>P: {this.getValue(monPoint22.p)}</div>
                <div>Q: {this.getValue(monPoint22.q)}</div>
             </div>
             <div className="right-bottom-lab">
               <img src={require('../../assets/img/lab_room.png')} width="112" height="93"/>
                <div className="lab-text right-bottom-text">
                 通用干湿实验室3
                </div>
             </div>

          </div>
          <div className="dynamo-bottom-item">
             {this.getSwitch(monPoint23.i,"left")}
             {this.getCircle(monPoint23.i,"left-top")}
             {this.getCircle(monPoint23.i,"left-bottom")}
             <div className="lbq left-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text left-top-text">
                 无源滤波器3
               </div>
             </div>
             <div className="dynamo-monPoint-left-top">
                <div>I: {this.getValue(monPoint23.i)}</div>
                <div>P: {this.getValue(monPoint23.p)}</div>
                <div>Q: {this.getValue(monPoint23.q)}</div>
             </div>
             <div className="dynamo-monPoint-left-bottom">
                <div>I: {this.getValue(monPoint24.i)}</div>
                <div>P: {this.getValue(monPoint24.p)}</div>
                <div>Q: {this.getValue(monPoint24.q)}</div>
             </div>
             <div className="left-bottom-lab">
               <img src={require('../../assets/img/lab_room.png')} width="112" height="93"/>
                <div className="lab-text left-bottom-text">
                 仪器集中控制室
                </div>
             </div>
             {this.getSwitch(monPoint25.i,"right")}
             {this.getCircle(monPoint25.i,"right-top")}
             {this.getCircle(monPoint25.i,"right-bottom")}
             <div className="lbq right-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text right-top-text">
                 无源滤波器4
               </div>
             </div>
             <div className="dynamo-monPoint-right-top">
                <div>I: {this.getValue(monPoint25.i)}</div>
                <div>P: {this.getValue(monPoint25.p)}</div>
                <div>Q: {this.getValue(monPoint25.q)}</div>
             </div>
             <div className="dynamo-monPoint-right-bottom">
                <div>I: {this.getValue(monPoint26.i)}</div>
                <div>P: {this.getValue(monPoint26.p)}</div>
                <div>Q: {this.getValue(monPoint26.q)}</div>
             </div>
             <div className="right-bottom-lab">
               <img src={require('../../assets/img/lab_room.png')} width="112" height="93"/>
                <div className="lab-text right-bottom-text">
                 数据处理实验室
                </div>
             </div>
          </div>
          <div className="dynamo-bottom-item">
             {this.getSwitch(monPoint27.i,"left")}
             {this.getCircle(monPoint27.i,"left-top")}
             {this.getCircle(monPoint27.i,"left-bottom")}
             <div className="lbq left-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text left-top-text">
                 无源滤波器5
               </div>
             </div>
             <div className="dynamo-monPoint-left-top">
                <div>I: {this.getValue(monPoint27.i)}</div>
                <div>P: {this.getValue(monPoint27.p)}</div>
                <div>Q: {this.getValue(monPoint27.q)}</div>
             </div>
             <div className="dynamo-monPoint-left-bottom">
                <div>I: {this.getValue(monPoint28.i)}</div>
                <div>P: {this.getValue(monPoint28.p)}</div>
                <div>Q: {this.getValue(monPoint28.q)}</div>
             </div>
             <div className="left-bottom-lab">
               <img src={require('../../assets/img/pbq.png')} width="112" height="93"/>
                <div className="lab-text left-bottom-text">
                 乒乓球室
                </div>
             </div>
             {this.getSwitch(monPoint29.i,"right")}
             {this.getCircle(monPoint29.i,"right-top")}
             {this.getCircle(monPoint29.i,"right-bottom")}
            
             <div className="lbq right-top-lqb">
               <img src={require('../../assets/img/lbq.png')} width="75" height="52"/>
               <div className="text right-top-text">
                 无源滤波器6
               </div>
             </div>
              <div className="dynamo-monPoint-right-top">
                <div>I: {this.getValue(monPoint29.i)}</div>
                <div>P: {this.getValue(monPoint29.p)}</div>
                <div>Q: {this.getValue(monPoint29.q)}</div>
             </div>
             <div className="dynamo-monPoint-right-bottom">
                <div>I: {this.getValue(monPoint30.i)}</div>
                <div>P: {this.getValue(monPoint30.p)}</div>
                <div>Q: {this.getValue(monPoint30.q)}</div>
             </div>
             <div className="right-bottom-line">
               <img src={require('../../assets/img/line_room.png')} width="57" height="132"/>
                <div className="lab-text right-bottom-text">
                 备用供电线路
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

};

module.exports = Transformer;
