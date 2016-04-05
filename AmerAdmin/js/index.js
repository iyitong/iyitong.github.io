/**	
 * author:cyt
 * update:2016.03.24
 * desc: 个人中心模块
 **/

var base_url = '/area/',
	page = 1,
	pageSize = 10;

// 获取个人信息
function getPersonalInfo() {
	$.post(base_url + 'getPersonalInfo', {}, function(res) {
		if (res.errcode == 0) {
			var data = res.data,
				email = data.email,
				name = data.name,
				cellphone = data.cellphone,
				address = data.address,
				alipay = data.alipay,
				schools = data.schools,
				addTime = data.addTime,
				money = data.money,
				state = data.state;

			if (state == 0) {
				state = '<em class="label label-primary">待审核</em>';
			} else if (state == 1) {
				state = '<em class="label label-success">正常</em>';
			} else if (state == 2) {
				state = '<em class="label label-danger">审核不通过</em>';
			}

			if (schools == '') {
				schools = '暂无负责的学校，请联系A梦分期相关负责人分配。';
			}

			$('#email').html(email);
			$('#name').html(name);
			$('#cellphone').html(cellphone);
			$('#address').html(address);
			$('#alipay').html(alipay);
			$('#schools').html(schools);
			$('#addTime').html(addTime);
			$('#money').html('￥' + commafy(money));
			$('#state').html(state);

			$('#change_name').val(name);
			$('#change_cellphone').val(cellphone);
			$('#change_alipay').val(alipay);
			$('#change_address').val(address);
		} else {
			showMsg(res.info, 'w');
		}
	}, 'json');
}

// 修改个人信息
function updatePersonalInfo() {
	var name = $('#change_name').val(),
		cellphone = $('#change_cellphone').val(),
		alipay = $('#change_alipay').val(),
		address = $('#change_address').val(),
		phoneReg = /^1\d{10}$/;

	if (name == '') {
		var msg = '请输入您的姓名';
		showMsg(msg, 'w');

		$('#change_name').focus();
		return false;
	} else if (!phoneReg.test(cellphone)) {
		var msg = '请输入11位手机号码';
		showMsg(msg, 'w');

		$('#change_cellphone').focus();
		return false;
	} else if (alipay == '') {
		var msg = '请输入您的支付宝账号';
		showMsg(msg, 'w');

		$('#change_alipay').focus();
		return false;
	} else if (address == '') {
		var msg = '请输入您的详细地址';
		showMsg(msg, 'w');

		$('#change_address').focus();
		return false;
	} else {
		document.getElementById('change_info_btn').setAttribute('disabled', 'disabled');
		document.getElementById('change_info_btn').innerHTML = '提交中...';

		$.post(base_url + 'updatePersonalInfo', {
			name: name,
			cellphone: cellphone,
			alipay: alipay,
			address: address
		}, function(res) {
			document.getElementById('change_info_btn').removeAttribute('disabled');
			document.getElementById('change_info_btn').innerHTML = '保存修改';

			if (res.errcode == 0) {
				$('#changeInfoModal').modal('hide');
				setTimeout('getPersonalInfo();', 200);
			} else {
				showMsg(res.info, 'w');
			}
		}, 'json');
	}
}

