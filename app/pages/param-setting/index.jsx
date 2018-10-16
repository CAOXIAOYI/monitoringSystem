'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let paramSettingGen = require("../../coms/commons/sidebar/config/param-setting");

var AppPages = React.createClass({
  getInitialState() {
    return {
      isStretchTitle: false,
      hasNoPadding: false,
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
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={paramSettingGen()} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            />
          </MainWrapper.AsideContainer>
          <MainWrapper.MainContainer 
          isStretchTitle = {this.state.isStretchTitle} 
          hasNoPadding = {this.state.hasNoPadding}
          > 
            {this.props.children}
          }
          </MainWrapper.MainContainer>
        </MainWrapper>
      </div>
    );
  }
});



function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};
  let dataSyncMeta = state.dataSync;
  let tableMergeMeta = state.tableMerge;
  let slidebarMeta = {
    dataSyncMeta:dataSyncMeta,
    tableMergeMeta:tableMergeMeta
  }
  return {
    slidebarMeta
  };
}


module.exports = connect(
  mapStateToProps, {

  }
)(AppPages);
