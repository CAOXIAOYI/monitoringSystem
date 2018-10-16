'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import { Input,Button,Menu,Icon,Popover } from 'antd';

const Search = Input.Search;
var SubMenu = Menu.SubMenu;
var MenuItemGroup = Menu.ItemGroup;
var baseCom = require("../../base/baseCom.jsx");

var NavLink = require("../../nav-link/nav-link.jsx");

let PRIVILEGE = require("../../../../services/privilege.js");

require('./sub-header.less');


function getHeaderKey() {
  var urlObject = {
    'index': 'index',
    'harmonic': 'harmonic',
    'sub_system':'sub_system',
    'power_quality':'power_quality',
    'device_characteristics':'device_characteristics',
    'harmonic':'harmonic',
    'device_control': 'device_control',
    'param_setting':'param_setting',
    'electrical_machine':'electrical_machine',
    'history_data':'history_data',
    'monitor_status':'monitor_status',
    'system_config':'system_config',
  };

  let selectedKeys = [];
  for (let key in urlObject) {
    if (window.location.pathname.indexOf(key) !== -1) {
      selectedKeys.push(urlObject[key]);
      break;
    }
  }
  if (selectedKeys.length === 0) {
    selectedKeys = ['index'];
  }
  return selectedKeys;
}

class SubHeader extends baseCom {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: getHeaderKey() || ["index"],
    };
  }
  handleClick(e){
    this.setState({
      selectedKeys: [e.key],
    });
  }
  render() {
    let privilege = window.localStorage.getItem("privilege");
    let subDom = [];
    for(let i=10;i>-1;i--){
       let isisPrivilege = PRIVILEGE.isPrivilege(parseInt(privilege),i);
       if(isisPrivilege && i === 10){
          subDom.push( 
            <Menu.Item key="index">
              <NavLink to="/monitoringSystem/pages/index"><span>首页</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 9){
        subDom.push( 
          <Menu.Item key="sub_system">
            <NavLink to="/monitoringSystem/pages/sub_system/electric"><span>子系统监测</span></NavLink>
          </Menu.Item>
        )
       }
       if(isisPrivilege && i === 8){
          subDom.push( 
            <Menu.Item key="power_quality">
              <NavLink to="/monitoringSystem/pages/power_quality/electric"><span>电能质量</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 7){
          subDom.push( 
            <Menu.Item key="device_characteristics">
              <NavLink to="/monitoringSystem/pages/device_characteristics/electric_equipment"><span>设备特性</span></NavLink>            
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 6){
          subDom.push( 
            <Menu.Item key="harmonic">
              <NavLink to="/monitoringSystem/pages/harmonic/electric"><span>谐波查询</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 5){
          subDom.push( 
            <Menu.Item key="device_control">
              <NavLink to="/monitoringSystem/pages/device_control"><span>设备接入管控</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 4){
          subDom.push( 
            <Menu.Item key="monitor_status">
              <NavLink to="/monitoringSystem/pages/monitor_status"><span>监测系统状态</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 3){
          subDom.push( 
            <Menu.Item key="electrical_machine">
              <NavLink to="/monitoringSystem/pages/electrical_machine/electric"><span>电机启停特性</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 2){
          subDom.push( 
            <Menu.Item key="history_data">
              <NavLink to="/monitoringSystem/pages/history_data/electric"><span>历史数据</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 1){
          subDom.push( 
            <Menu.Item key="param_setting">
              <NavLink to="/monitoringSystem/pages/param_setting/dynamo"><span>参数设置页</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 0){
          subDom.push( 
            <Menu.Item key="system_config">
              <NavLink to="/monitoringSystem/pages/system_config/user_manage"><span>系统设置</span></NavLink>
            </Menu.Item>
          );
       }
    }
   
    let selectedKeys = this.state.selectedKeys;

    return (
        <div className="sub-menu-header">
          <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={selectedKeys}>
           {subDom}
          </Menu>
        </div>
    );
  }
}

module.exports = SubHeader;
