'use strict';

let React = require('react');

let Step = React.createClass({
  render: function () {
    return <div>
      <h3>本地部署</h3>
      <p>
        配置完交互式画像分析界面后，您可以直接在界面上进行业务分析，也可以下载代码包到本地，部署到您的应用服务器上。同时你可以进一步修改应用的代码，以适配您自己整体应用的风格、布局等。
      </p>
    </div>;
  }
});

module.exports = Step;
