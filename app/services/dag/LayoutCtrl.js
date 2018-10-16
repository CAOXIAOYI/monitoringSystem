"use strict";

let SVDataset = require("./SVDataset");
var TYPE = require("./element/type");
var HttpRequest = require("../../httpCenter/request");

export default class LayoutCtrl {
  constructor() {
    this.canvasId = null;
    this.modifiedVersion = null;
    this.nodes = [];
    this.links = [];
    this.isSplitRelation = false;
    this.isReCalcSplitLocation = false;
    this.dataSet = null;
    this.viewType = TYPE.viewType.TYPE_BASIC;
  }

  initLayoutCtrl(data, isSplitRelation) {
    this.clear();
    this.canvasId = data.id;
    this.modifiedVersion = data.modifiedVersion;
    this.isSplitRelation = isSplitRelation;

    this.dataSet = this.genDataSet(data, isSplitRelation);
  }

  genDataSet(data, isSplitRelation) {
    var dataSet = new SVDataset({
      canvasId: data.id,
      modifiedVersion: data.modifiedVersion
    });

    var result = this._resolveInitData(data, isSplitRelation);
    dataSet.addElements(result.nodes);
    dataSet.addElements(result.links);
    return dataSet;
  }

  _resolveInitData(data, isSplitRelation) {
    !data.vertexs && (data.vertexs = []);
    !data.edges && (data.edges = []);

    var nodes = [];
    var links = [];

    data.vertexs.forEach(function(item) {
      var obj = {};
      obj.id = item.identifier;
      obj.detectable = item.detectable;
      obj.elementType = TYPE.ElementType.ELEMENT_TYPE_NODE;
      obj.type = parseInt(item.type);
      obj.critical = item.critical;
      if (item.position1) {
        obj.x = parseFloat(item.position1[0]);
        obj.y = parseFloat(item.position1[1]);
      }
      obj.width = 60;
      obj.height = 40;
      obj.content = [];
      obj.isSelected = false;
      if (item.content) {
        item.content.forEach(function(contentItem, index) {
          var content = {};
          $.extend(true, content, contentItem);
          content.x = undefined;
          content.y = undefined;
          if (item.position2 && item.position2.length > index && item.position2[index]) {
            content.x = parseFloat(item.position2[index][0]);
            content.y = parseFloat(item.position2[index][1]);
          }
          obj.content.push(content);
        });
      }

      nodes.push(obj);
    }.bind(this));

    data.edges.forEach(function(item) {
      links.push({
        id: item.identifier,
        elementType: TYPE.ElementType.ELEMENT_TYPE_EDGE,
        type: parseInt(item.type),
        source: item.vertexs[0],
        target: item.vertexs[1]
      });
    }.bind(this));

    var initData = {
      nodes: nodes,
      links: links
    };

    var result = isSplitRelation ? this._splitRelationContent(initData) : initData;
    return this.filterDataByViewType(result);
  }

  _resolveDragData(selectEle, data) {
    var initData = {
      nodes: [],
      links: []
    }

    var vertexs = data.vertexs || [];
    var _nodes = vertexs.filter(function(item) {
      for (var i = 0; i < item.content.length; i++) {
        if (item.content[i].code === selectEle.id) {
          initData.nodes.push({
            id: item.identifier,
            x: selectEle.x,
            y: selectEle.y,
            width: 60,
            height: 40,
            content: item.content,
            detectable: item.detectable,
            elementType: 1,
            type: parseInt(item.type),
            critical: item.critical,
            isShowTip: item.isShowTip
          });
          return false;
        }
      }
      return true;
    });
    var centerX = selectEle.x;
    var centerY = selectEle.y;
    var R = 120;
    var radus = 360 / _nodes.length;
    for (var i = 0; i < _nodes.length; i++) {
      var posX = centerX + Math.cos(i * radus / 180 * Math.PI) * R;
      var posY = centerY + Math.sin(i * radus / 180 * Math.PI) * R;

      initData.nodes.push({
        id: _nodes[i].identifier,
        x: posX,
        y: posY,
        content: _nodes[i].content,
        detectable: _nodes[i].detectable,
        elementType: 1,
        isSelected: false,
        type: parseInt(_nodes[i].type),
        isShowTip: _nodes[i].isShowTip
      })
    }

    var edges = data.edges || [];
    edges.forEach(function(item) {
      initData.links.push({
        id: item.identifier,
        elementType: 2,
        type: parseInt(item.type),
        source: item.vertexs[0],
        target: item.vertexs[1]
      });
    });
    var result = this.isSplitRelation ? this._splitRelationContent(initData) : initData;
    return this.filterDataByViewType(result);
  }