// 获取签单员列表
function getAbers(state, page) {
	$.post(base_url + 'getAbers', {
		state: state,
		page: page,
		pageSize: pageSize
	}, function(res) {
		if (res.errcode == 0) {
			var list = res.data.list,
				tr = '',
				stateText = '',
				totalRecords = res.data.size;

			if (list == '') {
				$('#signer_list').html('<span class="null-tips">暂无相关状态的签单员信息</span>');
				$('#signer_kkpager').empty();
			} else {
				var table = '<table class="table table-hover table-condensed" id="signer_table"><thead><tr><td>姓名</td><td>手机号码</td><td>学校</td><td>添加时间</td><td width="60">操作</td></tr></thead></table>';

				$('#signer_list').html(table);

				// 分页功能
				var totalPage = Math.ceil(totalRecords / pageSize);

				//生成分页
				kkpager.pagerid = 'signer_kkpager';
				kkpager.total = totalPage;
				kkpager.totalRecords = totalRecords;
				kkpager.generPageHtml({
					pno: page,
					//总页码
					total: totalPage,
					//总数据条数
					totalRecords: totalRecords,
					mode: 'click', //默认值是link，可选link或者click
					click: function(n) {
						this.selectPage(n);
						// 这里添加点击页面跳转时调用的函数
						getAbers(state, n);
						return false;
					}
				}, true);

				$.each(list, function(i, item) {
					var id = list[i].id,
						name = list[i].name,
						cellphone = list[i].cellphone,
						school = list[i].school,
						addTime = getLocalTime(list[i].addTime);

					if (state == 0) { //未授权
						stateText = '<span class="label label-warning js-updateAberState" data-id="' + id + '" data-state="1">授权</span>';
					} else {
						stateText = '<span class="label label-warning js-updateAberState" data-id="' + id + '" data-state="0">回收</span>';
					}

					tr += '<tr><td>' + name + '</td><td>' + cellphone + '</td><td>' + school + '</td><td>' + addTime + '</td><td>' + stateText + '</td></tr>';
				});

				$('#signer_table').append(tr);

				// 更改签单员的授权状态，state 1：授权，0：撤销授权
				$('.js-updateAberState').click(function() {
					var aberId = $(this).attr('data-id'),
						newstate = $(this).attr('data-state'),
						cr = '',
						tips = '';

					if (newstate == 1) {
						cr = confirm('确定 授予 该签单员上门签单的权限吗？');
						tips = '授权';
					} else {
						cr = confirm('确定 回收 该签单员上门签单的权限吗？');
						tips = '回收';
					}

					if (cr == true) {
						$.post(base_url + 'updateAberState', {
							aberId: aberId,
							state: newstate
						}, function(res) {
							if (res.errcode == 0) {
								var msg = tips + '成功';
								showMsg(msg, 'w');

								getAbers(state, page);
							} else {
								showMsg(res.info, 'w');
							}
						}, 'json');
					}
				}); //end
			}
		} else {
			showMsg(res.info, 'w');
		}
	}, 'json');
}

// 签单员导航切换
function singerTab(ele) {
	$(ele).parent().addClass('active').siblings('li').removeClass('active');
	var state = $(ele).attr('data-state');
	getAbers(state, 1);
}

// 获取每日业绩
function getDataEveryday(page) {
	var beginTime = $('#beginTime').val(),
		endTime = $('#endTime').val();

	$.post(base_url + 'getDataEveryday', {
		beginTime: beginTime,
		endTime: endTime,
		page: page,
		pageSize: pageSize
	}, function(res) {
		if (res.errcode == 0) {
			var list = res.data.list,
				tr = '';

			if (list == '') {
				$('#achievement_list').html('<span class="null-tips">暂无每日业绩数据</span>');
			} else {
				var table = '<table class="table table-hover table-condensed" id="achievement_table"><thead><tr><td>日期</td><td>付款单数</td><td>付款金额</td><td>提成</td><td width="80">明细</td></tr></thead></table>';
				$('#achievement_list').html(table);

				$.each(list, function(i, item) {
					var date = list[i].date,
						orderCount = list[i].orderCount,
						orderMoney = list[i].orderMoney,
						orderFee = list[i].orderFee;

					tr += '<tr><td>' + date + '</td><td>' + orderCount + '</td><td>￥' + commafy(orderMoney) + '</td><td>￥' + commafy(orderFee) + '</td><td><span class="label label-warning" data-date="' + date + '" onclick="getDataInfo(' + date + ');">查看明细</span></td></tr>';
				});

				$('#achievement_table').append(tr);
			}
		} else {
			showMsg(res.info, 'w');
		}
	}, 'json');
}

// 获取业绩详情
function getDataInfo(date) {
	$('#achievementDetailModal').modal('show');

	$.post(base_url + 'getDataInfo', {
		date: date
	}, function(res) {
		if (res.errcode == 0) {
			var list = res.data.list;

			if (list == '') {
				$('#achieve_detail').html('<span class="null-tips">暂无业绩详情</span>');
			} else {
				var table = '<table class="table table-hover table-condensed" id="achieve_detail_table"><thead><tr><td>学校</td><td>付款单数</td><td>付款金额</td><td>提成</td></tr></thead></table>';
				$('#achieve_detail').html(table);

				$.each(list, function(i, item) {
					var school = list[i].school,
						orderCount = list[i].orderCount,
						orderMoney = list[i].orderMoney,
						orderFee = list[i].orderFee;

					tr += '<tr><td>' + school + '</td><td>' + orderCount + '</td><td>￥' + commafy(orderMoney) + '</td><td>￥' + commafy(orderFee) + '</td></tr>';
				});

				$('#achieve_detail_table').append(tr);
			}
		} else {
			showMsg(res.info, 'w');
		}
	}, 'json');
}