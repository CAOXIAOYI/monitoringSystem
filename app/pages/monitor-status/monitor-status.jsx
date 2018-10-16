'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");
let connect = require('react-redux').connect;

import { Row,Col,Select } from 'antd';
const Option = Select.Option;
var classnames = require('classnames');
require('./monitor-status.less');

var classnames = require('classnames');

class PonitorStatus extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 3000);
  }
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  }
  tick() {
    // 每30s执行一次
    
    this.props.monitorSystemstatus();
  }
  render() {


    let props = this.props;
    let statusDom = this.props.monitorStatusMeta.monitorDatas.map((item,index)=>{
      let statusClass = classnames({
          "circle": true,
          "circle-off": item.exitStatus == 1,
          "circle-on": item.exitStatus == 0
        })
      return (
        <Row className="electric-status" key={index}>
           <Col span={24}>
              <span className="item-text">{item.deviceName}</span>
              <span className="item-status">
                <span className={statusClass}></span>
              </span>
           </Col>
         </Row>
      ) 
    })
    let monPoint16 = {};
    let monPoint17 = {};
    let monPoint18 = {};
    let monPoint19 = {};
    let monPoint20 = {};
    let monPoint21 = {};
    let monPoint22 = {};
    let monPoint23 = {};
    let monPoint24 = {};
    let monPoint25 = {};
    let monPoint26 = {};
    let monPoint27 = {};
    let monPoint28 = {};
    let monPoint29 = {};
    let monPoint30 = {};
    let monPoint31 = {};
    this.props.monitorStatusMeta.monitorDatas.map((item, index) => {
      if(item.meterId === 16){monPoint16 = item;}
      if(item.meterId === 17){monPoint17 = item;}
      if(item.meterId === 18){monPoint18 = item;}
      if(item.meterId === 19){monPoint19 = item;}
      if(item.meterId === 20){monPoint20 = item;}
      if(item.meterId === 21){monPoint21 = item;}
      if(item.meterId === 22){monPoint22 = item;}
      if(item.meterId === 23){monPoint23 = item;}
      if(item.meterId === 24){monPoint24 = item;}
      if(item.meterId === 25){monPoint25 = item;}
      if(item.meterId === 26){monPoint26 = item;}
      if(item.meterId === 27){monPoint27 = item;}
      if(item.meterId === 28){monPoint28 = item;}
      if(item.meterId === 29){monPoint29 = item;}
      if(item.meterId === 30){monPoint30 = item;}
      if(item.meterId === 31){monPoint31 = item;}
    });

    return (
      <div className="page-monitor-status">
       <div className="left-monitor-status">
         <div className="left-monitor">
           <div className="monitor-div monitor-one">
            <div>{monPoint16.dataFlow?monPoint16.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-two">
              <div>{monPoint18.dataFlow?monPoint18.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-three">
              <div>{monPoint19.dataFlow?monPoint19.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-four">
              <div>{monPoint21.dataFlow?monPoint21.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-five">
              <div>{monPoint17.dataFlow?monPoint17.dataFlow:0} KB/s</div>
           </div>
            <div className="monitor-div monitor-six">
              <div>{monPoint31.dataFlow?monPoint31.dataFlow:0} KB/s</div>
           </div>
            <div className="monitor-div monitor-senven">
              <div>{monPoint20.dataFlow?monPoint20.dataFlow:0} KB/s</div>
           </div>
            <div className="monitor-div monitor-eight">
              <div>{monPoint22.dataFlow?monPoint22.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-nine">
              <div>{monPoint16.dataFlow?monPoint16.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-ten">
              <div>{monPoint18.dataFlow?monPoint18.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-eleven">
              <div>{monPoint19.dataFlow?monPoint19.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-twelve">
              <div>{monPoint21.dataFlow?monPoint21.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-thirteen">
              <div>{monPoint17.dataFlow?monPoint17.dataFlow:0} KB/s</div>
           </div>
            <div className="monitor-div monitor-fourteen">
              <div>{monPoint31.dataFlow?monPoint31.dataFlow:0} KB/s</div>
           </div>
            <div className="monitor-div monitor-fifteen">
              <div>{monPoint20.dataFlow?monPoint20.dataFlow:0} KB/s</div>
           </div>
           <div className="monitor-div monitor-sixteen">
              <div>{monPoint22.dataFlow?monPoint22.dataFlow:0} KB/s</div>
           </div>

         </div>
         
       </div>
       <div className="right-monitor-status">
          <div className="electric-right">
             <div className="electric-list">
               <div>
                 监测状态
               </div>
               <div className="status">
                  <span className="green"><span className="circle circle-on"></span></span>
                  <span className="item-text">离线</span>
                  <span className="red"><span className="circle circle-off"></span></span>
                  <span className="item-text">在线</span>
               </div>
             </div>
            {statusDom}
          </div>
       </div>
      </div>
    );
  }
 
};
var monitorStatusAction = require('../../actions/page-action/monitor-status');
function mapStateToProps(state, ownProps) {
  return {
    monitorStatusMeta:state.monitorStatus
  };
}

module.exports = connect(mapStateToProps, {
  //page-action
  monitorSystemstatus:monitorStatusAction.monitorSystemstatus
})(PonitorStatus);
