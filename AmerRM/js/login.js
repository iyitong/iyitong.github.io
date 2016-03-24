/**	
 * author:cyt
 * update:2016.03.17
 * desc: 登陆
 **/
window.onload = function() {
	// 菜单栏切换
	var $a = $('.login-nav ul li a'),
	$form = $('.form');

	$('.login-nav ul li a').mouseover(function(){
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
	$('.js-forgetpwd').click(function(){
		$('.login-wrap').addClass('fn-hide');
		$('.forget-pwd').removeClass('fn-hide');
	});

	// 从忘记密码页面返回登录
	$('.js-goback').click(function(){
		$('.forget-pwd').addClass('fn-hide');
		$('.login-wrap').removeClass('fn-hide');
	});

	// 忘记密码返回上一步
	$('.js-goback-prev').click(function(){
		$('#setPwdForm').addClass('fn-hide');
		$('#getCodeForm').removeClass('fn-hide');
	});

	// 登陆
	function login() {
		var options = {
			target: '',
			beforeSubmit: beforeSubmit,
			success: success,
			url: '',
			type: 'post',
			resetForm: true,
			dataType: 'json'
		};
		$('#loginForm').ajaxForm(options);
	}

	login();

	function beforeSubmit(formData, jqForm, options) {
		// 这里写提交表单请的验证
		var uname = $('#uname').val(),
			upwd = $('#upwd').val();

		if (uname == '') {
			var msg = '请输入管理员账号';
			showMsg(msg,'w');

			$('#uname').focus();
			return false;
		} else if (upwd == '') {
			var msg = '请输入管理员密码';
			showMsg(msg,'w');

			$('#upwd').focus();
			return false;
		} else {
			return true;
		}
	}

	function success(responseText, statusText, xhr, $form) {
		// 表单提交后的操作
		if (responseText.errcode == 0) {

		} else {
			alert(responseText.info);
		}
	}
}