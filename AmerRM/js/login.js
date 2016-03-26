/**	
 * author:cyt
 * update:2016.03.24
 * desc: 登录
 **/

var base_url = '/area/';

window.onload = function() {
	// 菜单栏切换
	var $a = $('.login-nav ul li a'),
		$form = $('.form');

	$('.login-nav ul li a').click(function() {
		var data_id = $(this).attr('data-id');

		for (var i = 0, len = $a.length; i < len; i++) {
			$a.eq(i).parent().removeClass('active');
			$form.eq(i).addClass('fn-hide');

			var data_id_i = $a.eq(i).attr('data-id');

			if (data_id == data_id_i) {
				$a.eq(i).parent().addClass('active');
				$form.eq(i).removeClass('fn-hide');
			}
		}
	});

	// 根据hash值显示内容
	var hash = window.location.hash;
	if (hash == '#forgetpwd') {
		$('.login-wrap').addClass('fn-hide');
		$('.forget-pwd').removeClass('fn-hide');
	} else {
		$('.forget-pwd').addClass('fn-hide');
		$('.login-wrap').removeClass('fn-hide');
	}

	// 进入忘记密码页面
	$('.js-forgetpwd').click(function() {
		$('.forget-pwd').removeClass('fn-hide');
		$('.login-wrap').addClass('fn-hide');
	});

	// 从忘记密码页面返回登录
	$('.js-goback').click(function() {
		$('.login-wrap').removeClass('fn-hide');
		$('.forget-pwd').addClass('fn-hide');
	});

	// 忘记密码返回上一步
	$('.js-goback-prev').click(function() {
		$('#reSetPasswordForm').addClass('fn-hide');
		$('#emailForm').removeClass('fn-hide');
	});

	// 登录
	function login() {
		var options = {
			target: '',
			beforeSubmit: beforeSubmit,
			success: success,
			url: base_url + 'login',
			type: 'post',
			resetForm: true,
			dataType: 'json'
		};
		$('#loginForm').ajaxForm(options);
	}
	login();

	function beforeSubmit(formData, jqForm, options) {
		// 这里写提交表单请的验证
		var login_email = $('#login_email').val(),
			login_password = $('#login_password').val();

		if (login_email == '') {
			var msg = '请输入邮箱';
			showMsg(msg, 'w');
			$('#login_email').focus();
			return false;
		} else if (login_password == '') {
			var msg = '请输入密码';
			showMsg(msg, 'w');

			$('#login_password').focus();
			return false;
		} else {
			document.getElementById('login_btn').setAttribute('disabled', 'disabled');
			$('#login_btn').html('正在登录...');
			return true;
		}
	}

	function success(responseText, statusText, xhr, $form) {
		document.getElementById('login_btn').removeAttribute('disabled');
		$('#login_btn').html('登&nbsp;录');
		// 表单提交后的操作
		if (responseText.errcode == 0) {
			window.location.href = base_url;
		} else {
			showMsg(responseText.info, 'w');
		}
	}

	// 注册
	function register() {
		var options = {
			target: '',
			beforeSubmit: registerBeforeSubmit,
			success: registerSuccess,
			url: base_url + 'register',
			type: 'post',
			resetForm: true,
			dataType: 'json'
		};
		$('#regForm').ajaxForm(options);
	}
	register();

	function registerBeforeSubmit(formData, jqForm, options) {
		// 这里写提交表单请的验证
		var reg_email = $('#reg_email').val(),
			reg_password = $('#reg_password').val(),
			reg_name = $('#reg_name').val(),
			reg_cellphone = $('#reg_cellphone').val(),
			reg_alipay = $('#reg_alipay').val(),
			reg_address = $('#reg_address').val(),
			phoneReg = /^1\d{10}$/;

		if (reg_email == '') {
			var msg = '请输入您的邮箱';
			showMsg(msg, 'w');
			$('#reg_email').focus();
			return false;
		} else if (reg_password == '') {
			var msg = '请输入您的登录密码';
			showMsg(msg, 'w');

			$('#reg_password').focus();
			return false;
		} else if (reg_name == '') {
			var msg = '请输入您的姓名';
			showMsg(msg, 'w');

			$('#reg_name').focus();
			return false;
		} else if (!phoneReg.test(reg_cellphone)) {
			var msg = '请输入11位手机号码';
			showMsg(msg, 'w');

			$('#reg_cellphone').focus();
			return false;
		} else if (reg_alipay == '') {
			var msg = '请输入您的支付宝账号';
			showMsg(msg, 'w');

			$('#reg_alipay').focus();
			return false;
		} else if (reg_address == '') {
			var msg = '请输入您的详细地址';
			showMsg(msg, 'w');

			$('#reg_address').focus();
			return false;
		} else {
			document.getElementById('reg_btn').setAttribute('disabled', 'disabled');
			$('#reg_btn').html('正在注册...');
			return true;
		}
	}

	function registerSuccess(responseText, statusText, xhr, $form) {
		document.getElementById('reg_btn').removeAttribute('disabled');
		$('#reg_btn').html('注&nbsp;册');
		// 表单提交后的操作
		if (responseText.errcode == 0) {
			$('#regForm').addClass('fn-hide');
			$('#nav_login').addClass('active');

			$('#loginForm').removeClass('fn-hide');
			$('#nav_reg').removeClass('active');
		} else {
			showMsg(responseText.info, 'w');
		}
	}

	// 获取邮箱验证码
	function email() {
		var options = {
			target: '',
			beforeSubmit: emailBeforeSubmit,
			success: emailSuccess,
			url: base_url + 'email',
			type: 'post',
			resetForm: true,
			dataType: 'json'
		};
		$('#emailForm').ajaxForm(options);
	}
	email();

	function emailBeforeSubmit(formData, jqForm, options) {
		// 这里写提交表单请的验证
		var forget_email = $('#forget_email').val();

		if (forget_email == '') {
			var msg = '请输入邮箱';
			showMsg(msg, 'w');
			$('#forget_email').focus();
			return false;
		} else {
			setCookie('email',forget_email,7);
			document.getElementById('email_btn').setAttribute('disabled', 'disabled');
			$('#email_btn').html('发送验证码...');
			return true;
		}
	}

	function emailSuccess(responseText, statusText, xhr, $form) {
		document.getElementById('email_btn').removeAttribute('disabled');
		$('#email_btn').html('下一步');
		// 表单提交后的操作
		if (responseText.errcode == 0) {
			var randomNumber = responseText.data.randomNumber;
			setCookie('randomNumber', randomNumber, 7);
			
			var email = getCookie('email');
			$('#forget_email_html').html(email);

			$('#emailForm').addClass('fn-hide');
			$('#reSetPasswordForm').removeClass('fn-hide');
		} else {
			showMsg(responseText.info, 'w');
		}
	}

	// 重设验证码
	function reSetPassword() {
		var options = {
			target: '',
			beforeSubmit: reSetPasswordBeforeSubmit,
			success: reSetPasswordSuccess,
			url: base_url + 'reSetPassword',
			type: 'post',
			resetForm: true,
			dataType: 'json'
		};
		$('#reSetPasswordForm').ajaxForm(options);
	}
	reSetPassword();

	function reSetPasswordBeforeSubmit(formData, jqForm, options) {
		// 这里写提交表单请的验证
		var forget_randomNumber = $('#forget_randomNumber').val(),
			randomNumber = getCookie('randomNumber'),
			forget_password = $('#forget_password').val(),
			forget_password_confirm = $('#forget_password_confirm').val();

		if (forget_randomNumber == '') {
			var msg = '请输入邮箱验证码';
			showMsg(msg, 'w');
			$('#forget_randomNumber').focus();
			return false;
		} else if (forget_password == '') {
			var msg = '请输入新密码';
			showMsg(msg, 'w');
			$('#forget_password').focus();
			return false;
		} else if (forget_password != forget_password_confirm) {
			var msg = '两次密码不一致';
			showMsg(msg, 'w');
			$('#forget_password_confirm').focus();
			return false;
		} else if (forget_randomNumber != randomNumber) {
			var msg = '邮箱验证码不正确';
			showMsg(msg, 'w');
			$('#forget_randomNumber').focus();
			return false;
		} else {
			document.getElementById('reSetPassword_btn').setAttribute('disabled', 'disabled');
			$('#reSetPassword_btn').html('正在重设...');
			return true;
		}
	}

	function reSetPasswordSuccess(responseText, statusText, xhr, $form) {	
		document.getElementById('reSetPassword_btn').removeAttribute('disabled');
		$('#reSetPassword_btn').html('确定重设');
		// 表单提交后的操作
		if (responseText.errcode == 0) {
			$('.forget-pwd').addClass('fn-hide');
			$('.login-wrap').removeClass('fn-hide');
			$('#emailForm').removeClass('fn-hide');
			$('#reSetPasswordForm').addClass('fn-hide');

			var msg = '密码重设成功，请重新登录';
			showMsg(msg, 'w');
		} else {
			showMsg(responseText.info, 'w');
		}
	}
}