  filterDataByViewType(data) {
    var result = {
      nodes: [],
      links: []
    };

    if (this.viewType === TYPE.viewType.TYPE_FLOW) {
      result.nodes = data.nodes.filter(function(item) {
        return item.type === TYPE.NodeType.NODE_TYPE_DIAMOND;
      });
      result.links = data.links.filter(function(item) {
        return item.type === TYPE.EdgeType.EDGE_TYPE_FLOW;
      });
    } else {
      result.nodes = result.nodes.concat(data.nodes);
      result.links = data.links.filter(function(item) {
        return item.type !== TYPE.EdgeType.EDGE_TYPE_FLOW;
      });
    }

    return result;
  }

  _splitRelationContent(data) {
    var source = {
      nodes: data.nodes,
      links: data.links
    };

    function findLinks(nodeId) {
      return source.links.filter(function(item) {
        return item.source === nodeId || item.target === nodeId;
      });
    }

    var _nodes = [];
    var _links = [];
    source.nodes.forEach(function(node) {
      var relationLinks = findLinks(node.id);

      if (node.type === TYPE.NodeType.NODE_TYPE_DIAMOND) {
        node.content.forEach(function(nodeItem, index) {
          var flowLinks = findLinks(nodeItem.code);
          var newNode = {};
          $.extend(true, newNode, node);
          newNode.id = nodeItem.code;
          newNode.content = [nodeItem];
          newNode.content[0].domainType = node.type;
          newNode.mergeDiamondId = node.id;
          if (this.isReCalcSplitLocation) {
            newNode.x = node.x;
            newNode.y = node.y + 70 * index;
          } else {
            newNode.x = nodeItem.x === undefined ? node.x : nodeItem.x;
            newNode.y = nodeItem.y === undefined ? (node.y + 70 * index) : nodeItem.y;
          }
          _nodes.push(newNode);

          var newLinks = [];
          $.extend(true, newLinks, relationLinks);
          newLinks = newLinks.map(function(linkItem) {
            var newLink = {
              type: linkItem.type,
              source: linkItem.source,
              target: linkItem.target,
              elementType: TYPE.ElementType.ELEMENT_TYPE_EDGE
            };
            if (linkItem.source === node.id) {
              newLink.source = newNode.id;
            } else if (linkItem.target === node.id) {
              newLink.target = newNode.id;
            }
            newLink.id = newLink.source + "-" + newLink.target;
            return newLink;
          });

          _links = _links.concat(newLinks);
          _links = _links.concat(flowLinks);
        }.bind(this));
      } else {
        _nodes.push(node);
        _links = _links.concat(relationLinks);
      }
    }.bind(this));

    var result = {
      nodes: _nodes,
      links: _links
    };

    return result;
  }

