"use strict";

import $ from 'jquery';
var Element = require("../element");
let TYPE = require("../type");
let EVENTS = require("../../events");

export default class Node extends Element {
  constructor(data) {
    super(data);
    this.MENUDATA = [{
      name: "删除节点",
      type: "DEL"
    }, {
      name: "实体详情",
      type: "ENTITY_DETAIL"
    }, {
      name: "关系详情",
      type: "LINK_DETAIL"
    }, {
      name: "填充色",
      type: "CHANGE_FILL_COLOR"
    }, {
      name: "图标",
      type: "CHANGE_ICO"
    }];
    this.type = TYPE.ElementType.ELEMENT_TYPE_NODE;
    this.config = data;
    this.isExploreAble = true;
    this.isShowTagAble = true;
    this.isSelectAble = false;
    this.isDrawFlowAble = false;
    this.isSelectERAble = false;
    this.isShowPie = true;
    this.isPieOpen = false;
    this.isFocus = false;
    this.isHide = false;
    this.isExploring = false;
    this.hasExplore = false;
    this.exploreNodeIds = [];
    this.isExplored = false;
    this.isShowCtxMenu = true;
    this.tagData = null;
    this.requestTag = data.requestTag;

    if (!this.config.nameChain) {
      this.config.nameChain = [];
    }
  }

  active() {
    throw "This interface is not overloaded";
  }

  attachClickEvent(container) {
    $(container).off("click");
    container.on("click", function() {
      if (d3.event.defaultPrevented) return;
      if (this.isSelectAble) {
        this.emitEvent(EVENTS.SELECT_NODE, [this.config]);
      }
      if (this.isDrawFlowAble) {
        this.emitEvent(EVENTS.ADD_FLOWLINE, [this.config]);
      }
      if (this.isSelectERAble) {
        this.emitEvent(EVENTS.SELECT_EROBJECT, [this.config]);
      }
    }.bind(this));
  }

  getTag() {
    if (this.config.content[0].tagCount === 0) {
      return Promise.resolve([]);
    }

    if (this.tagData) {
      return Promise.resolve(this.tagData);
    } else {
      if (this.requestTag) {
        console.log("this.config=", this.config);
        //return this.requestTag(this.config.content[0].code);
        return this.requestTag(this.config.content[0].code, this.config.content[0].domainType);
      } else {
        return Promise.resolve([]);
      }
    }
  }

