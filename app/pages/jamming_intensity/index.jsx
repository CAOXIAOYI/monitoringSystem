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
      alertNum: 50,
      visible:false,
    };

  }
  
 
  componentDidMount() {
    const pointValue = this.getMockPointValue();
    console.log(pointValue)
    this.setState({
      pointValue
    })
  }

  getMockPointValue(){
    const room = ['manyequip','IT','dealData','drywet_2','drywet_3'];
    const point = {
      manyequip:4,
      IT:5,
      dealData:5,
      drywet_2:4,
      drywet_3:5,
    }
    const arr = ['A','B','C','D','E'];
    const self = this;
    let pointValue = [];
    let num = 0;

    room.forEach((item,idx)=>{

      num = point[item];
      console.log(num)

      for(var i = 0; i < num;i++){
        console.log(item)
        pointValue.push({
          cls:item,
          point:arr[i],
          value:self.getValue().toFixed(0)
        })
      }
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
    return parseFloat(Math.random() * 20 + 40)
  }

  renderAlert(list){
    if(list.length == 0){
      return (
        <div className='none-data'>
          暂无数据
        </div>
      )
    }else{
      return list.map((item,idx)=>{
        return (
          <div className="event-body" key={idx}>
            <div className="div-even">{item.date}</div>
            <div className="div-even">{item.value}</div>
          </div>
        )
        
      })
    }
  }


  renderPoint(){

    const alertNum = Number(this.state.alertNum);
    const pointValue = this.state.pointValue;

    if(!pointValue){return false};

    return pointValue.map((item,idx)=>{
      return (
        <div className={`monitor-point ${item.cls}-${item.point}`} key={idx}>
          <span className={item.value > alertNum? 'point red':'point green'}> <i></i></span>
          {item.point + ':' + item.value + 'dB'}
        </div>
      )
    })
  }

  renderRoomStatus(){
    const room = ['数据处理实验室','IT机房','通用干湿实验室2','通用干湿实验室3','仪器集中实验室'];
    const status = Math.random() > 0.5;
    return room.map((item,idx)=>{
      return (
        <div className='row' key={idx}>
          <div className='row-left'>{item}</div>
          <div className={status ? 'row-right red' : 'row-right green'}></div>
        </div>
      )
    })
  }

  render() {
   
    return (
      <div className="jamming-index">
        <div className='page-left'>
          <div className = 'page-title'>实验室电磁场设备电子干扰强度区域分布界面</div>  
          <div className='bottom-content'>

            <img className='img-bg' src={require('../../assets/img/jamming_intensity.png')}/>
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
              <div className='set-alert btn' onClick={this.showAlertModal.bind(this)} style={{display:'none'}}>告警值设置</div>
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