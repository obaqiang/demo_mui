if(navigator.userAgent.indexOf("Html5Plus") < 0) { //不支持5+ API
	var account = 'false';
	var pwd = 'false';
	var identify;
	$('form :input').blur(function() {
		//验证用户名
		if($(this).is('#account')) {
			if(this.value == "") {
				var errorMsg = '用户名不能为空';
				//						console.log(errorMsg);
				$('.login_alert span').text(errorMsg);
				account = 'false';

			} else {
				account = 'true';
			}
		}
		//验证密码
		if($(this).is('#password')) {
			if(this.value == "") {
				var errorMsg = '密码不能为空';
				//						console.log(errorMsg);
				$('.login_alert span').text(errorMsg);
				pwd = 'false';
			} else {
				pwd = 'true';
			}
		}
		//验证验证码
		if($(this).is('#identify_code')) {
			if(this.value == "") {
				var errorMsg = '我的验证码不能为空';
				//						console.log(errorMsg);
				$('.login_alert span').text(errorMsg);
				identify = 'false';
			} else {
				identify = 'true';

			}
		}

	}).keyup(function() {
		$(this).triggerHandler("blur");

	}).focus(function() {
		$(this).triggerHandler("blur");
	}); //end blur

	var url_login = test_url + '/api/member/LoginVerify';

	function verifycode(url_login, account, pwd, VerifyCode) {
		$.getJSON(url_login + '?account=' + account + '&pwd=' + pwd + '&VerifyCode=' + VerifyCode,
			function(data) {
				console.log(data);
				if(data.Data.ErrorCode == 0) {
					//					普通浏览器不支持此类跳转，原因：参数无法传送
					//					var webview = mui.openWindow({
					//						url: '../home/index_main_anzhuo.html',
					//						id: 'index_main_anzhuo',
					//						extras: {
					//							member_id: data.Data.Member.id,
					//							token: data.Data.Token,
					//							Member: data.Data.Member
					//						},
					//						createNew: true
					//					});
					var member_id = data.Data.Member.id;
					var token = data.Data.Token;
					var Member=data.Data.Member;
					var member_name = Member.member_name;
					var phone = Member.phone;
					var birthday = Member.birthday;
					birthday = birthday.slice(0, 10);
					var thumb = Member.thumb;
					console.log(member_name)
					//					console.log('../home/index_main_anzhuo.html?member_id='+member_id+'&token='+token+'&Member='+Member);
					window.location.href = '../home/index_main_anzhuo.html?member_id=' + member_id + '&token=' + token + '&member_name=' + member_name + '&birthday=' + birthday + '&thumb=' + thumb;

				} else if(data.ErrorCode == 4) {
					var errorMsg = data.ErrorMessage;
					Alert(errorMsg);
					$('#identify').show();
					var tel = $('#account').val();
					var tel_url = test_url + '/api/member/verifycode?deviceToken=&phone=';
					var identify_url = tel_url + tel + '&t=' + new Date().getTime();
					$('#identify_img').attr('src', identify_url);
					document.getElementById('identify_img').addEventListener('tap', function() {
						var tel = $('#account').val();
						var tel_url = test_url + '/api/member/verifycode?deviceToken=&phone=';
						var identify_url = tel_url + tel + '&t=' + new Date().getTime();
						$('.identify_img').attr('src', identify_url);
					});
				} else {
					var errorMsg = data.ErrorMessage;
					Alert(errorMsg);
				}

			});
	}

	$('#login').click(function() {
		if(account == 'false') {
			var errorMsg = '用户名不能为空';
			Alert(errorMsg);
		} else if(pwd == 'false') {
			var errorMsg = '密码不能为空';
			Alert(errorMsg);
		} else if(identify == 'false') {
			var errorMsg = '验证码不能为空';
			Alert(errorMsg);
		} else {

			if(!navigator.onLine) { //如果断网
				return;
			}
			var d_account = $('#account').val();
			var d_pwd = $('#password').val();
			var d_identify_code = $('#identify_code').val();
			verifycode(url_login, d_account, d_pwd, d_identify_code);
		}

	})

}