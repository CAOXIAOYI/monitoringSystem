'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let deviceCharacteristicsGen = require("../../coms/commons/sidebar/config/device-characteristics");

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
    this.props.deviceFeaturesData({},{meterId:item.meterId});
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={deviceCharacteristicsGen(this.props.deviceCharacteristicsMeta)} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={[this.props.deviceCharacteristicsMeta.currentMeterId]}
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

var deviceCharacteristicsAction = require('../../actions/page-action/device-characteristics');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};
  
  return {
    deviceCharacteristicsMeta:state.deviceCharacteristics,
  };
}


module.exports = connect(
  mapStateToProps, {
    deviceFeaturesData: deviceCharacteristicsAction.deviceFeaturesData,
  }
)(AppPages);
