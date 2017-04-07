if(navigator.userAgent.indexOf("Html5Plus") < 0) { //不支持5+ API

	mui.init({
		pullRefresh: {
			container: '.scroll_area',
			down: {
				auto: false,
				callback: pulldownRefresh
			},
			up: {
				//						contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});

	var scroll_status = '卡包';

	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			page_num = 1;
			if(scroll_status == '卡包') {
				GetVips(getvips_url, member_id, page_num, page_size, token);
			} else if(scroll_status == '消息') {
				GetMsgCount(getmsgcount_url, member_id, token);
				GetMsgList(getmsglist_url, member_id, type, page_num, page_size);
			}

			mui('.scroll_area').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	}
	//			var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			page_num++;
			if(scroll_status == '卡包') {
				GetVips(getvips_url, member_id, page_num, page_size, token);
			} else if(scroll_status == '消息') {
				GetMsgCount(getmsgcount_url, member_id, token);
				GetMsgList(getmsglist_url, member_id, type, page_num, page_size);
			}

			mui('.scroll_area').pullRefresh().endPullupToRefresh();

		}, 1500);
	}

	var member_id = GetQueryString('member_id');
	var token = GetQueryString('token');
	var Member = GetQueryString('Member');

	var getvips_url = test_url + '/api/member/GetVips';
	var getstoreshopinfo_url = test_url + '/api/Store/GetStoreShopInfo';
	var getunreadcount_url = test_url + '/api/member/GetUnreadCount';
	var getvipdiminfo_url = yehongbing_url + '/api/member/GetVipDimInfo';

	var page_num = 1;
	var page_size = 10;

	function main_pinjie(data) {
		if(page_num == 1) {
			$('.card_area').empty();
		}

		var Vips = data.Data.Vips;
		if(Vips == '' && page_num == 1) {
			var no_data_div =
				'<div class="no_data">暂无数据</div>';
			$('.card_area').append(no_data_div);
		} else {
			for(var i = 0; i < Vips.length; i++) {
				var vip_id = Vips[i].id;
				var store_id = Vips[i].store_id;
				var store_name = Vips[i].store_name;
				var store_tel = Vips[i].store_tel;
				var cardtype_name = Vips[i].cardtype_name;
				var tl_imgurl = Vips[i].tl_imgurl;
				var tl_bagurl = Vips[i].tl_bagurl;
				var tl_bagurl1 = Vips[i].tl_bagurl1;
				var BalanceArray = Vips[i].BalanceArray;
				var store_tel = Vips[i].store_tel;
				var vip_sn = Vips[i].vip_sn;
				if(i % 2 == 0) { //如果是偶数
					var card_list_div = '<div class="card_list" store_tel="' + store_tel + '" store_id="' + store_id + '" vip_id="' + vip_id + '">' +
						'<img class="card_in" src="' + tl_imgurl + '" alt="" />' +
						'<img class="card_out" src="' + tl_bagurl1 + '" alt="" />' +
						'<span class="card_shop_name">' + store_name + '</span>' +
						'<span class="card_shop_num">' + vip_sn + '</span>' +
						'<span class="card_shop_type">' + cardtype_name + '</span>' +
						'<span class="card_shop_prize">' + BalanceArray + '</span>' +
						'<img class="card_shop_tel" src="../../images/50px_50px_icon_P.png" alt="" />' +
						'</div>';
				} else {
					var card_list_div = '<div class="card_list_c" store_tel="' + store_tel + '" store_id="' + store_id + '" vip_id="' + vip_id + '">' +
						'<img class="card_out_c" src="' + tl_bagurl + '" alt="" />' +
						'<img class="card_in_c" src="' + tl_imgurl + '" alt="" />' +
						'<span class="card_shop_name_c">' + store_name + '</span>' +
						'<span class="card_shop_num_c">' + vip_sn + '</span>' +
						'<span class="card_shop_type_c">' + cardtype_name + '</span>' +
						'<span class="card_shop_prize_c">' + BalanceArray + '</span>' +
						'<img class="card_shop_tel_c" src="../../images/50px_50px_icon_P.png" alt="" />' +
						'</div>';
				}
				$('.card_area').append(card_list_div);

				mui(".card_area").on('tap', '.card_list,.card_list_c', function() {
					var vip_id = $(this).attr('vip_id');
					var store_id = $(this).attr('store_id');
					//					var webview = mui.openWindow({
					//						url: 'index_main_card/index_main_card_detail.html',
					//						extras: {
					//							member_id: member_id,
					//							vip_id: vip_id,
					//							token: token,
					//							store_id: store_id
					//						}
					//					});
					window.location.href = 'index_main_card/index_main_card_detail.html?member_id=' + member_id + '&token=' + token + '&vip_id=' + vip_id + '&store_id=' + store_id;

				})

			}
		}

	}

	function GetVips(getvips_url, member_id, page_num, page_size, token) {
		$.getJSON(getvips_url + '?member_id=' + member_id + '&page_num=' + page_num + '&page_size=' + page_size + '&token=' + token,
			function(data) {
				//				console.log(data);
				main_pinjie(data);
			})

	}
	GetVips(getvips_url, member_id, page_num, page_size, token);

	//				搜索功能接口

	function GetVipDimInfo(getvipdiminfo_url, member_id, member_name, token) {
		$.getJSON(getvipdiminfo_url + '?member_id=' + member_id + '&member_name=' + member_name + '&token=' + token,
			function(data) {
				console.log(data);
				main_pinjie(data);
			})

	};

	//				搜索功能
	$('#search').change(function() {
		var member_name = $('#search').val();
		GetVipDimInfo(getvipdiminfo_url, member_id, member_name, token);
	});

	var getmsgcount_url = test_url + '/api/member/GetMsgCount';
	//	获取消息数量
	function GetMsgCount(getmsgcount_url, member_id, token) {
		$.getJSON(getmsgcount_url + '?member_id=' + member_id + '&token=' + token,
			function(data) {
				console.log(data);
				var TradeCount = data.Data.TradeCount;
				var ActivityCount = data.Data.ActivityCount;
				if(TradeCount > 9) {
					TradeCount = '...';
				}
				if(ActivityCount > 9) {
					ActivityCount = '...';
				}
				$('#TradeCount').text(TradeCount);
				$('#ActivityCount').text(ActivityCount);
			})
	}

	var getmsglist_url = test_url + '/api/member/GetMsgList';
	//	获取消息列表
	function GetMsgList(getmsglist_url, member_id, type, page_num, page_size) {
		$.getJSON(getmsglist_url + '?member_id=' + member_id + '&token=' + token + '&type=' + type + '&page_num=' + page_num + '&page_size=' + page_size,
			function(data) {
				console.log(data);
				if(page_num == 1) {
					$('.message_div').empty();
				}
				var Messages = data.Data.Messages;
				if(Messages == '' && page_num == 1) {
					var no_data_div =
						'<div class="no_data">暂无数据</div>';
					$('.message_div').append(no_data_div);
				} else {
					for(var i = 0; i < Messages.length; i++) {
						var Title = Messages[i].Title;
						var HeightLightTxt = Messages[i].HeightLightTxt;
						var ExtenVals = Messages[i].ExtenVals;
						var ExtenVals_a_key = ExtenVals[0].key;
						var ExtenVals_a_val = ExtenVals[0].val;
						var ExtenVals_b_key = ExtenVals[1].key;
						var ExtenVals_b_val = ExtenVals[1].val;
						var ExtenVals_c_key = ExtenVals[2].key;
						var ExtenVals_c_val = ExtenVals[2].val;
						var message_div =
							'<div class="message_time">' +
							'<span>7月13日 上午11:50</span>' +
							'</div>' +
							'<div class="message_square">' +
							'<div class="square_head">' +
							Title +
							'</div>' +
							'<div class="square_prize">' +
							'<span class="square_prize_num">' +
							HeightLightTxt +
							'</span>' +
							'<span class="square_prize_unit">元</span>' +
							'</div>' +
							'<div class="square_body">' +
							'<div class="body_list">' +
							'<span>' +
							ExtenVals_a_key +
							'</span>' +
							'<span>:</span>' +
							'<span>' +
							ExtenVals_a_val +
							'</span>' +
							'</div>' +
							'<div class="body_list">' +
							'<span>' +
							ExtenVals_b_key +
							'</span>' +
							'<span>:</span>' +
							'<span>' +
							ExtenVals_b_val +
							'</span>' +
							'</div>' +
							'<div class="body_list">' +
							'<span>' +
							ExtenVals_c_key +
							'</span>' +
							'<span>:</span>' +
							'<span>' +
							ExtenVals_c_val +
							'</span>' +
							'</div>' +
							'</div>' +
							'<div class="square_detial">' +
							'<span>查看详情</span>' +
							'<img src="../../images/16px_26px_V.png" alt="" />' +
							'</div>' +
							'</div>';
						$('.message_div').append(message_div);
					}
				}
			})
	}

	//	选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {

		var label_name = this.querySelector('.mui-tab-label').innerHTML;
		if(label_name == '卡包') {
			$('.mui-scroll').empty();
			scroll_status = '卡包';
			$('.main_head').show();
			$('.main_nav').hide();
			$('.kabao_icon').attr('src', '../../images/48px_48px_card_red.png');
			$('.message_icon').attr('src', '../../images/48px_48px_news_gray.png');
			$('.mine_icon').attr('src', '../../images/48px_48px_me_gray.png');
			$('.set_icon').attr('src', '../../images/48px_48px_set_gray.png');
			$('.mui-tab-label').css('color', '#7d7c82');
			$('.kabao_text').css('color', '#cb2920');
			$('.mui-content').hide();
			$('.index_main_card').show();
			$('.index_main_message').hide();
			page_num = 1;
			GetVips(getvips_url, member_id, page_num, page_size, token);
			//					var w = plus.webview.create( "index_main_card.html" );
			//					w.show(); // 显示窗口
		} else if(label_name == '消息') {
			$('.mui-scroll').empty();
			scroll_status = '消息';
			$('.mui-title').text('消息中心');
			$('.main_head').hide();
			$('.main_nav').show();
			$('.kabao_icon').attr('src', '../../images/48px_48px_card_gray.png');
			$('.message_icon').attr('src', '../../images/48px_48px_news_red.png');
			$('.mine_icon').attr('src', '../../images/48px_48px_me_gray.png');
			$('.set_icon').attr('src', '../../images/48px_48px_set_gray.png');
			$('.mui-tab-label').css('color', '#7d7c82');
			$('.message_text').css('color', '#cb2920');
			$('.mui-content').hide();
			$('.index_main_card').show();
			$('.index_main_message').show();
			//						page_num = 1;
			//						GetMemberNotice(getmembernotice_url, member_id, page_num, page_size, token);
			GetMsgCount(getmsgcount_url, member_id, token);
			var type = '001';
			var page_num = 1;
			var page_size = 20;
			GetMsgList(getmsglist_url, member_id, type, page_num, page_size);

			document.getElementById('message_left').addEventListener('tap', function() {
				page_num = 1;
				var type = '001';
				GetMsgList(getmsglist_url, member_id, type, page_num, page_size);
			})
			document.getElementById('message_right').addEventListener('tap', function() {
				page_num = 1;
				var type = '002';
				GetMsgList(getmsglist_url, member_id, type, page_num, page_size);
			})

		} else if(label_name == '我的') {
			$('.mui-title').text('个人中心');
			$('.main_head').hide();
			$('.main_nav').show();
			$('.kabao_icon').attr('src', '../../images/48px_48px_card_gray.png');
			$('.message_icon').attr('src', '../../images/48px_48px_news_gray.png');
			$('.mine_icon').attr('src', '../../images/48px_48px_me_red.png');
			$('.set_icon').attr('src', '../../images/48px_48px_set_gray.png');
			$('.mui-tab-label').css('color', '#7d7c82');
			$('.mine_text').css('color', '#cb2920');
			$('.mui-content').hide();
			$('.index_main_mine').show();
			//			var member_name = Member.member_name;
			//			var phone = Member.phone;
			//			var birthday = Member.birthday;
			//			birthday = birthday.slice(0, 10);
			//			var thumb = Member.thumb;

			if(thumb == "" || !thumb) {
				thumb = '../../images/146px_146px_moren.png';
			}
			$('#member_name').text(member_name);
			$('#phone').text(phone);
			$('#birthday').text(birthday);
			$('#thumb').attr('src', thumb);
			//			点击名字修改个人信息
			document.getElementById('thumb').addEventListener('tap', function() {
				var name = $('#member_name').text();
				var phone = $('#phone').text();
				var webview = mui.openWindow({
					url: 'index_main_mine/index_main_mine_personal.html',
					extras: {
						member_id: member_id,
						name: name,
						phone: phone,
						token: token,
						thumb: thumb
					},
					createNew: true
				});
			})

		} else if(label_name == '设置') {
			$('.mui-title').text('设置');
			$('.main_head').hide();
			$('.main_nav').show();
			$('.kabao_icon').attr('src', '../../images/48px_48px_card_gray.png');
			$('.message_icon').attr('src', '../../images/48px_48px_news_gray.png');
			$('.mine_icon').attr('src', '../../images/48px_48px_me_gray.png');
			$('.set_icon').attr('src', '../../images/48px_48px_set_red.png');
			$('.mui-tab-label').css('color', '#7d7c82');
			$('.set_text').css('color', '#cb2920');
			$('.mui-content').hide();
			$('.index_main_setting').show();
			var phone = Member.phone;
			//					安全设置
			document.getElementById('setting_security').addEventListener('tap', function() {
					var webview = mui.openWindow({
						url: 'index_main_setting/index_main_setting_security.html',
						extras: {
							member_id: member_id,
							name: name,
							phone: phone,
							token: token
						}
					});
				})
				//			消息设置
			document.getElementById('setting_message').addEventListener('tap', function() {
				var webview = mui.openWindow({
					url: 'index_main_setting/index_main_setting_message.html',
					extras: {
						member_id: member_id,
						name: name,
						phone: phone,
						token: token
					},
					createNew: true
				});
			})

			//			问题解决
			document.getElementById('setting_question').addEventListener('tap', function() {
					var webview = mui.openWindow({
						url: 'index_main_setting/index_main_setting_question.html',
						extras: {
							member_id: member_id,
							name: name,
							phone: phone,
							token: token
						},
						createNew: true
					});
				})
				//			关于BD
			document.getElementById('setting_about').addEventListener('tap', function() {
				var webview = mui.openWindow({
					url: 'index_main_setting/index_main_setting_about.html',
					extras: {
						member_id: member_id,
						name: name,
						phone: phone,
						token: token
					},
					createNew: true
				});
			})

		}
	});

}