'use strict';

let React = require('react');

let connect = require('react-redux').connect;
let Title = require('../../../coms/introduction/title.jsx');
let Step = require('../../../coms/introduction/step.jsx');

let GetStartModal = require('../../../coms/introduction/get-start-modal/index.jsx');

require('./introduction.less');
let Introduction = React.createClass({
  getInitialState: function(){
    return {
      isShowGetStartModal: false
    }
  },
  render: function () {
    let props = this.props;
    let summaryMeta = props.summaryMeta;
    let steps = [];
    let tmp = [
      {
        key: 'step2', stepId: 2, stepTitle: '实体关系逻辑模型', stepDesc: '归一实体建立关系', stepButton: '管理实体和关系',
        href: '/viewManageTools/pages/data_manager/object_link_manager/',
        pending: summaryMeta.isFetching,
        content: [
          '归一实体数： [' + summaryMeta.objectInfo.entityNum + '](zzz)个，覆盖 [' +
            summaryMeta.objectInfo.tableNum + '](yyy)张表',
          '建立关系数： [' + summaryMeta.linkInfo.entityNum + '](zzz)个，覆盖 [' +
            summaryMeta.linkInfo.tableNum + '](yyy)张表',
          //'创建标签数： [' + summaryMeta.tagInfo.tagNum + '](zzz)个'
        ]
      }
    ];
    steps.push(
      <Step {...tmp[0]}>
      </Step>
    );
    steps.push(
      <Step {...tmp[1]}>
      </Step>
    );

    return (
      <div className="page-introduction">
        <Title/>
        <span className="get-started" onClick={this.onShowGetStartModal}>
          快速入门 <i className="iconfont">&#xe616;</i>
        </span>
        { steps }
        <GetStartModal
          visible={this.state.isShowGetStartModal}
          onHide = {this.onHideGetStartModal}
        />
      </div>
    );
  },
  onShowGetStartModal: function(){
    this.setState({
      isShowGetStartModal: true
    });
  },
  onHideGetStartModal: function(){
    this.setState({
      isShowGetStartModal: false
    });
  }
});

function mapStateToProps(state, ownProps) {
  return {
    summaryMeta: {
      isFetching:false,
      schemaInfo:{
        schemaNum: 0,
        tableNum: 0
      },
      objectInfo:{
        entityNum:0,
        tableNum: 0
      },
      linkInfo:{
        entityNum:0,
        tableNum:0
      },
      tagInfo:{
        tagNum:0
      }
    }
  };
}


module.exports = connect(mapStateToProps, {
  //page-action
})(Introduction);
