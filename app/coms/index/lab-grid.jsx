'use strict';

var React = require('react');
import { browserHistory } from 'react-router'

require('./lab-grid.less');

import {Icon } from 'antd';
let classnames = require("classnames");
var LabGrid = React.createClass({
  getInitialState() {
    this.svg = "";
    this.zoomgroup = "";
    this.trans = [0, 0];
    this.scale = 1;
    return {

    };
  },
  getHSwitch(value){
    value = parseInt(value) || 0; 
    let switchClass = classnames({
      
      "switch-on-h":value < 0.1,
      "switch-off-h":value >= 0.1
    });
    return switchClass;
    // return(
    //   <div className={switchClass}></div>
    // )
  },
  getVSwitch(value){
    value = parseInt(value) || 0;
    let switchClass = classnames({
      "switch-on-v":value < 0.1,
      "switch-off-v":value >= 0.1
    });
    return switchClass;
  },
  getValue(value){
    if(value){
      return Number(value.toString().match(/^\d+(?:\.\d{0,2})?/)) || 0;
    }
    return value || 0;
  },
  componentDidMount() {
    this.svg = d3.select("#path_1");
    this.zoomgroup = d3.select("#path_1_g");
    this.svg.on("dblclick.zoom", null)
        .call(d3.behavior.zoom().on("zoom", this._rescale));
    //this.zoomgroup.attr("transform", " scale(" + this.scale + ")");

    //跳转至"子系统监测-实验室"页面
    d3.select('.room').on('mousedown',function(e){
      self.mouseDownX = d3.event.x;
      self.mouseDownY = d3.event.y;
    })

    d3.select('.room').on('mouseup',function(){
      const mouseUpX = d3.event.x;
      const mouseUpY = d3.event.y;
      if(Math.abs(mouseUpX - self.mouseDownX) > 10 || Math.abs(mouseUpY - self.mouseDownY) > 10){return }

      browserHistory.push('/monitoringSystem/pages/sub_system/electric?type=6');  
    })

  },
  _rescale() {
    let scale = d3.event.scale;
    let trans = d3.event.translate;
    this.trans = trans;
    this.scale = scale;

    //this.zoomContainer.attr("transform", "translate(" + trans + ")" + " scale(" + scale + ")");
    this.zoomgroup.attr("cursor", "move");
    this.zoomgroup.attr("transform", "translate(" + trans + ")" + " scale(" + scale + ")");
  },
  render: function () {
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
    let monPoint31 = {};

    let systemInfo = {};

    if(this.props.data.homeDatas["2"]){
      systemInfo = this.props.data.homeDatas["2"].system || {};
      this.props.data.homeDatas["2"].data.map((item, index) => {
        if(item.meterId === 16){
          monPoint16 = item;
        }
        if(item.meterId === 17){
          monPoint17 = item;
        }
        if(item.meterId === 18){
          monPoint18 = item;
        }
        if(item.meterId === 19){
          monPoint19 = item;
        }
        if(item.meterId === 20){
          monPoint20 = item;
        }
        if(item.meterId === 21){
          monPoint21 = item;
        }
        if(item.meterId === 22){
          monPoint22 = item;
        }
        if(item.meterId === 23){
          monPoint23 = item;
        }
        if(item.meterId === 24){
          monPoint24 = item;
        }
        if(item.meterId === 25){
          monPoint25 = item;
        }
        if(item.meterId === 26){
          monPoint26 = item;
        }
        if(item.meterId === 27){
          monPoint27 = item;
        }
        if(item.meterId === 28){
          monPoint28 = item;
        }
        if(item.meterId === 31){
          monPoint31 = item;
        }

      });
    }
    return (
       <div className="sub-index">
          <svg id="path_1" className="lab-svg" viewBox="130 0 1601 1001" preserveAspectRatio="xMidYMid meet">
          <switch>
            <g className="zoom-container" id="path_1_g">
             <defs>
                <linearGradient id="switch-off-h" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop  offset="0" style={{stopColor:"#BD0101"}}/>
                  <stop  offset="0.5" style={{stopColor:"#FF0000"}}/>
                  <stop  offset="1" style={{stopColor:"#BB0404"}}/>
                </linearGradient>
                <linearGradient id="switch-on-h" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop  offset="0" style={{stopColor:"#02BE12"}}/>
                  <stop  offset="0.5" style={{stopColor:"#2DF401"}}/>
                  <stop  offset="1" style={{stopColor:"#1DB700"}}/>

                </linearGradient>
                <linearGradient id="switch-off-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop  offset="0" style={{stopColor:"#BD0101"}}/>
                  <stop  offset="0.5" style={{stopColor:"#FF0000"}}/>
                  <stop  offset="1" style={{stopColor:"#BB0404"}}/>
                </linearGradient>
                <linearGradient id="switch-on-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop  offset="0" style={{stopColor:"#02BE12"}}/>
                  <stop  offset="0.5" style={{stopColor:"#2DF401"}}/>
                  <stop  offset="1" style={{stopColor:"#1DB700"}}/>
                </linearGradient>
               </defs>
            <g id="g_circle">
              <ellipse className="st0" cx="443.5" cy="225.2" rx="28.5" ry="32.7"/>
              <g>
                <path className="st0" d="M427.7,225.2c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>
              </g>
            </g>
            <g>
              <line id="polyline_1" className="st0" x1="472" y1="225.2" x2="560.5" y2="225.2"/>
              <line className="st0" x1="560.5" y1="114.6" x2="560.5" y2="275.8"/>
              <polyline className="st0" points="755.4,244.6 866.9,246.2 866.9,391.6"/>
              <path className="st0" d="M755.4,390"/>
            </g>
            <g>
              <path className="st0" d="M61.5,353.1"/>
              <path id="polyline_2_19_" className="st0" d="M159.9,493.7"/>
              <path id="polyline_2_7_" className="st0" d="M159.9,351.7"/>
              <path id="polyline_3_2_" className="st0" d="M723.8,680.4"/>
              <path id="polyline_3_1_" className="st0" d="M723.8,353.1"/>
              <g>
                <g id="g_circle_8_">
                  <path className="st0" d="M695.3,607.7"/>
                  <path className="st0" d="M739.7,607.7"/>
                </g>
              </g>
              <line id="polyline_4" className="st0" x1="913.5" y1="425.2" x2="913.5" y2="570.7"/>
              <line className="st1" x1="755.5" y1="353.1" x2="755.5" y2="862.2"/>
              <line id="polyline_4_10_" className="st0" x1="866" y1="608.9" x2="602.9" y2="608.9"/>
              <g>
                <g id="g_rect_5_">
                  <path className="st0" d="M1084.2,516.1"/>
                  <path className="st0" d="M1271.3,469.3"/>
                  <path className="st0" d="M1271.3,539.4"/>
                  <polyline className="st0" points="1264.3,481.3 1016.9,482.4 1016.9,570.6      "/>
                </g>
              </g>
            </g>
            <path className="st2" d="M248.6,207.7"/>
            <g>
              <g>
                <path id="polyline_2_6_" className="st0" d="M1711.3,501.6"/>
              </g>
            </g>
            <g>
              <path className="st1" d=""/>
              <path id="polyline_4_2_" markerStart="url(#circle)" className="st3" d="M603.3,608.7"/>
              <circle className="st4" cx="643.5" cy="609.2" r="4"/>
            </g>
            <g>
              <g>
                <g id="g_double_circle_8_">
                  <ellipse className="st0" cx="662.6" cy="244.2" rx="15.8" ry="18.2"/>
                  <ellipse className="st0" cx="739.6" cy="244.6" rx="15.8" ry="18.2"/>
                </g>
                <line className="st0" x1="739.6" y1="262.8" x2="662.6" y2="262.4"/>
                <line className="st0" x1="739.6" y1="226.4" x2="662.6" y2="226"/>
                <text transform="matrix(0.8712 0 0 1 653.7188 252.7928)" className="non-stroke st5 st6">M</text>
                <text transform="matrix(0.8712 0 0 1 732.2158 252.7928)" className="non-stroke st5 st6">G</text>
              </g>
            </g>
            <text transform="matrix(0.8712 0 0 1 880.5518 414.5618)" className="non-stroke st5 st7">AUTO CHANGE</text>

            <polygon id="switch-eleven" className={this.getVSwitch(monPoint16.i)} points="873.4,318.1 860,318.1 860.4,281.7 873.8,281.7 "/>
            <text transform="matrix(0.8712 0 0 1 880.5518 284.9368)" className="non-stroke st11 st6">
               I: {monPoint16.online==1?this.getValue(monPoint16.i):"--"}
            </text>
            <text transform="matrix(0.8712 0 0 1 880.5518 311.137)" className="non-stroke st11 st6">
              P:{monPoint16.online==1?this.getValue(monPoint16.p):"--"}
            </text>
            <text transform="matrix(0.8712 0 0 1 880.5518 337.3372)" className="non-stroke st11 st6">
              Q:{monPoint16.online==1?this.getValue(monPoint16.q):"--"}
             </text>

            <polygon id="switch-thirteen" className={this.getVSwitch(monPoint18.i)} points="920,510.5 906.6,510.5 907,474.1 920.4,474.1 "/>
            <text transform="matrix(0.8712 0 0 1 927.916 474.0999)" className="non-stroke st11 st6">
              I: {monPoint18.online==1?this.getValue(monPoint18.i):"--"}
            </text>
            <text transform="matrix(0.8712 0 0 1 927.916 500.3001)" className="non-stroke st11 st6">
              P:{monPoint18.online==1?this.getValue(monPoint18.p):"--"}
            </text>
            <text transform="matrix(0.8712 0 0 1 927.916 526.5003)" className="non-stroke st11 st6">
              Q:{monPoint18.online==1?this.getValue(monPoint18.q):"--"}
            </text>
            <g>
              <g>
                <line id="polyline_4_1_" className="st0" x1="990.8" y1="86.1" x2="990.2" y2="166.1"/>
                <ellipse className="st0" cx="990.8" cy="185.8" rx="15.8" ry="18.2"/>
                  <ellipse className="st0" cx="990.8" cy="204" rx="15.8" ry="18.2"/>
              </g>
              <line id="polyline_4_4_" className="st0" x1="990.8" y1="222.2" x2="990.8" y2="391.6"/>
              
              <polygon id="switch-twelve" className={this.getVSwitch(monPoint17.i)} points="997.2,317 983.8,317 984.2,280.6 997.6,280.6   "/>
              <text transform="matrix(0.8712 0 0 1 1006.5625 284.4524)" className="non-stroke st11 st6">
                I: {monPoint17.online==1?this.getValue(monPoint17.i):"--"}
              </text>
              <text transform="matrix(0.8712 0 0 1 1006.5625 310.6526)" className="non-stroke st11 st6">
                P:{monPoint17.online==1?this.getValue(monPoint17.p):"--"}
              </text>
              <text transform="matrix(0.8712 0 0 1 1006.5625 336.8528)" className="non-stroke st11 st6">
                Q:{monPoint17.online==1?this.getValue(monPoint17.q):"--"}
              </text>
            </g>
            <polygon id="switch-on-lende"  className="switch-on-h" points="68.2,149.9 61.5,149.7 61.6,130.7 68.3,130.9 "/>
            <polygon id="switch-off-lende"  className="switch-off-h" points="191.1,149.9 183.5,149.9 183.5,130.7 191.1,130.7 "/>

            
            {/*<text transform="matrix(0.8712 0 0 1 700.9111 430.8001)" className="non-stroke st12 st6"> U：</text>
            <text transform="matrix(0.8712 0 0 1 725.9111 430.8001)" className="non-stroke st11 st6">{this.getValue(systemInfo.u)} V</text>
            <text transform="matrix(0.8712 0 0 1 700.9111 400.8001)" className="non-stroke st12 st6">f：</text>
            <text transform="matrix(0.8712 0 0 1 725.9111 400.8001)" className="non-stroke st11 st6">{this.getValue(systemInfo.f)} Hz</text>*/}
            <text transform="matrix(0.8712 0 0 1 75.5645 147.785)" className="non-stroke st12 st6">未投入使用</text>
            <text transform="matrix(0.8712 0 0 1 197.6172 147.785)" className="non-stroke st12 st6">投入使用</text>

            <text transform="matrix(0.8712 0 0 1 61.4998 203.6577)" className="non-stroke st9 st4 larger">
              系统频率：<tspan className="text">{this.getValue(systemInfo.f)} Hz</tspan>
            </text>
            <text transform="matrix(0.8712 0 0 1 61.4998 233.6577)" className="non-stroke st9 st4 larger">
              实验室电网母线电压：<tspan className="text">{this.getValue(systemInfo.u)} V</tspan> 
            </text>
            <text transform="matrix(0.8712 0 0 1 61.4998 263.6577)" className="non-stroke st9 st4 larger">
              安全运行小时数：<tspan className="text">{this.getValue(systemInfo.hours)} H</tspan> 
            </text>

            {/*<text transform="matrix(0.8712 0 0 1 64.9111 190.6575)" className="non-stroke st11 st6">电流(I)：</text>
            <text transform="matrix(0.8712 0 0 1 120.7617 190.6575)" className="non-stroke st12 st6">A</text>
            <text transform="matrix(0.8712 0 0 1 135.5098 190.6575)" className="non-stroke st11 st6">有功(P)：</text>
            <text transform="matrix(0.8712 0 0 1 195.4082 190.6575)" className="non-stroke st12 st6">kW </text>
            <text transform="matrix(0.8712 0 0 1 223.71 190.6575)" className="non-stroke st11 st6">无功(Q)：</text>
            <text transform="matrix(0.8712 0 0 1 285.2959 190.6575)" className="non-stroke st12 st6"> kVar </text>*/}
            <g>
              <polygon className="st0" points="603.3,629.3 517.2,629.5 517.7,588.2 603.9,587.9  "/>
              <g>
                <path className="st0" d="M526,598c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M526,610.8c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M524.3,619.4c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
            </g>
            <path className="st4" d="M645.1,153v30l45-15L645.1,153z"/>
            <path id="polyline_1_3_" markerEnd="url(#arrow)" className="st4" d="M645.1,153"/>
            <line id="polyline_1_4_" className="st0" x1="561.5" y1="244.6" x2="645.1" y2="244.6"/>
            <rect x="794.9" y="391.6" className="st0" width="289.3" height="34.3"/>
            <polygon className="st0" points="1042.5,645.5 866,645.8 866,571 1042.5,570.6 "/>
            <text transform="matrix(0.8712 0 0 1 923.916 615.722)" className="non-stroke st12 st17">配电箱</text>
            <rect x="1123.7" y="473.6" id="switch-fourteen" className={this.getHSwitch(monPoint31.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 1142.5332 406.9007)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="non-stroke st6 st2">I: {monPoint31.online==1?this.getValue(monPoint31.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint31.online==1?this.getValue(monPoint31.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint31.online==1?this.getValue(monPoint31.q):"--"}</tspan>
            </text>

            <g>
              <polygon className="st0" points="603.3,794.1 517.2,794.3 517.7,752.9 603.9,752.7  "/>
              <g>
                <path className="st0" d="M526,762.8c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M526,775.6c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M524.3,784.2c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
            </g>
            <g>
              <polygon className="st0" points="603.3,968.8 517.2,969.1 517.7,927.7 603.9,927.5  "/>
              <g>
                <path className="st0" d="M526,937.5c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M526,950.4c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M524.3,959c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
            </g>
            <g>
              <polygon className="st0" points="1422.1,629.3 1335.9,629.5 1336.5,588.2 1422.7,587.9  "/>
              <g>
                <path className="st0" d="M1344.8,598c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M1344.8,610.8c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M1343.1,619.4c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
            </g>
            <g>
              <polygon className="st0" points="1419.3,881.2 1333.1,881.5 1333.7,840.1 1419.8,839.9  "/>
              <g>
                <path className="st0" d="M1341.9,849.9c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M1341.9,862.8c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
              <g>
                <path className="st0" d="M1340.3,871.4c3.2-5.4,34.6-4.6,34.5,0.5c0,6.6,30.8,5.3,30.8-1.4"/>
              </g>
            </g>
            <path className="st0" d="M868.3,867.5"/>
            <polyline className="st0" points="989.8,643.5 989.7,862.3 1333.1,864.4 "/>
            <line id="polyline_4_3_" className="st0" x1="1336.1" y1="608.2" x2="1043.7" y2="608.2"/>
            <g>
              <line id="polyline_4_5_" className="st0" x1="518.4" y1="607.9" x2="287.9" y2="607.9"/>
              <g>
                <polygon className="st0" points="287.9,638.5 75.6,638.8 74.8,570.9 287.1,569.6    "/>
                <text transform="matrix(0.8712 0 0 1 118.0635 609.8489)" className="non-stroke st19 st7">通用干湿实验室</text>
                <text transform="matrix(0.8712 0 0 1 227.835 610.7005)" className="non-stroke st5 st7">2</text>

                <rect width="215" height="75" x="75" y="568" className='room'></rect>

              </g>
            </g>
            <g>
              <line id="polyline_4_6_" className="st0" x1="515.4" y1="776.2" x2="287.9" y2="776.2"/>
              <g>
                <polygon className="st0" points="287.9,808.8 75.6,809.1 74.8,741.2 287.1,739.9    "/>
                <text transform="matrix(0.8712 0 0 1 118.0635 780.1693)" className="non-stroke st19 st7">通用干湿实验室</text>
                <text transform="matrix(0.8712 0 0 1 227.835 781.0208)" className="st0 st5 st7">3</text>

                <rect width="215" height="75" x="75" y="738" className='room'></rect>

              </g>
            </g>
            <g>
              <line id="polyline_4_7_" className="st0" x1="516.6" y1="948.3" x2="289.2" y2="948.3"/>
              <g>
                <polygon className="st0" points="289.2,981.9 76.8,982.3 76.1,914.4 288.4,913    "/>
                <text transform="matrix(0.8712 0 0 1 119.3291 954.1517)" className="non-stroke st19 st7">数据处理实验室</text>

                <rect width="215" height="75" x="75" y="912" className='room'></rect>

              </g>
            </g>

            <rect x="704" y="601" id="switch-four" className={this.getHSwitch(monPoint19.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 630.6738 540.2806)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint19.online==1?this.getValue(monPoint19.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint19.online==1?this.getValue(monPoint19.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint19.online==1?this.getValue(monPoint19.q):"--"}</tspan>
            </text>


            <rect x="383" y="600.8" id="switch-one" className={this.getHSwitch(monPoint20.i)} width="37.3" height="14.3"/>
            <text transform="matrix(0.8712 0 0 1 318.793 540.9368)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint20.online==1?this.getValue(monPoint20.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint20.online==1?this.getValue(monPoint20.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint20.online==1?this.getValue(monPoint20.q):"--"}</tspan>
            </text>

            <rect x="383" y="769.2" id="switch-two" className={this.getHSwitch(monPoint22.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 318.793 710.3001)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint22.online==1?this.getValue(monPoint22.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint22.online==1?this.getValue(monPoint22.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint22.online==1?this.getValue(monPoint22.q):"--"}</tspan>
            </text>


            <rect x="377.9" y="940.7" id="switch-three" className={this.getHSwitch(monPoint26.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 318.71 880.806)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint26.online==1?this.getValue(monPoint26.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint26.online==1?this.getValue(monPoint26.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint26.online==1?this.getValue(monPoint26.q):"--"}</tspan>
            </text>

            <polyline className="st0" points="903.1,645.8 902.1,776.7 603.9,776.8 "/>
            <polyline className="st0" points="947.4,645.8 947.4,949.1 603.9,948.3 "/>

            <rect x="705.4" y="769.6" id="switch-five" className={this.getHSwitch(monPoint21.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 630.0605 700.8587)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint21.online==1?this.getValue(monPoint21.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint21.online==1?this.getValue(monPoint21.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint21.online==1?this.getValue(monPoint21.q):"--"}</tspan>
            </text>

            <rect x="705" y="941.1" id="switch-six" className={this.getHSwitch(monPoint25.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 630.6738 880.3646)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint25.online==1?this.getValue(monPoint25.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint25.online==1?this.getValue(monPoint25.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint25.online==1?this.getValue(monPoint25.q):"--"}</tspan>
            </text>

            <rect x="1160.6" y="600.7" id="switch-seven" className={this.getHSwitch(monPoint23.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 1120.2568 540.9808)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint23.online==1?this.getValue(monPoint23.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint23.online==1?this.getValue(monPoint23.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint23.online==1?this.getValue(monPoint23.q):"--"}</tspan>
            </text>

            <rect x="1150.2" y="854.4" id="switch-eight" className={this.getHSwitch(monPoint27.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 1120.874 790.6292)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint27.online==1?this.getValue(monPoint27.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint27.online==1?this.getValue(monPoint27.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint27.online==1?this.getValue(monPoint27.q):"--"}</tspan>
            </text>
            <rect x="1264.3" y="462.9" className="st0" width="105.2" height="38.7"/>
            <text transform="matrix(0.8712 0 0 1 1301.1191 489.9544)" className="non-stroke st12 st17">UPS</text>
            <g>
              <polygon className="st0" points="1818.2,644 1630.9,644.3 1631.1,576.4 1818.4,575.1  "/>
              <text transform="matrix(0.8712 0 0 1 1673.3789 616.2347)" className="non-stroke st19 st7">仪器集中控制室</text>
            </g>
            <g>
              <polygon className="st0" points="1816.2,897.6 1630.9,898 1631.1,830.1 1816.4,828.7  "/>
              <text transform="matrix(0.8712 0 0 1 1673.3789 869.8782)" className="non-stroke st19 st7">备用供电线路</text>
            </g>
            <line id="polyline_4_8_" className="st0" x1="1632.6" y1="608.7" x2="1421.8" y2="608.7"/>
            <line id="polyline_4_9_" className="st0" x1="1630.6" y1="864.7" x2="1419.8" y2="864.7"/>
            <rect x="1480.1" y="601.1" id="switch-nine"  className={this.getHSwitch(monPoint24.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 1437.2178 540.9798)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint24.online==1?this.getValue(monPoint24.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint24.online==1?this.getValue(monPoint24.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint24.online==1?this.getValue(monPoint24.q):"--"}</tspan>
            </text>

            <rect x="1480.9" y="857" id="switch-ten" className={this.getHSwitch(monPoint28.i)} width="37.3" height="15.3"/>
            <text transform="matrix(0.8712 0 0 1 1437.2178 790.2191)" className="non-stroke st11 st6">
              <tspan x="0" y="0" className="st6 st2">I: {monPoint28.online==1?this.getValue(monPoint28.i):"--"}</tspan>
              <tspan x="0" y="26.2" className="st6 st2">P:{monPoint28.online==1?this.getValue(monPoint28.p):"--"}</tspan>
              <tspan x="0" y="52.4" className="st6 st2">Q:{monPoint28.online==1?this.getValue(monPoint28.q):"--"}</tspan>
            </text>
            <line id="polyline_1_1_" className="st0" x1="560.5" y1="168.6" x2="644.1" y2="168.6"/>
            <circle className="st4" cx="485" cy="607.9" r="4"/>
            <circle className="st4" cx="645.9" cy="776.4" r="4"/>
            <circle className="st4" cx="487.4" cy="775.2" r="4"/>
            <circle className="st4" cx="645" cy="949.7" r="4"/>
            <circle className="st4" cx="486.6" cy="948.5" r="4"/>
            <circle className="st4" cx="1453" cy="864" r="4"/>
            <circle className="st4" cx="1294.6" cy="864.7" r="4"/>
            <circle className="st4" cx="1453.2" cy="609.4" r="4"/>
            <circle className="st4" cx="1294.7" cy="608.1" r="4"/>
           </g>
          </switch>
        </svg>
      </div>
    );
  }
});

module.exports = LabGrid;
