'use strict';

require('./init.js');

var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

var store = require('./store/configureStore');
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
//import loginInit from "./services/login/init";

var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
var browserHistory = ReactRouter.browserHistory;
var history = syncHistoryWithStore(browserHistory, store);
var Routes = require('./routes.jsx');
const rootElement = document.createElement('div');
rootElement.id = "dtboost-console";
document.body.appendChild(rootElement);

require("antd/lib/style/themes/default.less");
require("./assets/font/iconfont/icon_private.less");
require("./assets/font/antd/antd.private.less");
require("antd/dist/antd.css");
require('./index.less');
// 渲染前
//loginInit().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={Routes(store,store.dispatch)}>
      </Router>
    </Provider>, rootElement 
  );
//});
