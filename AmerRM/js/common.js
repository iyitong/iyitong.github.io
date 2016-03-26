//将时间戳转换成年月日
function getLocalTime(nS, type) {
	/*
	 * nS:为传进来的时间戳
	 * type:时间显示模式.若传入12则为12小时制,不传入则为24小时制
	 */
	//年月日时分秒
	var Y,
	M,
	D,
	H,
	I,
	S;
	//月日时分秒为单位时前面补零
	function fillZero(v) {
		if (v < 10) {
			v = '0' + v;
		}
		return v;
	}
	var d = new Date(parseInt(nS / 1000) * 1000);
	var Week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	Y = d.getFullYear();
	M = fillZero(d.getMonth() + 1);
	D = fillZero(d.getDate());
	W = Week[d.getDay()];
	H = fillZero(d.getHours());
	I = fillZero(d.getMinutes());
	S = fillZero(d.getSeconds());
	//12小时制显示模式
	if (type && type == 12) {
		//若要显示更多时间类型诸如中午凌晨可在下面添加判断
		if (H <= 12) {
			H = '上午&nbsp;' + H;
		} else if (H > 12 && H < 24) {
			H -= 12;
			H = '下午&nbsp;' + fillZero(H);
		} else if (H == 24) {
			H = '下午&nbsp;00';
		}
	}
	var localTime = Y + '/' + M + '/' + D + ' ' + H + ':' + I + ':' + S;
	return localTime;
}

function getToday() {
	var timestamp = Date.parse(new Date());
	var time = getLocalTime(timestamp);
	var Y = time.substring(0, 4);
	var M = time.substring(5, 7);
	var D = time.substring(8, 10);

	var today = Y + '-' + M + '-' + D;

	return today;
}

function getYesterday() {
	var timestamp = Date.parse(new Date());
	var sevenDay = 1 * 24 * 60 * 60 * 1000;
	var time = getLocalTime(timestamp - sevenDay);
	var Y = time.substring(0, 4);
	var M = time.substring(5, 7);
	var D = time.substring(8, 10);

	var yesterday = Y + '-' + M + '-' + D;

	return yesterday;
}

function getSevenDayAgo() {
	var timestamp = Date.parse(new Date());
	var sevenDay = 6 * 24 * 60 * 60 * 1000;
	var time = getLocalTime(timestamp - sevenDay);
	var Y = time.substring(0, 4);
	var M = time.substring(5, 7);
	var D = time.substring(8, 10);

	var SevenDayAgo = Y + '-' + M + '-' + D;

	return SevenDayAgo;
}

//自动添加千分位
function commafy(num) {
    var n = parseFloat(num).toFixed(2);
    var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
    return n.replace(re, "$1,");
}

// 自动去掉千分位
function commafyback(num) { 
    var x = num.split(','); 
    return parseFloat(x.join("")); 
}

//获取url中的问号后的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if (r != null)
		return r[2];
	return null;
}

//显示警告框
function showMsg(msg, type) {
	var type_class = '';
	if (type == '') { //默认
		type_class = '';
	} else if (type == 'w') {
		type_class = 'page-msg-warning';
	} else if (type == 's') {
		type_class = 'page-msg-success';
	}

	var msg_box = '<div class="page-msg ' + type_class + '" id="page_msg"><a href="#" class="close">&times;</a><em>' + msg + '</em></div>';
	$('body').append(msg_box);

	// 关闭警告框
	$('.close').click(function() {
		$('.page-msg').remove();
	});

	setTimeout("$('.page-msg').remove();", 3000);
}