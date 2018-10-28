'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let subSystemGen = require("../../coms/commons/sidebar/config/sub-system");

var AppPages = React.createClass({
  getInitialState() {

    const type = this.props.location.query.type;
    let key ='dynamo',defaultSeclectKey=[];
    if(type){
      const menu = subSystemGen().menu;
      this.props.subSystemMonitor({},{deviceType:Number(type)});
      this.props.subSystemMonitorExtend({},{deviceType:Number(type)});
      key = menu[Number(type) - 1].key;
    }

    defaultSeclectKey.push(key);

    return {
      isStretchTitle: false,
      hasNoPadding: false,
      selectKey:defaultSeclectKey,
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
   this.props.subSystemMonitorExtend({},{deviceType:item.id});
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
     subSystemMonitorExtend: subSystemAction.subSystemMonitorExtend,
  }
)(AppPages);
