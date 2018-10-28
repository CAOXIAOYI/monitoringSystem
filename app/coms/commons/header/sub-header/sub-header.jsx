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

class SubHeader extends baseCom {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectedKeys: getHeaderKey() || ["index"],
    // };
  }
  handleClick(e){
    this.props.subHeaderClick && this.props.subHeaderClick(e)
    // this.setState({
    //   selectedKeys: [e.key],
    // });
  }
  render() {
    let privilege = window.localStorage.getItem("privilege");
    //1 :普通用户  2：管理员  3：超级用户
    let privilegeLevel = window.localStorage.getItem("privilegeLevel");
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
       if(isisPrivilege && i === 5 && privilegeLevel !== '1'){
          subDom.push( 
            <Menu.Item key="device_control">
              <NavLink to="/monitoringSystem/pages/device_control"><span>设备接入管控</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 4){
          subDom.push( 
            <Menu.Item key="electrical_machine">
              <NavLink to="/monitoringSystem/pages/electrical_machine/electric"><span>电机启停特性</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 3 && privilegeLevel !== '1'){
          subDom.push( 
            <Menu.Item key="monitor_status">
              <NavLink to="/monitoringSystem/pages/monitor_status"><span>监测系统状态</span></NavLink>
            </Menu.Item>
          );
       }
       
       if(isisPrivilege && i === 2 && privilegeLevel !== '1'){
          subDom.push( 
            <Menu.Item key="history_data">
              <NavLink to="/monitoringSystem/pages/history_data/electric"><span>历史数据</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 1 && privilegeLevel !== '1'){
          subDom.push( 
            <Menu.Item key="param_setting">
              <NavLink to="/monitoringSystem/pages/param_setting/dynamo"><span>参数设置页</span></NavLink>
            </Menu.Item>
          );
       }
       if(isisPrivilege && i === 0 && privilegeLevel !== '1'){
          subDom.push( 
            <Menu.Item key="system_config">
              <NavLink to="/monitoringSystem/pages/system_config/user_manage"><span>系统设置</span></NavLink>
            </Menu.Item>
          );
       }
    }
    
    let selectedKeys = this.props.selectedKeys;

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