  _genData(data) {
    var addNodes = data.nodes.map(function(item) {
      var node = this.findNode(item.id);
      if (node) {
        return node;
      } else {
        node = new elementGen(item);
        node.active();
        return node;
      }
    }.bind(this));
    this.nodes = this.nodes.concat(addNodes);
    this.nodes = _.uniqBy(this.nodes, "config.id");

    var addLinks = data.links.map(function(item) {
      var link = this.findLink(item.id);
      if (link) {
        return link;
      } else {
        item.source = this.findNode(item.source).config;
        item.target = this.findNode(item.target).config;
        var edge = new elementGen(item);
        edge.active();
        return edge;
      }
    }.bind(this));
    this.links = this.links.concat(addLinks);
    this.links = _.uniqBy(this.links, "config.id");

    this.links.forEach(function(item) {
      var sourceNode = this.findNode(item.config.source.id);
      var targetNode = this.findNode(item.config.target.id);
    }.bind(this));
  }

  addData(data) {
    var selectEle = data.nodes.length !== 0 ? data.nodes[0] : data.links[0];

    let allLinks = [];
    let allEntities = [];
    let isRepeat = false;

    var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var links = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);
    nodes.forEach((node) => {
      node.config.content.forEach((cxt) => {
        if (node.config.type === TYPE.ObjectType.TYPE_ENTITY) {
          allEntities.push(cxt.code);
        } else if (node.config.type === TYPE.ObjectType.TYPE_LINK) {
          allLinks.push(cxt.code);
        }
        if (cxt.code === selectEle.id) {
          isRepeat = true;
        }
      });
    });

    if (isRepeat) {
      return Promise.reject({
        code: 1000,
        error: "画布中已存在该元素"
      })
    }

    var params = {
      id: '',
      type: ''

    }

    /*    var params = {
          links: [],
          entities: [],
          allEdges: links.map(function(item) {
            return item.config.id;
          }),
          allLinks: allLinks,
          allEntities: nodes.filter(function(item) {
            return item.config.type === TYPE.ObjectType.TYPE_ENTITY;
          }).map(function(item) {
            return item.config.id;
          })

        }

        if (selectEle.type === TYPE.ObjectType.TYPE_ENTITY) {
          params.entities.push(selectEle.id);
        } else if (selectEle.type === TYPE.ObjectType.TYPE_LINK) {
          params.links.push(selectEle.id);
        }
    */
    if (selectEle.type === TYPE.ObjectType.TYPE_ENTITY) {
      params.id = selectEle.id;
      params.type = 'entity';
    } else if (selectEle.type === TYPE.ObjectType.TYPE_LINK) {
      params.id = selectEle.id;
      params.type = 'relation';
    }

