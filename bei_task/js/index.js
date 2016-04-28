/*
* desc: 呗悬赏首页功能
* create: 2016.04.28 10:24
* author: cyt
* version: 1.0
*/

var base_url = 'http://www.bei_task.tao2.me:88/task/';

// 获取分类列表
function get_sort_list() {
	$.getJSON(base_url + 'get_sort_list',{},function(res) {

	});
}

$(document).ready(function(){
	get_sort_list();
});