  showAnnular(data, nodeId, centerX, centerY) {
    if (!this.isShowPie) return;

    var result = [];

    if (data === undefined || data.length <= 0)
      return;

    let nodeData = this._genAnnularData({
      data: data || [],
      nodeId: nodeId,
      centerX: centerX,
      centerY: centerY,
      insideR: 55,
      outsideR: 105,
      radius: 60
    });

    var objectDom = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    var object = d3.select(objectDom)
      .attr("class", "explore-btn-object")
      .attr("transform", "translate(" + (this.config.x - 8) + "," + (this.config.y + 20) + ")");
    object
      .append("xhtml:div")
      .attr("class", "close-container")
      .append(function() {
        var icon = $("<i class='iconfont annular-close-btn'>&#xe613;</i>");
        icon.click(function() {
          this.isPieOpen = false;
          this.emitEvent(EVENTS.REMOVE_ANNULAR);
        }.bind(this));

        return icon[0];
      }.bind(this));

    var result = {
      data: nodeData,
      close: objectDom
    }
    if (this.isPieOpen) {
      this.isPieOpen = false;
      this.emitEvent(EVENTS.REMOVE_ANNULAR);
    } else {
      this.isPieOpen = true;
      this.emitEvent(EVENTS.ADD_ANNULAR, [result]);
    }
    /*if (!this.isShowPie) return;

    var result = [];
    console.log("data=",nodeId);
    if (data === undefined || data.length <= 0)
      return;
	let  nodeMess = document.getElementById('element-'+nodeId);

    let nodeData = this._genAnnularData({
      data: data || [],
      nodeId: nodeId,
      centerX: 0,
      centerY: 0,
      insideR: 55,
      outsideR: 105,
      radius: 60
    });

    var objectDom = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    var object = d3.select(objectDom)
      .attr("class", "explore-btn-object")
      .attr("transform", "translate(" + (this.config.x - 9) + "," + (this.config.y + 27) + ")");
    object
      .append("xhtml:div")
      .attr("class", "close-container")
      .append(function() {
        var icon = $("<i class='iconfont annular-close-btn'>&#xe613;</i>");
        icon.click(function() {
          this.isPieOpen = false;
          this.emitEvent(EVENTS.REMOVE_ANNULAR);
          $('.annulargroup').find(".node").remove();
        }.bind(this));

        return icon[0];
      }.bind(this));

    var result = {
      data: nodeData,
      close: objectDom,
      nodeMess: {element:nodeMess}
    }
    if (this.isPieOpen) {
      this.isPieOpen = false;
      this.emitEvent(EVENTS.REMOVE_ANNULAR);
    } else {
      this.isPieOpen = true;
      this.emitEvent(EVENTS.ADD_ANNULAR, [result]);

      $(nodeMess).clone().appendTo(".annulargroup");

      let nodeWid = $('.annulargroup').find(".label").width();
      let findPol = $('.annulargroup').find("polygon").length;
      let transWid;
      if(findPol > 0){
        transWid = -30;
      }else{
        transWid = -20 - (nodeWid / 2);
      }

      $('.annulargroup').find(".node").find(".explore-btn-object").remove();
      $('.annulargroup').find(".tag-btn-object").remove();
      $('.annulargroup').find(".node").attr('fill','#fff');
      $('.annulargroup').find(".node").attr('transform','translate(' + transWid + ',-20)');
      $('.annulargroup').find(".explore-btn-object").attr('transform','translate(-10,28)');
      $('.annulargroup').find(".node").attr('stroke','#0077c9');
      $('.annulargroup').find(".node").css({'color':'#666','stroke':'#0077c9'});
      $('.annulargroup').find(".label").css('fill','#666');
      $('.annulargroup').attr("transform",'translate(160,370)');

    }*/
  }

  _genAnnularData(option) {
    let result = [];
    let data = option.data;
    let nodeId = option.nodeId;
    let centerX = option.centerX || 0;
    let centerY = option.centerY || 0;
    let outsideR = option.outsideR || 105;
    let insideR = option.insideR || 55;
    let radius = option.radius || 60;
    let startRadius = option.startRadius || 0;

    if (!data) {
      return [];
    }

    for (let i = 0; i < data.length; i++) {
      let startX = centerX + Math.cos((startRadius + i * radius) / 180 * Math.PI) * outsideR;
      let startY = centerY + Math.sin((startRadius + i * radius) / 180 * Math.PI) * outsideR;
      let endX = centerX + Math.cos((startRadius + (i + 1) * radius) / 180 * Math.PI) * outsideR;
      let endY = centerY + Math.sin((startRadius + (i + 1) * radius) / 180 * Math.PI) * outsideR;
      let startX2 = centerX + Math.cos((startRadius + (i + 1) * radius) / 180 * Math.PI) * insideR;
      let startY2 = centerY + Math.sin((startRadius + (i + 1) * radius) / 180 * Math.PI) * insideR;
      let endX2 = centerX + Math.cos((startRadius + i * radius) / 180 * Math.PI) * insideR;
      let endY2 = centerY + Math.sin((startRadius + i * radius) / 180 * Math.PI) * insideR;
      let textX = centerX + Math.cos(((2 * i + 1) * 60 / 2 + startRadius) / 180 * Math.PI) * (insideR + outsideR) / 2 - 24;
      let textY = centerY + Math.sin(((2 * i + 1) * 60 / 2 + startRadius) / 180 * Math.PI) * (insideR + outsideR) / 2 + 5;

      let cmd = [
        "M", startX, startY,
        //A的属性：x的半径，y的半径，旋转角度，大弧还是小弧，顺时针还是逆时针，结束为坐标(X,Y)
        "A", outsideR, outsideR, 0, 0, 1, endX, endY,
        "L", startX2, startY2,
        "A", insideR, insideR, 0, 0, 0, endX2, endY2
      ];

      result.push({
        d: cmd.join(" "),
        id: data[i].id,
        nameChain: this.config.nameChain.concat([data[i].name]),
        text: data[i].name.length > 4 ? (data[i].name.substring(0, 4) + "..") : data[i].name,
        data: data[i],
        centerNodeId: nodeId,
        centerX: centerX,
        centerY: centerY,
        insideR: insideR,
        outsideR: outsideR,
        textX: textX,
        textY: textY
      })
    }

    return result;
  }

