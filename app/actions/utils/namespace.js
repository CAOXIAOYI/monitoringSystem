'use strict';

module.exports = function (name) {
  return function (value) {
    return '' + name + '@@@' + value;
  };
};
