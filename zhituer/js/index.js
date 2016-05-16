// 初始化时调用
function loaded() {
	var myScroll,
		upIcon = $("#up-icon"),
		downIcon = $("#down-icon");

	myScroll = new IScroll('#wrapper', {
		probeType: 3,
		mouseWheel: true
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
			console.log("slideDown");
			upIcon.removeClass("reverse_icon")
		}
	});

	myScroll.on("slideUp", function() {
		if (this.maxScrollY - this.y > 40) {
			console.log("slideUp");
			upIcon.removeClass("reverse_icon")
		}
	});
}

$(document).ready(function() {
	setTimeout('loaded();', 300);
});