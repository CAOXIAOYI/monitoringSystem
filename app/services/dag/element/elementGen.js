"use strict";

var Rect = require("./node/rect");
var Diamond = require("./node/diamond");
var Annular = require("./node/annular");
var Ellipse = require("./node/ellipse");
var Circle = require("./node/circle");
var Topic = require("./node/topic");
var SolidEdge = require("./edge/solidEdge");
var DashWithSingleArrow = require("./edge/dashWithSingleArrow");
var DashWithDoubleArrow = require("./edge/dashWithDoubleArrow");
var FlowEdgeArrow = require("./edge/flowEdgeArrow");
var TYPE = require("./type");

module.exports = function(data) {
  var rstElement = null;
  if (data.elementType === TYPE.ElementType.ELEMENT_TYPE_NODE) {
    switch (data.type) {
      case TYPE.NodeType.NODE_TYPE_RECT:
        rstElement = new Rect(data);
        break;
      case TYPE.NodeType.NODE_TYPE_DIAMOND:
        rstElement = new Diamond(data);
        break;
      case TYPE.NodeType.NODE_TYPE_ANNULAR:
        rstElement = new Annular(data);
        break;
      case TYPE.NodeType.NODE_TYPE_CIRCLE:
        rstElement = new Circle(data);
        break;
      case TYPE.NodeType.NODE_TYPE_TOPIC:
        rstElement = new Topic(data);
        break;
      case TYPE.NodeType.NODE_TYPE_ELLIPSE:
        rstElement = new Ellipse(data);
        break;
      default:
        rstElement = new Rect(data);
        break;
    }
  } else if (data.elementType === TYPE.ElementType.ELEMENT_TYPE_EDGE) {
    switch (data.type) {
      case TYPE.EdgeType.EDGE_TYPE_SOLID:
        rstElement = new SolidEdge(data);
        break;
      case TYPE.EdgeType.EDGE_TYPE_DASHWITHSINGLEALLOW:
        rstElement = new DashWithSingleArrow(data);
        break;
      case TYPE.EdgeType.EDGE_TYPE_DASHWITHDOUBLEALLOW:
        rstElement = new DashWithDoubleArrow(data);
        break;
      case TYPE.EdgeType.EDGE_TYPE_FLOW:
        rstElement = new FlowEdgeArrow(data);
        break;
      default:
        rstElement = new SolidEdge(data);
        break;
    }
  }

  return rstElement;
}
