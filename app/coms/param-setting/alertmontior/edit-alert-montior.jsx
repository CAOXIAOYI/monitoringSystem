'use strict';
import { Modal, Button, Form, Input, InputNumber, Select,Row,Col,Tooltip,message } from 'antd';
var FormItem = Form.Item;
var Option = Select.Option;
let BaseCom = require("../../commons/base/baseCom.jsx");

require('./edit-alert-montior.less');
let _ = require("lodash");
class AddParamModal extends BaseCom {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentWillReceiveProps(nextProps) {
    
      this.setState({
         data: nextProps.data
      }); 
  }
  render() {
    var meta = this.state.data;
    if(!meta){return null}
    var formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    
    return (
      <Modal title={this.props.title || '告警值设置'} visible={this.props.visible} className="add-param-modal"
      onOk={this.handleOk.bind(this)}  width="1000px" onCancel={this.handleCancel.bind(this)}>
      <Form layout="horizontal">
         <Row>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="黄色告警值"
                >
                <Input type="text" value={meta.yellowValue} name="yellowValue" placeholder="请输入黄色告警值" onChange={this.onInputChange.bind(this,'yellowValue')}/>
              </FormItem>
            </Col>
            <Col sm={12}>
              <FormItem
                {...formItemLayout}
                label="红色告警值"
                >
                <Input type="text" value={meta.redValue} name="redValue" placeholder="请输入黄色告警值" onChange={this.onInputChange.bind(this,'redValue')}/>
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
 
  onInputChange(type,evt){

    let _state = _.cloneDeep(this.state);
    let _data = _state.data;
    _data[type] = evt.target.value;
    this.setState({
      "data": _data,
    });
  }
  
  handleOk() {


    let _state = _.cloneDeep(this.state);
    let meta = _state.data;
    


    this.props.onSubmit && this.props.onSubmit(meta);
  }
  handleCancel() {
    this.setState({
      data: {
        
      }
    })
    this.props.onHide.call({});
  }
};


module.exports = AddParamModal;
