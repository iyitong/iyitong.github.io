// 菜单栏切换
function tab(data_id) {
	var $item = $('.menu-item a'),
		$main = $('.main');
	for (var i = 0, len = $item.length; i < len; i++) {
		$item.eq(i).parent().removeClass('active');
		$main.eq(i).addClass('fn-hide');

		var data_id_i = $item.eq(i).attr('data-id');

		if (data_id == data_id_i) {
			$item.eq(i).parent().addClass('active');
			$main.eq(i).removeClass('fn-hide');
		}
	}
}

// 显示警告框
function showMsg (msg,type) {
	var type_class = '';
	if (type == '') {//默认
		type_class = '';
	} else if (type == 'w'){
		type_class = 'page-msg-warning';
	} else if (type == 's'){
		type_class = 'page-msg-success';
	}

	var msg_box = '<div class="page-msg ' + type_class + '" id="page_msg"><a href="#" class="close">&times;</a><em>' + msg + '</em></div>'; 
	$('body').append(msg_box);

	// 关闭警告框
	$('.close').click(function() {
		$('.page-msg').remove();
	});
}

window.onload = function() {
	var hash = window.location.hash,
		hash_len = hash.length,
		hash_r = hash.substring(1, hash_len);

	if (hash_r == '') {
		hash_r = 'home';
	}
	tab(hash_r);

	$('.menu-item a').click(function() {
		var data_id = $(this).attr('data-id');

		tab(data_id);
	});

	// 帮助提示
	$('.help').mouseover(function() {
		$('.help_content').toggle();
	});

	// 分页功能
	var totalPage = 1000,
		pageindex = 1,
		totalRecords = 100;
	//生成分页
	kkpager.total = totalPage;
	kkpager.totalRecords = totalRecords;
	kkpager.generPageHtml({
		pno: pageindex,
		//总页码
		total: totalPage,
		//总数据条数
		totalRecords: totalRecords,
		mode: 'click', //默认值是link，可选link或者click
		click: function(n) {
			this.selectPage(n);
			// 这里添加点击页面跳转时调用的函数
			return false;
		}
	}, true);
}