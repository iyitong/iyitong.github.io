/**	
 * author:cyt
 * update:2016.03.17
 * desc: 登陆
 **/
window.onload = function() {
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