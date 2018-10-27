'use strict';

let React = require('react');

let connect = require('react-redux').connect;


import { InputNumber,Button,Row,Col,Table } from 'antd';
let DynamoComs = require("../../../coms/sub-system/dynamo.jsx");

let PropulsionComs = require("../../../coms/sub-system/propulsion.jsx");
let ScientificComs = require("../../../coms/sub-system/scientific.jsx");

let TransformerComs = require("../../../coms/sub-system/transformer.jsx");

let LaboratoryComs = require("../../../coms/sub-system/laboratory.jsx");

let OperationComs = require("../../../coms/sub-system/operation.jsx");

const MONITORINGTYPE = require("../../../services/monitoringType.js");

let classnames = require("classnames");
require('./electric.less');
let Electric = React.createClass({
  getInitialState: function(){
    return {
      isStretchIcon: false,
    }
  },
  componentDidMount() {
    this.setState({
      tickId:0
    });
    this.timer = setInterval(() => this.tick(), 3000);
  },
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  },
  tick() {
    let tickId = this.state.tickId+1;
    // 每30s执行一次
    this.setState({
      tickId:tickId
    },()=>{
      this.props.subSystemMonitor({},{deviceType:this.props.subSystemMeta.currentDeviceType});  
    });
    
  },
  _genDom(_monitorDatas,currentDeviceType){
      if(!_monitorDatas || !currentDeviceType){
        return;
      }
      let header1 = [];
      let body1 = [];
     _monitorDatas[currentDeviceType] && _monitorDatas[currentDeviceType].map((item,index) => {
         //表头数据填充
         header1.push(<span key={index}>{item.deviceName}</span>);
         //因为item里面的所有属性都一样 所以只要遍历一个就可以了
         if(index == 0){
            for(var key in item){
              //遍历所有属性 作为行数
              if(MONITORINGTYPE[key]){
                let _td = [];
                 //根据元素属性遍历每行对应的key value值 作为列数补全
                 _monitorDatas[currentDeviceType].map((item,i) => {
                    _td.push(<span key={i}>{item[key]}</span>)
                });
                //行数数据填充
                body1.push(<div className="electric-body" key={key}><span>{MONITORINGTYPE[key]}</span>{_td}</div>);
              }
            }
          } 
     });
    return {header:header1,body:body1};
  },

  leftDom(currentDeviceType,dynamoData){
      switch (currentDeviceType) {
        case 1:
          return <DynamoComs data={dynamoData} id={this.state.tickId}/>;
        case 2:
          return <PropulsionComs data={dynamoData} id={this.state.tickId}/>;
        case 3:
          return <OperationComs data={dynamoData} id={this.state.tickId}/>;
        case 4:
          return <TransformerComs data={dynamoData} id={this.state.tickId}/>;
        case 5:
          return <ScientificComs data={dynamoData} id={this.state.tickId}/>;
        case 6:
          return <LaboratoryComs data={dynamoData} id={this.state.tickId}/>;
      }
  },
  stretchIconClick() {
    this.setState({
      isStretchIcon: !!!this.state.isStretchIcon,
    });
  },
  render: function () {

   var currentDeviceType = this.props.subSystemMeta.currentDeviceType;

   var monitorDatas = this.props.subSystemMeta.monitorDatas;
   //let _monitorDatas = [];
   let _header = "";
   let _body = "";
   let _dynamo = {};
   let leftDom = "";
   if(currentDeviceType && monitorDatas){
    _header = this._genDom(monitorDatas,currentDeviceType).header;
    _body = this._genDom(monitorDatas,currentDeviceType).body
    _dynamo = monitorDatas[currentDeviceType];
    leftDom = this.leftDom(currentDeviceType,_dynamo);
   }
   let stretchIcon = <i className="iconfont">&#xe60e;</i>
   if (this.state.isStretchIcon) {
     stretchIcon = <i className="iconfont">&#xe60f;</i>
   }
   let stretchLeftClass = classnames({
      "electric-left": true,
      "electric-left-stretch": this.state.isStretchIcon,
    })
   let stretchIconClass = classnames({
      "stretchIcon": true,
      "stretchIcon-stretch": this.state.isStretchIcon,
    })
    let stretchRightClass = classnames({
      "electric-right": true,
      "electric-right-stretch": this.state.isStretchIcon
    })
  return (
      <div className="page-sub-system">
        <div className="electric-equipment-container">
          <div className={stretchLeftClass}>
            {leftDom}
          </div>
          <div className={stretchRightClass}>
            <div className={stretchIconClass}>
              <span onClick={this.stretchIconClick}>
                {stretchIcon}
              </span>
            </div>
           <div className="electric-container">
              <div className="electric-head">
                <span></span>
                {_header}
              </div>
              {_body}
           </div>
          </div>
        </div>
      </div>
    );
  },

});
var subSystemAction = require('../../../actions/page-action/sub-system');
function mapStateToProps(state, ownProps) {
  return {
    subSystemMeta: state.subSystem
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
   subSystemMonitor: subSystemAction.subSystemMonitor,
})(Electric);
