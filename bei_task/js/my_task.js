/*
 *	By cyt
 * 	2016.05.10 20:23
 * 	生活圈管理模块
 */
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if (r != null)
		return r[2];
	return null;
}

var is_page = 1, //是否分页，1：是，0：否
	page = 1, //页数
	each_page = 10; //每页条数

// 获取生活圈文章列表
// function getLiveCircleList(page) {
// 	var school_id = getUrlParam('school_id');
// 	$('#loading_tips').html('<span class="null-tips"><i class="loading"></i>数据加载中...</span>');

// 	var totalPage = $('#totalPage').val();
// 	if (page > totalPage) {
// 		$('#scroller-pullUp').addClass('fn-hide');
// 		return false;
// 	}
// 	$.getJSON('/API/LiveCircle/get_list', {
// 		school_id: school_id,
// 		is_page: is_page,
// 		page: page,
// 		each_page: each_page
// 	}, function(res) {
// 		$('#currentPage').val(page);
// 		if (res.errcode == 0) {
// 			var articles = res.data.articles,
// 				articles_len = articles.length,
// 				count = res.data.count,
// 				totalPage = Math.ceil(count / each_page),
// 				box = '';

// 			$('#totalPage').val(totalPage);

// 			if (articles == '') {
// 				if (page == 1) {
// 					$('#live_circle_list').html('<span class="null-tips">暂无数据</span>');
// 				}
// 			} else {
// 				if (articles_len == each_page) {
// 					$('#scroller-pullUp').removeClass('fn-hide');
// 				}
// 				$.each(articles, function(i, item) {
// 					var id = articles[i].id, //文章id
// 						c_date = articles[i].c_date, //文章创建时间
// 						title = articles[i].title, //文章标题
// 						cover = articles[i].cover, //文章封面
// 						summary = articles[i].summary, //文章摘要
// 						go_url = articles[i].go_url; //跳转详细页链接

// 					box += '<li>\
// 						<p class="c-date"><span>' + c_date + '</span></p>\
// 						<a href="/API/LiveCircle/info' + go_url + '">\
// 							<div class="box">\
// 								<p class="title">' + title + '</p>\
// 								<span class="cover"><img src="' + cover + '" alt="cover"></span>\
// 								<p class="summary">' + summary + '</p>\
// 								<div class="go-url">查看全文<span class="fn-right">&gt;&gt;</span></div>\
// 							</div>\
// 						</a>\
// 					</li>';
// 				});
// 				if (page == 1) {
// 					$('#live_circle_list').html(box);
// 				} else {
// 					$('#live_circle_list').append(box);
// 				}
				
// 				var myScroll = new IScroll('#wrapper', {
// 					probeType: 3,
// 					click: true
// 				});
// 				myScroll.refresh();
// 			}
// 		} else {
// 			$('#live_circle_list').html('<span class="null-tips">' + res.info + '</span>');
// 		}
// 	});
// }

// 初始化时调用
function loaded() {
	var myScroll,
		upIcon = $("#up-icon"),
		downIcon = $("#down-icon");

	myScroll = new IScroll('#wrapper', {
		probeType: 3,
		click: true
	});

	myScroll.on("scroll", function() {
		var y = this.y,
			maxY = this.maxScrollY - y,
			downHasClass = downIcon.hasClass("reverse_icon"),
			upHasClass = upIcon.hasClass("reverse_icon");

		if (y >= 40) {
			$('#pullDown-msg').html('松开立即刷新');
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		} else if (y < 40 && y > 0) {
			$('#pullDown-msg').html('下拉刷新');
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}

		if (maxY >= 40) {
			$('#pullUp-msg').html('松开立即加载');
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		} else if (maxY < 40 && maxY >= 0) {
			$('#pullUp-msg').html('上拉加载更多');
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});
	myScroll.on("slideDown", function() {
		if (this.y > 40) {
			// getLiveCircleList(1);
			upIcon.removeClass("reverse_icon");
		}
	});
	myScroll.on("slideUp", function() {
		if (this.maxScrollY - this.y > 40) {
			// var currentPage = parseInt($('#currentPage').val()) + 1;
			// getLiveCircleList(currentPage);
			upIcon.removeClass("reverse_icon");
		}
	});
}

$(document).ready(function() {
	var screenHeight = window.screen.height;
	$('#scroller ul').css('min-height', screenHeight / 50 + 'rem');
	// getLiveCircleList(1);
	setTimeout('loaded();', 300);
});