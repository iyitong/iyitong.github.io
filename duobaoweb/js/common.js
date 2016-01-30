// 导航栏切换
function navClick (ele) {
	var data_id = $(ele).attr('data-id');

	$('#content_' + data_id).removeClass('fn-hide').siblings('.content').addClass('fn-hide');
	$(ele).parent('li').addClass('active').siblings('li').removeClass('active');
}