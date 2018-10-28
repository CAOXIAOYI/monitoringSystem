'use strict';

var React = require('react');
let connect = require('react-redux').connect;
let MainWrapper = require('../../coms/commons/main-wrapper/index.jsx');
let SideBar = require('../../coms/commons/sidebar/sidebar.jsx');
let historyDataGen = require("../../coms/commons/sidebar/config/history-data");
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
   var date = new Date();
   let startTime = moment(date).format("YYYY-MM-DD")+" 00:00:00";
   startTime = '1999-11-11 00:00:00'
   let endTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
   if(item.type === 1){
    this.props.historyData({},{meterId:item.meterId,start:startTime,end:endTime});
   }
   if(item.type === 2){
    this.props.historyEvent({},{eventId:item.event_id,start:startTime,end:endTime});
   }
  },
  render: function() {
    return (
      <div className="services-list-sidebar">
        <MainWrapper>
          <MainWrapper.AsideContainer>
            <SideBar 
            config={historyDataGen(this.props.historyDataMeta)} 
            stretchClick={this.stretchClick} 
            isStretchTitle = {this.state.isStretchTitle} 
            changePaddingModal = {this.changePaddingModal} 
            hasNoPadding = {this.state.hasNoPadding}
            onClick={this.onClick}
            selectKey={[this.props.historyDataMeta.currentKey]}
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




var historyDataAction = require('../../actions/page-action/history-data');
function mapStateToProps(state, ownProp) {
  //return {slidebarMeta:[]};

  return {
    historyDataMeta:state.historyData,
  };
}


module.exports = connect(
  mapStateToProps, {
     historyData: historyDataAction.historyData,
     historyDataQuality: historyDataAction.historyDataQuality,
     historyEvent: historyDataAction.historyEvent,
     historyEventData: historyDataAction.historyEventData,
  }
)(AppPages);
