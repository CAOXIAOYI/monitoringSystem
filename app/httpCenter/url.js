"use strict";

var URLResolve = require("./resolve");
var uid = window.localStorage.getItem('uid');

module.exports = {

  GetCanvasInfo: {
    method: "GET",
    url: URLResolve("/api/canvas/{canvasId}",true)
  },
 

  GetCategories: {
    method: "GET",
    url: URLResolve("/api/otm/category/{categoryId}/hierarchy",true)
  },
  
  UpdateDataSource: {
    method: "POST",
    url: URLResolve("/api/bds/datasource/{dsId}",true)
  },
  GetDataSourceInfo: {
    method: "GET",
    url: URLResolve("/api/bds/datasource/{dsId}",true)
  },
  DeleteDataSource: {
    method: "DELETE",
    url: URLResolve("/api/bds/datasource/{dsId}",true)
  },
  
  UpdateTopSubjectContent: {
    method: "POST",
    url: URLResolve("/api/ws/{workspaceId}/topSubjects",true)
  },
  GetFolderLoad: {
    method: "GET",
    url: URLResolve("/api/folder/{folderId}/load",true)
  },
 
  GetFolderInfo: {
    method: "GET",
    url: URLResolve("/api/folder/{folderId}",true)
  },
 
  UpdateFolderViaForm: {
    method: "POST",
    url: URLResolve("/api/folder/{folderId}",true)
  },
 
  // schema
  getSchemaList: {/**获取云计算资源**/
    url: URLResolve('/smartView/CloudSource/getSourceData',true),
    method: 'GET',
    defaultParam: {
      page: 1,
      pagesize: 10
    }
  },
  
  GetCmSearch: {
    method: "GET",
    url: URLResolve("/api/cm/search?keyword={keyword}",true)
  },
  
  GetDefineInsts: {
    method: "GET",
    url: URLResolve("/api/dt/def/{defineId}/insts",true)
  },
 
  GetTopSubject: {
    method: "GET",
    url: URLResolve("/api/ws/{workspaceId}/topSubjects",true)
  },
  
  LoadGraphBySchedulerId: {
    method: "GET",
    url: URLResolve("/api/dt/sch/{schedulerId}/loadGraph",true)
  },
  ExecExploreByDefineID: {
    method: "POST",
    url: URLResolve("/api/dt/def/{defineId}/exe",true)
  },
 
  GetWorkSpaceInfo: {
    method: "GET",
    url: URLResolve(" /api/ws/{wsId}/config",true)
  },
  UpdateWorkSpaceInfo: {
    method: "POST",
    url: URLResolve("/api/ws/{wsId}/config",true)
  },
  getDataSubscribe: {
    method: "GET",
    url: URLResolve("/api/ws/{wsId}/datasubscribe",true)
  },
  updateDataSubscribe: {
    method: "POST",
    url: URLResolve("/api/ws/{wsId}/datasubscribe",true)
  },
  // datasync
  getSchemaEntities: {
    url: URLResolve('/api/v2/tagcenter/query/schemas/querySchemaAnalysisEntity/:schemaId', true),
    method: 'GET',
    defaultParam: {
    }
  },

  getObjectList: {
    url: URLResolve('/smartView/ModelExplore/getAllNodeList?type=entity',true),
    method: 'GET',
  },
  getStorages: {
    url: URLResolve('/smartView/ModelEntity/entitydetails?entity_id=:entity_id',true),
    method: 'GET'
  },

  getLinkStoragesDetail: {
    url: URLResolve('/smartView/ModelRelation/relationdetails?relation_id=:relation_id',true),
    method: 'GET'
  },  
 
  getLinkDetail: {
    url: '/console/api/otm_v2/entities/query_entity_storages_info/:entity_code',
    method: 'GET'
  },
 

  deleteLinkStorage: {
    url: '/console/api/otm_v2/entities/delete_dataset_storage/:dataset_id',
    method: 'DELETE'
  },
 
  listPartitions: {
    url: URLResolve('/api/v2/meta/table/list/partitions/:schemaId/:tableName',true),
    method: 'GET'
  },
  refreshCacheTables: {
    url: URLResolve('/api/v2/meta/tables/cache/refresh/:schemaId',true),
    method: 'GET'
  },

  editTag: {
    url: URLResolve('/api/v2/tag/:tagId',true),
    method: 'POST'
  },
  querySchemaEntities: {
    url: '/console/api/otm_v2/standard/query',
    method: 'GET',
    defaultParam: {
      query_index: 'querySchemaAnalysisEntityById',
      params: '{"schema_id":"1565"}'
    }
  },
 
  editCat: {
    url: URLResolve('/api/v2/categories/:categoryId',true),
    method: 'PUT',
    defaultParam: {
      // category_name  String  类目名称，非必须
      // is_leaf  Enum  是否为叶子类目，非必须,values:['0','1']
      // description  String  类目描述，非必须, allowEmpty
    }
  },
  delCat: {
    url: URLResolve('/api/v2/categories/:categoryId',true),
    method: 'DELETE'
  },


  // apps
  getAppList: {
    url: '/console/api/apps',
    method: 'GET'
  },
 


  // user
  getTenant: {
    url: '/console/api/tenant',
    method: 'GET'
  },
  getRootTenant: {
    url: '/console/api/tenant/status',
    method: 'GET'
  },
  privateProduce: {
    url: '/console/api/system/private_produce',
    method: 'POST'
  },
  //获取用户角色
  getUrolesByUser: {
    method: "GET",
    url:URLResolve("/api/v2/workspace/uroles", true),
    defaultParam: {
      queryUser:"chuanzhu",
    }
  },
  //获取用户
  getUsers: {
    method: "GET",
    url:URLResolve("/api/v2/workspace/users", true),
    defaultParam: {
      keyword:"",
      pageSize:"10",
      pageNum:"1"
    }
  },
  //获取所有角色
  getRoles: {
    method: "GET",
    url:URLResolve("/api/v2/roles", true),
    defaultParam: {
      keyword:"",
    }
  },
  //获取当前租户空间成员
  getMembers: {
    method: "GET",
    url: URLResolve("/api/v2/tenant/members", true),
    defaultParam: {
    }
  },
   //给用户授权
  grantRoleToUser: {
    method: "POST",
    url: URLResolve("/api/v2/auth/user/grant", true),
    defaultParam: {
    }
  },
   //删除用户权限
  revokeRoleFromUser: {
    method: "POST",
    url: URLResolve("/api/v2/auth/user/revoke", true)
  },
  getPrivileges: {
    method: "GET",
    url: URLResolve("/api/v2/workspace/uprivileges",true)
  },
  getAccessWorkSpacesList:{
    method: "GET",
    url: URLResolve("/api/v2/auth/tag/:tagId/workspaces",true),
  },
  grantws:{
    method: "POST",
    url: URLResolve("/api/v2/auth/tag/:tagId/grantws",true),
  },
  getUserWorkSpaces: {
    method: "GET",
    url: URLResolve("/api/v2/user/workspaces", true),
  },
  //获取workspace列表
  getWorkspaces: {
    method: "GET",
    url:URLResolve("/api/v2/workspaces", true),
    defaultParam: {
    }
  },
   //创建workspace
  createWorkspace: {
    method: "POST",
    url:URLResolve("/api/v2/workspaces", true),
    defaultParam: {
    }
  },
   //更新workspace
  updateWorkspace: {
    method: "POST",
    url:URLResolve("/api/v2/workspace/:workspaceId", true),
    defaultParam: {
    }
  },
  //删除workspace
  deleteWorkspace: {
    method: "DELETE",
    url:URLResolve("/api/v2/workspace/:workspaceId", true),
    defaultParam: {
    }
  },
  doSms:{
    method: "POST",
    url: URLResolve("/smartmove_v2/api/sm/do_sms", false)
  },
  deleteSyncedTags: {
    url: URLResolve('/smartmove_v2/api/sm/del_resources', false),
    method: 'DELETE',
    defaultParam: {
      resources: []
    }
  },
 
  // 用户登陆
  getUser: {
    url: '/dfh/user/api/',
    method: 'POST'
  },
  /**首页 start**/
  homePageData: {
    method: "GET",
    url: URLResolve("/dfh/rt/homePageData/#grid",true)
  },
  alertData: {
    method: "GET",
    url: URLResolve("/dfh/history/latestWaringEvent",true)
  },
   /**首页 end**/
  /**子系统监控 start**/
  //参数说明：1：发电机；2：推进电机；3：科考设备；4：配电变压器；5：实验室；6：UPS
  subSystemMonitor: {
    method: "GET",
    url: URLResolve("/dfh/rt/subSystemMonitor/#deviceType",true),
  },
  subSystemMonitorExtend: {
    method: "GET",
    url: URLResolve("/dfh/rt/subSystemMonitor/extend/#deviceType",true),
  },
  // http://dfh.jokco.com/dfh/rt/subSystemMonitor/extend/
  /**子系统监控 end**/
  /**电能质量 start**/
  //左侧菜单
  generalLeftMenu: {
    method: "GET",
    url: URLResolve("/dfh/device/generalLeftMenu",true)
  },
   //显示数据
  powerQualityData: {
    method: "GET",
    url: URLResolve("/dfh/rt/powerQualityData/#meterId",true)
  },
  /**电能质量 end**/


  /**设备特性 start**/
  //左侧菜单
  bigPowerLeftMenu: {
    method: "GET",
    url: URLResolve("/dfh/device/bigPowerLeftMenu",true)
  },
   //显示数据
  deviceFeaturesData: {
    method: "GET",
    url: URLResolve("/dfh/rt/deviceFeaturesData/#meterId",true)
  },

  /**设备特性 end**/


   /**谐波查询 start**/
  //左侧菜单
  //参数说明：grid=？（1:690V动力电网；2：实验室电网）
  generalLeftMenu: {
    method: "GET",
    url: URLResolve("/dfh/device/generalLeftMenu",true)
  },
   //显示数据/选择显示谐波次数范围
   //参数说明：thdNum=0,...9，0代表前10次谐波，1代表11-20次谐波。。。。。。
  harmonicQueryData: {
    //method: "GET",
    method: "POST",
    //url: URLResolve("/dfh/thd/harmonicQueryData/#meterId/#thdNum/#timeStamp",true)
    url: URLResolve("/dfh/thd/harmonicQueryData",true)
  },
  getSpecifyHarmonic: {
    //method: "GET",
    method: "POST",
    //url: URLResolve("/dfh/thd/getSpecifyHarmonic/#meterId/#thdNum/#timeStamp",true)
    url: URLResolve("/dfh/thd/getSpecifyHarmonic",true)
  },
  
  /**谐波查询 end**/


   /**设备管控 start**/


  //说明：
  //2017-07-18 14:18:22.280 - 乒乓球室-异常，异常内容：谐波
  //2017-07-18 14:18:22.295 - 机房1#-告警，告警内容：过电压
  deviceControlData: {
    method: "GET",
    url: URLResolve("/dfh/device/deviceControlData",true)
  },
  
  /**设备管控 end**/


   /**参数设置 start**/



 //7.1 电表
  meterParametersSetting: {
    method: "POST",
    url: URLResolve("/dfh/param/meterParametersSetting",true),
    defaultParam: {
      keyword:"",
      pageSize:10,
      page:1
    }
  },
  //接口：http://ip:port/dfh/updateMeterParameters?meterId=?&updateStr=?
  //参数说明：updateStr
  updateMeterParameters: {
    method: "POST",
    url: URLResolve("/dfh/param/updateMeterParameters",true)
  },
  addMeterParameters: {
    method: "POST",
    url: URLResolve("/dfh/param/addMeterParameters",true)
  },
  delMeterParameters: {
    method: "GET",
    url: URLResolve("/dfh/param/delMeterParameters/#meterId",true)
  },

  //7.2 设备
  /**

  接口：http://ip:port/dfh/updatedeviceParameters?deviceId=?&updateStr=?
    参数说明：类似meter
    接口：http://ip:port/dfh/updatedeviceParameters?addStr=?
    参数说明：类似meter

  */
  deviceParametersSetting: {
    method: "POST",
    url: URLResolve("/dfh/param/deviceParametersSetting",true),
    defaultParam: {
      keyword:"",
      pageSize:10,
      page:1
    }
  },
  //接口：http://ip:port/dfh/updateMeterParameters?meterId=?&updateStr=?
  //参数说明：updateStr
  updatedeviceParameters: {
    method: "POST",
    url: URLResolve("/dfh/param/updatedeviceParameters",true)
  },
  adddeviceParameters: {
    method: "POST",
    url: URLResolve("/dfh/param/adddeviceParameters",true)
  },
  delDeviceParameters: {
    method: "GET",
    url: URLResolve("/dfh/param/delDeviceParameters/#deviceId",true)
  },
  getWarnParameter: {
    method: "GET",
    url: URLResolve("/dfh/param/warnParametersSetting",true)
  },
  updateWarnParameter: {
    method: "POST",
    url: URLResolve("/dfh/param/updateWarnParameter",true)
  },
  /**参数设置 end**/
  /** 电机启停特性 start**/

 //左侧菜单
  bigPowerLeftMenu: {
    method: "GET",
    url: URLResolve("/dfh/device/bigPowerLeftMenu",true)
  },
  menuItemTimestamp: {
    method: "GET",
    url: URLResolve("/dfh/motor/menuItemTimestamp/#meterId",true)
  },
   //显示数据
  motorOnOffData: {
    method: "GET",
    url: URLResolve("/dfh/motor/motorOnOffData/#meterId/#timeStamp",true)
  },
  
  /** 电机启停特性 end**/


   /** 历史数据 start**/

 //左侧菜单
  historyDataLeftMenu: {
    method: "GET",
    url: URLResolve("/dfh/history/historyDataLeftMenu",true)
  },
   //显示数据-电能质量监测
  historyData: {
    method: "GET",
    url: URLResolve("/dfh/history/historyData/#meterId/#start/#end",true)
  },

  //右下角电能质量
  //接口：http://ip:port/dfh/history/historyDataQuality?meterId=?&timeStamp=?
  historyDataQuality: {
    method: "GET",
    url: URLResolve("/dfh/history/historyDataQuality",true)
  },

  historyEventData:{
    method: "GET",
    url: URLResolve("/dfh/history/historyDataEvent/#eventId",true)
  },
  historyEvent:{
    method: "GET",
    url: URLResolve("/dfh/history/historyEvent/#eventId/#start/#end",true)
  },

  //历史事件
  //接口：http://ip:port/dfh/history/historyDataEvent?eventType=?&timeStamp=?


  //点击底部事件  接口：http://ip:port/dfh/history/historyDataEvent?eventId=?
  

  //监测系统状态
  //http://ip:port/dfh/rt/monitorSystemstatus
   monitorSystemstatus: {
    method: "GET",
    url: URLResolve("/dfh/rt/monitorSystemstatus",true)
  },
  
  /** 历史数据 end**/

  /** 用户信息start**/
  login: {
    method: "POST",
    url: URLResolve("/dfh/user/login",true)
  },
  selectUsers: {
    method: "POST",
    url: URLResolve("/dfh/user/selectUsers",true),
    defaultParam: {
      keyword:"",
      pageSize:10,
      page:1
    }
  },
  addUser: {
    method: "POST",
    url: URLResolve("/dfh/user/addUser",true)
  },
  updateUser: {
    method: "POST",
    url: URLResolve("/dfh/user/updateUser",true)
  },
  deleteUser: {
    method: "GET",
    url: URLResolve("/dfh/user/deleteUser/#id",true)
  },
  userLoginHistory:{
    method: "GET",
    url: URLResolve("/dfh/user/userLoginHistory/#userId",true)
  },
  /** 用户信息end**/
  /** 系统信息start**/
  
  systemTime:{
    method: "GET",
    url: URLResolve("/dfh/rt/systemTime",true)
  },
  latestEvent:{
    method: "GET",
    url: URLResolve("/dfh/history/latestEvent",true)
  },
  /** 系统信息end*/
}
