'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");

import { Modal,Input } from 'antd';

var classnames = require('classnames');
require('./index.less');
class Index extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      alertNum: 0.15,
      visible:false,
    };

  }
  
 
  componentDidMount() {
    const pointValue = this.getMockPointValue();
    this.setState({
      pointValue
    })
  }

  getMockPointValue(){
    const room =  ['A','B','C','D','E','F','G','H','I'];
    const self = this;
    let pointValue = [];
    let num = 0;

    room.forEach((item,idx)=>{
     
      pointValue.push({
        cls:'point',
        point:item,
        value:self.getValue().toFixed(2)
      })
      
    })

    return pointValue
  }

  showAlertModal(){
    const alertNum = this.state.alertNum;

    this.setState({
      visible:true,
      tempValue:alertNum
    })

  }

  handleOk(){
    const tempValue = this.state.tempValue;
    this.setState({
      alertNum:tempValue,
      tempValue:null,
      visible:false
    })
  }

  handleCancel(){
    this.setState({
      visible:false,
      tempValue:null
    })
  }
  
  inputOnChange(e){
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
      visible:true,
      tempValue:value
    })
    }
  }

  getValue(){
    return parseFloat(Math.random() / 100)
  }

  renderPoint(){

    const alertNum = Number(this.state.alertNum);
    const pointValue = this.state.pointValue;

    if(!pointValue){return false};

    return pointValue.map((item,idx)=>{
      return (
        <div className={`monitor-point ${item.cls}-${item.point}`} key={idx}>
          <span className={item.value > alertNum? 'point red':'point green'}> <i></i></span>
          {item.point + ':' + item.value + 'μT'}
        </div>
      )
    })
  }

  renderRoomStatus(){
    const room = ['A','B','C','D','E','F','G','H','I'];
    const {alertNum ,pointValue}= this.state;
    if(!pointValue){return false};

    return room.map((item,idx)=>{
      const value = pointValue[idx].value || 0;
      return (
        <div className='row' key={idx}>
          <div className='row-left'>测量点{item}</div>
          <div className={value < alertNum ? 'row-right red' : 'row-right green'}></div>
        </div>
      )
    })

  }

  render() {
   
    return (
      <div className="radiate-index">
        <div className='page-left'>
          <div className = 'page-title'>作业甲板辐射强度分布监控界面</div>  
          <div className='bottom-content'>
            <img className='img-bg' src={require('../../assets/img/radiate-top.png')}/>
            {this.renderPoint()}

          </div>

        </div>
        <div className='page-right'>
          <div className='top-content'>
            <div className='label-txt'>越限警告：</div>
            <div className='normal'>
              <span className='circle green'></span>
              正常
            </div>
            <div className='warn'>
              <span className='circle red'></span>
              越限
            </div>
          </div>
          <div className='status-box'>
            {this.renderRoomStatus()}
          </div>
          <div className='bottom-box'>
              <div className='date-putin btn'>数据导入</div>
              <div className='set-alert btn' onClick={this.showAlertModal.bind(this)}>告警值设置</div>
            </div>
        </div>
        
        <Modal
          title="告警值设置"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div className='row'>
            <div className='label-name'>告警值：</div>
            <Input placeholder="请输入告警值，仅支持数字" value={this.state.tempValue} onChange={this.inputOnChange.bind(this)}/>
          </div>
        </Modal>



      </div>
      
    );
  }
 
};
module.exports  = Index