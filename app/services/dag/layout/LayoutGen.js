"use strict";

var StandardLayout = require("./StandardLayout");
var RecommendLayout = require("./RecommendLayout");
var ExploreLayout = require("./ExploreLayout");
var TYPE = require("./layoutType");

module.exports = function(option) {
  var expLayout = undefined;

  switch (option.canvasType) {
    case TYPE.TYPE_STANDARD:
      expLayout = new StandardLayout(option);
      break;
    case TYPE.TYPE_REOMMEND:
      expLayout = new RecommendLayout(option);
      break;
    case TYPE.TYPE_EXPLORE:
    case TYPE.TYPE_EXPLORE_DEFINE:
    case TYPE.TYPE_EXPLORE_INSTANCE:
    case TYPE.TYPE_CREATE_DEFINE:
      expLayout = new ExploreLayout(option);
      break;
    default:
      expLayout = new StandardLayout(option);
      break;
  }

  return expLayout;
}
