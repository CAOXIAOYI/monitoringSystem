import BaseModel  from './model.base.js'
/*
	省份城市信息
*/
class CityListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = '/ele/shangcen/xmdplatform/getListOfCity';
	}
}

module.exports = {
	CityListModel: CityListModel

};