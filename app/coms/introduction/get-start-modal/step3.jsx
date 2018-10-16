'use strict';

let React = require('react');

let Step = React.createClass({
  render: function () {
    return <div>
      <h3>同步数据</h3>
      <p>
        完成第二步后，可以在模型探索中可视化的看到业务数据的全貌，当业务需要使用数据时，可以在这个视图里很便捷的找到。
      </p>
      <p>
        画像分析所需要的数据都要运行在分析型数据库（AnalyticDB)(原ADS)中，当数据不再AnalyticDB时，你只需要将需要标签一键发起同步，系统便可自动完成同步。
      </p>
    </div>;
  }
});

module.exports = Step;
