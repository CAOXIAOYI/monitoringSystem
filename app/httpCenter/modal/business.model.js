import BaseModel  from './model.base.js'
/*
	监测告警
*/
class AlertMonitor extends BaseModel {
	constructor(props) {
		super(props);
		this.url = 'param/warnParametersSetting';
		this.method = 'GET';
	}
}

module.exports = {
	AlertMonitor: AlertMonitor

};