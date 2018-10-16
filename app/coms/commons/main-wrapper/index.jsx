'use strict';

var React = require('react');
var classnames = require('classnames');
require('./index.less');
var Wrapper = React.createClass({
  render: function () {
    return (
      <div className="main-wrapper">
        {this.props.children}
      </div>
    );
  }
});

Wrapper.AsideContainer = React.createClass({
  render: function () {
    return (
      <div className="main-wrapper-aside">
        {this.props.children}
      </div>
    );
  }
});

Wrapper.MainContainer = React.createClass({
  render: function () {
    let children = this.props.children.map( (o, i)=>{
          if(i === 0 ){
            return React.cloneElement(o, { param: this.props.clickMenu,key: i })
          }
        });
    let stretchClass = classnames({
      "main-wrapper-main":true,
      "main-wrapper-main-stretch":this.props.isStretchTitle
      //"main-wrapper-main-explore":this.props.hasNoPadding
    });
    return (
      <div className={stretchClass}>
        {children}
      </div>
    );
  }
});

module.exports = Wrapper;
