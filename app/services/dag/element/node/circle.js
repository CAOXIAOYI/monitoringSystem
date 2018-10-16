"use strict";

var Node = require("./node");
let EVENTS = require("../../events");

export default class Circle extends Node {
  constructor(data) {
    super(data);
    this.menuData = [{
      name: "删除节点",
      type: "DEL"
    }, {
      name: "填充色",
      type: "CHANGE_FILL_COLOR"
    }, {
      name: "图标",
      type: "CHANGE_ICO"
    }];

    this.isShowPie = false;
    this.config.width = this.config.width || 60;
    this.config.height = this.config.height || 40;
    this.config.color = this.config.color ? this.config.color : "#12dec6";
  }

  active() {
    var containerDom = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var container = d3.select(containerDom);

    container
      .attr("class", "node")
      .attr("id", "element-" + this.config.id)
      .attr("transform", "translate(" + this.config.x + "," + this.config.y + ")");

    var circle = container
      .append("circle")
      .attr("r", 45)
      .style("fill", this.config.color)
      .style("opacity", "0.5")

    let text = container
      .append("text")
      .attr("class", "label")
      .text(this.config.content[0].name)
      .attr("transform", "translate(0,20)");

    var title = container
      .append("title")
      .text(this.config.name);

    if (this.config.icon) {
      var object = container
        .append("foreignObject")
        .attr("class", "icon-container")
        .attr("transform", "translate(-16,-30)");

      object
        .append("xhtml:div")
        .attr("class", "node-container")
        .append(function() {
          if (this.config.icon) {
            var iconExp = this.config.icon.split("/");
            if (iconExp[iconExp.length - 1] !== "null") {
              var icon = $("<img src=" + this.config.icon + " height='32' width='32'/>");
              return icon[0];
            }
          }
          return $("<span />")[0];
        }.bind(this));
    }


    this.element = containerDom;

    this.updatePosition();

    this.attachFolderEvent(circle);
    this.attachTipEvent();

    this.menuData = ["DEL", "CHANGE_FILL_COLOR", "CHANGE_ICO"];
    this._genCtxMenu(containerDom);
  }

  updatePosition() {
    var x = this.config.x;
    var y = this.config.y;
    var container = d3.select(this.element);
    container.attr("transform", function() {
      return "translate(" + x + "," + y + ")";
    });
  }

  attachFolderEvent(container) {
    $(container).off("click");
    container.on("click", function() {
      var data = {
        shiftKey: d3.event.shiftKey,
        nodeId: this.config.id
      };
      this.emitEvent(EVENTS.TOPIC_NODE_CLICK, [data]);
    }.bind(this));
  }

  changeColor(color) {
    this.config.color = color;
    var node = d3.select(this.element)
      .select("circle")
      .style("fill", color);
  }

  changeNodeImg(img) {
    this.config.icon = img;
    var object = d3.select(this.element)
      .select("foreignObject")
      .remove();

    if (this.config.icon) {
      var object = d3.select(this.element)
        .append("foreignObject")
        .attr("class", "icon-container")
        .attr("transform", "translate(-10,-20)");

      object
        .append("xhtml:div")
        .attr("class", "node-container")
        .append(function() {
          var icon = $("<img src=" + this.config.icon + " height='32' width='32'/>");
          return icon[0];
        }.bind(this));
    }
  }
}