"use strict";

module.exports = {
  SCHEMA_CREATE: "schema-create", // ok
  SCHEMA_UPDATE: "schema-update", // ok
  SCHEMA_READ: "schema-read",
  SCHEMA_DELETE: "schema-delete", // ok
  ENTITY_CREATE: "entity-create", // ok
  ENTITY_UPDATE: "entity-update", // ok
  ENTITY_READ: "entity-read",
  ENTITY_DELETE: "entity-delete", //ok
  TAG_CREATE: "tag-create", // ok
  TAG_UPDATE: "tag-update", // ok
  TAG_READ: "tag-read",
  TAG_DELETE: "tag-delete", // ok
  TAG_GRANT: "tag-grant", // ok
  WS_UPDATE: "ws-update", // ok 还有add,del的问题还没解决
  WS_READ: "ws-read",
  CT_CREATE: "ct-create", // ok 但a标签的样式还有问题
  CT_UPDATE: "ct-update", // ok
  CT_READ: "ct-read",
  CT_DELETE: "ct-delete", // ok
  ROLE_CREATE: "role-create", // 暂不开放
  ROLE_DELETE: "role-delete", // 暂不开放
  ROLE_READ: "role-read",
  ROLE_UPDATE: "role-update", // 暂不开放
  ROLE_GRANT: "role-grant" // ok
}
