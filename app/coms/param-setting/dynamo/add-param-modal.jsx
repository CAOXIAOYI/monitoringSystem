'use strict';
import { Modal, Button, Form, Input, InputNumber, Select,Row,Col,Tooltip,message } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../../commons/base/baseCom.jsx");
let validService = require("../../../services/validate/validate.js");
let DEVICETYPE = require("../../../services/deviceType.js");
let GRIDTYPE = require("../../../services/gridType.js");
require('./add-param-modal.less');
let _ = require("lodash");
class AddParamModal extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      data: {
        "id":"",
        "deviceName": "",
        "deviceType": 1,
        "grid": 1,
        "meterId": "",
        "ratedPower": "",
        "deviceRoom": "",
        "gdyUpperLimit": "",
        "gdyUpperUpperLimit":"",
        "gdlUpperLimit": "",
        "gdlUpperUpperLimit": "",
        "sxbphUpperLimit":"",
        "sxbphUpperUpperLimit": "",
        "plpcUpperLimit": "",
        "plpcUpperUpperLimit": "",
        "thdUpperLimit": "",
        "thdUpperUpperLimit": "",
        "lxdlUpperLimit": "",
        "lxdlUpperUpperLimit": "",
        "fxdlUpperLimit": "",
        "fxdlUpperUpperLimit": "",
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
    let _ammeterMeta = this.props.ammeterMeta.result.map((item, index) => {
      return _.assign({
        key: index,
      }, this.props.ammeterMeta.ammeterDatas[item]);
    })
    return (
      <Modal title={meta.id?"编辑设备":"新建设备"} visible={this.props.visible} className="add-param-modal"
      onOk={this.handleOk.bind(this)}  width="1000px" onCancel={this.handleCancel.bind(this)}>
      <Form layout="horizontal">
         <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="设备名称"
                >
                <Input type="text" value={meta.deviceName} name="deviceName" placeholder="请输入设备名称" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="设备类型"
                >
                <Select 
                    showSearch  
                    value={meta.deviceType}
                    onChange={this.onSelectedChange.bind(this,"deviceType")}
                    placeholder="请选择设备类型"
                  >
                    {
                      DEVICETYPE && DEVICETYPE.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })
                    }
                  </Select>
                </FormItem>
            </Col>   
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="电网类型"
                >
                <Select 
                    showSearch  
                    value={meta.grid}
                    onChange={this.onSelectedChange.bind(this,"grid")}
                    placeholder="请选择电网类型"
                  >
                    {
                      GRIDTYPE && GRIDTYPE.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })
                    }
                  </Select>
              </FormItem>
            </Col>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="电表名称"
                >
                <Select 
                    showSearch  
                    value={meta.meterId}
                    onChange={this.onSelectedChange.bind(this,"meterId")}
                    placeholder="请选择电表"
                  >
                    {
                      _ammeterMeta && _ammeterMeta.map((item) => {
                        return (
                          <Option key={item.meter_id} value={item.meter_id}>
                            {item.meter_name}
                          </Option>
                        );
                      })
                    }
                  </Select>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="额定功率"
                >
                <InputNumber value={meta.ratedPower}  min={0} max={999999999}  name="ratedPower" onChange={this.onNumberChange.bind(this,"ratedPower")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="所属房间"
                >
                <Input type="text" value={meta.deviceRoom} name="deviceRoom" placeholder="请输入发送者邮箱密码" onChange={this.onInputChange.bind(this)}/>
              </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="过电压告警阈值上限"
                >
                <InputNumber value={meta.gdyUpperLimit}  min={0} max={999999999}  name="gdyUpperLimit" onChange={this.onNumberChange.bind(this,"gdyUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="过电压告警阈值上上限"
                >
                <InputNumber value={meta.gdyUpperUpperLimit}  min={0} max={999999999}  name="gdyUpperUpperLimit" onChange={this.onNumberChange.bind(this,"gdyUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="过电流告警阈值上限"
                >
                <InputNumber value={meta.gdlUpperLimit}  min={0} max={999999999}  name="gdlUpperLimit" onChange={this.onNumberChange.bind(this,"gdlUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="过电流告警阈值上上限"
                >
                <InputNumber value={meta.gdlUpperUpperLimit}  min={0} max={999999999}  name="gdlUpperUpperLimit" onChange={this.onNumberChange.bind(this,"gdlUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="三相不平衡告警阈值上限"
                >
                <InputNumber value={meta.sxbphUpperLimit}  min={0} max={999999999}  name="sxbphUpperLimit" onChange={this.onNumberChange.bind(this,"sxbphUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="三相不平衡告警阈值上上限"
                >
                <InputNumber value={meta.sxbphUpperUpperLimit}  min={0} max={999999999}  name="sxbphUpperUpperLimit" onChange={this.onNumberChange.bind(this,"sxbphUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="频率偏差告警阈值上限"
                >
                <InputNumber value={meta.plpcUpperLimit}  min={0} max={999999999}  name="plpcUpperLimit" onChange={this.onNumberChange.bind(this,"plpcUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="频率偏差告警阈值上上限"
                >
                <InputNumber value={meta.plpcUpperUpperLimit}  min={0} max={999999999}  name="plpcUpperUpperLimit" onChange={this.onNumberChange.bind(this,"plpcUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="THD告警阈值上限"
                >
                <InputNumber value={meta.thdUpperLimit}  min={0} max={999999999}  name="thdUpperLimit" onChange={this.onNumberChange.bind(this,"thdUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="THD告警阈值上上限"
                >
                <InputNumber value={meta.thdUpperUpperLimit}  min={0} max={999999999}  name="thdUpperUpperLimit" onChange={this.onNumberChange.bind(this,"thdUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="零序电流告警上限"
                >
                <InputNumber value={meta.lxdlUpperLimit}  min={0} max={999999999}  name="lxdlUpperLimit" onChange={this.onNumberChange.bind(this,"lxdlUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="零序电流告警上上限"
                >
                <InputNumber value={meta.lxdlUpperUpperLimit}  min={0} max={999999999}  name="lxdlUpperUpperLimit" onChange={this.onNumberChange.bind(this,"lxdlUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="负序电流告警阈值上限"
                >
                <InputNumber value={meta.fxdlUpperLimit}  min={0} max={999999999}  name="fxdlUpperLimit" onChange={this.onNumberChange.bind(this,"fxdlUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
      
              </FormItem>
            </Col>
            
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="负序电流告警阈值上上限"
                >
                <InputNumber value={meta.fxdlUpperUpperLimit}  min={0} max={999999999}  name="fxdlUpperUpperLimit" onChange={this.onNumberChange.bind(this,"fxdlUpperUpperLimit")} />
                <Tooltip placement="right" title='该项必须为数字类型,最小值为0,最大值为999999999'>
                  <i className="iconfont tootip-icon">&#xe608;</i>
                </Tooltip>
            </FormItem>
            </Col>
        </Row>
        
        
      </Form>
    </Modal>
    );
  }
  onSelectedChange(type,value) {
    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    _data[type] = value;
    this.setState({
      data: _data
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
    this.props.onSubmit && this.props.onSubmit(meta).then((result) => {
      //this.handleCancel();
    });
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