  attachTipEvent() {
    if (!!this.config.isShowTip) {
      let data = {
        id: this.config.id,
        info: this.config,
      };
      $(this.element).on("mouseover", function(event) {
        this.emitEvent(EVENTS.SHOW_NODE_TOOLTIPS, [{
          nodeId: this.config.id,
          x: event.offsetX + 10,
          y: event.offsetY,
          data: data
        }]);
      }.bind(this));

      $(this.element).on("mouseout", function() {
        this.emitEvent(EVENTS.HIDE_NODE_TOOLTIPS, []);
      }.bind(this));
    }
  }

  _genExploreBtn(container) {
    var x = this.config.width;
    var y = this.config.height / 2 - 11;

    var object = container
      .append("foreignObject")
      .attr("class", "explore-btn-object")
      .attr("width", "20px")
      .attr("height", "20px")
      .attr("transform", "translate(" + -8 + "," + y + ")");

    object
      .append("xhtml:div")
      .attr("class", "node-container")
      .append(function() {
        var icon = $("<i class='iconfont'>&#xe60c;</i>");
        return icon[0];
      }.bind(this))
      .on("click", function() {
        this.explore();
      }.bind(this));

    return object[0][0];
  }

  _genTagIcon(container) {
    var x = this.config.width - 4;
    var y = this.config.height / 2 - 7;
    var object = container
      .append("foreignObject")
      .attr("class", "tag-btn-object")
      .attr("width", "20px")
      .attr("height", "20px")
      .attr("transform", "translate(" + x + "," + y + ") scale(0.8)");

    object
      .append("xhtml:div")
      .attr("class", "info-container")
      .append(function() {
        var icon = $("<i class='iconfont'>&#xe60d;</i>");
        return icon[0];
      }.bind(this))
      .on("click", function() {
        this.getTag().then((data) => {
          this.showAnnular(data, this.config.id, this.config.x, this.config.y);
        });
      }.bind(this));
    return object[0][0];
  }

  _genCtxMenu(container) {
    var data = this.menuData.map(function(item) {
      for (let i = 0; i < this.MENUDATA.length; i++) {
        if (item === this.MENUDATA[i].type) {
          return $.extend(true, {}, this.MENUDATA[i], {
            objectId: this.config.id,
            code: this.config.content[0].code
          })
        }
      }
    }.bind(this));

    if (this.isShowCtxMenu) {
      d3.select(container).on("contextmenu.node", function(event) {
        d3.event.preventDefault();
        this.emitEvent(EVENTS.SHOW_CXTMENU, [{
          objectId: this.config.id,
          x: d3.event.layerX,
          y: d3.event.layerY,
          data: data
        }]);
      }.bind(this));
    }
  }

  isExploreLeaf() {
    return this.exploreNodeIds.length === 0;
  }

  explore() {
    var result = {
      id: this.config.id,
      exploreNodeIds: this.exploreNodeIds,
      hasExplore: this.hasExplore
    }

    this.isExploring = true;
    this.emitEvent(EVENTS.EXPLORE_NODE, [result]);
  }

