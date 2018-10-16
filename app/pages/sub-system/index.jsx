'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let subSystemGen = require("../../coms/commons/sidebar/config/sub-system");

var AppPages = React.createClass({
  getInitialState() {
    return {
      isStretchTitle: false,
      hasNoPadding: false,
      selectKey:["dynamo"],
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
   this.props.subSystemMonitor({},{deviceType:item.id});
    this.setState({
      selectKey:[item.key]
    });
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={subSystemGen()} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={this.state.selectKey}
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


var subSystemAction = require('../../actions/page-action/sub-system');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};

  return {
    subSystemMeta:state.subSystem,
  };
}


module.exports = connect(
  mapStateToProps, {
     subSystemMonitor: subSystemAction.subSystemMonitor,
  }
)(AppPages);
