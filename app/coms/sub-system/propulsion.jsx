'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");

let Line = require("../commons/echarts/line/line.jsx");

require('./propulsion.less');
let classnames = require("classnames");
class Propulsion extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      lastLineData:[[],[],[],[]]
    };

    this.indata = {
      lastLineData:[[],[],[],[]],
    }
  }

  componentDidMount(){
    this.updateFlag = true;
  }

  componentWillReceiveProps(nextProps){
    // this.indata.id = nextProps.id;
    if(nextProps.id > this.props.id || this.props.id == 0){
      this.updateFlag = true;
    }else{
      this.updateFlag = false;
    }
  }

  formatLineData(){

    let lineData = [];
    let lastLineData = this.indata.lastLineData;

    (this.props.data || []).forEach((item,idx)=>{
       
      if(this.updateFlag){
        // lastLineData[idx].push(Math.random()*100);  
        lastLineData[idx].push(item.p);
      }
      
        
      let itemData = lastLineData[idx];
      lineData.push({
        title:'',
        data:[itemData.slice(-10,-1)],
        legend:[item.deviceName],
        item:[]
      })
      lastLineData[idx] = itemData;
    })
    
    this.indata.lastLineData = lastLineData;

    return lineData

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

  //顶部折线图
  renderEcharts(){

    let lineData = this.formatLineData();

    let lineDom = [];
    lineData.forEach((itemData,idx)=>{
      lineDom.push(
        <div className='line-item' key={idx}>
          <Line data={itemData}/>
        </div>
      )
    })

    return (
      <div className='page-top'>
        {lineDom}
      </div>
    )
  }
  render() {
    let monPoint7 = {};
    let monPoint8 = {};
    let monPoint9 = {};
    let monPoint10 = {};
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 7){
          monPoint7 = item;
        }
        if(item.meterId === 8){
          monPoint8 = item;
        }
        if(item.meterId === 9){
          monPoint9 = item;
        }
        if(item.meterId === 10){
          monPoint10 = item;
        }
      });
    }
    return (
      <div className="propulsion-page">
        {this.renderEcharts()}
        <div className="page-center">
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
          <div className="dynamo-top"></div>
          <div className="dynamo-middle">
            <div className="dynamo-middle-left">
              <div className="u-left">Busbar A</div>
              <div className="dynamo-line">
                <div className="dynamo-lable-left">
                  <div>I: {this.getValue(monPoint8.i)}</div>
                  <div>P: {this.getValue(monPoint8.p)}</div>
                  <div>Q: {this.getValue(monPoint8.q)}</div>
                </div>
                {this.getSwitch(monPoint8.i,"left")}
                <div className="first-circle">
                  <img src={require('../../assets/img/tuijin.png')} width="75" height="75"/>
                  {this.getCircle(monPoint8.i,"left")}
                  <div className="circle-text">1号推进电机</div>
                </div>
                <div className="dynamo-lable-right">
                  <div>I: {this.getValue(monPoint7.i)}</div>
                  <div>P: {this.getValue(monPoint7.p)}</div>
                  <div>Q: {this.getValue(monPoint7.q)}</div>
                </div>
                {this.getSwitch(monPoint7.i,"right")}
                
               
                <div className="sec-circle">
                  <img src={require('../../assets/img/dj.png')} width="90" height="85"/>
                  {this.getCircle(monPoint7.i,"right")}
                  <div className="circle-text">艉侧推电机</div>
                </div>
              </div>
            </div>
            <div className="dynamo-middle-right">
              <div className="u-left">Busbar B</div>
              <div className="dynamo-line">
                <div className="dynamo-lable-left">
                  <div>I: {this.getValue(monPoint9.i)}</div>
                  <div>P: {this.getValue(monPoint9.p)}</div>
                  <div>Q: {this.getValue(monPoint9.q)}</div>
                </div>
                {this.getSwitch(monPoint9.i,"left")}
                
              
                <div className="first-circle">
                  <img src={require('../../assets/img/tuijin.png')} width="75" height="75"/>
                  {this.getCircle(monPoint9.i,"left")}
                  <div className="circle-text">2号推进电机</div>
                </div>
                <div className="dynamo-lable-right">
                  <div>I: {this.getValue(monPoint10.i)}</div>
                  <div>P: {this.getValue(monPoint10.p)}</div>
                  <div>Q: {this.getValue(monPoint10.q)}</div>
                </div>
                {this.getSwitch(monPoint10.i,"right")}
                
                <div className="sec-circle">
                  <img src={require('../../assets/img/dj.png')} width="90" height="85"/>
                  {this.getCircle(monPoint10.i,"right")}
                  <div className="circle-text">艏侧推电机</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='page-bottom'>
          <table className='table-content'>
            <tbody>
              <tr className='row'>
                <th>设备</th>
                <th>当前状态</th>
              </tr>
              {
                this.props.tableData && this.props.tableData.map((item,idx)=>{
                  return (
                    <tr className='row' key={idx}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

};

module.exports = Propulsion;
