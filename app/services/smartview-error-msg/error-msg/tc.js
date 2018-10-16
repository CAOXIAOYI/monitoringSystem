"use strict";

module.exports = [{
  code: "TC-LINK-ADD-SUCCESS",
  msg: "关系新建成功",
  type:"success"
},{
  code: "TC-LINK-ADD-FAIL",
  msg: "关系新建失败",
  type:"error"
},{
  code: "TC-ENTITY-ADD-SUCCESS",
  msg: "实体新建成功",
  type:"success"
},{
  code: "TC-ENTITY-ADD-FAIL",
  msg: "实体新建失败",
  type:"error"
},{
  code: "TC-ADD-RELATE-FIELD-SUCCESS",
  msg: "添加关联字段成功",
  type:"success"
},{
  code: "TC-RM-RELATE-FIELD-SUCCESS",
  msg: "删除关联字段成功",
  type:"error"
},{
  code: "TC-RM-RELATE-FIELD-FAIL",
  msg: "删除关联字段失败",
  type:"error"
},{
  code: "TC-TAG-EMPTY-ERROR",
  msg: "没有添加或者编辑的标签",
  type:"warning"
},{
  code: "TC-TAG-SAVE-EMPTY-ERROR",
  msg: "存在标签名称或所在类目为空",
  type:"warning"
},{
  code: "TC-SCHEMA-VERIFY",
  msg: "STREAMSQL的连接检测自动通过",
  des: "请自行确保STREAMSQL的配置正确性",
  type:"info"
}]