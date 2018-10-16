"use strict";

var d3 = require("d3");
var EventEmitter = require("wolfy87-eventemitter");
var webCola = require("../cola");
var EVENTS = require("../events");
var TYPE = require("../element/type");

export default class BaseLayout {
  constructor(option) {
    this.onlyKey = null;
    this.svg = option.svg;
    this.width = option.width;
    this.height = option.height;
    this.linkLength = option.linkLength || 180;
    this.isAutoLayout = false;
    this.color = null;
    this.cola = null;
    this.dataSet = null;
    this.features = [];
    this.zoomgroup = null;
    this.elementGroup = null;
    this.edgeGroup = null;
    this.nodeGroup = null;
    this.userDefineGroup = {};

    this.eventProxy = new EventEmitter();
    this._initLayout();
  }

  _initLayout() {
    var self = this;
    this.onlyKey = "Layout_" + this._Layoutguid();
    this.color = d3.scale.category20();
    this.cola = webCola.d3adaptor()
      .linkDistance(self.linkLength)
      .avoidOverlaps(true)
      .size([self.width, self.height]);
    this.svg = this.svg || d3.select("svg");
    this.zoomgroup = this.svg.select(".zoom-container")
      .attr("width", this.width)
      .attr("height", this.height);

    this.elementGroup = this.zoomgroup.append("g").attr("class", "elementgroup");
    this.edgeGroup = this.zoomgroup.append("g").attr("class", "edgegroup");
    this.nodeGroup = this.zoomgroup.append("g").attr("class", "nodegroup");

    this.svg
      .on("dblclick.zoom", null)
      .call(d3.behavior.zoom().on("zoom", this._rescale.bind(this)));

    this.eventProxy.removeAllListeners();
  }

  _Layoutguid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  draw(dataSource) {
    throw "This interface is not overloaded";
  }

  update() {
    this.empty();

    if (this.isAutoLayout) {
      this.autoLayout();
    }

    this._addElementToLayout(this.dataSet.elements);
  }

  _rescale() {
    let scale = d3.event.scale;
    let trans = d3.event.translate;
    this.trans = trans;
    this.scale = scale;
    this.zoomgroup.attr("transform", "translate(" + trans + ")" + " scale(" + scale + ")");
  }

