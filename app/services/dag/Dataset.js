"use strict";

var EventEmitter = require("wolfy87-eventemitter");
var ElementGen = require("./element/elementGen");
var EVENTS = require("./events");
var TYPE = require("./element/type");

export default class Dataset {
  constructor(option) {
    this.canvasId = option.canvasId;
    this.modifiedVersion = option.modifiedVersion;
    this.layout = {};
    this.elements = [];
    this.eventProxy = new EventEmitter();
  }

  setLayout(key, value) {
    this.layout[key] = value;
  }

  addElement(config) {
    if (this.isElementExist(config.id)) {
      var _element = this.findElement(config.id);

      if (config.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE && config.type === TYPE.NodeType.NODE_TYPE_DIAMOND) {
        config.content.forEach(function(item) {
          if (_element.config.content && !_element.hasContent(item.code)) {
            var addContent = {};
            $.extend(true, addContent, item);
            _element.config.content.push(addContent);
          }
        });

        //_element.updateContent(null);
      }
      return _element;
    }

    if (config.elementType === TYPE.ElementType.ELEMENT_TYPE_EDGE) {
      var sourceNode = this.findElement(config.source);
      var targetNode = this.findElement(config.target);
      if (sourceNode === undefined || targetNode === undefined) {
        return;
      }
      config.source = sourceNode.config;
      config.target = targetNode.config;
    }

    var element = new ElementGen(config);
    this.elements.push(element);
    this.eventProxy.emitEvent(EVENTS.DATASET_ADD_ELEMENT, [element]);
    return element;
  }

  addElements(data) {
    var result = [];
    data.forEach(function(item) {
      var addElement = this.addElement(item);
      result.push(addElement);
    }.bind(this));
    return result;
  }

  removeElement(id) {
    if (this.isElementExist(id)) {
      this.elements.forEach(function(item, index) {
        if (item.config.id === id) {
          var element = this.elements.splice(index, 1);
          this.eventProxy.emitEvent(EVENTS.DATASET_REMOVE_ELEMENT, [item]);
          return element;
        }
      }.bind(this));
    }

    return undefined;
  }

  removeElements(ids) {
    var result = [];
    ids.forEach(function(id) {
      var removeElement = this.removeElement(id);
      result.push(removeElement);
    }.bind(this));

    return result;
  }

  findElement(id) {
    var element = this.elements.filter(function(item) {
      return item.config.id === id;
    });

    if (element && element.length > 0) {
      return element[0];
    }
    return undefined;
  }

  findElements(ids) {
    var result = [];
    ids.forEach(function(id) {
      var element = this.findElement(id);
      result.push(element);
    }.bind(this));
    return result;
  }

  findElementByCode(code) {
    var nodes = this.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var element = nodes.filter(function(item) {
      return item.config.content[0].code === code;
    });

    if (element && element.length > 0) {
      return element[0];
    }
    return undefined;
  }
  getElementsByType(type) {
    var result = this.elements.filter(function(item) {
      return item.type === type;
    });

    return result;
  }

  isElementExist(id) {
    var element = this.findElement(id);
    if (element) {
      return true;
    }

    return false;
  }

  neighborElements(id) {
    throw "This interface is not overloaded";
  }

  clear() {
    this.eventProxy.removeAllListeners();
    this.layout = {};
    this.modifiedVersion = null;
    this.elements = [];
  }
}
