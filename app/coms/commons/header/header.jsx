'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import { Input,Button } from 'antd';

const Search = Input.Search;
var antd = require('antd');

import { Menu,Icon,Badge,Popover } from 'antd';

var SubMenu = Menu.SubMenu;
var MenuItemGroup = Menu.ItemGroup;
var baseCom = require("../base/baseCom.jsx");
let languageProvider = require("../../../services/language/index.js");
let User = require("../../../services/login/user.js");


let SubHeader = require("./sub-header/sub-header.jsx");

let CurrentTime = require("../current-time/current-time.jsx");

import { browserHistory } from 'react-router'

require('./header.less');


class Header extends baseCom {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
    
  }

  //moment(new Date).format("YYYY-MM-DD HH:mm:ss")
  logout(){
  
    window.localStorage.setItem("name","");
    window.localStorage.setItem("privilege","");
    const path = '/monitoringSystem/login';
    browserHistory.push(path);
    //window.location.reload();
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 3000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  tick() {
    // 每3s执行一次
    // this.props.latestEvent();
  }
  
  render() {

    let eventDom = this.props.appMeta.latestEvents.map((event,index)=>{
      return (
        <Menu.Item key={index}>
          <Link to="/monitoringSystem/pages/power_quality/electric" query={{grid: event.grid,meter_id: event.meter_id}}>
            <span>{event.time_stamp}~{event.device_room}~{event.event}</span>
          </Link>
        </Menu.Item>
      )
    });

    
    let userInfo = User.getUser();
    
    return (
      <header className="header">
        <div className="system-header">
          <a className="system-logo" href="/monitoringSystem/pages/index">
            <span className="logo" data-i18n="console.header.logo"><span className="circle-logo" ></span>东方红3深远海综合科学考察实习船电磁兼容监测系统</span>
          </a>
          <Menu mode="horizontal">
            <SubMenu key="sub1" title={<span className="alarminfo"> <Badge count={eventDom.length}><i className="iconfont">&#xe646;</i></Badge></span>   }>
              {eventDom}
            </SubMenu>
            <SubMenu key="sub2" title={<span className="userinfo"><i className="iconfont">&#xe622;</i><span>{userInfo.name}</span> </span>   }>
            </SubMenu>
            <SubMenu key="time" title={<span className="userinfo"><i className="iconfont">&#xe65c;</i><CurrentTime systemTime={this.props.systemTime} /></span>}>
            </SubMenu>
            <SubMenu key="logout" title={<span onClick={this.logout} ><Icon type="logout"/><a><span>{languageProvider["console.header.logout"]||"退出"}</span></a></span>}> 
            </SubMenu>
          </Menu>
        </div>
        <SubHeader/>
      </header>
    );
  }
}

module.exports = Header;
