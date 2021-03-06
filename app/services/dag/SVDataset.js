"use strict";

var _ = require("lodash");
var Dataset = require("./Dataset");
let TYPE = require("./element/type");
var HttpRequest = require("../../httpCenter/request");

export default class SVDataset extends Dataset {
  constructor(option) {
    super(option);
  }

  addElement(config) {
    config.requestTag = function(objectId,objectType) {
      return HttpRequest.getTag({ id: objectId,type: objectType});
    };

    return super.addElement(config);
  }

  findNode(id) {
    return this.findNodes([id])[0];
  }

  findNodes(ids) {
    var result = [];
    ids.forEach(function(id) {
      var node = this._findOrdinaryNodes(id);
      if (node !== undefined) {
        result.push(node);
      }
    }.bind(this));

    return result;
  }

  findEdge(id) {
    return this.findEdges([id])[0];
  }

  findEdges(ids) {
    var result = [];
    ids.forEach(function(id) {
      var link = this.elements.filter(function(item) {
        return item.config.id === id;
      });

      result = result.concat(link);
    }.bind(this));

    result = _.uniqBy(result, "config.id");
    return result;
  }

  neighborNode(id) {
    var nodeIds = [];
    var _links = this.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);
    if (_links) {
      _links.forEach(function(item) {
        if (item.config.target.id === id) {
          nodeIds.push(item.config.source.id);
        } else if (item.config.source.id === id) {
          nodeIds.push(item.config.target.id);
        }
      }.bind(this));
    }

    nodeIds = _.uniq(nodeIds);
    return this.findNodes(nodeIds);
  }

  neighborEdge(id) {
    var _links = this.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);
    return _links.filter(function(item) {
      return item.config.source.id === id || item.config.target.id === id;
    });
  }

  neighborElements(id) {
    var result = [];
    result = result.concat(this.neighborNode(id));
    result = result.concat(this.neighborEdge(id));
    return result;
  }

  getFirstLevelElement(nodeId) {
    var result = {
      nodes: [],
      links: []
    };

    var _node = this.findNode(nodeId);
    if (_node) {
      var neighborNode = this.neighborNode(nodeId).filter(function(item) {
        return item.config.type === TYPE.NodeType.NODE_TYPE_DIAMOND || item.config.type === TYPE.NodeType.NODE_TYPE_RECT;
      });
      //var neighborLink = this.neighborEdge(nodeId);

      result.nodes = result.nodes.concat(neighborNode);
      //result.links = result.links.concat(neighborLink);

      neighborNode.forEach(function(item) {
        var links = this.neighborEdge(item.config.id);
        result.links = result.links.concat(links);
      }.bind(this));

      result.nodes = _.uniqBy(result.nodes, "config.id");
      result.links = _.uniqBy(result.links, "config.id");
    }

    return result;
  }

  removeNode(id) {
    var _node = this.findNode(id);
    if (_node) {
      var removeNodes = [];
      removeNodes.push(_node);

      var neighborNodes = this.neighborNode(id);
      var removeNeighborNode = neighborNodes.filter(function(item) {
        return item.config.type === TYPE.NodeType.NODE_TYPE_ELLIPSE;
      });
      var unRemoveNeighborNode = neighborNodes.filter(function(item) {
        return item.config.type !== TYPE.NodeType.NODE_TYPE_ELLIPSE;
      });
      removeNodes = removeNodes.concat(removeNeighborNode);
      removeNodes = _.uniqBy(removeNodes, "config.id");

      var removeLinks = [];
      removeNodes.forEach(function(item) {
        removeLinks = removeLinks.concat(this.neighborEdge(item.config.id));
      }.bind(this));
      removeLinks = _.uniqBy(removeLinks, "config.id");

      var removeIds = removeNodes.map(function(item) {
        return item.config.id;
      });
      removeIds = removeIds.concat(removeLinks.map(function(item) {
        return item.config.id;
      }));

      unRemoveNeighborNode.forEach(function(item) {
        item.hasExplore = false;
        item.setUnExploreBtn();
        item.exploreNodeIds = [];
      });

      this.removeElements(removeIds);
    }
  }

  CollapseLink(id) {
    var removeNodes = [];
    var _node = this.findNode(id);
    if (_node) {
      removeNodes.push(_node);

      var neighborNode = this.neighborNode(id);

      var removeNeighborNode = neighborNode.filter(function(item) {
        return item.config.type === TYPE.NodeType.NODE_TYPE_DIAMOND && item.config.type !== _node.config.type;
      });

      removeNodes = removeNodes.concat(removeNeighborNode);

      removeNodes = _.uniqBy(removeNodes, "config.id");
      removeNodes.forEach(function(item) {
        this.removeNode(item.config.id);
      }.bind(this));
    }
  }

  CollapseLinks(ids) {
    ids.forEach(function(id) {
      this.CollapseLink(id);
    }.bind(this));
  }

  removeEdge(id) {
    this.removeElement(id);
  }

  removeEdges(ids) {
    this.removeElements(ids);
  }

  _findOrdinaryNodes(id) {
    var node = this.elements.filter(function(item) {
      return item.config.id === id;
    })
    return node.length > 0 ? node[0] : undefined;
  }
}
