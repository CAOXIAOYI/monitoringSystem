'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let systemConfigMenuGen = require("../../coms/commons/sidebar/config/system-config");

var AppPages = React.createClass({
  getInitialState() {
    return {
      isStretchTitle: false,
      hasNoPadding: false,
      clickMenu:{}
    };
  },
  stretchClick(property) {
    this.setState({
      isStretchTitle: !!!this.state.isStretchTitle,
    });
  },
  changePaddingModal() {
    this.setState({
      hasNoPadding: !!!this.state.hasNoPadding,
    });
  },
  clickMenu(param) {
    this.setState({
      clickMenu:param
    });
  },
  render: function() {
    return (
      <div className="system-config-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={systemConfigMenuGen()} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            clickMenu={this.clickMenu}
            />
          </MainWrapper.AsideContainer>
          <MainWrapper.MainContainer 
          isStretchTitle = {this.state.isStretchTitle} 
          hasNoPadding = {this.state.hasNoPadding}
          clickMenu = {this.state.clickMenu} 
          > 
            {this.props.children}
          }
          </MainWrapper.MainContainer>
        </MainWrapper>
      </div>
    );
  }
});

module.exports = AppPages;
