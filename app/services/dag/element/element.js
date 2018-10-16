"use strict";

var EventEmitter = require("wolfy87-eventemitter");

export default class Element {
  constructor(data) {
    this.id = data.id;
    this.type = null;
    this.element = null;
    this.eventProxy = new EventEmitter();
  }

  hide() {
    d3.select(this.element).attr("hidden", true);
  }

  show() {
    d3.select(this.element).attr("hidden", null);
  }

  neighBor() {
    throw "This interface is not overloaded";
  }

  updatePosition() {
    throw "This interface is not overloaded";
  }

  emitEvent(event, data) {
    return this.eventProxy.emitEvent(event, data);
  }

  on(event, func) {
    this.eventProxy.on(event, func);
  }

  hasContent(code){
    throw "This interface is not overloaded";
  }

  updateContent(text) {
    throw "This interface is not overloaded";
  }
    
  selected() {
    throw "This interface is not overloaded";
  }

  unSelected() {
    throw "This interface is not overloaded";
  }

  removeAllListeners() {
    return this.eventProxy.removeAllListeners();
  }
}
