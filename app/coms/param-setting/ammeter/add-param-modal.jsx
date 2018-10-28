'use strict';
import { Modal, Button, Form, Input, InputNumber, Select,Row,Col  ,Tooltip} from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../../commons/base/baseCom.jsx");
let validService = require("../../../services/validate/validate.js");
require('./add-param-modal.less');

class AddParamModal extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      data: {
        "id":"",
        "meter_name":"",
        "meter_ip_address":"",
        "subnet_mask":"",
        "gateway_address":"",
        "sntp_enable":"",
        "sntp_sync_timezone":"",
        "sntp_sync_interval":"",
        "sntp_sync_server":"",
        "sender_email":"",
        "sender_email_password":"",
        "acceptor_email":"",
        "smtp_port":25,
        "smtp_server":"202.108.5.83",
        "meter_address":"",
        "meter_id":"",
        "meter_f0":10

      },
      dataStatus: {
        ip: {
          status: "",
          explain: ""
        },
        beginTime: {
          status: "",
          explain: ""
        },
        name: {
          status: "",
          explain: ""
        },
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.id !== this.props.data.id){
      this.setState({
         data: _.assign(this.state.data,nextProps.data)
      }); 
    } 
  }
  render() {
    var meta = this.state.data;
    var metaStatus = this.state.dataStatus;
    var formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    return (
      <Modal title={meta.id?"编辑电表":"新建电表"} visible={this.props.visible} className="add-param-modal"
      onOk={this.handleOk.bind(this)}  width="800px" onCancel={this.handleCancel.bind(this)}>
      <Form layout="horizontal">
         <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="电表名称"
                >
                <Input type="text" value={meta.meter_name} name="meter_name" placeholder="请输入电表名称" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="SNTP对时"
                >
                <InputNumber value={meta.sntp_enable}  min={0} max={99}  name="sntp_enable" onChange={this.onNumberChange.bind(this,"sntp_enable")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为99'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="电表地址"
                >
                <InputNumber value={meta.meter_address} name="meter_address" onChange={this.onNumberChange.bind(this,"meter_address")} />
                  <Tooltip placement="right" title='该项必须为数字类型'>
                   <i className="iconfont tootip-icon">&#xe608;</i>
                  </Tooltip>
                </FormItem>
            </Col>
             
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="SNTP对时时区"
                >
                <InputNumber value={meta.sntp_sync_timezone}  min={0} max={99}   name="sntp_sync_timezone" onChange={this.onNumberChange.bind(this,"sntp_sync_timezone")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为99'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="IP地址"
                >
                <Input type="text" disabled={!!meta.id} value={meta.meter_ip_address} name="meter_ip_address" placeholder="请输入IP地址" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
           
          <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="SNTP对时间隔"
                >
                <InputNumber value={meta.sntp_sync_interval} name="sntp_sync_interval" onChange={this.onNumberChange.bind(this,"sntp_sync_interval")} />
                <Tooltip placement="right" title='该项必须为数字类型'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="子网掩码"
                >
                <Input type="text" value={meta.subnet_mask} name="subnet_mask" placeholder="请输入子网掩码" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="SNTP对时服务器"
                >
                <Input type="text" value={meta.sntp_sync_server} name="sntp_sync_server" placeholder="请输入SNTP对时服务器" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col> 
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="网关地址"
                >
                <Input type="text" value={meta.gateway_address} name="gateway_address" placeholder="请输入网关地址" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
             
             <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="发送者邮箱地址"
                >
                <Input type="text" value={meta.sender_email} name="sender_email" placeholder="请输入发送者邮箱" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
        </Row>
        <Row>
          
            <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="SMTP服务器端口"
                  >
                  <InputNumber value={meta.smtp_port} name="smtp_port"  onChange={this.onNumberChange.bind(this,"smtp_port")} />
                  <Tooltip placement="right" title='该项必须为数字类型'>
                   <i className="iconfont tootip-icon">&#xe608;</i>
                  </Tooltip>
                </FormItem>
            </Col>
           
              <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="发送者邮箱密码"
                >
                <Input type="password" value={meta.sender_email_password} name="sender_email_password" placeholder="请输入发送者邮箱密码" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
            
            
            
        </Row>
        <Row>      
            <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="SMTP服务器地址"
                  >
                  <Input type="text" value={meta.smtp_server} name="smtp_server" placeholder="请输入SMTP服务器地址" onChange={this.onInputChange.bind(this)}/>
                </FormItem>
            </Col>
            
             <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="接收者邮箱地址"
                >
                <Input type="text" value={meta.acceptor_email} name="acceptor_email" placeholder="请输入接受者邮箱" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="F0"
                  >
                  <InputNumber value={meta.meter_f0} name="meter_f0" onChange={this.onNumberChange.bind(this,"meter_f0")} />
                  <Tooltip placement="right" title='该项必须为正整数'>
                   <i className="iconfont tootip-icon">&#xe608;</i>
                  </Tooltip>
                </FormItem>
            </Col>
        </Row>
      </Form>
    </Modal>
    );
  }
  onSelectChange(value) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    let _dataStatus = _state.dataStatus;
    _dataStatus.objects = validService.validateRequired(value);
    _data.objects = value;
    this.setState({
      data: _data,
      dataStatus: _dataStatus
    });
  }
  validate(key,value){
    switch (key) {
      case "entityName":
        var _result = validService.validateRequired(value);
        if (_result.status === "success") {
          return validService.validateName(value);
        } else if (_result.status === "error") {
          return _result;
        }
        break;
      case "entityCode":
        var _result = validService.validateRequired(value);
        if (_result.status === "success") {
          return validService.validateCode(value);
        } else if (_result.status === "error") {
          return _result;
        }
        break;
      case "objects":
        return validService.validateRequired(value);
        break;
      default:
        return null
    }
  }
  onInputChange(evt) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    let _dataStatus = _state.dataStatus;
    if(this.validate(evt.target.name,evt.target.value)){
       _dataStatus[evt.target.name] = this.validate(evt.target.name,evt.target.value);
    }
    _data[evt.target.name] = evt.target.value;
    this.setState({
      "data": _data,
      "dataStatus": _dataStatus
    });
  }
  onNumberChange(name,value){
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    _data[name] = value;
    this.setState({
      "data": _data
    });
  }
  handleOk() {
    let _state = _.cloneDeep(this.state);
    let meta = _state.data;
    let _dataStatus = _state.dataStatus;
    // var objects = meta.objects.map((item) => ({
    //   entityCode: item,
    //   entityNodeRoleType: null
    // }));
    // var param = {
    //   entityCode: meta.entityCode,
    //   entityName: meta.entityName,
    //   description: meta.description,
    //   objects: objects
    // };
    // for (var item in param) {
    //   if(this.validate(item,param[item])){
    //      _dataStatus[item] = this.validate(item,param[item]);
    //   }  
    // }
    // this.setState({ "dataStatus": _dataStatus });
    // for (let status in _dataStatus) {
    //   if (_dataStatus[status].status !== "success") {
    //     return;
    //   }
    // }
    // this.props.onSubmit && this.props.onSubmit(meta).then((result) => {
    //   result && this.handleCancel();
    // });
    this.props.onSubmit && this.props.onSubmit(meta);

  }
  handleCancel() {
    this.setState({
      selected: '',
      data: {
        entityName: "",
        entityCode: "",
        objects: [],
        description: "",
      },
      dataStatus: {
        entityName: {
          status: "",
          explain: ""
        },
        entityCode: {
          status: "",
          explain: ""
        },
        objects: {
          status: "",
          explain: ""
        },
      },
    })
    this.props.onHide.call({});
  }
};


module.exports = AddParamModal;
