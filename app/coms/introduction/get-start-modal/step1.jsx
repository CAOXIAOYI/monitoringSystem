'use strict';

let React = require('react');

let Step = React.createClass({
  render: function () {
    return <div>
      <h3>注册云计算资源</h3>
      <p>
        云计算资源管理支撑多个计算存储资源之间相互通信，并获取元信息的基本功能模块。目前画像分析支持以下计算存储资源：
      </p>
      <ul>
        <li>阿里云云数据库RDS版(ApsaraDB for RDS)（原RDS）</li>
        <li>阿里云大数据计算服务(MaxCompute)（原ODPS）</li>
        <li>阿里云分析型数据库（AnalyticDB)(原ADS)</li>
        <li>阿里云表格存储(Table Store)</li>
      </ul>
    </div>;
  }
});

module.exports = Step;
