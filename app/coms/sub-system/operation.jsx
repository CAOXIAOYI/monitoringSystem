'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");
let Line = require("../commons/echarts/line/line.jsx");
require('./operation.less');
let classnames = require("classnames");
class Propulsion extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      lastLineData:[[],[],[],[],[]]
    };
    this.updateFlag = true;
    this.indata = {
      lastLineData:[[],[],[],[],[]],
    }

    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

  formatLineData(){

    console.log(this.props.data)

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
    let monPoint5 = {};
    let monPoint6 = {};
    let monPoint11 = {};
    let monPoint12 = {};
    let monPoint15 = {};
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 5){
          monPoint5 = item;
        }
        if(item.meterId === 6){
          monPoint6 = item;
        }
        if(item.meterId === 11){
          monPoint11 = item;
        }
        if(item.meterId === 12){
          monPoint12 = item;
        }
        if(item.meterId === 15){
          monPoint15 = item;
        }
      });
    }
    return (
      <div className="operation-page">
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
          <div className="dynamo-top">
          </div>
          <div className="dynamo-middle">
            <div className="dynamo-middle-left">
              <div className="u-left">Busbar A</div>
              <div className="dynamo-line">
                <div className="dynamo-lable-left">
                  <div>I: {this.getValue(monPoint6.i)}</div>
                  <div>P: {this.getValue(monPoint6.p)}</div>
                  <div>Q: {this.getValue(monPoint6.q)}</div>
                </div>
                {this.getSwitch(monPoint6.i,"left")}
                
                <div className="first-circle">
                  <img src={require('../../assets/img/dj.png')} width="75" height="75"/>
                  {this.getCircle(monPoint6.i,"left")}
                  <div className="circle-text">1号地震空压机</div>
                </div>
                <div className="dynamo-lable-right">
                  <div>I: {this.getValue(monPoint5.i)}</div>
                  <div>P: {this.getValue(monPoint5.p)}</div>
                  <div>Q: {this.getValue(monPoint5.q)}</div>
                </div>
                {this.getSwitch(monPoint5.i,"right")}
                <div className="sec-circle">
                  <img src={require('../../assets/img/dj.png')} width="75" height="75"/>
                  {this.getCircle(monPoint5.i,"right")}
                  <div className="circle-text">CTD绞车</div>
                </div>
              </div>
            </div>
            <div className="dynamo-middle-right">
              <div className="u-left">Busbar B</div>
              <div className="dynamo-line-left">
                <div className="dynamo-lable-left">
                  <div>I: {this.getValue(monPoint12.i)}</div>
                  <div>P: {this.getValue(monPoint12.p)}</div>
                  <div>Q: {this.getValue(monPoint12.q)}</div>
                </div>
                {this.getSwitch(monPoint12.i,"left")}
                
                <div className="first-circle">
                  <img src={require('../../assets/img/dj.png')} width="75" height="75"/>
                  {this.getCircle(monPoint12.i,"left")}
                  <div className="circle-text">万米钢缆绞车</div>
                </div>
                <div className="dynamo-lable-right">
                  <div>I: {this.getValue(monPoint15.i)}</div>
                  <div>P: {this.getValue(monPoint15.p)}</div>
                  <div>Q: {this.getValue(monPoint15.q)}</div>
                </div>
                {this.getSwitch(monPoint15.i,"right")}
                
                <div className="sec-circle">
                  <img src={require('../../assets/img/dj.png')} width="75" height="75"/>
                  {this.getCircle(monPoint15.i,"right")}
                  <div className="circle-text">纤维/光电缆绞车</div>
                </div>
              </div>
              <div className="dynamo-line-right">
                <div className="dynamo-lable-right">
                  <div>I: {this.getValue(monPoint11.i)}</div>
                  <div>P: {this.getValue(monPoint11.p)}</div>
                  <div>Q: {this.getValue(monPoint11.q)}</div>
                </div>
                {this.getSwitch(monPoint11.i,"right")}
                
                <div className="sec-circle">
                  <img src={require('../../assets/img/dj.png')} width="75" height="75"/>
                  {this.getCircle(monPoint11.i,"right")}
                  <div className="circle-text">2号地震空压机</div>
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
              <tr className='row'>
                <td>1号地震空压机</td>
                <td>{parseInt(monPoint6.i) < 0.1 ?'静止':'空压作业'}</td>
              </tr>
              <tr className='row'>
                <td>CTD绞车</td>
                <td>{parseInt(monPoint5.i) < 0.1 ?'静止':'电缆收放作业'}</td>
              </tr>
              <tr className='row'>
                <td>万米钢缆绞车</td>
                <td>{parseInt(monPoint12.i) < 0.1 ?'静止':'钢缆收放作业'}</td>
              </tr>
              <tr className='row'>
                <td>纤维/光电缆绞车</td>
                <td>{parseInt(monPoint15.i) < 0.1 ?'静止':'电缆收放作业'}</td>
              </tr>
              <tr className='row'>
                <td>2号地震空压机</td>
                <td>{parseInt(monPoint11.i) < 0.1 ?'静止':'空压作业'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

};

module.exports = Propulsion;
