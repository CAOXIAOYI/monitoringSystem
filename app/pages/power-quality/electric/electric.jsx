'use strict';

let React = require('react');

let connect = require('react-redux').connect;

let Line = require("../../../coms/commons/echarts/line/line.jsx");
let RealLineU = require("../../../coms/commons/echarts/real-line/real-line.jsx");
let RealLineL = require("../../../coms/commons/echarts/real-line-l/real-line-l.jsx");
import { InputNumber,Button,Row,Col } from 'antd';

const POWERQUALITYRIGHTTYPE = require("../../../services/powerQualityRightType.js");
const POWERQUALITYBOTTOMTTYPE = require("../../../services/powerQualityBottomType.js");

var classnames = require('classnames');

require('./electric.less');
let Electric = React.createClass({
  getInitialState: function(){
    return {
      
    }
  },
  getDate:function(value){
    var now = new Date();
    var res = [];
    //var len = 256;
    var len = 60;
    while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
        now = new Date(now - 1000);
    }
    return res;
  },
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  },
  componentWillReceiveProps(nextProps) {
    let query = nextProps.location.query;
    if (!_.isEmpty(query)) {
      if(nextProps.location.query.meter_id !== this.props.location.query.meter_id){
        this.props.powerQualityData({grid:query.grid},{meterId:query.meter_id});
      }
    }
  },
  componentDidMount() {
    //this.timer = setInterval(() => this.tick(), 3000);
    this.props.generalLeftMenu().then((result)=>{
      if(result.data.length>0){
        let query = this.props.location.query;
        if (!_.isEmpty(query)) {
          this.props.powerQualityData({grid:query.grid},{meterId:query.meter_id}).then(()=>{
            this.timer = setInterval(() => this.tick(), 3000);
          });
        }else{
          this.props.powerQualityData({grid:result.data[0].grid},{meterId:result.data[0].meterId}).then(()=>{
            this.timer = setInterval(() => this.tick(), 3000);
          });
        }
      }
    })
  },
  tick() {
    // 每5s执行一次
    this.props.powerQualityData({grid:this.props.powerQualityMeta.currentGrid},{meterId:this.props.powerQualityMeta.currentMeterId});
  },
  render: function () {
    
    let _item = this.getDate();
    let realEchartDataU = {
      title:'',
      legend:['Ua','Ub','Uc'],
      item: _item,
      data:[[],[],[]],
      meterId:""
    }
    let realEchartDataL = {
      title:'',
      legend:['Ia','Ib','Ic'],
      item: _item,
      data:[[],[],[]],
      meterId:""
    }
   
    let powerQualityData = {};
    let rightDom = [];
    let bottomDom = [];
    let noneData = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']

    if(this.props.powerQualityMeta && this.props.powerQualityMeta.currentMeterId){
      powerQualityData = this.props.powerQualityMeta.powerDatas[this.props.powerQualityMeta.currentMeterId];
      realEchartDataU.meterId = this.props.powerQualityMeta.currentMeterId;
      realEchartDataL.meterId = this.props.powerQualityMeta.currentMeterId;
      var k = 0;
      for(var key in powerQualityData){
        k++;
        if(key === "uaList"){
          realEchartDataU.data[0] = powerQualityData[key] || noneData;
        }
        if(key === "ubList"){
          realEchartDataU.data[1] = powerQualityData[key]|| noneData;
        }
        if(key === "ucList"){
          realEchartDataU.data[2] = powerQualityData[key] || noneData;
        }
        if(key === "iaList"){
          realEchartDataL.data[0] = powerQualityData[key] || noneData;
        }
        if(key === "ibList"){
          realEchartDataL.data[1] = powerQualityData[key] || noneData;
        }
        if(key === "icList"){
          realEchartDataL.data[2] = powerQualityData[key] || noneData;
        }
        let statusClass = classnames({
          "circle": true,
          "circle-green": powerQualityData[key] == "G",
          "circle-yellow": powerQualityData[key] == "Y",
          "circle-red": powerQualityData[key] == "R",
          "circle-gray": !!!powerQualityData[key],
        })
        if(POWERQUALITYRIGHTTYPE[key]){
          rightDom.push(
            <Row className="electric-param" key={key}>
               <Col span={14} offset={3}>
                  <span>{POWERQUALITYRIGHTTYPE[key]}</span>
               </Col>
               <Col span={7}>
                  <span>{powerQualityData[key]}</span>
               </Col>
            </Row>
          );
        }
        if(POWERQUALITYBOTTOMTTYPE[key]){
          bottomDom.push(
            <div className="device-param" key={key}>
              <div className="electric-item">
                <span className="item-text">{POWERQUALITYBOTTOMTTYPE[key]}</span>
                <span className="item-status"><span className={statusClass}></span></span>
              </div>
            </div>
          );

        }
        
      }
    }
    return (
      <div className="page-power-quality">
        <div className="electric-equipment-container">
          <div className="electric-left">
            <div className="electric-footer">
              <div className="electric-footer-left" >
                <div className="electric-item-legend">
                 <div className="electric-div">
                   <span className="item-status gray"><span className="circle circle-gray"></span></span>
                   <span className="item-text">N/A</span>
                 </div>
                <div className="electric-div">
                   <span className="item-status green"><span className="circle circle-green"></span></span>
                   <span className="item-text">正常</span>  
                 </div>
                <div className="electric-div">
                   <span className="item-status yellow"><span className="circle circle-yellow"></span></span>
                   <span className="item-text">黄色告警</span>
                 </div>
                 <div className="electric-div">
                    <span className="item-status red"><span className="circle circle-red"></span></span>
                    <span className="item-text">红色告警</span>
                 </div>
                </div>
              </div>
              <div className="electric-footer-right">
                {bottomDom}
              </div>
            </div>
            <div className="electric-echarts">
              <RealLineU data={realEchartDataU} />
            </div>
            <div className="electric-echarts">
              <RealLineL data={realEchartDataL}/>
            </div>
          </div>
          <div className="electric-right">
            {rightDom}
          </div>
        </div>
        
      </div>
    );
  },

});
var powerQualityAction = require('../../../actions/page-action/power-quality');
function mapStateToProps(state, ownProps) {
  return {
    powerQualityMeta:state.powerQuality,
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
  powerQualityData:powerQualityAction.powerQualityData,
  generalLeftMenu:powerQualityAction.generalLeftMenu
})(Electric);
