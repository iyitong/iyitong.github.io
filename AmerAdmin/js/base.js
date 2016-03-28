/**	
 * author:cyt
 * update:2016.03.24
 * desc: 通用部分
 **/

// 判断是否已经登录
function isLogin() {
	$.post('/area/isLogin', {}, function(res) {
		if (res.errcode == 0) {
			var state = res.data.state,
			name = res.data.name;
			
			$('#aberName').html(name);
		} else if (res.errcode == 2) {
			showMsg(res.info + '3秒后跳转到登录页面', 'w');
			setTimeout("window.location.href = '/area/loginFTL';",3000);
		}else {
			showMsg(res.info, 'w');
		}
	}, 'json');
}

// 侧边栏切换
function tab(data_id) {
	var $item = $('.menu-item a');
	for (var i = 0, len = $item.length; i < len; i++) {
		$item.eq(i).parent().removeClass('active');

		var data_id_i = $item.eq(i).attr('data-id');

		if (data_id == data_id_i) {
			$item.eq(i).parent().addClass('active');
			$('#main_' + data_id).removeClass('fn-hide').siblings('.main').addClass('fn-hide');
		}
	}
		
	// 根据不同的页面调用不同的方法
	if (data_id == 'home') {
	} else if (data_id == 'signer') {
	} else if (data_id == 'achievement') {
	}
}

// 主题内容部分菜单栏切换
function mainTab(ele) {
	$(ele).parent().addClass('active').siblings('li').removeClass('active');
}

$(function(){
	// 退出
	$('.js-logout').click(function() {
		$.post('/area/logout', {}, function(res) {
			if (res.errcode == 0) {
				window.location.href = '/area/loginFTL';
			} else {
				showMsg(res.info, 'w');
			}
		}, 'json');
	});

	// 菜单栏显示
	var hash = window.location.hash,
		hash_len = hash.length,
		hash_r = hash.substring(1, hash_len);

	if (hash_r == '') {
		hash_r = 'item_list';
	}
	tab(hash_r);

	$('.menu-item a').click(function() {
		var data_id = $(this).attr('data-id');
		tab(data_id);
	});

	// 问号帮助提示
	var timer = '';
	$('.help-icon').mouseover(function() {
		window.clearInterval(timer);
		$(this).siblings('.help_content').show();
	});
	$('.help-icon').mouseout(function() {
		timer = setInterval("$('.help-icon').siblings('.help_content').hide();", 1000);
	});
	$('.help_content').mouseover(function() {
		window.clearInterval(timer);
	});
	$('.help_content').mouseout(function() {
		timer = setInterval("$('.help_content').hide();", 1000);
	});
});