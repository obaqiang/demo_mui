$('title').text('BD贵宾卡');

function isOnline() {
	if(!navigator.onLine) {
		alert('网络连接断开');
	}
}

function bdGetJson(url, data_list, apiGetJsonType, callback) {
	//	url:接口的路径
	//	data_list：接口的参数
	//	apiGetJsonType:是否跨域
	//	callback:对返回的数据进行操作的方法

	if(apiGetJsonType == "json") {
		mui.ajax(url, {
			data: data_list,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				//console.log(data);

				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	} else if(apiGetJsonType == "jsonp") {
		mui.getJSONP(url, data_list, function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log(data_list);
			callback(data);

		});
	}
}

//设置cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}

//读取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		console.log('缓存读取失败');
		return null;
	}

}

function UserInfo() {};

//清除登录信息
UserInfo.clear = function() {
	plus.storage.removeItem('username');
	plus.storage.removeItem('password');
	plus.storage.removeItem('token');
}

//检查是否包含自动登录的信息
UserInfo.auto_login = function() {
	var username = UserInfo.username();
	var pwd = UserInfo.password();
	var pwd_hook_status = UserInfo.pwd_hook_status();
	if(!username || !pwd) {
		return false;
	}
	return true;
}

//检查是否已登录
UserInfo.has_login = function() {
	var username = UserInfo.username();
	var pwd = UserInfo.password();
	var token = UserInfo.token();
	var member_id = UserInfo.member_id();
	var pwd_hook_status = UserInfo.pwd_hook_status();
	if(!username || !pwd || !token) {
		console.log('未登陆过');
		return false;
	}
	console.log('已登陆过');
	return true;
};

UserInfo.username = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('username');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('username');
		return;
	}
	plus.storage.setItem('username', arguments[0]);
};

UserInfo.password = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('password');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('password');
		return;
	}
	plus.storage.setItem('password', arguments[0]);
};

UserInfo.token = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('token');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('token');
		return;
	}
	plus.storage.setItem('token', arguments[0]);
};
UserInfo.member_id = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('member_id');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('member_id');
		return;
	}
	plus.storage.setItem('member_id', arguments[0]);
};
UserInfo.pwd_hook_status = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('pwd_hook_status');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('pwd_hook_status');
		return;
	}
	plus.storage.setItem('pwd_hook_status', arguments[0]);
};

function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 19)
}

//当前时间转时间戳
function datetime_to_unix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return parseInt(now.getTime() / 1000);
}

