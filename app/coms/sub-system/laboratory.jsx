'use strict';
import { Modal, Button, Form, Input, InputNumber, Select, } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../commons/base/baseCom.jsx");
let Line = require("../commons/echarts/line/line.jsx");
require('./laboratory.less');
let classnames = require("classnames");
class Transformer extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      lastLineData:[[],[],[],[]]
    };

    this.indata = {
      lastLineData:[[],[],[],[]],
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
    let monPoint31 = {};
    if(this.props.data){
      this.props.data.map((item, index) => {
        if(item.meterId === 31){
          monPoint31 = item;
        }
      });
    }

    const p = parseFloat(monPoint31.p);
    let status = '';
    switch(p){
      case 0 :
        status = 'UPS浮充';
        break;
      case (p > 0) :
        status = '放电运行';
        break;
      case (p < 0) :
        status = '充电运行';
        break;
    }

    return (
      <div className="laboratory-page">
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
        <div className='page-bottom'>
          <table className='table-content'>
            <tbody>
              <tr className='row'>
                <th>设备</th>
                <th>当前状态</th>
              </tr>
              <tr className='row'>
                <td>实验室UPS</td>
                <td>{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

};

module.exports = Transformer;
