if(navigator.userAgent.indexOf("Html5Plus") < 0) { //不支持5+ API
	var vip_id = GetQueryString('vip_id');
	var token = GetQueryString('token');

	var getvipinfo_url = test_url + '/api/member/getvipinfo';

	function getvipinfo(getvipinfo_url, vip_id, token) {

		mui.ajax(getvipinfo_url, {
				data: {
					vip_id: vip_id,
					token: token
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				crossDomain: true,
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log(data);
					var balance = '￥' + data.Data.Vip.end_money; //余额
					var cardtype_id = data.Data.Vip.cardtype_id;
					var points = data.Data.Vip.end_integral; //剩余积分
					var vip_phone = data.Data.Vip.vip_phone;
					var tel = data.Data.Store.tel;
					var tel_status = tel.indexOf(',');
					document.getElementById('tel').addEventListener('tap', function() {
						if(tel_status > 0) { //此状态表示有两个号码

							var see_tel = tel.split(',');
							showTel(see_tel);
							mui(".show_tel").on('tap', '.tel', function() {
								var tel_href = $(this).text();
								window.location.href = 'tel:' + tel_href;
							})
							document.getElementById('tel_cancel').addEventListener('tap', function() {
								$('.show_tel').hide();
							});
						} else {
							window.location.href = 'tel:' + tel;
						}

					});

					$('#balance').text(balance);
					$('#points').text(points);

					var store_name = data.Data.Store.store_name; //店家名称
					var open_time = data.Data.Store.open_time;
					var close_time = data.Data.Store.close_time;
					var store_time = '营业时间' + open_time + '——' + close_time;
					var address = data.Data.Store.address;
					var logo_img = data.Data.Store.logo_img;
					$('#feedbacks').attr('logo_img', logo_img);
					$('#store_name').text(store_name);
					$('#store_time').text(store_time);
					$('#address').text(address);

					var location_lng = data.Data.Store.location_lng;
					var location_lat = data.Data.Store.location_lat;
					var map_url = 'http://uri.amap.com/marker?position=' + location_lng + ',' + location_lat;
					document.getElementById('map').addEventListener('tap', function() {
//						var webview = mui.openWindow({
//							url: 'index_map.html',
//							id: 'index_map',
//							extras: {
//								map_url: map_url
//							},
//							createNew: true
//						});
						window.location.href='index_map.html?'+'map_url='+map_url;
					});

				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(type);
				}
			})
			//		mui.get(getvipinfo_url, {
			//			vip_id: vip_id,
			//			token: token
			//		}, function(data) {
			//			//获得服务器响应
			//			console.log(data);
			//		}, 'json');
	}
	getvipinfo(getvipinfo_url, vip_id, token);

}