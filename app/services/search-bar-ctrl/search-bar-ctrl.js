var _ = require("lodash");

var HttpRequest = require("../../httpCenter/request");
let languageProvider = require("../language/index.js");

function searchBarCtrl() {
  this.navs = [{
      value: "ListEntities",
      text: languageProvider["smartview.canvas_search_bar.entity"] || "实体"
    }, {
      value: "ListLinks",
      text: languageProvider["smartview.canvas_search_bar.link"] || "关系"
    }
    /*, {
        value: "SearchMarkedTagDomains",
        text: languageProvider["smartview.canvas_search_bar.tag"] || "标签"
      }*/
  ];
  this.currentTag = this.navs[0].value;
  this.keyword = "";
  this.result = null;
  this.data = [];
  this.totalCnt = 0;
  this.pageNum = 0;
  this.pageSize = 100;
  this.isEOF = false;
  this.cache = {};
  this.isLoading = false;
}


searchBarCtrl.prototype.getCache = function(value) {
  var cache = this.cache;
  !cache[value] && (cache[value] = {});
  this.totalCnt = cache[value].totalCnt || 0;
  this.keyword = cache[value].keyword || "";
  this.data = cache[value].data || [];
  this.isEOF = cache[value].isEOF || false;
  this.result = this.data.slice(0, this.pageSize);
}

searchBarCtrl.prototype.setCache = function() {
  var cache = this.cache;
  var tag = this.currentTag;
  !cache[tag] && (cache[tag] = {});
  cache[tag].totalCnt = this.totalCnt;
  cache[tag].keyword = this.keyword;
  cache[tag].data = this.data;
  cache[tag].isEOF = this.isEOF;
}

searchBarCtrl.prototype.changeTag = function(value) {
  this.setCache();
  this.getCache(value);
  this.currentTag = value;
  this.active();
}

searchBarCtrl.prototype.active = function() {
  this.pageNum = 0;
  if (this.totalCnt !== 0) {
    this.getMore();
  }
}

searchBarCtrl.prototype.getMore = function() {
  if (this.isEOF || this.isLoading) {
    return;
  }

  var _needNum = (this.pageNum + 1) * this.pageSize;
  if (this.totalCnt > _needNum) {
    this.result = this.data.slice(0, this.pageSize);
    return Promise.resolve(this.result);
  } else {
    return this.getData().then(function(resolve, reject) {
      if (this.currentTag === "SearchMarkedTagDomains") {
        this.result = this.data;
        return Promise.resolve(this.result);
      } else {
        this.result = this.data.slice(0, this.pageNum * this.pageSize);
        return Promise.resolve(this.result);
      }
    }.bind(this));

  }
}


searchBarCtrl.prototype.getData = function() {
  switch (this.currentTag) {
    case "ListEntities":
      return this._ListEntities();
    case "ListLinks":
      return this._ListLinks();
    case "SearchMarkedTagDomains":
      return this._SearchMarkedTagDomains();
  }
}

searchBarCtrl.prototype._ListEntities = function() {
  return HttpRequest.ListEntities({
    keyword: this.keyword,
    pageNum: this.pageNum + 1,
    pageSize: this.pageSize,
    type: 'entity',
    entity_name: this.keyword
  }).then(function(data) {
    if (data.length !== this.pageSize) {
      this.isEOF = true;
      this.totalCnt += data.length;
    }
    this.pageNum++;
    this.data = this.data.concat(this._resolveData(data));
    this.data = _.uniqBy(this.data, "id");
  }.bind(this));
}

searchBarCtrl.prototype._ListLinks = function() {
  return HttpRequest.ListLinks({
    keyword: this.keyword,
    pageNum: this.pageNum + 1,
    pageSize: this.pageSize,
    type: 'relation',
    entity_name: this.keyword
  }).then(function(data) {
    if (data.length !== this.pageSize) {
      this.isEOF = true;
      this.totalCnt += data.length;
    }
    this.pageNum++;
    this.data = this.data.concat(this._resolveData(data));
    this.data = _.uniqBy(this.data, "id");
  }.bind(this));
}

searchBarCtrl.prototype._SearchMarkedTagDomains = function() {
  return HttpRequest.SearchMarkedTagDomains({
    keyword: this.keyword,
    pageNum: this.pageNum + 1,
    pageSize: this.pageSize
  }).then(function(data) {
    if (data.length !== this.pageSize) {
      this.isEOF = true;
      this.totalCnt += data.length;
    }
    this.pageNum++;
    this.data = this._resolveMarkData(data);
  }.bind(this));
}

searchBarCtrl.prototype._resolveData = function(data) {
  return data.map(function(item) {
    return {
      id: item.code,
      name: item.name,
      description: item.description,
      type: parseInt(item.domainType),
      isSelected: false,
      itemKey: item.code,
      eName: item.eName
    }
  });

}

searchBarCtrl.prototype._resolveMarkData = function(data) {
  var obj = {};

  data.forEach(function(item) {
    item.domains.forEach(function(mark) {
      mark.type = parseInt(mark.domainType);
      mark.id = mark.code;
    });
  });

  this.data.forEach(function(item) {
    obj[item.tagName] = item;
  });

  data.forEach(function(item) {
    if (obj[item.tagName]) {
      obj[item.tagName].domains = obj[item.tagName].domains.concat(item.domains);
      obj[item.tagName].domains = _.uniqBy(obj[item.tagName].domains, "code")
    } else {
      item.itemKey = item.tagCode;
      this.data.push(item);
    }
  }.bind(this));

  return this.data;
}

searchBarCtrl.prototype.search = function() {
  this.pageNum = 0;
  this.data = [];
  this.result = [];
  this.isEOF = false;
  this.isLoading = false;
  return this.getMore();
}

module.exports = new searchBarCtrl();