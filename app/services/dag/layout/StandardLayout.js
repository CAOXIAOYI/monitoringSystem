"use strict";

var Layout = require("./Layout");
let TYPE = require("../element/type");
var EVENTS = require("../events");
var ElementGen = require("../element/elementGen");

//标准视图布局
export default class StandardLayout extends Layout {
  constructor(option) {
    super(option);

    this.isAutoLayout = option.isAutoLayout;
    this.isSplitLinks = option.isSplitLinks;
    this.dataSetBasic = null;
    this.dataSetFlow = null;
    this.addFlowInfo = { switch: 'off', startNode: null };
  }

  draw(dataSource) {
    this.dataSource = dataSource;
    this.layoutCtrl.initLayoutCtrl(dataSource, this.isSplitLinks);
    this.layoutCtrl.viewType = TYPE.viewType.TYPE_BASIC;
    this.dataSetBasic = this.layoutCtrl.genDataSet(dataSource, false);
    this.layoutCtrl.viewType = TYPE.viewType.TYPE_FLOW;
    this.dataSetFlow = this.layoutCtrl.genDataSet(dataSource, true);
    
    this.attachDatasetEvent(this.dataSetBasic);
    this.attachDatasetEvent(this.dataSetFlow);
    this.attachStandardDatasetEvent();

    this.refresh(this.dataSetBasic,TYPE.viewType.TYPE_BASIC);
  }

  refresh(ds,viewType){
    this.dataSet = this.layoutCtrl.dataSet = ds;

    if (this.dataSet != null) {
      this.initResolveDataset(viewType);
      this.update();
      this.dataSet.setLayout(this.onlyKey, this); 
    }
  }

  changeView(viewType){   
    switch(viewType){
      case TYPE.viewType.TYPE_BASIC:
        this.refresh(this.dataSetBasic,viewType);    
        break;
      case TYPE.viewType.TYPE_FLOW:
        this.refresh(this.dataSetFlow,viewType);  
        break;
      default:
        this.refresh(this.dataSetBasic,viewType);
        break;
    }
  }

  initResolveDataset(viewType) {
    this.layoutCtrl.viewType = viewType;
    this.layoutCtrl.isSplitRelation = viewType === TYPE.viewType.TYPE_FLOW ? true : this.isSplitLinks;
    var _nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);

    _nodes.forEach(function(item) {
      item.isExploreAble = viewType === TYPE.viewType.TYPE_BASIC?true:false;
      item.isShowTagAble = viewType === TYPE.viewType.TYPE_BASIC?true:false;
      item.isDrawFlowAble = viewType === TYPE.viewType.TYPE_BASIC?false:true;
      item.isSelectAble = false;
    })
  }

  addFlowToLayout(data){
    if (this.addFlowInfo.switch === 'on') {
      if(this.addFlowInfo.startNode){
        if (this.addFlowInfo.startNode.id !== data.id) {
          var flowLineItem = {
            elementType: TYPE.ElementType.ELEMENT_TYPE_EDGE,
            id: "flow-" + this.addFlowInfo.startNode.id + "-" + data.id,
            type: -1,
            source: this.addFlowInfo.startNode.id,
            target: data.id 
          };

          this.dataSet.addElement(flowLineItem);
          this.addFlowInfo.startNode = null;
        }
      }else{
        this.addFlowInfo.startNode = data;
      }
    }
  }

  attachStandardDatasetEvent() {
    this.dataSetBasic.eventProxy.on(EVENTS.DATASET_ADD_ELEMENT, function(item) {
      if(item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE && item.config.type === TYPE.NodeType.NODE_TYPE_DIAMOND){
        var newNode = {};
        $.extend(true, newNode, item.config);
        var source = {
          nodes: [newNode],
          links: []
        };
        var data = this.layoutCtrl._splitRelationContent(source);
        data.nodes.forEach(function(node){
          var element = new ElementGen(node);
          this.dataSetFlow.elements.push(element);    
        }.bind(this));
      }
    }.bind(this));
    this.dataSetBasic.eventProxy.on(EVENTS.DATASET_REMOVE_ELEMENT, function(item) {
      if(item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE){
        var removeNodes = this.dataSetFlow.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE).filter(function(node){
          return node.config.mergeDiamondId === item.config.id;
        });       
        removeNodes.forEach(function(removeNode){
          this.dataSetFlow.removeNode(removeNode.config.id);
        }.bind(this));        
      }
    }.bind(this));
    this.dataSetFlow.eventProxy.on(EVENTS.DATASET_ADD_ELEMENT, function(item) {
      if(item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE && item.config.type === TYPE.NodeType.NODE_TYPE_DIAMOND){
        if(item.config.mergeDiamondId){
          var _mergeDiamondNode = this.dataSetBasic.findNode(item.config.mergeDiamondId);
          if(_mergeDiamondNode){
            if(_mergeDiamondNode.config.content && !_mergeDiamondNode.hasContent(item.config.content[0].code)){
              var addContent = {};
              $.extend(true, addContent, item.config.content[0]);
              _mergeDiamondNode.config.content.push(addContent);              
            }
          }else{
            var newNode = {};
            $.extend(true, newNode, item.config);
            newNode.id = item.config.mergeDiamondId;
            var element = new ElementGen(newNode);
            this.dataSetBasic.elements.push(element);             
          }
        }
      }
    }.bind(this));
    this.dataSetFlow.eventProxy.on(EVENTS.DATASET_REMOVE_ELEMENT, function(item) {
      if(item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE){
        if(item.config.mergeDiamondId){
          var _node = this.dataSetBasic.findNode(item.config.mergeDiamondId);
          if(_node && _node.config.content){
            _node.config.content.forEach(function(content,index){
              if(content.code === item.config.id){
                if(_node.config.content.length > 1){
                  _node.config.content.splice(index, 1);
                }else{
                  this.dataSetBasic.removeNode(item.config.mergeDiamondId);
                }             
              }
            }.bind(this));
          }
        }    
      }
    }.bind(this));    
  }

  saveCanvas() {
    return this.layoutCtrl.saveStandardCanvas(this.dataSetBasic,this.dataSetFlow);
  }    
}
