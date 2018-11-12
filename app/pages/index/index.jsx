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
    this.props.alertData();
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
    this.props.alertData();
  }

  renderAlert(list){

    if(!list){return null}
    if(list.length == 0){
      return (
        <div className='none-data'>
          暂无数据
        </div>
      )
    }else{
      return list.map((item,idx)=>{
        return (
          <div className="event-body" key={idx}>
            <div className="div-even">{item.time_stamp}</div>
            <div className="div-even">{item.device_room}</div>
            <div className="div-even">{item.event}</div>
            <div className="div-even">{item.event_status ? '已处理' : '未处理'}</div>
            <div className="div-even">{item.event_grade == 1 ? '橙色' :'红色'}</div>
          </div>
        )
        
      })

    }

   
  }

  render() {
    let props = this.props;
    const powerGrid = this.state.powerGrid;
    let appMeta = props.appMeta;
    const list = powerGrid ? appMeta.alertData['1']:appMeta.alertData['2'];

    let selectedClass = classnames({
      "selected": true,
    })
    return (
      <div className="page-index">
        <div className='page-left'>
          {this.state.powerGrid ? <PowerGrid data={appMeta} /> : <LabGrid data={appMeta} />}
          <div className="index-chageBtn">
            <div className={this.state.cancelBtn?selectedClass:""} onClick={this.chanageHandleClick.bind(this,"power")}>
              <span>动力电网</span>
            </div>
            <div className={!!!this.state.cancelBtn?selectedClass:""} onClick={this.chanageHandleClick.bind(this,"lab")}>
              <span>实验室电网</span>
            </div>
          </div>
        </div>
        <div className='page-right'>
          <div className="event-header">
            <div>时间</div>
            <div>设备名称</div>
            <div>事件描述</div>
            <div>事件等级</div>
            <div>事件状态</div>
          </div>
          <div className='scroll-body'>
            {this.renderAlert(list)}
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
   alertData:appAction.alertData
})(Index);
