'use strict';

var React = require('react');

import { Modal, Spin, Button } from 'antd';

require('./history-login-modal.less');
var HistoryLoginModal = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var modalState = this.props.modalState;
    let _historyDom = this.props.userManageMeta.loginHistory.map((history,index)=>{
      return(
        <div key={index} className="msg">
          <div>{history.userName}</div>
          <div>{history.timeStamp}</div>
          <div>{history.loginIp}</div>
        </div>
      )
    });
    return (
      <div>
        <Modal title={'用户: ' + modalState.data.name +' 历史登录情况'} width={800} visible={modalState.show} className="history-login-modal"
               onCancel={this.handleCancel}
               footer={
                 <div>
                   <Button onClick={this.handleCancel} type="default">关闭</Button>
                 </div>
               }
        >
          <div className="log">
           <div className="msg-header">
              <div>用户名</div>
              <div>登录时间</div>
              <div>登录IP</div>
            </div>
            {_historyDom}
          </div>
        </Modal>
      </div>
    );
  },
  handleCancel: function() {
    this.props.onHide && this.props.onHide();
  }
});

module.exports = HistoryLoginModal;
