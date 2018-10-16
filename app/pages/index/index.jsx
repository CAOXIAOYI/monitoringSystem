'use strict';

let React = require('react');
let BaseCom = require("../../coms/commons/base/baseCom.jsx");
let connect = require('react-redux').connect;
let PowerGrid = require('../../coms/index/power-grid.jsx');
let LabGrid = require('../../coms/index/lab-grid.jsx');
var classnames = require('classnames');
require('./index.less');
class Index extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      powerGrid: true,
      cancelBtn: true,
    };
  }
  // onClick(type){
  //   if(type === "power" && !this.state.powerGrid){
  //     this.setState({
  //       powerGrid:!this.state.powerGrid,
  //     })
  //   }
  //   if(type === "lab" && this.state.powerGrid){
  //     this.setState({
  //       powerGrid:!this.state.powerGrid
  //     })
  //   }
  // }
  chanageHandleClick(type){
    
    if(type === "power" && !this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn,
        powerGrid:!this.state.powerGrid,
      })
    }
    if(type === "lab" && this.state.cancelBtn){
      this.setState({
        cancelBtn:!this.state.cancelBtn,
        powerGrid:!this.state.powerGrid
      })
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 3000);
  }
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  }
  // componentWillUnmount() {
  //   this.timer && clearTimeout(this.timer);
  // },
  tick() {
    // 每30s执行一次
    this.props.homePageData();
  }
  render() {
    let props = this.props;
    let appMeta = props.appMeta;
    let selectedClass = classnames({
      "selected": true,
    })
    return (
      <div className="page-index">
        {this.state.powerGrid ? <PowerGrid data={appMeta} /> : <LabGrid data={appMeta} />}
        <div className="index-chageBtn">
          <div className={this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"power")}>
            <span>动力电网</span>
          </div>
          <div className={!!!this.state.cancelBtn?selectedClass:""} onMouseOver={this.chanageHandleClick.bind(this,"lab")}>
            <span>实验室电网</span>
          </div>
        </div>
      </div>
      
    );
  }
 
};
var appAction = require('../../actions/page-action/app/index');
function mapStateToProps(state, ownProps) {
  return {
    appMeta: state.app
  };
}

module.exports = connect(mapStateToProps, {
  //page-action
   homePageData: appAction.homePageData,
})(Index);
