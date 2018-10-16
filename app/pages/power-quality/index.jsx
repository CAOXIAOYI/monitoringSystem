'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let powerQualityGen = require("../../coms/commons/sidebar/config/power-quality");

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
  onClick(item){
    this.props.powerQualityData({grid:item.grid},{meterId:item.meterId});
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={powerQualityGen(this.props.powerQualityMeta)} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={[this.props.powerQualityMeta.currentKey]}
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


var powerQualityAction = require('../../actions/page-action/power-quality');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};

  return {
    powerQualityMeta:state.powerQuality,
  };
}


module.exports = connect(
  mapStateToProps, {
     powerQualityData: powerQualityAction.powerQualityData,
  }
)(AppPages);
