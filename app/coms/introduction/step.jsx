'use strict';

var React = require('react');
var antd = require('antd');
var Button = antd.Button;
var Link = require('react-router').Link;
var Spin = antd.Spin;

require('./step.less');
var Step = React.createClass({
  propTypes: {
    stepId: React.PropTypes.number.isRequired,
    stepTitle: React.PropTypes.string.isRequired,
    stepDesc: React.PropTypes.string.isRequired,
    stepButton: React.PropTypes.string.isRequired
  },
  render: function () {
    var props = this.props || {};
    var content = props.content || [];
    var contentDom = [];
    if (props.pending) {
      contentDom = <Spin/>;
    } else {
      contentDom = this.generateDom(content);
    }
    return (
      <div className="welcome-step">
        <div className="step-top">
          <Link to={props.href}><Button type="ghost" shape="circle" size="large" className="cycle-button">{props.stepId}</Button></Link>
          <div className="step-title-desc">
            <p className="step-title">{props.stepTitle}</p>
            <p className="step-desc">{props.stepDesc}</p>
          </div>
        </div>
        <div className="step-bottom">
          <div className="step-bottom-content">
            {contentDom}
          </div>
          <div className="step-bottom-button">
            <Link to={props.href}><Button type="primary" size="large">{props.stepButton}</Button></Link>
          </div>
        </div>
      </div>
    );
  },
  generateDom: function (content) {
    let props = this.props;
    let result = [];
    let regExp = /\[(.+?)\]\((.+?)\)/;
    if (content && content.length !== 0) {
      content.forEach((string, index) => {
        let tmpStr = string.toString();
        let resultArray = [];
        let count = 0;
        while (true) {
          let matched = regExp.exec(tmpStr);
          if (!matched) {
            resultArray.push(tmpStr);
            break;
          }
          let firstSentence = tmpStr.substr(0, matched.index);
          let secondSentence = tmpStr.substr(firstSentence.length, matched[0].length);
          let thirdSentence = tmpStr.substr(firstSentence.length + secondSentence.length, tmpStr.length - firstSentence.length - secondSentence.length);
          resultArray.push(firstSentence);
          resultArray.push(<Link key={'a-link-' + index + count} to={props.href}> {matched[1]} </Link>);
          count++;
          tmpStr = thirdSentence;
        }
        result.push(
          <p key={'a-p-' + index}>
            { resultArray }
         </p>);
      });
    }

    return result;
  }
});

module.exports = Step;
