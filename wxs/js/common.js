/*
 *	By cyt
 * 	update: 2016.1.27 16:33
 * 	微信书公用部分
 */

//显示加载中
function showDialog (type) {
	var msg = '',
		dialog = '';
	if (type == 0) {
		dialog = '<div class="loading-dialog"><div class="loading-inner"><div class="loading-icon"></div><p>正在排版，请稍后...</p><small>排版可能需要几分钟，请耐心等待，建议在WIFI环境下进行</small></div></div>';
	} else if (type == 1) {
		dialog = '<div class="loading-dialog"><div class="loading-inner"><div class="loading-icon"></div><p>正在加载，请稍后...</p><small>建议在WIFI环境下进行</small></div></div>';
	}

	$('body').append(dialog);
}

//移除加载中
function hideDialog () {
	$('.loading-dialog').remove();
}