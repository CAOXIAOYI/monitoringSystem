'use strict';

let React = require('react');

let connect = require('react-redux').connect;

import { Input,Modal,Button,Row,Col,DatePicker,message } from 'antd';

const POWERQUALITYRIGHTTYPE = require("../../../services/powerQualityRightType.js");
const RangePicker = DatePicker.RangePicker;
let Area = require("../../../coms/commons/echarts/area/area.jsx");
//let Line = require("../../../coms/commons/echarts/line/line.jsx");
let Line = require("../../../coms/commons/echarts/line-ua/line.jsx");
let moment = require('moment');
var classnames = require('classnames');
require('./electric.less');
let Electric = React.createClass({
  getInitialState: function(){
    return {
      startValue: moment(0, "HH"),
      endValue: moment(),
      cancelBtn: true,
      deletesBtn:false,
      dataIndex:""
    }
  },
  onRangePickerChange: function(dates, dateStrings) {
    this.setState({
      startValue: dateStrings[0],
      endValue: dateStrings[1],
    });
  },

  chanageHandleClick: function(type){
    
    if(type === "cancel" && !this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn
      })
    }
    if(type === "confirm" && this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn
      })
    }
  },
  onClickEchart(dataIndex){
    this.setState({ dataIndex: dataIndex });
  },
  onCancelClick(){
    this.setState({
      startValue: null,
      endValue: null,
    });
  },
  onAffirmClick(){
    //this.props.onAffirmClick();
  
    let _currentMeterId = this.props.historyDataMeta.currentMeterId || "" ;
    if(!_currentMeterId){
      message.warning("请选择查询设备!");
      return;
    }
    if(!this.state.startValue){
      message.warning("请选择开始时间!");
      return;
    }
    if(!this.state.endValue){
      message.warning("请选择结束时间!");
      return;
    }
    let _startValue = moment(this.state.startValue).format("YYYY-MM-DD HH:mm:ss");
    let _endValue = moment(this.state.endValue).format("YYYY-MM-DD HH:mm:ss");
    this.props.historyData({},{meterId:_currentMeterId,start:_startValue,end:_endValue}).then((result)=>{
      if(result.data.eventList.length==0 && result.data.hdList.length == 0){
        message.warning("未查询到数据");
      }
    });
  },
  render: function () {
    let selectedClass = classnames({
      "selected": true,
    })
    //  let currentEchartData = {
    //   title:'',
    //   legend:['Ua'],
    //   item:['周一','周二','周三','周四'],
    //   data:[[1, 2,4, 2]]
    //   //"title":title,"item":item,"data":data,"legend":legend
    // }
    let _eventList = this.props.historyDataMeta.historyData["eventList"] || [];
    let eventListDom = _eventList.map((item,index)=>{
      if(index%2 === 0){
        return (
           <div className="electric-body" key={index}>
              <div className="div-odd">{item.time_stamp}</div>
              <div className="div-odd">{item.device_room}</div>
              <div className="div-odd">{item.event}</div>
            </div>
        )
      }else{
        return (
           <div className="electric-body" key={index}>
              <div className="div-even">{item.time_stamp}</div>
              <div className="div-even">{item.device_room}</div>
              <div className="div-even">{item.event}</div>
            </div>
        )
      }
    });
    //color:['#4A8DBB', '#D34445', '#90B758', '#D07541', '#E2CF21','#218CE2'],
    let _hdList = this.props.historyDataMeta.historyData["hdList"] || [];
    let currentEchartUAData = {title:'',legend:['Ua'],item:[],data:[],color:['#4A8DBB']};
    let currentEchartUBData = {title:'',legend:['Ub'],item:[],data:[],color:['#D34445']};
    let currentEchartUCData = {title:'',legend:['Uc'],item:[],data:[],color:['#90B758']};
    let currentEchartIAData = {title:'',legend:['Ia'],item:[],data:[],color:['#4A8DBB']};
    let currentEchartIBata = {title:'',legend:['Ib'],item:[],data:[],color:['#D34445']};
    let currentEchartICData = {title:'',legend:['Ic'],item:[],data:[],color:['#90B758']};
    let _ua = [];
    let _ub = [];
    let _uc = [];
    let _ia = [];
    let _ib = [];
    let _ic = [];

    let _hdListData = _hdList.map((item,index)=>{
      _ua.push(item.ua || 0);
      _ub.push(item.ub || 0);
      _uc.push(item.uc || 0);
      _ia.push(item.ia || 0);
      _ib.push(item.ib || 0);
      _ic.push(item.ic || 0);
      currentEchartUAData.item.push(item.timeStamp || "");
      currentEchartUBData.item.push(item.timeStamp || "");
      currentEchartUCData.item.push(item.timeStamp || "");
      currentEchartIAData.item.push(item.timeStamp || "");
      currentEchartIBata .item.push(item.timeStamp || "");
      currentEchartICData.item.push(item.timeStamp || "");
    });
    currentEchartUAData.data.push(_ua);
    currentEchartUBData.data.push(_ub);
    currentEchartUCData.data.push(_uc);
    currentEchartIAData.data.push(_ia);
    currentEchartIBata.data.push(_ib);
    currentEchartICData.data.push(_ic);


    // let _hdListData = _hdList.map((item,index)=>{
    //   currentEchartUAData.item.push(item.ua || 0);
    //   currentEchartUBData.item.push(item.ub || 0);
    //   currentEchartUCData.item.push(item.uc || 0);
    //   currentEchartIAData.item.push(item.ia || 0);
    //   currentEchartIBata.item.push(item.ib || 0);
    //   currentEchartICData.item.push(item.ic || 0);
    // });
    // currentEchartUAData.data.push(currentEchartUAData.item);
    // currentEchartUBData.data.push(currentEchartUBData.item);
    // currentEchartUCData.data.push(currentEchartUCData.item);
    // currentEchartIAData.data.push(currentEchartIAData.item);
    // currentEchartIBata.data.push(currentEchartIBata.item);
    // currentEchartICData.data.push(currentEchartICData.item);
    let detailDom = [];
    if(this.state.dataIndex){
      for(let key in _hdList[this.state.dataIndex]){
        if(POWERQUALITYRIGHTTYPE[key]){
          detailDom.push(
            <Row className="electric-param" key={key}>
             <Col span={12} offset={2}>
                <span>{POWERQUALITYRIGHTTYPE[key]}</span>
             </Col>
             <Col span={10}>
                <span>{_hdList[this.state.dataIndex][key]}</span>
             </Col>
           </Row>
           );
        } 
      }
    }
    let electricTime = classnames({
      "electric-time":true,
      "electric-time-detail":!detailDom.length>0
    });
    let electricList = classnames({
      "electric-list":true,
      "electric-list-detail":!detailDom.length>0
    });
    var dateValue = [];
    if(this.state.startValue && this.state.endValue){
      dateValue = [moment(moment(this.state.startValue), "YYYY-MM-DD HH:mm:ss"), moment(moment(this.state.endValue), "YYYY-MM-DD HH:mm:ss")];
    }

    return (
      <div className="page-history-data">
       <div className="left-device-control">
          <div className="electric-echarts">
            <Line data = {currentEchartUAData} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-echarts">
            <Line data = {currentEchartIAData} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-echarts">
            <Line data = {currentEchartUBData} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-echarts">
            <Line data = {currentEchartIBata} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-echarts">
            <Line data = {currentEchartUCData} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-echarts">
            <Line data = {currentEchartICData} onClickEchart={this.onClickEchart}/>
          </div>
          <div className="electric-bottom">
            <div className="electric-header">
              <div>时间</div>
              <div>名称</div>
              <div>描述</div>
            </div>
            {eventListDom.length>0?eventListDom:<div className="none-data">无数据</div>}
          </div>
       </div>
       <div className="right-device-control">
          <div className={electricTime}>
            <Row>
               <Col span={12} offset={2}>
                  <span>时间选择</span>
               </Col>
            </Row>
            <Row>
               <Col span={22} offset={1}>
                  <RangePicker
                    ranges={{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }}
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    style={{width:"100%",
                    height:60,
                    display:"block",
                    borderRadius: 10,
                    border: "1px solid #d9d9d9"}}
                    value={dateValue}
                    onChange={this.onRangePickerChange}
                  />
               </Col>
            </Row>
            <div className="btn-row">
              <div className="index-chageBtn">
                <div className={!!!this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"confirm")}>
                  <span onClick={this.onAffirmClick}>确认</span>
                </div>
                <div className={this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"cancel")}>
                  <span onClick={this.onCancelClick}>取消</span>
                </div>
              </div>
            </div>
          </div>
          <div className={electricList}>
             {detailDom}
          </div>
       </div>
      </div>
    );
  },

});
var historyDataAction = require('../../../actions/page-action/history-data');
function mapStateToProps(state, ownProps) {
  return {
    historyDataMeta:state.historyData,
  };
}

module.exports = connect(mapStateToProps, {
  //page-action
    historyData: historyDataAction.historyData,
    historyDataQuality: historyDataAction.historyDataQuality,
    historyEvent: historyDataAction.historyEvent,
    historyEventData: historyDataAction.historyEventData,
})(Electric);
