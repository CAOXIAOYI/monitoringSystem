var Url = require("./url");

import $ from 'jquery';
import ERRORCODE from "./errorCode";
import {
  message
} from 'antd';

var ajax = require('./ajax');

function HttpRequest() {
  this.isLogining = false;
}
HttpRequest.prototype._getData = function(params) {
  let self = this;

  if (params.method === "POST") {
    params.dataType = params.dataType || "JSON";
    params.contentType = params.contentType || "application/json; charset=utf-8";
    params.data = JSON.stringify(params.data);
  }
  
  return new Promise(function(resolve, reject) {
    ajax.request(params.method, params.url, params.data, function(error, data) {
      console.log("thisData=", data);
      if (error) {
        message.warning(data.errorMessage);
        return;
      }
      // if(data.data){
      //   resolve(data.data);
      // }
      // else{
      //   resolve(data);
      // }
      resolve(data);
    });
    /*    $.ajax(params).then(function(data) {
          if (data.errorCode === ERRORCODE.SUCCESS) {
            resolve(data.data);
          } else {
            switch (data.errorCode) {
              case ERRORCODE.NOT_LOGIN:
                if (!self.isLogining) {
                  self.isLogining = true;
                  message.warning('登陆信息失效,请点击登陆！', function() {
                    window.open("https:/account.aliyun.test");
                  });
                }
                setTimeout(function() {
                  self.isLogining = false;
                }, 3000);
                break;
              default:
                message.warning(data.errorMessage);
                break;
            }
            reject(data);
          }

        });*/
  });
}

