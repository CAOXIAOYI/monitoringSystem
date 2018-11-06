'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");

const FileUpload = require('react-fileupload');

import Column from './column/column.jsx';


import { Modal,Input } from 'antd';

import {
  AlertMonitor,
} from '../../httpCenter/modal/business.model.js';

const alertMonitor = AlertMonitor.getInstance();

var classnames = require('classnames');
require('./index.less');
class Index extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      alertNum: 1.5,
      visible:false,

    };

    this.mock = {
      alertList:[
        {
          date:'2018-05-11',
          value:1.8
        },{
          date:'2018-04-21',
          value:1.7
        },{
          date:'2018-03-25',
          value:1.8
        },{
          date:'2018-03-05',
          value:1.9
        },{
          date:'2018-02-15',
          value:1.6
        },{
          date:'2018-02-07',
          value:1.7
        }
      ],
      columnData:{
        title:'',
        legend:['电阻值'],
        item:['2018-05-7','2018-05-8','2018-05-9','2018-05-10','2018-05-11','2018-05-12'],
        data:[[1.3,1.5,1.2,1.4,1.6,1.3]]

      }
    }

    this.fileUploadOptions = {
        baseUrl:'http://dfh.jokco.com/dfh/upload/1',
        chooseAndUpload:true,
    }
  }
  
 
  componentDidMount() {
    this.fetchPageInfo();

  }

  fetchPageInfo(){
    alertMonitor.url = 'param/warnParameterSetting/resistance';
    alertMonitor.excute((res)=>{

    },(err)=>{
      
    })
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

  render() {


   
    const list = this.mock.alertList;
    return (
      <div className="ground-index">
        <div className='page-left'>
          <div className='left-content'>
            <div className='img-box'>
              <img className='top-img' src={require('../../assets/img/ground_1.png')}/>
              <img className='bottom-img' src={require('../../assets/img/ground_2.png')}/>
            </div>
            <div className='equip_name name_top'>IT机房机柜</div>
            <div className='equip_name name_left'>接地干线</div>
            <div className='equip_name name_point'>
              <span className='red'></span>
              接地电阻测量点</div>
            <div className='equip_name name_ground'>总接地板</div>
            <div className='equip_name name_down'>接地极</div>
          </div>
          <div className='right-content'>
            <div className='echarts-box'>
              <div className='title'>接地信号检测</div>
              <div className='bottom-content'>
                <Column 
                    data={this.mock.columnData} 
                    alertNum={this.state.alertNum}
                    spec={true}
                />
              </div>
            </div>
            <div className='bottom-box'>
              <FileUpload options={this.fileUploadOptions}>
                  <div className='date-putin btn' ref="chooseAndUpload">数据导入</div>
                  
              </FileUpload>
              <div className='date-putin btn' style={{display:'none'}}>数据导入</div>
              <div className='set-alert btn' onClick={this.showAlertModal.bind(this)} style={{display:'none'}}>告警值设置</div>
            </div>
          </div>
        </div>
        <div className='page-right'>
          <div className='alert-title'>
            接地电阻越限警告记录
          </div>  
          <div className="event-header">
            <div>日期</div>
            <div>越限值</div>
          </div>
          <div className='scroll-body'>
            {this.renderAlert(list)}
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