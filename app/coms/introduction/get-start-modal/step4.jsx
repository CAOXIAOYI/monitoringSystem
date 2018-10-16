'use strict';

let React = require('react');

let Step = React.createClass({
  render: function () {
    return <div>
      <h3>界面配置</h3>
      <p>
        提供的交互分析应用框架是以源代码的方式提供，用户只需把整个应用运行，会根据配置文件的填写自动渲染出一个可进行交互式分析的界面。
      </p>
    </div>;
  }
});

module.exports = Step;
