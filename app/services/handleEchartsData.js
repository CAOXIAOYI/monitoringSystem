"use strict";
var _ = require("lodash");
function handleEchartsData() {

}
handleEchartsData.prototype._resolveInitData = function(handleResultData,_selectedValue,_selectDimension) {
  var categoryName = [];
  var categoryArray = [];
  var seriesName = [[],[]];
  var seriesArray = [[],[]];
  var valueName = [[],[]];
  var valueArray = [[],[]];
  var title = "";
  var item = [];
  var data = [];
  var stack = "";
  var legend = [];
  var scatterDatas = [];
  var scatterName = [];
  var struct = [];
  var dataP = [];
  struct = struct.concat(_selectDimension).concat(_selectedValue);
  handleResultData.forEach((handleResultDataItem) => {
    let seriesLength = 0;
    let valueLength = 0;
    struct.forEach((structItem, structIndex) => { 
      if(structItem.dimType==="category" && structItem.type === 1){
        categoryName.push(handleResultDataItem[structIndex].name);
        categoryArray.push(handleResultDataItem[structIndex].values);
      }
      if(structItem.dimType==="series" && structItem.type === 1){
        seriesName[seriesLength].push(handleResultDataItem[structIndex].name);
        seriesArray[seriesLength].push(handleResultDataItem[structIndex].values);
        seriesLength++;
      }
      if(structItem.type===2){
        valueName[valueLength].push(handleResultDataItem[structIndex].name);
        valueArray[valueLength].push(handleResultDataItem[structIndex].values);
        valueLength++;
      }
    });
  });
  var legend = _.uniq([].concat(valueName[0]).concat(valueName[1]));
  /**对X轴数据进行去重处理**/
  var catagory = [];
  categoryArray.forEach((category) => {
    category.forEach((c) => {
      catagory.push(c);
    });
  });
  var categoryName = _.uniq(categoryName);
  var itemCategory = _.uniq(catagory);
  title = legend;
  item = itemCategory;  
  if(_selectedValue.length===0){
    let itemTemp = [];
    let dataTemp = [];
    let tempT = [];
    itemCategory.forEach((cName, iIdenx) => {
      itemTemp.push(cName.name);
      dataTemp.push(cName.value);
    });
    tempT.push(dataTemp);
    title = categoryName;
    item = itemTemp;
    data = tempT;
    legend = categoryName;
    //legend.push();
    dataP = itemCategory;
    return {"title":title,"item":item,"data":data,"legend":legend};
  }
  if(_selectedValue.length===1){
    categoryArray.forEach((category, index) => {
        itemCategory.forEach((c, iIdenx) => {
          let i = category.indexOf(c);
          if(i<0){
            valueArray[0][index].splice(iIdenx,0,0);
          }
        });
    });
    categoryArray = categoryArray;
    data = valueArray[0];
    if (_selectDimension.length === 2) {
      stack = "";
      legend = seriesArray[0];
    }
    if (_selectDimension.length === 3) {
      legend = _.uniq(seriesArray[0]);
      stack = _.uniq(seriesName[0]);
    }else if(_selectDimension.length === 1){
      legend = legend;
      stack = "";
    }
    return {"title":title,"item":item,"data":data,"legend":legend,"stack":stack};
  }
  if(_selectedValue.length === 2){
      var scatterName = [];
      var scatterData = [];
      itemCategory.forEach((c, iIdenx) => {
        var dd = new Array();
        scatterName.push(c);
        dd.push(valueArray[0][0][iIdenx]);
        dd.push(valueArray[1][0][iIdenx]);
        scatterData.push(dd);
      });
      legend = legend;
      scatterDatas = scatterData;
      scatterName = scatterName;
      return {"title":title,"item":item,"data":scatterDatas,"legend":legend,"scatterName":scatterName};
  }
}

module.exports = handleEchartsData;
