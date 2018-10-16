"use strict";

var BaseLayout = require("./BaseLayout");
var EVENTS = require("../events");
let TYPE = require("../element/type");
var ElementGen = require("../element/elementGen");
let LayoutCtrl = require("../LayoutCtrl");

export default class Layout extends BaseLayout {
  constructor(option) {
    super(option);

    this.dataSource = null;
    this.layoutCtrl = new LayoutCtrl();
    this.annularGroup = this.addLayoutGroup("annulargroup", "annulargroup");
  }

  draw(dataSource) {
    this.dataSource = dataSource;
    this.layoutCtrl.initLayoutCtrl(dataSource, false);

    this.dataSet = this.layoutCtrl.dataSet;
    if (this.dataSet != null) {
      this.update();
      this.dataSet.setLayout(this.onlyKey, this);
      this.attachDatasetEvent(this.dataSet);
    }
  }

  initResolveDataset() {
    throw "This interface is not overloaded";
  }

  addFlowToLayout(data) {
    throw "This interface is not overloaded";
  }

  addTopicLineToLayout(node) {
    throw "This interface is not overloaded";
  }

  update() {
    this.empty();

    if (this.isAutoLayout) {
      this.autoLayout();
    }

    var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var links = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);

    this._addElementToLayout(links);
    this._addElementToLayout(nodes);

    var configs = [];
    var nodeConfigs = nodes.map(function(item) {
      return item.config;
    });
    var linkConfigs = links.map(function(item) {
      return item.config;
    });
    configs = configs.concat(nodeConfigs);
    configs = configs.concat(linkConfigs);

