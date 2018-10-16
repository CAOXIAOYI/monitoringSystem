"use strict";

class TopicSearchCtrl {
  constructor() {
    this.cache = [];
  }
  setData(data) {
    this.cache = data;
  }
  search(keyword) {
    keyword = keyword.toLocaleLowerCase();
    let result = [];
    for (let i = 0; i < this.cache.length && result.length < 20; i++) {
      if (this.cache[i].name.toLocaleLowerCase().indexOf(keyword) !== -1) {
        result.push(this.cache[i]);
      }
    }
    return result;
  }
}

export default TopicSearchCtrl;
