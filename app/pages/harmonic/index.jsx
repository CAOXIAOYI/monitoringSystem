'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let harmonicGen = require("../../coms/commons/sidebar/config/harmonic");
let moment = require("moment");
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
    let timeStamp = this.props.harmonicMeta.currentTimeStamp?this.props.harmonicMeta.currentTimeStamp:"";
    this.props.harmonicQueryData({grid:item.grid,meterId:parseInt(item.meterId),thdNum:0,timeStamp:timeStamp});
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={harmonicGen(this.props.harmonicMeta)} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={[this.props.harmonicMeta.currentKey]}
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

var harmonicAction = require('../../actions/page-action/harmonic');

function mapStateToProps(state, ownProp) {
  return {
    harmonicMeta:state.harmonic,
  };
}


module.exports = connect(
  mapStateToProps, {
    harmonicQueryData: harmonicAction.harmonicQueryData,
  }
)(AppPages);