    return HttpRequest.findElements(params).then(function(data) {
      var result = this._resolveDragData(selectEle, data);
      this.dataSet.addElements(result.nodes);
      this.dataSet.addElements(result.links);
      return result;
    }.bind(this));
  }

  _resolveDragFolderData(element) {
    var result = {
      nodes: [],
      links: []
    }

    result.nodes.push({
      id: element.id,
      x: element.x,
      y: element.y,
      elementType: TYPE.ElementType.ELEMENT_TYPE_NODE,
      width: 60,
      height: 40,
      content: [{
        code: element.id,
        name: element.name
      }],
      detectable: false,
      type: element.type,
      critical: true
    });

    return result;
  }

  dragFolderToLayout(data) {
    var selectEle = data.nodes[0];
    if (selectEle) {
      let allLinks = [];
      let allEntities = [];
      let isRepeat = false;
      var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
      nodes.forEach((node) => {
        node.config.content.forEach((cxt) => {
          if (cxt.code === selectEle.id) {
            isRepeat = true;
          }
        });
      });

      if (isRepeat) {
        return Promise.reject({
          code: 1000,
          error: "画布中已存在该元素"
        })
      }

      var result = this._resolveDragFolderData(selectEle);
      this.dataSet.addElements(result.nodes);
      return Promise.resolve(result);
    }
  }

  findNode(id) {
    var node = this.nodes.filter(function(item) {
      return item.config.id === id;
    })
    return node.length > 0 ? node[0] : undefined;
  }

  findLink(id) {
    var link = this.links.filter(function(item) {
      return item.config.id === id;
    })
    return link.length > 0 ? link[0] : undefined;
  }

  recommendExplore(_node) {
    let allLinks = [];

    var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var links = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);
    nodes.filter(function(item) {
      return item.config.type === 2;
    }).forEach(function(item) {
      item.config.content.forEach(function(item) {
        allLinks.push({
          id: item.id,
          code: item.code,
          recType: item.recType
        });
      });
    });

    var params = {
      domainId: _node.config.content[0].id,
      nodeName: _node.config.content[0].tables[0].name,
      sourceId: _node.config.content[0].tables[0].dsId,
      allEdges: links.map(function(item) {
        return item.config.id;
      }),
      allLinks: allLinks,
      allEntities: nodes.filter(function(item) {
        return item.config.type === 1;
      }).map(function(item) {
        return {
          id: item.config.content[0].id,
          code: item.config.content[0].code,
          recType: item.config.content[0].recType
        }
      })
    };
    return HttpRequest.GetRecommendExpore(params);
  }

  ordinaryExplore(_node) {
    let allLinks = [];

    var nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var links = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);

    nodes.filter(function(item) {
      return item.config.type === 2 && item.config.viewType === 0;
    }).forEach(function(item) {
      item.config.content.forEach(function(item) {
        allLinks.push(item.code);
      });
    });

    var params = {
      id: _node.config.content[0].code,
      /*    detectedEntity: _node.config.content[0].code,
            allEdges: links.map(function(item) {
              return item.config.id;
            }),
            allLinks: allLinks,
            allEntities: nodes.filter(function(item) {
              return item.config.type === 1;
            }).map(function(item) {
              return item.config.id;
            })
      */
    };
    return HttpRequest.detectEntity(params);
  }

  saveCanvas() {
    var nodes = [];
    var nodeElements = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);

    if (nodeElements) {
      nodeElements.forEach(function(item) {
        var pos = [];
        pos.push([item.config.x, item.config.y]);
        item.config.content.forEach(function(content) {
          nodes.push({
            domainCode: content.code,
            domainType: content.domainType,
            position: pos,
            criticalNode: item.config.critical
          });
        });
      });

      nodes = _.uniqBy(nodes, "domainCode");

      return HttpRequest.saveCanvas({
        canvasId: this.canvasId,
        nodes: nodes,
        lines: [],
        //modifiedVersion: this.modifiedVersion
      }).then(function(data) {
        //this.dataSet.modifiedVersion = this.modifiedVersion = data.modifiedVersion;
      }.bind(this));
    }
  }

  saveStandardCanvas(dsBasic, dsFlow) {
    var nodes = [];
    var lines = [];
    var basicNodes = dsBasic.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);
    var flowLines = dsFlow.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_EDGE);

    if (basicNodes) {
      basicNodes.forEach(function(item) {
        item.config.content.forEach(function(content) {
          var pos = [];
          pos.push([item.config.x, item.config.y]);
          var contentNode = dsFlow.findNode(content.code);
          if (contentNode) {
            pos.push([contentNode.config.x, contentNode.config.y]);
          }
          nodes.push({
            domainCode: content.code,
            domainType: content.domainType,
            position: pos,
            criticalNode: item.config.critical
          });
        });
      });
    }

    if (flowLines) {
      flowLines.forEach(function(item) {
        if (item.config.type === -1) {
          lines.push({
            type: item.config.type,
            inputDomain: item.config.source.content[0].code,
            outputDomain: item.config.target.content[0].code
          });
        }
      });
    }

    nodes = _.uniqBy(nodes, "domainCode");
    var dataSret = {
      canvasId: this.canvasId,
      nodes: nodes,
      lines: lines,
      //modifiedVersion: this.modifiedVersion
    }
    var data = {
      data: JSON.stringify(dataSret)
    }
    return HttpRequest.saveCanvas(data).then(function(data) {
      //this.modifiedVersion = data.modifiedVersion;
    }.bind(this));
  }

  clear() {
    this.nodes = [];
    this.links = [];
  }
}
