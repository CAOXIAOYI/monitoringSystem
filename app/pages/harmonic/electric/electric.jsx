'use strict';

let React = require('react');

let connect = require('react-redux').connect;
let moment = require("moment");
import { InputNumber,Button,Row,Col,Select,message,DatePicker } from 'antd';

let Column = require("../../../coms/commons/echarts/column/column.jsx");

require('./electric.less');
let Electric = React.createClass({
  getInitialState: function(){
    return {
      cerrentTime:"11",
      selectedTime:"0",
      type:0
    }
  },
  skip(){
    if(!this.props.harmonicMeta.currentMeterId){
      message.warning("请选择设备!");
      return;
    }
    //let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:moment().subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:"";
    this.props.getSpecifyHarmonic({
      meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      thdNum:parseInt(this.state.cerrentTime),
      timeStamp:timeStamp,
    });
  },
  skipTime(time){
    if(!!!this.props.harmonicMeta.currentMeterId){
      message.warning("请选择设备!");
      return;
    }
    //let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:moment().subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:"";
    this.props.getSpecifyHarmonic({
      meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      thdNum:parseInt(time),
      timeStamp:timeStamp,
    });
  },
  onInputChange(evt) {
    this.setState({
      cerrentTime:evt.target.value
    });
  },
  handleSelectChange(value){
    //let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:moment().subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:"";
    this.props.harmonicQueryData({
      meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      thdNum:parseInt(value),
      timeStamp:timeStamp
    });
    this.setState({
      selectedTime:value
    });
  },

  handleTypeSelectChange(value){
    this.setState({
      type:value
    },()=>{
      switch (value){
        case '0' :
          this.skip();
          break;
        case '1' :
          this.handleTHDSelectChange(this.state.thdType);
          break;
        case '2' :
          this.handleSelectChange(this.state.selectedTime);
      }
    })
  },

  handleTHDSelectChange(time){
    if(!!!this.props.harmonicMeta.currentMeterId){
      message.warning("请选择设备!");
      return;
    }

    this.setState({
      thdType:time
    })

    //let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:moment().subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:"";
    this.props.getSpecifyHarmonic({
      meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      thdNum:parseInt(time),
      timeStamp:timeStamp,
    });
  },

  onDatePickerChange(value, dateString) {
    if(!!!value){
      this.props.setCurrentTimeStamp({currentTimeStamp:""});
      // this.props.harmonicQueryData({
      //   meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      //   thdNum:this.state.selectedTime,
      //   timeStamp:moment(value).format("YYYY-MM-DD HH:mm:ss"),
      // });
    }
  },
  onDatePickerOk(value,dateString) {
    this.props.setCurrentTimeStamp({currentTimeStamp:moment(value).format("YYYY-MM-DD HH:mm:ss")});
    this.props.harmonicQueryData({
      meterId:parseInt(this.props.harmonicMeta.currentMeterId),
      thdNum:this.state.selectedTime,
      timeStamp:moment(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  },
  render: function () {
    let _deviceDatas = this.props.harmonicMeta.deviceDatas;
    let _currentMeterId = this.props.harmonicMeta.currentMeterId;
    let columnDom = [];
    let cTime = this.props.harmonicMeta.currentTimeStamp?moment(this.props.harmonicMeta.currentTimeStamp):null;
    if(_deviceDatas && _currentMeterId){
     columnDom = _deviceDatas[_currentMeterId] && _deviceDatas[_currentMeterId].map((item,index)=>{
        let _title = item.harmonicName;
        if(_title === -1){
          _title = 'THD';
        }else if(_title === 0){
          _title = '总奇次';
        }else if(_title === 1){
          _title  = '总偶次';
        }else{
          _title = _title+"次谐波";
        }
        let currentEchartData = {
          title:_title,
          legend:['a','b','c'],
          item:['U 电压','I 电流'],
          data:[[item.uanhd,item.ianhd],[item.ubnhd,item.ibnhd],[item.ucnhd,item.icnhd]]
        }
        return (
          <div className="electric" key={index}>
           <Column data = {currentEchartData}/>
          </div>
        )

      });
    }
    return (
      <div className="page-harmonic">
        <div className="electric-equipment-container">
          <Row className="search-param" style={{paddingLeft:'20px'}}>
            <Col span={6}>
              <span className="search-span">搜索类型：</span>
              <Select
                value={this.state.type || '单次数选择'}
                style={{ width: '160px' }}
                onChange={this.handleTypeSelectChange}
              >
                <Select.Option value="0">单次数选择</Select.Option>
                <Select.Option value="1">THD、总奇次、总偶次</Select.Option>
                <Select.Option value="2">列表选择</Select.Option>
              </Select>
             </Col>
             {this.state.type == 0 ? <Col span={8}>
               <span className="search-span">第</span>
               <span className="search-number">
                 <InputNumber min={1} max={100} name="number" defaultValue={this.state.cerrentTime} onBlur={this.onInputChange}/>
               </span>
               <span className="search-span">次谐波</span>
               <span className="search-button">
                 <Button onClick={this.skip}>跳转</Button>
               </span>
             </Col>:''}
             {this.state.type == 1 ? <Col span={4}>
                <Select
                  value={this.state.thdType > -1 ?this.state.thdType:'THD'}
                  style={{ width: '100%' }}
                  onChange={this.handleTHDSelectChange}
                >
                  <Select.Option value="-1">THD</Select.Option>
                  <Select.Option value="0">总奇次</Select.Option>
                  <Select.Option value="1">总偶次</Select.Option>
                </Select>
             </Col>:''}
             
             {this.state.type == 2 ? <Col span={4} offset={1}>
                <Select
                  value={this.state.selectedTime}
                  style={{ width: '100%' }}
                  onChange={this.handleSelectChange}
                >
                  <Select.Option value="0">1-10次谐波</Select.Option>
                  <Select.Option value="1">11-20次谐波</Select.Option>
                  <Select.Option value="2">21-30次谐波</Select.Option>
                  <Select.Option value="3">31-40次谐波</Select.Option>
                  <Select.Option value="4">41-50次谐波</Select.Option>
                  <Select.Option value="5">51-60次谐波</Select.Option>
                  <Select.Option value="6">61-70次谐波</Select.Option>
                  <Select.Option value="7">71-80次谐波</Select.Option>
                  <Select.Option value="8">81-90次谐波</Select.Option>
                  <Select.Option value="9">91-100次谐波</Select.Option>
              </Select>
             </Col>:''}
          </Row>
          <Row className="search-param">
            <Col span={4}>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择查询时间"
                defaultValue={cTime}
                onChange={this.onDatePickerChange}
                onOk={this.onDatePickerOk}
              />
             </Col>
          </Row>
          <div className="electric-list">
            {columnDom.length===0?<div className="none-data">暂无数据</div>:columnDom}
          </div>
        </div>
      </div>
    );
  },

});

var harmonicAction = require('../../../actions/page-action/harmonic');

function mapStateToProps(state, ownProps) {
  return {
    harmonicMeta:state.harmonic,
  };
}

module.exports = connect(mapStateToProps, {
  //page-action
  harmonicQueryData: harmonicAction.harmonicQueryData,
  getSpecifyHarmonic:harmonicAction.getSpecifyHarmonic,
  setCurrentTimeStamp:harmonicAction.setCurrentTimeStamp
})(Electric);