    this._attachElementEvent(configs);
  }

  updateNodePosition(nodeId) {
    var node = this.dataSet.findElement(nodeId);
    if (node) { //&& !node.isPieOpen
      node.updatePosition();
      var links = this.dataSet.neighborEdge(nodeId);
      if (links && links.length > 0) {
        links.forEach(function(link) {
          link.updatePosition(nodeId, node.config.x, node.config.y);
        })
      }
    }
  }

  _attachElementEvent(Configs) {
    Configs.forEach(function(config) {
      var _object = this.dataSet.findElement(config.id)
      if (_object) {
        if (_object.type === TYPE.ElementType.ELEMENT_TYPE_NODE) {
          _object.removeAllListeners();

          _object.on(EVENTS.EXPLORE_NODE, function(data) {
            this.exploreNodes(data);
          }.bind(this));
          _object.on(EVENTS.UNEXPLORE_NODE, function(data) {
            this.unExploreNodes([data]);
          }.bind(this));
          _object.on(EVENTS.ADD_ANNULAR, function(data) {
            this.addAnnular(data);
          }.bind(this));
          _object.on(EVENTS.REMOVE_ANNULAR, this.removeAnnular.bind(this));
          _object.on(EVENTS.FOCUS_NODE, function(data) {
            this.focus(data[0]);
          }.bind(this));
          _object.on(EVENTS.UNFOCUS_NODE, function(data) {
            this.unFocus(data[0]);
          }.bind(this));
          _object.on(EVENTS.SELECT_NODE, function(data) {
            this.emitEvent(EVENTS.SELECT_NODE, data);
          }.bind(this));
          _object.on(EVENTS.SELECT_EROBJECT, function(data) {
            this.emitEvent(EVENTS.SELECT_EROBJECT, data);
          }.bind(this));
          _object.on(EVENTS.UNSELECT_NODE, function(data) {
            this.emitEvent(EVENTS.UNSELECT_NODE, data);
          }.bind(this));
          _object.on(EVENTS.SHOW_DETAILCIRCLE, function(data) {
            this.addDetailCircle(data);
          }.bind(this));
          _object.on(EVENTS.REMOVE_DOMAINDETIAL, this.removeDomainDetial.bind(this));
          _object.on(EVENTS.SHOW_CXTMENU, function(data) {
            this.emitEvent(EVENTS.SHOW_CXTMENU, data);
          }.bind(this));
          _object.on(EVENTS.SHOW_NODE_TOOLTIPS, function(data) {
            this.emitEvent(EVENTS.SHOW_NODE_TOOLTIPS, data);
          }.bind(this));
          _object.on(EVENTS.HIDE_NODE_TOOLTIPS, function(data) {
            this.emitEvent(EVENTS.HIDE_NODE_TOOLTIPS, data);
          }.bind(this));
          _object.on(EVENTS.TOPIC_NODE_CLICK, function(data) {
            this.addTopicLineToLayout(data);
          }.bind(this));
          _object.on(EVENTS.ADD_FLOWLINE, function(data) {
            this.addFlowToLayout(data);
          }.bind(this));
        } else if (_object.type === TYPE.ElementType.ELEMENT_TYPE_EDGE) {
          _object.removeAllListeners();
          _object.on(EVENTS.SHOW_CXTMENU, function(data) {
            this.emitEvent(EVENTS.SHOW_CXTMENU, data);
          }.bind(this));
        }
      }
    }.bind(this));
  }

  removeItem(id) {
    this.dataSet.removeNode(id);
  }

  removeRelatedItem(id) {
    this.dataSet.CollapseLink(id);
  }

  _addItemsToLayout(data) {
    this.addItems(data.nodes);
    this.addItems(data.links);
  }

  _addElementToLayout(items) {
    super._addElementToLayout(items);

    var configs = items.map(function(item) {
      return item.config;
    });

    this._attachElementEvent(configs);
  }

  addAnnular(data) {
    this.removeAnnular();

    data.data.forEach(function(item, index) {
      item.elementType = TYPE.ElementType.ELEMENT_TYPE_NODE;
      item.type = 4;
      item.id = "annular_" + item.id;
      item.index = index;
      var annular = new ElementGen(item);
      annular.active();
      this.addElementToGroup(annular, "annulargroup");
      //this.addElementToGroup(data.nodeMess, "annulargroup");

      annular.removeAllListeners();
      annular.on(EVENTS.ADD_CHILDANNULAR, function(data) {
        this.annularGroup.group.selectAll(".child-annular").remove();
        this.eventProxy.emitEvent(EVENTS.HIDE_MULTIPILE_DROPDOWN);
        this.addChildAnnularToLayout(data);
      }.bind(this));

      annular.on(EVENTS.SHOW_DETAILENTITY, function(data) {
        this.eventProxy.emitEvent(EVENTS.SHOW_DETAILENTITY, [data]);
      }.bind(this));

      this.addObjectToGroup(data.close, item.centerNodeId, "annulargroup");
    }.bind(this));
  }

  addChildAnnularToLayout(data) {
    data.forEach(function(item, index) {
      item.elementType = TYPE.ElementType.ELEMENT_TYPE_NODE;
      item.type = 4;
      item.id = "annular_" + item.id;
      item.index = index;
      item.isChildAnnular = true;
      var annular = new ElementGen(item);
      annular.active();

      this.addElementToGroup(annular, "annulargroup").attr("class", "child-annular");

      annular.removeAllListeners();
      annular.on(EVENTS.SHOW_DETAILENTITY, function(data) {
        this.eventProxy.emitEvent(EVENTS.SHOW_DETAILENTITY, [data]);
      }.bind(this));
      annular.on(EVENTS.SHOW_MULTIPILE_DROPDOWN, function(data) {
        this.eventProxy.emitEvent(EVENTS.SHOW_MULTIPILE_DROPDOWN, [data]);
      }.bind(this));
    }.bind(this));
  }

  removeAnnular() {
    this.annularGroup.data.forEach((item) => {
      var node = this.dataSet.findNode(item.config.centerNodeId);
      if (node) {
        node.isPieOpen = false;
      }
    });

    this.emptyLayoutGroup("annulargroup");
    this.eventProxy.emitEvent(EVENTS.HIDE_DETAILENTITY);
  }

  addDetailCircle(data) {
    let result = {
      nodes: [],
      links: []
    };

    data.nodes.forEach(function(item, index) {
      item.id = "diamondDetail_" + item.content[0].code;
      item.elementType = TYPE.ElementType.ELEMENT_TYPE_NODE;
      result.nodes.push(item);
      result.links.push({
        id: data.nodeId + "-" + item.id,
        elementType: TYPE.ElementType.ELEMENT_TYPE_EDGE,
        source: data.nodeId,
        target: item.id,
        type: 1
      });

      this._addItemsToLayout(result);
    }.bind(this));
  }

  removeDomainDetial(ids) {
    ids.forEach(function(id) {
      this.dataSet.removeNode(id);
    }.bind(this));
  }

  exploreNodes(node) {
    let _node = this.dataSet.findNode(node.id);

    if (node.hasExplore) {
      var exploreLinks = [];
      this.dataSet.findNodes(node.exploreNodeIds).forEach(function(item) {
        if (item) {
          item.show();
          exploreLinks = exploreLinks.concat(this.dataSet.neighborEdge(item.config.id));
        }
      }.bind(this));

      exploreLinks.forEach(function(item) {
        item.show();
      });
      _node.afterExplore();
    } else {
      let recType = _.get(_node, "config.content[0].recType");

      let promise = null;
      if (recType === 2 || recType === 3) {
        promise = this.layoutCtrl.recommendExplore(_node);
      } else {
        promise = this.layoutCtrl.ordinaryExplore(_node);
      }

      promise.then((data) => {
        let result = {
          nodes: [],
          links: []
        };

        let num = data.vertexs.length;
        let R = 65 + _node.config.width / 2;
        let radius = 360 / num;
        for (let i = 0; i < num; i++) {
          let x = _node.config.x + Math.cos(i * radius / 180 * Math.PI) * R;
          let y = _node.config.y + Math.sin(i * radius / 180 * Math.PI) * R;
          result.nodes.push($.extend({}, data.vertexs[i], {
            x: x,
            y: y,
            width: 60,
            height: 40,
            id: data.vertexs[i].identifier,
            type: parseInt(data.vertexs[i].type),
            elementType: TYPE.ElementType.ELEMENT_TYPE_NODE
          }));
        }

        data.edges.forEach(function(item) {
          result.links.push({
            id: item.identifier,
            elementType: TYPE.ElementType.ELEMENT_TYPE_EDGE,
            type: item.type,
            source: item.vertexs[0],
            target: item.vertexs[1]
          });
        });

        this._addItemsToLayout(result);
        var exploreData = this.dataSet.getFirstLevelElement(node.id);
        exploreData.nodes = exploreData.nodes.map(function(item) {
          return item.config;
        });
        _node.afterExplore(exploreData);
      });
    }
  }

  unExploreNodes(ids) {
    ids.forEach(function(id) {
      var exploreData = this.dataSet.getFirstLevelElement(id);
      this.dataSet.findNode(id).isExplored = false;
      exploreData.nodes.forEach(function(node) {
        var _node = this.dataSet.findNode(node.config.id);
        if (_node) {
          if (node.config.type === TYPE.NodeType.NODE_TYPE_DIAMOND) {
            var _domainDetialIds = this.dataSet.neighborNode(node.config.id).filter(function(item) {
              return item.config.type === TYPE.NodeType.NODE_TYPE_ELLIPSE;
            }).map(function(domainItem) {
              return domainItem.config.id;
            });

            this.removeDomainDetial(_domainDetialIds);
            _node.isShowDetailCircle = false;
          }

          _node.isExplored = false;
          _node.hide();
        }
      }.bind(this));

      exploreData.links.forEach(function(link) {
        var _link = this.dataSet.findEdge(link.config.id);
        _link && _link.hide();
      }.bind(this));
    }.bind(this));
  }

  focus(id) {
    var element = this.dataSet.findElement(id);
    if (element) {
      element.highlight();
      if (element.type === TYPE.ElementType.ELEMENT_TYPE_NODE) {
        var neighborElement = this.dataSet.neighborElements(id);
        neighborElement.forEach(function(item) {
          item && item.highlight();
        }.bind(this));
      }
    }
  }

  unFocus(id) {
    var element = this.dataSet.findElement(id);
    if (element) {
      element.unHighlight();
      if (element.type === TYPE.ElementType.ELEMENT_TYPE_NODE) {
        var neighborElement = this.dataSet.neighborElements(id);
        neighborElement.forEach(function(item) {
          item && item.unHighlight();
        }.bind(this));
      }
    }
  }

  changeBGColor(nodeId, color) {
    var _node = this.dataSet.findNode(nodeId);
    if (_node) {
      _node.changeColor(color);
    }
  }

  changeNodeImg(nodeId, imgUrl) {
    var _node = this.dataSet.findNode(nodeId);
    if (_node) {
      _node.changeNodeImg(imgUrl);
    }
  }

  updateContent(nodeId, text) {
    var _node = this.dataSet.findNode(nodeId);
    if (_node) {
      _node.updateContent(text);
    }
  }

  saveCanvas() {
    return this.layoutCtrl.saveCanvas();
  }
}