// 时间戳转时间
function unix_to_datetime(unix) {
	var now = new Date(parseInt(unix) * 1000);
	return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//js截取字符串，中英文都能用
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
function cutstr(str, len) {
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for(var i = 0; i < str_len; i++) {
		a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4) {
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if(str_length >= len) {
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if(str_length < len) {
		return str;
	}
}

//账单页面和红包页面进入时的月份显示
function monthShow(month_time) {
	switch(month_time) {
		case 1:
			$('.bill_month').children().eq(0).addClass('bg_cb');
			break;
		case 2:
			$('.bill_month').children().eq(1).addClass('bg_cb');
			break;
		case 3:
			$('.bill_month').children().eq(2).addClass('bg_cb');
			break;
		case 4:
			$('.bill_month').children().eq(3).addClass('bg_cb');
			break;
		case 5:
			$('.bill_month').children().eq(4).addClass('bg_cb');
			break;
		case 6:
			$('.bill_month').children().eq(5).addClass('bg_cb');
			break;
		case 7:
			$('.bill_month').children().eq(6).addClass('bg_cb');
			break;
		case 8:
			$('.bill_month').children().eq(7).addClass('bg_cb');
			break;
		case 9:
			$('.bill_month').children().eq(8).addClass('bg_cb');
			break;
		case 10:
			$('.bill_month').children().eq(9).addClass('bg_cb');
			break;
		case 11:
			$('.bill_month').children().eq(10).addClass('bg_cb');
			break;
		case 12:
			$('.bill_month').children().eq(11).addClass('bg_cb');
			break;

	}
}

//定时小黑色弹框
function Alert(alert_text) {
	$('.alert_bl').remove();
	var alert_div = '<div class="alert_bl" style="display:none;"><span>' + alert_text + '</span></div>';
	$('body').append(alert_div);
	$('.alert_bl').fadeIn();
	setTimeout("$('.alert_bl').fadeOut()", 1500);
}
var oldback = mui.back;
mui.back = function() {
	if(navigator.userAgent.indexOf("Html5Plus") > 0) {
		mui.currentWebview.opener().show('none');
		oldback();
	}
	if(navigator.userAgent.indexOf("Html5Plus") < 0) { //不支持5+ API
		history.back(-1);
	}
}

function showTel(data) {
	$('.show_tel').remove();
	var tel_div =
		'<div class="show_tel"></div>';
	$('body').append(tel_div);

	for(var i = 0; i < data.length; i++) {
		var tel_span =
			'<span class="tel">' + data[i] + '</span>';
		$('.show_tel').append(tel_span);

	}
	var cancel_div = '<span id="tel_cancel">取消</span>';
	$('.show_tel').append(cancel_div);

}

//拍照及选择图片start

function compressImage(imgPath) {
	plus.zip.compressImage({
			src: imgPath,
			dst: imgPath,
			quality: 20
		},
		function() {
			alert("Compress success!");
		},
		function(error) {
			alert("Compress error!");
		});
}

//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}

//拍照及选择图片end

//接收页面之间传值
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return(r[2]);
	return null;
}
//时间戳转换成日期时间2014-8-8 下午11：40：20
function formatDate(ns) {
	return new Date(parseInt(ns) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//时间戳转换成八位日期2014-5-5 
function userDate(uData) {
	var myDate = new Date(uData * 1000);
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + month + '-' + day;
}

//时间戳转换成四位时间10:10  
function userTime(uTime) {
	var myDate = new Date(uTime * 1000);
	var hours = myDate.getHours();
	var minutes = myDate.getMinutes();
	return hours + ':' + minutes;
}

//时间戳转换成四位时间10:10:00
function userTime(uTime) {
	var myDate = new Date(uTime * 1000);
	var hours = myDate.getHours();
	var minutes = myDate.getMinutes();
	var second = myDate.getSeconds();
	return hours + ':' + minutes + ':' + second;
}

//定时提醒设置的时间传入 (2014,05,15)返回成2014-01-21
function setDate(year, month, day) {
	return year + '-' + month + '-' + day;
}
//定时提醒设置的时间传入 (01：02)返回成01:01:00
function setTime(hour, minute) {
	return hour + ':' + minute + ':00';
}

//时间格式2014-02-02 14:10:00改成时间戳
function js_strto_time(str_time) {
	var new_str = str_time.replace(/:/g, "-");
	new_str = new_str.replace(/ /g, "-");
	var arr = new_str.split("-");
	var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return strtotime = datum.getTime() / 1000;

}
//时间戳改成时间格式2014-12-12 下午01：10
function js_date_time(unixtime) {
	var timestr = new Date(parseInt(unixtime) * 1000);
	var datetime = timestr.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
	return datetime;
}

//var timestamp3 = 1403058804;
//var newDate = new Date();
//newDate.setTime(timestamp3 * 1000);
//
//console.log(getNowFormatDate(newDate));

function getNowFormatDate(newDate) {
	var date = new Date();
    date.setTime(newDate * 1000);
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	console.log(month);
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	console.log(strDate);
	var hours = date.getHours();
	if(hours<10){
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(minutes<10){
		minutes = '0'+minutes;
	}
	var seconds = date.getSeconds();
	if(seconds<10){
		seconds = '0'+seconds;
	}
	console.log(date.getMinutes());
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + hours + seperator2 + minutes +
		seperator2 + seconds;
	return currentdate;
}