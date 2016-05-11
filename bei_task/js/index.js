/*
* desc: 呗悬赏首页功能
* create: 2016.04.28 10:24
* author: cyt
* version: 1.0
*/

var base_url = 'http://bei_task.tao2.me:88/task/';

// 获取分类列表
function get_sort_list() {
	$.getJSON(base_url + 'get_sort_list?callback=?',{},function(res) {
console.log(res.errcode);
		if (res.errcode == 0) {
			var data = res.data;
			console.log(data);
		} else {
			alert(res.info);
		}
	});
	// $.ajax({
	// 	type:"get",
	// 	async:true,
	// 	url: base_url + 'get_sort_list',
	// 	dataType:'jsonp',
	// 	jsonp:"callback",
	// 	success:function(data){
	// 		console.log(data);
	// 		JSON.stringify(data);
	// 	},
	// 	error:function(data){
	// 		alert('error');
	// 	}
	// });
}

$(document).ready(function(){
	get_sort_list();
});