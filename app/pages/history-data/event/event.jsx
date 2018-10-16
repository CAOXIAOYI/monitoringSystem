'use strict';

let React = require('react');

let connect = require('react-redux').connect;

import { Input,Modal,Button,Row,Col,DatePicker,message } from 'antd';

let Line = require("../../../coms/commons/echarts/line/line.jsx");
let moment = require('moment');
const RangePicker = DatePicker.RangePicker;
var classnames = require('classnames');

require('./event.less');
let Electric = React.createClass({
  getInitialState: function(){
    return {
      isStretchIcon: false,
      cancelBtn: true,
      startValue: moment(0, "HH"),
      endValue: moment(),
    }
  },

  historyEventData(item){
    this.props.historyEventData({},{eventId:item.id});
    this.setState({
      isStretchIcon: false,
    });

  },
  stretchIconClick() {
    this.setState({
      isStretchIcon: !!!this.state.isStretchIcon,
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
  onRangePickerChange: function(dates, dateStrings) {
    this.setState({
      startValue: dateStrings[0],
      endValue: dateStrings[1],
    });
  },
  onCancelClick(){
    this.setState({
      startValue: null,
      endValue: null,
    });
  },
  onAffirmClick(){
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
    this.props.historyEvent({},{eventId:_currentMeterId,start:_startValue,end:_endValue});
  },
  render: function () {
    let selectedClass = classnames({
      "selected": true,
    })
    let _eventList = this.props.historyDataMeta.historyEvent || [];
    let eventListDom = _eventList.map((item,index)=>{
      if(index%2 === 0){
        return (
           <div className="event-body" onClick={this.historyEventData.bind(this,item)} key={index}>
              <div className="div-even">{item.time_stamp}</div>
              <div className="div-even">{item.event}</div>
              <div className="div-even">{item.device_room}</div>
            </div>
        )
      }else{
        return (
           <div className="event-body" onClick={this.historyEventData.bind(this,item)} key={index}>
              <div className="div-odd">{item.time_stamp}</div>
              <div className="div-odd">{item.event}</div>
              <div className="div-odd">{item.device_room}</div>
            </div>
        )
      }
    });
    let historyEventData =this.props.historyDataMeta.historyEventData || {};
    let currentEchartUUData = {
      title:'',
      legend:['Ua','Ub','Uc'],
      item:[],
      data:[]
    };
    let currentEchartIIData = {
      title:'',
      legend:['Ia','Ib','Ic'],
      item:[],
      data:[]
    };
    currentEchartUUData.data[0] = historyEventData.ua?historyEventData.ua : [];
    currentEchartUUData.data[1] = historyEventData.ub?historyEventData.ub : [];
    currentEchartUUData.data[2] = historyEventData.uc?historyEventData.uc : [];
    currentEchartIIData.data[0] = historyEventData.ia?historyEventData.ia : [];
    currentEchartIIData.data[1] = historyEventData.ib?historyEventData.ib : [];
    currentEchartIIData.data[2] = historyEventData.ic?historyEventData.ic : [];

    let echartsClass = classnames({
      "event-echarts": true,
      "event-echarts-stretch":this.state.isStretchIcon
    })
    let bottomClass = classnames({
      "event-bottom": true,
      "event-bottom-stretch":this.state.isStretchIcon
    })
    let stretchIcon = <i className="iconfont">&#xe69c;</i>
    if (this.state.isStretchIcon) {
      stretchIcon = <i className="iconfont">&#xe642;</i>
    }
    var dateValue = [];
    if(this.state.startValue && this.state.endValue){
      dateValue = [moment(moment(this.state.startValue), "YYYY-MM-DD HH:mm:ss"), moment(moment(this.state.endValue), "YYYY-MM-DD HH:mm:ss")];
    }
    return (
      <div className="page-event-data">
        <div className="left-device-control">
          <div className={echartsClass}>
            <Line data = {currentEchartUUData}/>
          </div>
          <div className={echartsClass}>
            <Line data = {currentEchartIIData}/>
          </div>
          <div className={bottomClass}>
            <div className="stretchIcon" onClick={this.stretchIconClick}>
              <span>
                {stretchIcon}
              </span>
            </div>
            <div className="event-header">
              <div>时间</div>
              <div>名称</div>
              <div>描述</div>
            </div>
            {eventListDom.length>0?eventListDom:<div className="none-data">无数据</div>}
          </div>
         </div>
         <div className="right-device-control">
          <div className="electric-time">
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
