'use strict';

var React = require('react');
var Header = require("../../coms/commons/header/header.jsx");
var connect = require('react-redux').connect;
var App = React.createClass({
  render: function () {
    return ( 
      <div className="app-main-div">
        <Header {...this.props}/>
        { this.props.children }
      </div>
    );
  }
});
var appAction = require('../../actions/page-action/app/index');
function mapStateToProps(state, ownprops) {
  return {
    appMeta: state.app
  };
}

module.exports = connect(mapStateToProps, {
  systemTime: appAction.systemTime,
  latestEvent: appAction.latestEvent,
})(App);
