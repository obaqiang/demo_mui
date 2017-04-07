//登陆卡包页面接口
//首页获取用户所有的会员卡接口
function GetVips(getvips_url,member_id,page_num,page_size,token) {
	mui.get(getvips_url, {
		member_id: member_id,
		page_num: page_num,
		page_size: page_size,
		token: token
	}, function(data) {
		//获得服务器响应
		console.log('获取首页获取用户所有的会员卡接口返回数据:' + JSON.stringify(data));
	}, 'json');
};

//获取分店信息接口
function GetStoreShopInfo() {
	mui.get(getstoreshopinfo_url, {
		store_id: store_id,
		token: token
	}, function(data) {
		//获得服务器响应
		console.log('获取分店信息接口返回数据:' + JSON.stringify(data));
	}, 'json');
};

//获取未读消息接口
function GetUnreadCount() {
	mui.get(getunreadcount_url, {
		member_id: member_id,
		token: token
	}, function(data) {
		//获得服务器响应
		console.log('获取未读消息接口返回数据:' + JSON.stringify(data));
	}, 'json');
};


//首页搜索功能接口接口
function GetVipDimInfo() {
	mui.get(getvipdiminfo_url, {
		member_id: member_id,
		member_name: member_name
	}, function(data) {
		//获得服务器响应
		console.log('获取搜索接口返回数据:' + JSON.stringify(data));
	}, 'json');
};