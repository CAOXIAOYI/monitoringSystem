'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let electricalMachineGen = require("../../coms/commons/sidebar/config/electrical-machine");

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
    if(item.deviceType === 0){
       this.props.menuItemTimestamp({},{meterId:item.meterId});
    }else{
      this.props.motorOnOffData({},{meterId:item.meterId,timeStamp:item.name});
    }
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={electricalMachineGen(this.props.electricalMachineMeta)} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={[this.props.electricalMachineMeta.currentMeterId]}
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


var electricalMachineAction = require('../../actions/page-action/electrical-machine');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};

  return {
    electricalMachineMeta:state.electricalMachine,
  };
}


module.exports = connect(
  mapStateToProps, {
     motorOnOffData: electricalMachineAction.motorOnOffData,
     menuItemTimestamp:electricalMachineAction.menuItemTimestamp
  }
)(AppPages);
