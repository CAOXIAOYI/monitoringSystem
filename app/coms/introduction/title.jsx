'use strict';

var React = require('react');

require('./title.less');
var IntroductionTitle = React.createClass({
  render: function () {
    return (
      <div className="introduction-title">
        <h1>数据管理做什么？</h1>
        <span>三步搞定受众纷乱的数据，轻轻松松做应用</span>
      </div>
    );
  }
});

module.exports = IntroductionTitle;
