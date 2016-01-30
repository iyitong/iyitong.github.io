// 导航栏切换
function navClick (ele) {
	var data_id = $(ele).attr('data-id');

	$('#content_' + data_id).removeClass('fn-hide').siblings('.content').addClass('fn-hide');
	$(ele).parent('li').addClass('active').siblings('li').removeClass('active');
}

var slider = Swipe(document.getElementById('scroll_img'), {
	auto: 3000,
	continuous: true,
	callback: function(pos) {
		var i = bullets.length;
		while (i--) {
			bullets[i].className = ' ';
		}
		bullets[pos].className = 'on';
	}
});
var bullets = document.getElementById('scroll_position').getElementsByTagName('li');
$(function(){
	$('.scroll-position-bg').css({
		width:$('#scroll_position').width()
	});

	var hash = window.location.hash,
		hashStr = hash.replace('#','');

	$('#content_' + hashStr).removeClass('fn-hide').siblings('.content').addClass('fn-hide');
	$('#nav_' + hashStr).addClass('active').siblings('li').removeClass('active');
});