HttpRequest.prototype.ListEntities = function(params) {
  var url = $.extend(true, {}, Url.ListEntities);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetPartitionInfo = function(params) {
  var url = $.extend(true, {}, Url.GetPartitionInfo);
  return this._getData($.extend({}, url, {
    data: params
  }));
}


HttpRequest.prototype.ListLinks = function(params) {
  var url = $.extend(true, {}, Url.ListLinks);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.SearchMarkedTagDomains = function(params) {
  var url = $.extend(true, {}, Url.SearchMarkedTagDomains);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.CreateCanvas = function(params) {
  var url = $.extend(true, {}, Url.CreateCanvas);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.CanvasList = function(params) {
  var url = $.extend(true, {}, Url.CanvasList);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.getCanvas = function(params) {
  var url = $.extend(true, {}, Url.GetCanvas);
  //url.url = url.url.replace("{canvasId}", params.id);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.findElements = function(params) {
  var url = $.extend(true, {}, Url.FindElement);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.saveCanvas = function(params) {
  var url = $.extend(true, {}, Url.SaveCanvas);
  //url.url = url.url.replace("{canvasId}", params.canvasId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.updateCanvas = function(params) {
  var url = $.extend(true, {}, Url.UpdateCanvas);
  url.url = url.url.replace("{canvasId}", params.canvasId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.DeleteCanvas = function(params) {
  var url = $.extend(true, {}, Url.DeleteCanvas);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetCanvasInfo = function(params) {
  var url = $.extend(true, {}, Url.GetCanvasInfo);
  url.url = url.url.replace("{canvasId}", params.canvasId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.detectEntity = function(params) {
  var url = $.extend(true, {}, Url.DetectEntity);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.getTag = function(params) {
  var url = $.extend(true, {}, Url.GetTag);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetEntityDetail = function(params) {
  var url = $.extend(true, {}, Url.GetEntityDetail);
  //url.url = url.url.replace("{domainCode}", params.code);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.GetLinkDetail = function(params) {
  var url = $.extend(true, {}, Url.GetLinkDetail);
  //url.url = url.url.replace("{domainCode}", params.code);
  return this._getData($.extend({}, url));
}

/*HttpRequest.prototype.GetERTagDetail = function(params) {
  var url = $.extend(true, {}, Url.GetERTagDetail);
  return this._getData($.extend({}, url, {
    data: params
  }));
}*/

HttpRequest.prototype.GetTagStructDetail = function(params) {
  var url = $.extend(true, {}, Url.GetTagStructDetail);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.getTagDetail = function(params) {
  var url = $.extend(true, {}, Url.getTagDetail);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

// HttpRequest.prototype.GetDomainField = function(params) {
//   var url = $.extend(true, {}, Url.GetDomainField);
//   return this._getData($.extend({}, url, {
//     data: params
//   }));
// }

HttpRequest.prototype.GetCategories = function(params) {
  var url = $.extend(true, {}, Url.GetCategories);
  url.url = url.url.replace("{categoryId}", params.categoryId);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.GetResDsType = function() {
  return this._getData($.extend({}, Url.GetResDsType));
}

HttpRequest.prototype.GetProject = function(params) {
  var url = $.extend(true, {}, Url.GetProject);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTable = function(params) {
  var url = $.extend(true, {}, Url.GetTable);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetRecommend = function(params) {
  var url = $.extend(true, {}, Url.GetRecommend);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTopSubject = function(params) {
  var url = $.extend(true, {}, Url.GetTopSubject);
  url.url = url.url.replace("{workspaceId}", params.workspaceId);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.UpdateTopSubjectContent = function(params) {
  var url = $.extend(true, {}, Url.UpdateTopSubjectContent);
  url.url = url.url.replace("{workspaceId}", params.workspaceId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetBosList = function(params) {
  var url = $.extend(true, {}, Url.GetBosList);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetFolderLoad = function(params) {
  var url = $.extend(true, {}, Url.GetFolderLoad);
  url.url = url.url.replace("{folderId}", params.folderId);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.GetFolderInfo = function(params) {
  var url = $.extend(true, {}, Url.GetFolderInfo);
  url.url = url.url.replace("{folderId}", params.folderId);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.CreateFolderViaJson = function(params) {
  var url = $.extend(true, {}, Url.CreateFolderViaJson);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.CreateFolderViaForm = function(params) {
  var url = $.extend(true, {}, Url.CreateFolderViaForm);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  return this._getData($.extend({}, url, {
      data: params,
      contentType: "multipart/form-data; charset=utf-8"
    }));*/
}

HttpRequest.prototype.UpdateFolderViaJson = function(params) {
  var url = $.extend(true, {}, Url.UpdateFolderViaJson);
  //url.url = url.url.replace("{folderId}", params.folderId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}
HttpRequest.prototype.DeleteFolderViaJson = function(params) {
  var url = $.extend(true, {}, Url.DeleteFolderViaJson);
  //url.url = url.url.replace("{folderId}", params.folderId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}
HttpRequest.prototype.schemaDescTable = function(params) {
  var url = $.extend(true, {}, Url.DeleteFolderViaJson);
  return this._getData($.extend({}, url, {
    data: params
  }));
}


HttpRequest.prototype.UpdateFolderViaForm = function(params) {
  var url = $.extend(true, {}, Url.UpdateFolderViaForm);
  return this._getData($.extend({}, url, {
    data: params,
    contentType: "multipart/form-data; charset=utf-8"
  }));
}

HttpRequest.prototype.GetBloodLineParent = function(params) {
  var url = $.extend(true, {}, Url.GetBloodLineParent);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTableDetail = function(params) {
  var url = $.extend(true, {}, Url.GetTableDetail);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetBloodInfo = function(params) {
  var url = $.extend(true, {}, Url.GetBloodInfo);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTableBlood = function(params) {
  var url = $.extend(true, {}, Url.GetTableBlood);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetDataSources = function(params) {
  var url = $.extend(true, {}, Url.GetDataSources);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetDsTypeDetails = function(params) {
  var url = $.extend(true, {}, Url.GetDsTypeDetails);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTableGraph = function(params) {
  var url = $.extend(true, {}, Url.GetTableGraph);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetTableSumInfo = function(params) {
  var url = $.extend(true, {}, Url.GetTableSumInfo);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetRecommendCanvas = function(params) {
  var url = $.extend(true, {}, Url.GetRecommendCanvas);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetRecommendCanvasInfo = function(params) {
  var url = $.extend(true, {}, Url.GetRecommendCanvasInfo);
  //url.url = url.url.replace("{cavansId}", params.cavansId);
  return this._getData($.extend({}, url, {
    data: {
      id: params.cavansId,
      sourceId:params.sourceId
    }
  }));
}

HttpRequest.prototype.GetRecommendExpore = function(params) {
  var url = $.extend(true, {}, Url.GetRecommendExpore);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetLoginUser = function(params) {
  var url = $.extend(true, {}, Url.GetLoginUser);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.GetCmSearch = function(params) {
  var url = $.extend(true, {}, Url.GetCmSearch);
  url.url = url.url.replace("{keyword}", params.keyword);
  return this._getData($.extend({}, url));
}

HttpRequest.prototype.GetDtDefine = function(params) {
  var url = $.extend(true, {}, Url.GetDtDefine);
  return this._getData($.extend({}, url, {
    data: params
  }));
}
HttpRequest.prototype.DeleteDtDefine = function(params) {
  var url = $.extend(true, {}, Url.DeleteDtDefine);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{defineId}", params.defineId);
    return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.LoadGraphByDefineId = function(params) {
  var url = $.extend(true, {}, Url.LoadGraphByDefineId);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{defineId}", params.defineId);
    return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.LoadGraphByInstanceId = function(params) {
  var url = $.extend(true, {}, Url.LoadGraphByInstanceId);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{instanceId}", params.instanceId);
    return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.GetDtInstance = function(params) {
  var url = $.extend(true, {}, Url.GetDtInstance);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{instanceId}", params.instanceId);
    return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.CreateDetect = function(params) {
  var url = $.extend(true, {}, Url.CreateDetect);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.GetDtInstanceStatus = function(params) {
    var url = $.extend(true, {}, Url.GetDtInstanceStatus);
    url.url = url.url.replace("{instanceId}", params.instanceId);
    return this._getData($.extend({}, url));
  }
  /***删除实例***/
HttpRequest.prototype.DeleteDtInstance = function(params) {
  var url = $.extend(true, {}, Url.DeleteDtInstance);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{instanceId}", params.instanceId);
    return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.GetDefineInsts = function(params) {
  var url = $.extend(true, {}, Url.GetDefineInsts);
  url.url = url.url.replace("{defineId}", params.defineId);
  return this._getData($.extend({}, url));
}


HttpRequest.prototype.ExecExploreByDefineID = function(params) {
  var url = $.extend(true, {}, Url.ExecExploreByDefineID);
  url.url = url.url.replace("{defineId}", params.defineId);
  return this._getData($.extend({}, url, {
    data: params
  }));
}

HttpRequest.prototype.ExecExploreByInstanceID = function(params) {
  var url = $.extend(true, {}, Url.ExecExploreByInstanceID);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*  url.url = url.url.replace("{instanceId}", params.instanceId);
    return this._getData($.extend({}, url));*/
}

/**查询探索执行详情**/
/*HttpRequest.prototype.GetDtScheduler = function(params) {
  var url = $.extend(true, {}, Url.GetDtScheduler);
  return this._getData($.extend({}, url, {
    data: params
  }));
}*/

/**查询探索执行状态**/
HttpRequest.prototype.GetDtSchedulerStatus = function(params) {
    var url = $.extend(true, {}, Url.GetDtSchedulerStatus);
    return this._getData($.extend({}, url, {
      data: params
    }));
    /*  url.url = url.url.replace("{schedulerId}", params.schedulerId);
      return this._getData($.extend({}, url));*/
  }
  /****获取透视结果***/
HttpRequest.prototype.GetDtSchedulerResult = function(params) {
  var url = $.extend(true, {}, Url.GetDtInstanceResult);
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*    url.url = url.url.replace("{schedulerId}", params.schedulerId);
      return this._getData($.extend({}, url));*/
}
HttpRequest.prototype.getUser = function(params) {
  //var url = $.extend(true, {}, Url.getUser);
  var url = $.extend(true, {}, Url.getAllInfo);
  
  return this._getData($.extend({}, url, {
    data: params
  }));
  /*    url.url = url.url.replace("{schedulerId}", params.schedulerId);
      return this._getData($.extend({}, url));*/
}

HttpRequest.prototype.UpdateFolderForm = function(params) {
  $.ajax({
    url: '/web/folder/' + params.folderId,
    type: 'POST',
    data: params.data,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(returndata) {
      message.success('目录编辑成功');
    },
    error: function(returndata) {
      message.warning('目录编辑失败:error=' + data.errorMessage);
    }
  });
}

module.exports = new HttpRequest();
