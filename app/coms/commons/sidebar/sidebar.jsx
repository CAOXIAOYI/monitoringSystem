'use strict';

var React = require('react');
var Link = require('react-router').Link;
var antd = require('antd');
var classnames = require('classnames');
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;

function getSidebarKey(urlObj) {
  let result = {};
  let queue = [];
  urlObj.menu.forEach((item) => {
    queue.push(item);
  });

  while (queue.length !== 0) {
    let _obj = queue.shift();
    if (_obj.url !== undefined) {
      result[_obj.url] = _obj.key;
    }
    if (_obj.children && _obj.children !== 0) {
      _obj.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  let selectedKeys = [];
  for (let key in result) {
    if (window.location.pathname.indexOf(key) !== -1) {
      selectedKeys.push(result[key]);
      break;
    }
  }
  if (selectedKeys.length === 0) {
    selectedKeys = ['introduction'];
  }
  return selectedKeys;
}

require('./index.less');

var Sider = React.createClass({
  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },
  handleClick(e) {
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1)
    });
  },
  getMenuDom(menu) {
    return menu.map((item) => {
      if (item.children && item.children.length !== 0) {
        let subMenu = this.getMenuDom(item.children);
          return (
            <SubMenu key={item.key} onTitleClick={this.onTitleClick.bind(this, item)} title={<span>{item.icon} {item.name}</span>}>
                {subMenu}
            </SubMenu>
          )  
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.url} onClick={this.onClick.bind(this, item)}>
              {item.icon} {item.name}
            </Link>
          </Menu.Item>
        )
      }
    })
  },
  render() {
    let selectedKeys = [];
    if(this.props.selectKey){
      selectedKeys = this.props.selectKey;
    }else{
     selectedKeys = getSidebarKey(this.props.config)
    }
    let menuDom = this.getMenuDom(this.props.config.menu);
    let menuTitle = <i className="iconfont hidesidebar">&#xe624;</i>;
    let stretchClass = classnames({
      "dtboost-sidebar":true,
      "dtboost-sidebar-stretch":this.props.isStretchTitle
    })
    let mode = "inline";
    if(this.props.isStretchTitle){
      mode = "vertical";
    }else{
      mode = "inline";
    }
    return (
      <div className={stretchClass}>
        <h3><div onClick={this.props.stretchClick}>{menuTitle}</div></h3>
        <Menu onClick={this.handleClick}
          selectedKeys={selectedKeys}
          defaultOpenKeys={this.props.config.defaultOpenKeys}
          className="dtboost-left-nav"
          mode={mode}>
            {menuDom}
        </Menu>
      </div>
    );
  },
  onClick: function(item) {
    this.props.onClick && this.props.onClick(item);
  },
  onTitleClick:function(item){
    item.url && this.context.router.push(item.url);
  }
});

module.exports = Sider;
