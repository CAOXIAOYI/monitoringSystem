"use strict";

var Layout = require("./Layout");
let TYPE = require("../element/type");

//探索视图布局
export default class ExploreLayout extends Layout {
  constructor(option) {
    super(option);

    this.isAutoLayout = option.isAutoLayout;
    this.isSplitLinks = option.isSplitLinks;
  }

  draw(dataSource) {
    this.layoutCtrl.isReCalcSplitLocation = true;
    this.layoutCtrl.initLayoutCtrl(dataSource, this.isSplitLinks);
    this.dataSet = this.layoutCtrl.dataSet;

    if (this.dataSet != null) {
      this.initResolveDataset();
      this.update();
      this.dataSet.setLayout(this.onlyKey, this);
      this.attachDatasetEvent(this.dataSet);
    }
  }

  initResolveDataset() {
    var _nodes = this.dataSet.getElementsByType(TYPE.ElementType.ELEMENT_TYPE_NODE);

    _nodes.forEach(function(item) {
      item.isExploreAble = false;
      item.isShowTagAble = true;
      item.isSelectAble = false;
      item.isSelectERAble = true;
    })
  }
}