  unExplore() {
    this.isExploring = false;
    this.emitEvent(EVENTS.UNEXPLORE_NODE, [this.config.id]);
    this.setUnExploreBtn();
  }

  setUnExploreBtn() {
    if (this.isExploreAble) {
      var btnContainer = d3.select(this.element)
        .select(".node-container");

      btnContainer.select("i").remove();
      btnContainer.append(function() {
        var icon = $("<i class='iconfont'>&#xe60c;</i>");
        icon.click(function() {
          this.explore();
        }.bind(this));

        return icon[0];
      }.bind(this));
    }
  }

  afterExplore(result) {
    this.hasExplore = true;
    this.config.critical = true;
    if (result) {
      this.exploreNodeIds = result.nodes.map(function(item) {
        return item.id;
      });
    }

    var btnContainer = d3.select(this.element)
      .select(".node-container");

    btnContainer.select("i").remove();
    btnContainer.append(function() {
      var icon = $("<i class='iconfont'>&#xe62b;</i>");
      icon.click(function() {
        this.unExplore();
      }.bind(this));

      return icon[0];
    }.bind(this));
    /*    if (this.exploreNodeIds.length === 0) {
          //假如没有结果直接把icon隐藏
          btnContainer.attr("hidden", true);
        } else {
          //假如有结果把icon替换
          btnContainer.select("i").remove();
          btnContainer.append(function() {
            var icon = $("<i class='iconfont'>&#xe62b;</i>");
            icon.click(function() {
              this.unExplore();
            }.bind(this));

            return icon[0];
          }.bind(this));
        }*/
  }

  getExploreData() {
    return {
      id: this.config.id,
      exploreNodeIds: this.exploreNodeIds
    }
  }

  remove() {
    if (this.isPieOpen) {
      this.emitEvent(EVENTS.REMOVE_ANNULAR);
    }
    this.emitEvent(EVENTS.COLLAPSE_NODE, [
      [this.config.id]
    ]);
  }

  focus() {
    if (this.isFocus) {
      return;
    }
    this.isFocus = true;
    this.emitEvent(EVENTS.FOCUS_NODE, [
      [this.config.id]
    ]);
  }

  unFocus() {
    if (!this.isFocus) {
      return;
    }
    this.isFocus = false;
    this.emitEvent(EVENTS.UNFOCUS_NODE, [
      [this.config.id]
    ]);
  }

  highlight() {
    var node = d3.select(this.element);
    node.classed('node-focus', true);
  }

  unHighlight() {
    var node = d3.select(this.element);
    node.classed('node-focus', false);
  }

  selected() {
    throw "This interface is not overloaded";
  }

  unSelected() {
    throw "This interface is not overloaded";
  }

  closeExploreNodes() {
    this.emitEvent(EVENTS.CLOSE_EXPLORENODE, [
      [this.config.id]
    ]);
  }

  updatePosition() {
    throw "This interface is not overloaded";
  }

  unRelateRect() {
    d3.select(this.element)
      .classed('node-dash', true);
  }

  relateRect() {
    d3.select(this.element)
      .classed('node-dash', false);
  }

  attachRecommentEvent(container) {
    $(container).off("click");
    container.on("click", function() {
      if (d3.event.defaultPrevented) return;
      this.emitEvent(EVENTS.ENTITY_RECOMMENT_MODAL, [this]);
    }.bind(this));
  }

  changeColor(color) {
    var node = d3.select(this.element)
      .style("fill", color);
  }

  changeNodeImg(img) {
    throw "This interface is not overloaded";
  }

  hasContent(code) {
    var isExist = false;
    if (this.config.content) {
      this.config.content.forEach(function(item) {
        if (item.code === code) {
          isExist = true;
        }
      })
    }
    return isExist;
  }

  updateContent(text) {
    throw "This interface is not overloaded";
  }

  destroy() {

  }
}