  autoLayout() {
    var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE).map(function(item) {
      return item.config;
    });
    var links = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE).map(function(item) {
      return item.config;
    });
    //this.zoomgroup.attr("transform", "translate(" + this.trans + ")" + " scale(1)");
    this.cola
      .nodes(nodes)
      .links(links)
      .start();
    this.cola.on("tick", null);
    this.cola.on("tick", function() {
      this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE).forEach(function(item) {
        item.updatePosition();
      });

      this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE).forEach(function(item) {
        item.updatePosition();
      });

    }.bind(this));
  }

  addItem(item) {
    return this.dataSet.addElement(item);
  }

  addItems(items) {
    return this.dataSet.addElements(items);
  }

  removeItem(id) {
    return this.dataSet.removeElement(id);
  }

  removeItems(ids) {
    return this.dataSet.removeElements(ids);
  }

  _addElementToLayout(items) {
    var self = this;

    var linkDatas = items.filter(function(item) {
      return item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_EDGE;
    }).map(function(link) {
      return link.config;
    });

    var nodeDatas = items.filter(function(item) {
      return item.config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE;
    }).map(function(node) {
      return node.config;
    });

    var _addLink = this.edgeGroup.selectAll(".element")
      .data(linkDatas)
      .enter()
      .append(function(itemConfig) {
        var link = this.dataSet.findElement(itemConfig.id);
        link.active();
        return link.element;
      }.bind(this));

    var drag = d3.behavior.drag()
      .origin(function(d) {
        return d;
      })
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);

    var _addNode = this.nodeGroup.selectAll(".element")
      .data(nodeDatas)
      .enter()
      .append(function(itemConfig) {
        var node = this.dataSet.findElement(itemConfig.id);
        node.active();
        return node.element;
      }.bind(this))
      .call(drag);

    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
    }

    function dragged(d) {
      var element = self.dataSet.findElement(d.id);
      if (element && element.type === TYPE.ElementType.ELEMENT_TYPE_NODE) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        self.updateNodePosition(d.id);
      }
    }

    function dragended(d) {}
  }

  _removeElementFromLayout(items) {
    items.forEach(function(item) {
      this.nodeGroup.selectAll("#element-" + item.config.id).remove();
      this.edgeGroup.selectAll("#element-" + item.config.id).remove();
      this.elementGroup.selectAll("#element-" + item.config.id).remove();

      for (var groupName in this.userDefineGroup) {
        this.removeElementFromGroup(item.config.id, groupName);
      }
    }.bind(this));
  }

  updateNodePosition(nodeId) {
    var node = this.dataSet.findElement(nodeId);
    if (node) {
      node.updatePosition();
    }
  }

  focus(id) {
    var element = this.dataSet.findElement(id);
    element && element.highlight();
  }

  unFocus(id) {
    var element = this.dataSet.findElement(id);
    element && element.unHighlight();
  }

  addLayoutGroup(groupName, className) {
    var obj = this.userDefineGroup[groupName];
    if (!obj) {
      var layoutGroup = this.zoomgroup.append("g").attr("class", className);

      var data = {
        data: [],
        group: layoutGroup
      };

      this.userDefineGroup[groupName] = data;
    }
    return this.userDefineGroup[groupName];
  }

  addElementToGroup(element, groupName) {
    var layoutGroup = this.userDefineGroup[groupName];
    if (layoutGroup) {
      layoutGroup.data.push(element);
      return layoutGroup.group.append(function() {
        return element.element;
      });
    }

    return null;
  }

  addObjectToGroup(object, objectId, groupName) {
    var layoutGroup = this.userDefineGroup[groupName];

    if (layoutGroup) {
      return layoutGroup.group.append(function() {
        return object;
      }).attr("id", "object-" + objectId);
    }

    return null;
  }

  removeObjectFromGroup(objectId, groupName) {
    var layoutGroup = this.userDefineGroup[groupName];

    if (layoutGroup) {
      layoutGroup.group.selectAll("#object-" + objectId).remove();
    }
  }

  removeElementFromGroup(elementId, groupName) {
    var layoutGroup = this.userDefineGroup[groupName];

    if (layoutGroup) {
      layoutGroup.group.selectAll("#element-" + elementId).remove();
      layoutGroup.data.forEach(function(item, index) {
        if (item.config.id === elementId) {
          layoutGroup.data.splice(index, 1);
        }
      }.bind(this));
    }
  }

  emptyLayoutGroup(groupName) {
    var layoutGroup = this.userDefineGroup[groupName];
    if (layoutGroup) {
      layoutGroup.group.selectAll("*").remove();
      layoutGroup.data = [];
      layoutGroup.objectDom = [];
    }
  }

  attachDatasetEvent(dataSet) {
    dataSet.eventProxy.on(EVENTS.DATASET_ADD_ELEMENT, function(item) {
      this._addElementToLayout([item]);
    }.bind(this));
    dataSet.eventProxy.on(EVENTS.DATASET_REMOVE_ELEMENT, function(item) {
      this._removeElementFromLayout([item]);
    }.bind(this));
  }

  attachElementEvent(elements) {
    throw "This interface is not overloaded";
  }

  emitEvent(evt, data) {
    this.eventProxy.emitEvent(evt, [data]);
  }

  empty() {
    this.edgeGroup.selectAll("*").remove();
    this.nodeGroup.selectAll("*").remove();
    this.elementGroup.selectAll("*").remove();
  }

  setSize(width, height) {
    this.svg
      .attr("width", width)
      .attr("height", height);
    this.width = width;
    this.height = height;
  }

  saveCanvas() {
    throw "This interface is not overloaded";
  }

  destroy() {
    this.empty();
    this.eventProxy.removeAllListeners();
  }
}