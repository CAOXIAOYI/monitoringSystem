'use strict';

var React = require('react');

import { browserHistory } from 'react-router'

import {Icon } from 'antd';
let classnames = require("classnames");
require('./power-grid.less');
var PowerGrid = React.createClass({
   getInitialState() {
    this.svg = "";
    this.zoomgroup = "";
    this.trans = [0, 0];
    this.scale = .9;
    return {
    };
  },
  getSwitch(value){
    value = parseInt(value) || 0;
    let switchClass = classnames({
      "switch-on":value < 0.1,
      "switch-off":value >= 0.1
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
    const self = this;
    this.svg = d3.select("#path_1");
    this.zoomgroup = d3.select("#path_1_g");
    this.svg.on("dblclick.zoom", null)
        .call(d3.behavior.zoom().on("zoom", this._rescale));
    this.zoomgroup.attr("transform", " scale(" + this.scale + ")");

    //跳转至"子系统监测"页面
    this.goSubSystem('#ele1_1',1);
    this.goSubSystem('#ele1_2',1);
    this.goSubSystem('#ele1_3',1);
    this.goSubSystem('#ele1_4',1);

    this.goSubSystem('#ele2_1',2);
    this.goSubSystem('#ele2_2',2);
    this.goSubSystem('#ele2_3',2);
    this.goSubSystem('#ele2_4',2);

    this.goSubSystem('#ele3_1',3);
    this.goSubSystem('#ele3_2',3);
    this.goSubSystem('#ele3_3',3);
    this.goSubSystem('#ele3_4',3);
    this.goSubSystem('#ele3_5',3);
    this.goSubSystem('#ele3_6',3);


    this.goSubSystem('#ele4_1',4);
    this.goSubSystem('#ele4_2',4);
    

  },

  goSubSystem(select,id){
    const self = this;
    d3.select(select).on('mousedown',null);
    d3.select(select).on('mouseup',null);
    d3.select(select).on('mousedown',function(e){
      self.mouseDownX = d3.event.x;
      self.mouseDownY = d3.event.y;
    })

    d3.select(select).on('mouseup',function(){
      const mouseUpX = d3.event.x;
      const mouseUpY = d3.event.y;
      if(Math.abs(mouseUpX - self.mouseDownX) > 10 || Math.abs(mouseUpY - self.mouseDownY) > 10){return }
      browserHistory.push('/monitoringSystem/pages/sub_system/electric?type=' + id);  
    })
    
  },

  _rescale() {
    return
    let scale = d3.event.scale;
    let trans = d3.event.translate;
    this.trans = trans;
    this.scale = scale;

    // this.zoomContainer.attr("transform", "translate(" + trans + ")" + " scale(" + scale + ")");
    this.zoomgroup.attr("cursor", "move");
    this.zoomgroup.attr("transform", "translate(" + trans + ")" + " scale(" + scale + ")");
  },

  onMouseEnter(num){
    // alert(num + 45)
    this.setState({
      showNum:num
    })
  },

  mouseLeave(){
    this.setState({
      showNum:null
    })
  },

  render: function () {
    
    let monPoint1 = {};
    let monPoint2 = {};
    let monPoint3 = {};
    let monPoint4 = {};
    let monPoint5 = {};
    let monPoint6 = {};
    let monPoint7 = {};
    let monPoint8 = {};
    let monPoint9 = {};
    let monPoint10 = {};
    let monPoint11 = {};
    let monPoint12 = {};
    let monPoint13 = {};
    let monPoint14 = {};
    let monPoint15 = {};
    let systemInfo = {};

    let motherlineStatus = '#fff';
    if(this.props.data.homeDatas["1"]){
      systemInfo = this.props.data.homeDatas["1"].system || {};
      this.props.data.homeDatas["1"].data.map((item, index) => {
        if(item.meterId === 1){
          monPoint1 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 2){
          monPoint2 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 3){
          monPoint3 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 4){
          monPoint4 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 5){
          monPoint5 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 6){
          monPoint6 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 7){
          monPoint7 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 8){
          monPoint8 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 9){
          monPoint9 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 10){
          monPoint10 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 11){
          monPoint11 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 12){
          monPoint12 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 13){
          monPoint13 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 14){
          monPoint14 = item;
          motherlineStatus = 'red';
        }
        if(item.meterId === 15){
          monPoint15 = item;
          motherlineStatus = 'red';
        }
      });
    }
    return (
      <div className="sub-index">
        <svg id="path_1" className="power-svg" viewBox="0 0 1700 1130" preserveAspectRatio="xMidYMid meet">
          <switch>
            <g className="zoom-container" id="path_1_g">
                <defs>
                <linearGradient id="switch-on" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop  offset="0" style={{stopColor:"#02BE12"}}/>
                  <stop  offset="0.5" style={{stopColor:"#2DF401"}}/>
                  <stop  offset="1" style={{stopColor:"#1DB700"}}/>
                </linearGradient>
                <linearGradient id="switch-off" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop  offset="0" style={{stopColor:"#BD0101"}}/>
                  <stop  offset="0.5" style={{stopColor:"#FF0000"}}/>
                  <stop  offset="1" style={{stopColor:"#BB0404"}}/>
                </linearGradient>
                <linearGradient id="switch-none-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop  offset="0" style={{stopColor:"#9C9C9C"}}/>
                  <stop  offset="0.5" style={{stopColor:"#FFFFFF"}}/>
                  <stop  offset="1" style={{stopColor:"#9C9C9C"}}/>
                </linearGradient>
                <linearGradient id="switch-none-h" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop  offset="0" style={{stopColor:"#9C9C9C"}}/>
                  <stop  offset="0.5" style={{stopColor:"#FFFFFF"}}/>
                  <stop  offset="1" style={{stopColor:"#9C9C9C"}}/>
                </linearGradient>
                </defs>

              <g id="g_circle">
                <ellipse className="st0" cx="662" cy="138.6" rx="28.5" ry="32.7"/>
                <path className="st0" d="M646.2,138.6c3.2-9.1,15.8-9.1,15.8,0c0,9.1,15.8,9.1,15.8,0"/>

                <circle className={monPoint1.online==1?"circle-status red":'circle-status'} cx="712" cy="138.6" r="10"/>

              </g>
              <g id="g_rect" style={{display:'none'}}>
                <polyline className="st0" points="191.6,493.7 128.3,493.7 128.3,530 191.6,530 191.6,493.7 128.3,530   "/>
              </g>
              <g id="g_double_ellipse">
                <ellipse className="st0" cx="557.5" cy="689.5" rx="23.8" ry="18.2"/>
                <ellipse className="st0" cx="605" cy="689.5" rx="23.8" ry="18.2"/>

                <circle className={monPoint9.online==1?"circle-status red":'circle-status'} cx="580" cy="720.6" r="10"/>
                <text transform="matrix(0.8712 0 0 1 547 750)" className="non-stroke st9 st3">左舷主推电机</text>

              </g>
              <g>
                <text transform="matrix(0.8712 0 0 1 535.9941 145.3979)" className="non-stroke st9 st2"> 停泊发电机</text>
                <text transform="matrix(0.8712 0 0 1 790.2354 145.3979)" className="non-stroke st9 st2">一号主发电机</text>
                <text transform="matrix(0.8712 0 0 1 1010.0625 145.3979)" className="non-stroke st9 st2">二号主发电机</text>
                <text transform="matrix(0.8712 0 0 1 1279.5566 145.3979)" className="non-stroke st9 st2">三号主发电机</text>

                <line id="polyline_1" className="st0" x1="662" y1="171.3" x2="660.5" y2="353.1"/>
                <g>
                  <line id="polyline_1_1_" className="st0" x1="1140.4" y1="164.5" x2="1135.6" y2="353.1"/>
                </g>
                <line className="st0" x1="915.5" y1="164.5" x2="915.5" y2="207.7"/>
                <polyline className="st0" points="836.3,353.1 836.3,207.7 994.7,207.7 994.7,353.1   "/>
                <g>
                  <line id="polyline_1_2_" className="st0" x1="1393.9" y1="171.3" x2="1394.5" y2="353.1"/>
                </g>
                <g>
                  <g id="g_circle_1_">
                    <ellipse className="st0" cx="915.5" cy="131.8" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M899.6,131.8c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint2.online==1?"circle-status red":'circle-status'} cx="965.5" cy="138.6" r="10"/>

                  </g>
                </g>  
                <rect x="890.1" y="344" className="switch-none-h" width="31.7" height="18.2"/>
                <g>
                  <g id="g_circle_2_">
                    <ellipse className="st0" cx="1140.4" cy="131.8" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1124.5,131.8c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint3.online==1?"circle-status red":'circle-status'} cx="1190.5" cy="135.6" r="10"/>

                  </g>
                </g>
                <g>
                  <g id="g_circle_3_">
                    <ellipse className="st0" cx="1393.9" cy="138.6" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1378.1,138.6c3.2-9.1,15.8-9.1,15.8,0c0,9.1,15.8,9.1,15.8,0"/>

                    <circle className={monPoint4.online==1?"circle-status red":'circle-status'} cx="1443.5" cy="135.6" r="10"/>

                  </g>
                </g>
                
              </g>
              <g>
                <line className="st0" x1="61.5" y1="353.1" x2="1792.4" y2="353.1" strokeWidth='4' style={{stroke:motherlineStatus}}/>
                <line className="st0" x1="1484.1" y1="353.1" x2="1610.8" y2="353.1"/>
                <line className="st0" x1="1658.3" y1="353.1" x2="1769.2" y2="353.1"/>
                <line id="polyline_2" className="st0" x1="159.9" y1="351.7" x2="159.9" y2="493.7" style={{display:'none'}}/>
                <path id="polyline_3_2_" className="st0" d="M723.8,680.4"/>
                <path id="polyline_3_1_" className="st0" d="M723.8,353.1"/>
                <g>
                  <g id="g_circle_4_" style={{display:'none'}}>
                    <ellipse className="st0" cx="159.6" cy="602" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M143.8,602c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint12.online==1?"circle-status red":'circle-status'} cx="159.6" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 140 700)" className="non-stroke st9 st3">发电机</text>

                  </g>
                </g>
                <g>
                  <g id="g_rect_2_">
                    <polyline className="st0" points="399.1,498.6 335.8,498.6 335.8,534.9 399.1,534.9 399.1,498.6 335.8,534.9       "/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_6_">
                    <ellipse className="st0" cx="369" cy="602.6" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M353.2,602.6c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint6.online==1?"circle-status red":'circle-status'} cx="369" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 330 700)" className="non-stroke st9 st3">1号地震空压机</text>

                  </g>
                </g>
                <g>
                  <g id="g_circle_8_">
                    <path className="st0" d="M695.3,607.7"/>
                    <path className="st0" d="M739.7,607.7"/>


                  </g>
                </g>
                <line id="polyline_4" className="st0" x1="1183.1" y1="353.1" x2="1183.1" y2="498.6"/>
                <line className="st4" x1="755.5" y1="353.1" x2="755.5" y2="862.2"/>
                <line className="st4" x1="1056.4" y1="353.1" x2="1056.4" y2="862.2"/>
                <g>
                  <g id="g_rect_5_">
                    <polyline className="st0" points="1214.8,498.6 1151.5,498.6 1151.5,534.9 1214.8,534.9 1214.8,498.6 1151.5,534.9"/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_9_">
                    <ellipse className="st0" cx="1183.1" cy="607.7" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1167.3,607.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>
                  </g>
                </g>
                <g>
                  <g id="g_double_ellipse_1_">
                    <ellipse className="st0" cx="1159.4" cy="689.5" rx="23.8" ry="18.2"/>
                    <ellipse className="st0" cx="1206.9" cy="689.5" rx="23.8" ry="18.2"/>

                    <circle className={monPoint8.online==1?"circle-status red":'circle-status'} cx="1183" cy="720.6" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 1149 750)" className="non-stroke st9 st3">右舷主推电机</text>

                  </g>
                </g>
                <g>
                  <g>
                    <line id="polyline_2_1_" className="st0" x1="262.2" y1="352.6" x2="262.2" y2="498.6"/>
                  </g>
                  <g>
                    <g id="g_rect_1_">
                      <polyline className="st0" points="293.9,498.6 230.5,498.6 230.5,534.9 293.9,534.9 293.9,498.6 230.5,534.9"/>
                    </g>
                  </g>
                  <g>
                    <g id="g_circle_5_">
                      <ellipse className="st0" cx="262.2" cy="602" rx="28.5" ry="32.7"/>
                      <path className="st0" d="M246.3,602c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                      <circle className={monPoint5.online==1?"circle-status red":'circle-status'} cx="262.2" cy="665" r="10"/>
                      <text transform="matrix(0.8712 0 0 1 220 700)" className="non-stroke st9 st3">CTD&BIO绞车</text>

                    </g>
                  </g>
                </g>
                <g>
                  <g>
                    <line id="polyline_2_2_" className="st0" x1="367.4" y1="351.7" x2="367.4" y2="498.7"/>
                  </g>
                </g>
                <g>
                  <g>
                    <line id="polyline_2_3_" className="st0" x1="581.3" y1="353.1" x2="581.3" y2="498.7"/>
                  </g>
                  <g>
                    <g id="g_rect_3_">
                      <polyline className="st0" points="612.9,498.6 549.6,498.6 549.6,534.9 612.9,534.9 612.9,498.6 549.6,534.9"/>
                    </g>
                  </g>
                  <g>
                    <g id="g_circle_7_">
                      <ellipse className="st0" cx="581.3" cy="607.7" rx="28.5" ry="32.7"/>
                      <path className="st0" d="M565.4,607.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <line className="st0" x1="159.9" y1="862.2" x2="533.7" y2="862.2"/>
                <line className="st0" x1="589.2" y1="862.2" x2="1503.7" y2="862.2"/>
                <g>
                  <g>
                    <g id="g_circle_10_">
                      <ellipse className="st0" cx="388.4" cy="736.1" rx="28.5" ry="32.7"/>
                      <path className="st0" d="M372.5,736.1c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>
                    </g>
                  </g>
                  <line className="st0" x1="388.4" y1="865.4" x2="388.4" y2="768.8"/>
                </g>
                <g>
                  <line className="st0" x1="205" y1="862.2" x2="205" y2="971.3"/>
                </g>
                <g>
                  <line className="st0" x1="270.4" y1="862.2" x2="270.4" y2="971.3"/>
                </g>
                <g>
                  <line className="st0" x1="344.4" y1="862.2" x2="344.4" y2="971.3"/>
                  <g>
                    <g id="g_double_circle_1_">
                      <ellipse className="st0" cx="344.4" cy="989.5" rx="15.8" ry="18.2"/>
                      <ellipse className="st0" cx="344.4" cy="1007.6" rx="15.8" ry="18.2"/>
                    </g>
                  </g>
                </g>
                <g>
                  <line className="st0" x1="439.7" y1="862.2" x2="439.7" y2="971.3"/>
                  <g>
                    <g id="g_double_circle_2_">
                      <ellipse className="st0" cx="439.7" cy="989.5" rx="15.8" ry="18.2"/>
                      <ellipse className="st0" cx="439.7" cy="1007.6" rx="15.8" ry="18.2"/>
                    </g>
                  </g>
                </g>
                <polyline className="st0" points="500,862.2 501.7,948 622.7,948 621,861.2   "/>
              </g>
              <path className="st5" d="M248.6,207.7"/>
              <g>
                <g>
                  <line id="polyline_2_4_" className="st0" x1="473.3" y1="353.1" x2="473.3" y2="498.7"/>
                </g>
                <g>
                  <g id="g_rect_6_">
                    <polyline className="st0" points="504.9,498.6 441.6,498.6 441.6,534.9 504.9,534.9 504.9,498.6 441.6,534.9"/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_11_">
                    <ellipse className="st0" cx="473.3" cy="607.7" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M457.4,607.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>
                    <circle className={monPoint7.online==1?"circle-status red":'circle-status'} cx="473.2" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 435 700)" className="non-stroke st9 st3">艉侧推进电机</text>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g id="g_rect_7_">
                    <polyline className="st0" points="1302.9,502.6 1239.6,502.6 1239.6,538.9 1302.9,538.9 1302.9,502.6 1239.6,538.9"/>
                  </g>
                </g>
                <g>
                  <g>
                    <line id="polyline_2_5_" className="st0" x1="1271.3" y1="357.1" x2="1271.3" y2="502.6"/>
                  </g>
                  <g>
                    <g id="g_circle_12_">
                      <ellipse className="st0" cx="1271.3" cy="611.7" rx="28.5" ry="32.7"/>
                      <path className="st0" d="M1255.4,611.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                      <circle className={monPoint10.online==1?"circle-status red":'circle-status'} cx="1271.3" cy="665" r="10"/>
                      <text transform="matrix(0.8712 0 0 1 1241 700)" className="non-stroke st9 st3">艏侧推进电机</text>

                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <line id="polyline_2_6_" className="st0" x1="1548.3" y1="356.1" x2="1548.3" y2="502.6"/>
                </g>
                <g>
                  <g id="g_rect_8_">
                    <polyline className="st0" points="1579.9,501.6 1516.6,501.6 1516.6,537.9 1579.9,537.9 1579.9,501.6 1516.6,537.9"/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_13_">
                    <ellipse className="st0" cx="1548.3" cy="610.7" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1532.4,610.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint12.online==1?"circle-status red":'circle-status'} cx="1548.3" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 1510 700)" className="non-stroke st9 st3">万米钢缆绞车</text>

                  </g>
                </g>
              </g>
              <g>
                <g>
                  <line id="polyline_2_7_" className="st0" x1="1711.3" y1="357.1" x2="1711.3" y2="501.6"/>
                </g>
                <g>
                  <g id="g_rect_9_">
                    <polyline className="st0" points="1742.9,502.6 1679.6,502.6 1679.6,538.9 1742.9,538.9 1742.9,502.6 1679.6,538.9"/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_14_">
                    <ellipse className="st0" cx="1711.3" cy="611.7" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1695.4,611.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint15.online==1?"circle-status red":'circle-status'} cx="1711.3" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 1671 700)" className="non-stroke st9 st3">纤维/光电缆绞车</text>

                  </g>
                </g>
              </g>
              <g>
                <g>
                  <line id="polyline_2_8_" className="st0" x1="1362.3" y1="356.1" x2="1362.3" y2="501.6"/>
                </g>
                <g>
                  <g id="g_rect_10_">
                    <polyline className="st0" points="1393.9,501.6 1330.6,501.6 1330.6,537.9 1393.9,537.9 1393.9,501.6 1330.6,537.9"/>
                  </g>
                </g>
                <g>
                  <g id="g_circle_15_">
                    <ellipse className="st0" cx="1362.3" cy="610.7" rx="28.5" ry="32.7"/>
                    <path className="st0" d="M1346.4,610.7c3.2-9.1,15.8-9.1,15.8,0s15.8,9.1,15.8,0"/>

                    <circle className={monPoint11.online==1?"circle-status red":'circle-status'} cx="1362.3" cy="665" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 1342 700)" className="non-stroke st9 st3">2号地震空压机</text>

                  </g>
                </g>
              </g>
              <g>
                <line id="polyline_4_1_" className="st0" x1="1056.4" y1="353.1" x2="1054.6" y2="608"/>
                <g>
                  <g id="g_double_circle_3_">
                    <ellipse className="st0" cx="1054.6" cy="626.2" rx="15.8" ry="18.2"/>
                    <ellipse className="st0" cx="1054.6" cy="644.4" rx="15.8" ry="18.2"/>

                    <circle className={monPoint14.online==1?"circle-status red":'circle-status'} cx="1094.6" cy="626.2" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 1074.6 655.2)" className="non-stroke st9 st3">2号变压器</text>

                  </g>
                </g>
              </g>
              <g>
                <line id="polyline_4_2_" className="st0" x1="749.6" y1="351.2" x2="751.6" y2="597"/>
                <g>
                  <g id="g_double_circle_4_">
                    <ellipse className="st0" cx="751.6" cy="615.2" rx="15.8" ry="18.2"/>
                    <ellipse className="st0" cx="751.6" cy="633.4" rx="15.8" ry="18.2"/>

                    <circle className={monPoint13.online==1?"circle-status red":'circle-status'} cx="791" cy="615.2" r="10"/>
                    <text transform="matrix(0.8712 0 0 1 771 645.2)" className="non-stroke st9 st3">1号变压器</text>

                  </g>
                </g>
              </g>
              <g>
                <line className="st0" x1="726.4" y1="861.2" x2="726.4" y2="970.3"/>
              </g>
              <g>
                <line className="st0" x1="1078.4" y1="865.4" x2="1078.4" y2="965.5"/>
              </g>
              <g>
                <line className="st0" x1="1127.7" y1="863.4" x2="1127.7" y2="964.5"/>
              </g>
              <g>
                <path id="SVGID_x5F_2_x5F_" className="st0" d="M1171.2,863.4v102.1"/>
              </g>
              <path className="st0" d="M753.1,987.3"/>
              <g>
                <line className="st0" x1="839.6" y1="948" x2="840.1" y2="863.4"/>
                <g>
                  <g id="g_double_circle_5_">
                    <ellipse className="st0" cx="839.6" cy="966.2" rx="15.8" ry="18.2"/>
                    <ellipse className="st0" cx="839.6" cy="984.4" rx="15.8" ry="18.2"/>
                  </g>
                </g>
              </g>
              <path className="st8" d="M931,1087.9"/>
              <text transform="matrix(0.8712 0 0 1 741.2471 949.4804)" className="non-stroke st9 st2">1号正常照</text>
              <text transform="matrix(0.8712 0 0 1 741.2471 972.6259)" className="non-stroke st9 st2">明变压器</text>
              <g>
                <line className="st0" x1="950.6" y1="948" x2="951.1" y2="863.4"/>
                <g>
                  <g id="g_double_circle_6_">
                    <ellipse className="st0" cx="950.6" cy="966.2" rx="15.8" ry="18.2"/>
                    <ellipse className="st0" cx="950.6" cy="984.4" rx="15.8" ry="18.2"/>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <line className="st0" x1="794.9" y1="1079.9" x2="998.7" y2="1079.9"/>
                  <g>
                    <line className="st0" x1="855.3" y1="1081.6" x2="855.3" y2="1150.6"/>
                  </g>
                </g>
                <g>
                  <line className="st0" x1="924.3" y1="1080.6" x2="924.3" y2="1149.6"/>
                </g>
              </g>
              <g>
                <line className="st0" x1="297.2" y1="1080.7" x2="501" y2="1080.7"/>
                <g>
                  <line className="st0" x1="357.6" y1="1082.4" x2="357.6" y2="1151.4"/>
                </g>
                <g>
                  <line className="st0" x1="426.6" y1="1081.4" x2="426.6" y2="1150.4"/>
                </g>
              </g>
              <g>
                <line className="st0" x1="1446.8" y1="950.6" x2="1447.2" y2="863"/>
                <g>
                  <g>
                    <g id="g_double_circle_7_">
                      <ellipse className="st0" cx="1446.8" cy="968.8" rx="15.8" ry="18.2"/>
                      <ellipse className="st0" cx="1446.8" cy="987" rx="15.8" ry="18.2"/>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <line className="st0" x1="1396.6" y1="1083.8" x2="1491.6" y2="1083.8"/>
                    <g>
                      <line className="st0" x1="1431.1" y1="1085.5" x2="1431.1" y2="1154.5"/>
                    </g>
                  </g>
                  <g>
                    <line className="st0" x1="1296.7" y1="1084.6" x2="1368.9" y2="1084.6"/>
                    <g>
                      <line className="st0" x1="1342.4" y1="1084.3" x2="1342.4" y2="1155.3"/>
                    </g>
                  </g>
                </g>
                <polygon className="st0" points="1501.9,1181.7 1288.4,1181.5 1290.2,1058.2 1503.7,1058.4"/>
              </g>
              <g>
                <g>
                  <g>
                    <line className="st0" x1="1051.3" y1="1102.4" x2="1243.4" y2="1102.4"/>
                    <g>
                      <line className="st0" x1="1182.8" y1="1103.1" x2="1182.8" y2="1172.1"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <line className="st0" x1="1094.1" y1="1103.9" x2="1094.1" y2="1172.9"/>
                    </g>
                  </g>
                </g>
                <polygon className="st0" points="1252.3,1181.6 1027.8,1181.4 1027.6,1058.1 1253.2,1058.3"/>
              </g>
              <g>
                <g>
                  <g id="g_double_circle_8_">
                    <ellipse className="st0" cx="1210.8" cy="969.8" rx="15.8" ry="18.2"/>
                    <g>
                      <ellipse className="st0" cx="1210.8" cy="1017" rx="15.8" ry="18.2"/>
                    </g>
                  </g>
                </g>
              </g>
              <line className="st0" x1="1210.8" y1="951.6" x2="1210.8" y2="861.4"/>
              <line className="st0" x1="1194.9" y1="1017" x2="1194.9" y2="969.8"/>
              <line className="st0" x1="1226.6" y1="1017" x2="1226.6" y2="969.8"/>
              <line className="st0" x1="1210.7" y1="1077.3" x2="1210.8" y2="1035.2"/>
              <text transform="matrix(0.8712 0 0 1 1201.9062 978.3925)" className="non-stroke st9 st2">M</text>
              <text transform="matrix(0.8712 0 0 1 1203.5684 1023.3701)" className="non-stroke st9 st2">G</text>
              <polyline className="st0" points="1084.5,1102.7 1084.5,1076.7 1218.6,1076.7 1218.6,1102.7 "/>
              <text transform="matrix(0.8712 0 0 1 1095.1162 1096.6571)" className="non-stroke st9 st10">AUTO CHANGE</text>
              <path id="SVGID_x5F_3_x5F_" className="st0" d="M1016.9,977.4l0.8,204.4l-335.3-0.4l-2.8-316"/>
              <path id="SVGID_x5F_4_x5F_" className="st0" d="M1274.5,938l-0.5,263.4l-626.1-1.6V863"/>
              <g>
                <polyline className="st0" points="1274,937.9 1313.1,938 1312.8,962  "/>
                <g>
                  <g id="g_double_circle_9_">
                    <path className="st0" d="M1313.8,961.7c8.7,0,15.8,6.1,15.8,16.2c0,10-7.1,18.2-15.8,18.2c-8.7,0-15.8-8.1-15.8-18.2
                      C1298,967.9,1305.1,961.7,1313.8,961.7z"/>
                    <ellipse className="st0" cx="1313.8" cy="996.1" rx="15.8" ry="18.2"/>
                  </g>
                </g>
                <path id="SVGID_x5F_5_x5F_" className="st4" d="M1313.8,1014.1v44.5"/>
              </g>
              <g>
                <path id="SVGID_x5F_6_x5F_" className="st0" d="M1017.7,976.8l79.9,0.2l-0.3,14"/>
                <g>
                  <g id="g_double_circle_10_">
                    <path className="st0" d="M1098.2,992c8.7,0,15.8,6.1,15.8,16.2c0,10-7.1,18.2-15.8,18.2s-15.8-8.1-15.8-18.2
                      C1082.4,998.2,1089.4,992,1098.2,992z"/>
                    <ellipse className="st0" cx="1098.2" cy="1026.4" rx="15.8" ry="18.2"/>
                  </g>
                </g>
                <line className="st0" x1="1098.2" y1="1044.6" x2="1098.2" y2="1076"/>
              </g>
              <text transform="matrix(0.8712 0 0 1 1118.0049 1002.2792)" className="non-stroke st9 st3">实验设备 </text>
              <text transform="matrix(0.8712 0 0 1 1118.0049 1016.6786)" className="non-stroke st9 st3">变压器</text>
              <text transform="matrix(0.8712 0 0 1 1227.6357 977.1708)" className="non-stroke st9 st11">实验设备 </text>
              <text transform="matrix(0.8712 0 0 1 1227.6357 991.5712)" className="non-stroke st9 st11">电机-发电 </text>
              <text transform="matrix(0.8712 0 0 1 1227.6357 1005.9706)" className="non-stroke st9 st11">机组</text>
              <text transform="matrix(0.8712 0 0 1 974.0625 948.0292)" className="non-stroke st9 st2">2号正常照</text>
              <text transform="matrix(0.8712 0 0 1 974.0625 971.1757)" className="non-stroke st9 st2">明变压器</text>
              <text transform="matrix(0.8712 0 0 1 1333.4463 972.08)" className="non-stroke st9 st3">厨房隔离 </text>
              <text transform="matrix(0.8712 0 0 1 1333.4463 986.4804)" className="non-stroke st9 st3">变压器</text>
              <text transform="matrix(0.8712 0 0 1 1465.6084 967.8994)" className="non-stroke st9 st3">厨房隔离 </text>
              <text transform="matrix(0.8712 0 0 1 1465.6084 982.2988)" className="non-stroke st9 st3">变压器</text>
              <text transform="matrix(0.8712 0 0 1 1435.4541 1176.4452)" className="non-stroke st9 st11">厨房分配电板</text>
              <text transform="matrix(0.8712 0 0 1 1370.0107 1155.3075)" className="non-stroke st9 st3">负载</text>
              <text transform="matrix(0.8712 0 0 1 1120.1572 1152.6434)" className="non-stroke st9 st3">负载</text>
              <text transform="matrix(0.8712 0 0 1 870.3408 1131.1102)" className="non-stroke st9 st3">负载</text>
              <text transform="matrix(0.8712 0 0 1 234.7266 991.7372)" className="non-stroke st9 st2">1号应急照</text>
              <text transform="matrix(0.8712 0 0 1 234.7266 1014.8837)" className="non-stroke st9 st2">明变压器</text>
              <text transform="matrix(0.8712 0 0 1 461.6318 994.3447)" className="non-stroke st9 st2">2号应急照</text>
              <text transform="matrix(0.8712 0 0 1 461.6318 1017.4911)" className="non-stroke st9 st2">明变压器</text>
              <text transform="matrix(0.8712 0 0 1 375.4424 1131.9481)" className="non-stroke st9 st3">负载</text>
              <text transform="matrix(0.8712 0 0 1 270 739.2841)" className="non-stroke st9 st2">应急发电机</text>
              
              <path id="SVGID_x5F_2_x5F__1_" className="st0" d="M1183.1,640.8v53.1"/>
              <line id="polyline_2_9_" className="st0" x1="581.3" y1="640.4" x2="581.2" y2="689.5"/>
              <line id="polyline_4_3_" className="st0" x1="751.6" y1="651.6" x2="752.6" y2="863.2"/>
              <line id="polyline_4_4_" className="st0" x1="1054.6" y1="662.6" x2="1054.6" y2="863.7"/>
              <line className="st0" x1="439.7" y1="1025.8" x2="439.7" y2="1080.3"/>
              <line className="st0" x1="344.4" y1="1026.5" x2="344.4" y2="1081.1"/>
              <line className="st0" x1="950.3" y1="1079.9" x2="950.6" y2="1002.6"/>
              <line className="st0" x1="839.4" y1="1080" x2="839.7" y2="1002.7"/>
              <line className="st0" x1="1446.4" y1="1083.8" x2="1446.8" y2="1005.2"/>
              <line id="polyline_2_10_" className="st0" x1="262.4" y1="534.9" x2="262.2" y2="569.3"/>
              <line id="polyline_2_11_" className="st0" x1="160" y1="530.9" x2="159.8" y2="569.3" style={{display:'none'}}/>
              <line id="polyline_2_12_" className="st0" x1="369.1" y1="534.9" x2="368.9" y2="569.3"/>
              <line id="polyline_2_13_" className="st0" x1="473.4" y1="535.6" x2="473.2" y2="575"/>
              <line id="polyline_2_14_" className="st0" x1="581.3" y1="536.1" x2="581.1" y2="574.5"/>
              <line id="polyline_2_15_" className="st0" x1="1271.2" y1="539.7" x2="1271.2" y2="577.6"/>
              <line id="polyline_2_16_" className="st0" x1="1183.1" y1="534.9" x2="1183.1" y2="573.8"/>
              <line id="polyline_2_17_" className="st0" x1="1362.3" y1="539.1" x2="1362.3" y2="577"/>
              <line id="polyline_2_18_" className="st0" x1="1548.3" y1="539.7" x2="1548.3" y2="577.6"/>
              <line id="polyline_2_19_" className="st0" x1="1712.2" y1="540.4" x2="1712.2" y2="578.3"/>

              <polygon className='switch-none-v' id="switch-one" points="165.8,442.9 152.5,442.9 152.9,406.5 166.2,406.5 " style={{display:'none'}}/>
              <text transform="matrix(0.8712 0 0 1 168.4 410.5002)" className={this.state.showNum == 9 ? "st12 text show" :'st12 text'} style={{display:'none'}}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint12.online==1?this.getValue(monPoint12.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint12.online==1?this.getValue(monPoint12.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint12.online==1?this.getValue(monPoint12.q) + 'kVar':"--"}</tspan>
              </text>

              <polygon className='switch-none-v' id="switch-two" points="268.5,442.9 255.2,442.9 255.6,406.5 268.9,406.5 "/>
              <text transform="matrix(0.8712 0 0 1 271.8519 410.5004)" className={this.state.showNum == 10 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint12.online==1?this.getValue(monPoint12.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint12.online==1?this.getValue(monPoint12.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint12.online==1?this.getValue(monPoint12.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-three" points="373.4,442.9 360,442.9 360.4,406.5 373.7,406.5 "/>
              <text transform="matrix(0.8712 0 0 1 378.4423 410.5004)" className={this.state.showNum == 11 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint11.online==1?this.getValue(monPoint11.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint11.online==1?this.getValue(monPoint11.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint11.online==1?this.getValue(monPoint11.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-four" points="479.9,442.9 466.5,442.9 466.9,406.5 480.3,406.5 "/>
              <text transform="matrix(0.8712 0 0 1 483.4357 410.5006)" className={this.state.showNum == 5 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint10.online==1?this.getValue(monPoint10.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint10.online==1?this.getValue(monPoint10.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint10.online==1?this.getValue(monPoint10.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-five" points="587.5,442.9 574.3,442.9 574.6,406.5 587.9,406.5 "/>
              <text transform="matrix(0.8712 0 0 1 591.7244 408.5003)" className={this.state.showNum == 6 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint9.online==1?this.getValue(monPoint9.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint9.online==1?this.getValue(monPoint9.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint9.online==1?this.getValue(monPoint9.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-six" points="667.8,277 654.3,277 654.8,240.6 668.2,240.6 "/>
              <text transform="matrix(0.8712 0 0 1 670.1498 244.5815)" className={this.state.showNum == 1 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint1.online==1?this.getValue(monPoint1.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint1.online==1?this.getValue(monPoint1.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint1.online==1?this.getValue(monPoint1.q) + 'kVar':"--"}</tspan>

                
              </text>
              <polygon className='switch-none-v' id="switch-serven" points="842.8,277 829.4,277 829.8,240.6 843.2,240.6 "/>
              <text transform="matrix(0.8712 0 0 1 848.1497 244.5813)" className={this.state.showNum == 2 ? "st12 text show" :'st12 text'}>

                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint2.online==1?this.getValue(monPoint2.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint2.online==1?this.getValue(monPoint2.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint2.online==1?this.getValue(monPoint2.q) + 'kVar':"--"}</tspan>

                
              </text>
              <polygon className='switch-none-v' id="switch-eight" points="1400.4,277 1387,277 1387.4,240.6 1400.8,240.6 "/>
              <text transform="matrix(0.8712 0 0 1 1406.7004 243.5813)" className={this.state.showNum == 4 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint4.online==1?this.getValue(monPoint4.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint4.online==1?this.getValue(monPoint4.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint4.online==1?this.getValue(monPoint4.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-nine" points="1144.8,277 1131.3,277 1131.8,240.6 1145.2,240.6 "/>
               <text transform="matrix(0.8712 0 0 1 1151.4999 241.6)" className={this.state.showNum == 3 ? "st12 text show" :'st12 text'}>

                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint3.online==1?this.getValue(monPoint3.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint3.online==1?this.getValue(monPoint3.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint3.online==1?this.getValue(monPoint3.q) + 'kVar':"--"}</tspan>

                
              </text>
              
              <polygon className='switch-none-v' id="switch-ten" points="1189.7,438.9 1176.3,438.9 1176.7,402.5 1190.1,402.5 "/>
              <text transform="matrix(0.8712 0 0 1 1190.1001 402.4888)" className={this.state.showNum == 7 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint8.online==1?this.getValue(monPoint8.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint8.online==1?this.getValue(monPoint8.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint8.online==1?this.getValue(monPoint8.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-eleven" points="1277.7,438.9 1264.3,438.9 1264.7,402.5 1278.1,402.5 "/>
              <text transform="matrix(0.8712 0 0 1 1279.1003 401.5812)" className={this.state.showNum == 8 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint7.online==1?this.getValue(monPoint7.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint7.online==1?this.getValue(monPoint7.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint7.online==1?this.getValue(monPoint7.q) + 'kVar':"--"}</tspan>
              </text>
              
              <polygon className='switch-none-v' id="switch-twelve"  points="1554.8,444.1 1541.4,444.1 1541.8,407.7 1555.2,407.7 "/>
              <text transform="matrix(0.8712 0 0 1 1558.2004 404.5608)" className={this.state.showNum == 13 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint5.online==1?this.getValue(monPoint5.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint5.online==1?this.getValue(monPoint5.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint5.online==1?this.getValue(monPoint5.q) + 'kVar':"--"}</tspan>
              </text>

              <text transform="matrix(0.8712 0 0 1 1722.2004 404.5608)" className={this.state.showNum == 14 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint15.online==1?this.getValue(monPoint15.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint15.online==1?this.getValue(monPoint15.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint15.online==1?this.getValue(monPoint15.q) + 'kVar':"--"}</tspan>
              </text>


              <polygon className='switch-none-v' id="switch-thirteen" points="1368.7,438.9 1355.3,438.9 1355.7,402.5 1369.1,402.5 "/>
              <text transform="matrix(0.8712 0 0 1 1374.0111 401.5811)" className={this.state.showNum == 12 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint6.online==1?this.getValue(monPoint6.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint6.online==1?this.getValue(monPoint6.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint6.online==1?this.getValue(monPoint6.q) + 'kVar':"--"}</tspan>
              </text>

              <polygon className='switch-none-v' id="switch-fourteen" points="758.6,757.4 745.2,757.4 745.6,721 759,721 "/>
              <text transform="matrix(0.8712 0 0 1 767.4003 729.2849)" className={this.state.showNum == 15 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint13.online==1?this.getValue(monPoint13.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint13.online==1?this.getValue(monPoint13.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint13.online==1?this.getValue(monPoint13.q) + 'kVar':"--"}</tspan>
              </text>
              <polygon className='switch-none-v' id="switch-fifteen"  points="1061,757.4 1047.6,757.4 1048,721 1061.4,721 "/>
              <text transform="matrix(0.8712 0 0 1 1071.5503 729.2845)" className={this.state.showNum == 16 ? "st12 text show" :'st12 text'}>
                <tspan x="0" y="0" className="st6 st2 tspan_i">I: {monPoint14.online==1?this.getValue(monPoint14.i) + 'A':"--"}</tspan>
                <tspan x="0" y="26.2" className="st6 st2">P:{monPoint14.online==1?this.getValue(monPoint14.p) + 'kw':"--"}</tspan>
                <tspan x="0" y="52.4" className="st6 st2 tspan_q">Q:{monPoint14.online==1?this.getValue(monPoint14.q) + 'kVar' + 'kVar':"--"}</tspan>
              </text>


              <polygon className="switch-none-v" points="757,446.9 743.7,446.9 744.1,410.5 757.4,410.5 "/>
              <polygon className="switch-none-v" points="1062.8,448.1 1049.6,448.1 1049.9,411.7 1063.3,411.7 "/>
              <polygon className="switch-none-v" points="1717.6,441.1 1704.4,441.1 1704.7,404.7 1718.1,404.7 "/>
              <polygon className="switch-none-v" points="394.8,835.3 381.5,835.3 381.9,798.9 395.3,798.9 "/>
              <polygon className="switch-none-v" points="446.1,916.8 432.8,916.8 433.2,880.4 446.6,880.4 "/>
              <polygon className="switch-none-v" points="350.8,916.8 337.5,916.8 337.9,880.4 351.3,880.4 "/>
              <polygon className="switch-none-v" points="276.8,916.8 263.5,916.8 263.9,880.4 277.3,880.4 "/>
              <polygon className="switch-none-v" points="211.4,916.8 198.1,916.8 198.5,880.4 211.9,880.4 "/>
              <polygon className="switch-none-v" points="507.4,916.8 494.1,916.8 494.5,880.4 507.9,880.4 "/>
              <polygon className="switch-none-v" points="629.1,916.8 615.8,916.8 616.2,880.4 629.6,880.4 "/>
              <polygon className="switch-none-v" points="433,1135.1 419.7,1135.1 420.1,1098.7 433.5,1098.7 "/>
              <polygon className="switch-none-v" points="364,1135.1 350.7,1135.1 351.1,1098.7 364.5,1098.7 "/>
              <polygon className="switch-none-v" points="732.8,916.8 719.5,916.8 719.9,880.4 733.3,880.4 "/>
              <polygon className="switch-none-v" points="845.8,916.8 832.5,916.8 832.9,880.4 846.3,880.4 "/>
              <polygon className="switch-none-v" points="1100.4,1157.2 1087.2,1157.2 1087.6,1120.8 1100.9,1120.8 "/>
              <polygon className="switch-none-v" points="1217.2,916.8 1203.9,916.8 1204.2,880.4 1217.7,880.4 "/>
              <polygon className="switch-none-v" points="1177.5,916.8 1164.3,916.8 1164.6,880.4 1178,880.4 "/>
              <polygon className="switch-none-v" points="1134.1,916.8 1120.8,916.8 1121.1,880.4 1134.6,880.4 "/>
              <polygon className="switch-none-v" points="1084.8,916.8 1071.6,916.8 1071.9,880.4 1085.2,880.4 "/>
              <polygon className="switch-none-v" points="861.8,1138.2 848.5,1138.2 848.8,1101.8 862.2,1101.8 "/>
              <polygon className="switch-none-v" points="930.7,1138 917.4,1138 917.8,1101.6 931.2,1101.6 "/>
              <polygon className="switch-none-v" points="957.5,1056.1 944.2,1056.1 944.5,1019.7 958,1019.7 "/>
              <polygon className="switch-none-v" points="845.8,1055.2 832.5,1055.2 832.9,1018.8 846.3,1018.8 "/>
              <polygon className="switch-none-v" points="957.5,916.8 944.2,916.8 944.5,880.4 958,880.4 "/>
              <polygon className="switch-none-v" points="1189.2,1157.2 1175.9,1157.2 1176.2,1120.8 1189.7,1120.8 "/>
              <polygon className="switch-none-v" points="1349.3,1135.1 1336.1,1135.1 1336.4,1098.7 1349.8,1098.7 "/>
              <polygon className="switch-none-v" points="1437.4,1135.1 1424.2,1135.1 1424.6,1098.7 1437.9,1098.7 "/>
              <polygon className="switch-none-v" points="1452.8,916.8 1439.6,916.8 1439.9,880.4 1453.2,880.4 "/>
              <polygon className="switch-off"  points="191.1,149.9 183.5,149.9 183.5,130.7 191.1,130.7 "/>
              <polygon className="switch-on" points="68.2,149.9 61.5,149.7 61.6,130.7 68.3,130.9 "/>

              {/*<text transform="matrix(0.8712 0 0 1 68.9109 344)" className="non-stroke st9 st2">
                f：<tspan className="text">{this.getValue(systemInfo.f)} Hz</tspan>
              </text>
              
              <text transform="matrix(0.8712 0 0 1 180.5395 344)" id="sec-title" className="non-stroke st9 st2">
                U：<tspan className="text">{this.getValue(systemInfo.u)} V</tspan>
              </text>*/}
              <text transform="matrix(0.8712 0 0 1 1484.0996 344)" id="three-title" className="non-stroke st9 st2">
                U：<tspan className="text">{monPoint5.online==1?this.getValue(monPoint5.voltage):"--"} V</tspan>
              </text>
              <text transform="matrix(0.8712 0 0 1 75.5645 147.7849)" className="non-stroke st9 st2">未投入使用</text>
              <text transform="matrix(0.8712 0 0 1 197.6169 147.7849)" className="non-stroke st9 st2">投入使用</text>
             
              {/*<text transform="matrix(0.8712 0 0 1 61.4998 203.6577)" className="non-stroke st9 st2">
                电流(I)：<tspan className="text">A </tspan>
                有功(P)：<tspan className="text">kW </tspan> 
                无功(Q)：<tspan className="text">kVar </tspan> 
              </text>*/}
              <text transform="matrix(0.8712 0 0 1 61.4998 203.6577)" className="non-stroke st9 st4">
                系统频率：<tspan className="text">{this.getValue(systemInfo.f)} Hz</tspan>
              </text>
              <text transform="matrix(0.8712 0 0 1 61.4998 233.6577)" className="non-stroke st9 st4">
                动力电网母线电压：<tspan className="text">{this.getValue(systemInfo.u)} V</tspan> 
              </text>
              <text transform="matrix(0.8712 0 0 1 61.4998 263.6577)" className="non-stroke st9 st4">
                安全运行小时数：<tspan className="text">{this.getValue(systemInfo.hours)} 小时</tspan> 
              </text>
              
              <rect width="230" height="90" x="500" y="95" id='ele1_1' className='ele-1' onMouseEnter={this.onMouseEnter.bind(this,1)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="200" height="90" x="790" y="95" id='ele1_2' className='ele-1' onMouseEnter={this.onMouseEnter.bind(this,2)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="230" height="90" x="1000" y="95" id='ele1_3' className='ele-1' onMouseEnter={this.onMouseEnter.bind(this,3)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="190" height="90" x="1280" y="95" id='ele1_4' className='ele-1' onMouseEnter={this.onMouseEnter.bind(this,4)} onMouseLeave={this.mouseLeave}></rect>

              
              <rect width="90" height="230" x="430" y="485" id='ele2_1' className='ele-2' onMouseEnter={this.onMouseEnter.bind(this,5)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="100" height="280" x="530" y="485" id='ele2_2' className='ele-2' onMouseEnter={this.onMouseEnter.bind(this,6)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="100" height="280" x="1130" y="485" id="ele2_3" className='ele-2' onMouseEnter={this.onMouseEnter.bind(this,7)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="90" height="230" x="1230" y="485" id="ele2_4" className='ele-2' onMouseEnter={this.onMouseEnter.bind(this,8)} onMouseLeave={this.mouseLeave}></rect>

              <rect width="80" height="230" x="120" y="485" id="ele3_1" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,9)} onMouseLeave={this.mouseLeave} style={{display:'none'}}></rect>
              <rect width="80" height="230" x="220" y="485" id="ele3_2" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,10)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="80" height="230" x="330" y="485" id="ele3_3" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,11)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="80" height="230" x="1330" y="485" id="ele3_4" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,12)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="80" height="230" x="1510" y="485" id="ele3_5" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,13)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="80" height="230" x="1670" y="485" id="ele3_6" className='ele-3' onMouseEnter={this.onMouseEnter.bind(this,14)} onMouseLeave={this.mouseLeave}></rect>
              
              <rect width="90" height="60" x="730" y="595" id="ele4_1" className='ele-4' onMouseEnter={this.onMouseEnter.bind(this,15)} onMouseLeave={this.mouseLeave}></rect>
              <rect width="90" height="60" x="1030" y="605" id="ele4_2" className='ele-4' onMouseEnter={this.onMouseEnter.bind(this,16)} onMouseLeave={this.mouseLeave}></rect>

                            
              
            </g>
          </switch>
        </svg>
      </div>
    );
  },
});

module.exports = PowerGrid;
