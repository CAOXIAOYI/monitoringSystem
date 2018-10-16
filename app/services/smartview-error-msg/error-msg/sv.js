"use strict";

module.exports = [{
  code: "SV-DATAEXPORE-GET-PATITION-FAIL",
  msg: "分区信息失败",
  type:"error"
},{
  code: "SV-DATAEXPORE-PATH-ERROR",
  msg: "数据探索路径不连通",
  type:"warnig"
},{
  code: "SV-DATAEXPORE-PARTITION-WAITTING",
  msg: "正在查询分区信息,请等待",
  type:"loading"
},{
  code: "SV-DATAEXPORE-PARTITION-EMPTY",
  msg: "存在分区为空",
  type:"warning"
},{
  code: "SV-DATAEXPORE-TREE-ERROR",
  msg: "条件树结构不正确",
  type:"warning"
},{
  code: "SV-DATAEXPORE-TREEDATA-ERROR",
  msg: "存在条件树未赋值",
  type:"warning"
},{
  code: "SV-DATAEXPORE-OUTPUT-EMPTY",
  msg: "没有输出条件",
  type:"warning"
},{
  code: "SV-DATAEXPORE-CONITION-EMPTY",
  msg: "请至少保留一个条件",
  type:"warning"
},{
  code: "SV-SYNC-TAG-SELECT",
  msg: "请选择同步的标签",
  type:"warning"
},{
  code: "SV-SYNC-TARGET-SOURCE",
  msg: "请选择同步的目标数据资源",
  type:"warning"
},{
  code: "SV-SYNC-TARGET-OBJECT",
  msg: "请选择一个分析计算的实体",
  type:"warning"
},{
  code: "SV-SYNC-LIFECIRCLE-EMPTY",
  msg: "生命周期不能为空",
  type:"warning"
},{
  code: "SV-SYNC-PRIMARYKEY-SELECT",
  msg: "请选择主键",
  type:"warning"
},{
  code: "SV-INSTANCE-NAME-EMPTY",
  msg: "实例名不能为空",
  type:"warning"
},{
  code: "SV-RESULT-MUTIPLY-DATA",
  msg: "数值选择不能超过2个",
  type:"warning"
},{
  code: "SV-RESULT-MUTIPLY-DIM",
  msg: "维度不能超过2个以上",
  type:"warning"
},{
  code: "SV-RESULT-MUTIPLY-DATA-DIM",
  msg: "两个数值的维度不能超过1个",
  type:"warning"
},{
  code: "SV-RESULT-DIM-SELECT",
  msg: "必须选择一个维度",
  type:"warning"
},{
  code: "SV-FOLD-EDIT-SUCCESS",
  msg: "文件夹编辑成功",
  type:"success"
},{
  code: "SV-MODEL-EDIT=SUCCESS",
  msg: "模型编辑成功",
  type:"success"
},{
  code: "SV-DATAEXPORE-DEL-SUCCESS",
  msg: "探索删除成功",
  type:"success"
},{
  code: "SV-INSTANCE-ADD-SUCCESS",
  msg: "实例创建成功",
  type:"success"
},{
  code: "SV-INSTANCE-DEL-SUCCESS",
  msg: "实例删除成功",
  type:"success"
},{
  code: "SV-INSTANCE-BEGIN-EXEC",
  msg: "实例开始执行",
  type:"success"
},{
  code: "SV-DATAEXPORE-EXIST",
  msg: "已存在一个创建探索窗口,请先完成该任务,再开启新的任务",
  type:"warning"
},{
  code: "SV-FOLD-DEL-SUCCESS",
  msg: "删除文件夹成功",
  type:"success"
},{
  code: "SV-MODEL-DEL-SUCCESS",
  msg: "删除视图成功",
  type:"success"
},{
  code: "SV-MODEL-SEARCH-NULL",
  msg: "没有查询到相关信息",
  type:"warning"
},{
  code: "SV-MODEL-SEARCH-ERROR",
  msg: "搜索出错",
  type:"error"
}];

