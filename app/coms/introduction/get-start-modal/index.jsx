'use strict';

let React = require('react');
let antd = require('antd');
let Modal = antd.Modal;
let Menu = antd.Menu;

let Step1 = require('./step1.jsx');
let Step2 = require('./step2.jsx');
let Step3 = require('./step3.jsx');
let Step4 = require('./step4.jsx');
let Step5 = require('./step5.jsx');

require('./index.less');
let getStartModal = React.createClass({
  getInitialState: function () {
    return {
      selectedKeys: ['1']
    }
  },
  render: function () {
    let props = this.props;
    return <Modal title="如何使用画像分析，快速的完成一个你需要的“某某画像”的产品？"
                  visible={this.props.visible}
                  className="get-start-modal"
                  width="800px"
                  onCancel={this.handleCancel}
                  footer={<div></div>}
    >
      <Menu mode="inline"
            selectedKeys={this.state.selectedKeys}
            onSelect={this.onStepChange}
      >
        <Menu.Item key="1">
          <p className="steps">步骤一: </p>
          <p>数据源</p>
        </Menu.Item>
        <Menu.Item key="2">
          <p className="steps">步骤二:</p>
          <p>管理实体-关系-标签</p>
        </Menu.Item>
        <Menu.Item key="3">
          <p className="steps">步骤三:</p>
          <p>同步数据</p>
        </Menu.Item>
        <Menu.Item key="4">
          <p className="steps">步骤四:</p>
          <p>配置界面</p>
        </Menu.Item>
        <Menu.Item key="5">
          <p className="steps">步骤五:</p>
          <p>本地部署</p>
        </Menu.Item>
      </Menu>
      <div className="get-start-content">
        {
          this.state.selectedKeys[0] === '2' ?
            <Step2/> :
          this.state.selectedKeys[0] === '3' ?
            <Step3/> :
          this.state.selectedKeys[0] === '4' ?
            <Step4/> :
          this.state.selectedKeys[0] === '5' ?
            <Step5/> :
            <Step1/>
        }
      </div>
    </Modal>
  },
  handleCancel: function () {
    this.props.onHide && this.props.onHide();
  },
  onStepChange: function (evt) {
    let key = evt.key || '1';
    this.setState({
      selectedKeys: [key]
    });
  }
});

module.exports = getStartModal;
