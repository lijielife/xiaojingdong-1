// 酒店搜索结果页的js

$(function(){

	//地铁线点击切换
	var selected_line_key = 0;
	$('#subway_num_list li').each(function(k,v){
		var class_name = $(this).attr('class');
		if(class_name == 'check'){
			selected_line_key = k;
		}
		var _this = this
		$(_this).bind('click',function(){
			$(_this).attr('class','check');
			$('#subway_num_list li').eq(selected_line_key).attr('class','');
			var old_id = '#subwaycontainer_' + selected_line_key;
			var new_id = '#subwaycontainer_' + k;
			$(old_id).hide();
			$(new_id).show();
			selected_line_key = k;
		})
	})


	//如果某个栏目下数据太多，则隐藏一部分
	$('#position .filter_posi_show ul[class="filter_posi_list"]').each(function(){
		var _this = this;
		var type = $(this).attr('type');
		if(type == 'subway' || type == 'airport'){
			//continue;
		}else{
			var length = $(this).children('li').length
			if(length > 8 ) 
			{
				$(this).children('li').each(function(k,v){
					if(k > 7){
						$(this).hide();
					}
				})
				var html = '<li class="filter_more on icon_hl_more1" style="display: block;" method="showAllOps" data-typeid="5" data-showall="0"></li>'
				$(this).append(html)
				$(this).children('li').last().bind('click',function(){
					var data_showall = $(this).attr('data-showall');
					if(data_showall == 0){
						$(this).attr('data-showall',1);
						$(this).attr('class','filter_more on icon_hl_more2');
						$(_this).children('li').each(function(){
							$(this).show();
						})
					}
					else if(data_showall == 1){
						$(this).attr('data-showall',0);
						$(this).attr('class','filter_more on icon_hl_more1');
						$(_this).children('li').each(function(m,n){
							if(m > 7 && m < length){
								$(this).hide();
							}
						})
					}
				})
			}
		}
	})

	//位置里面选定条件后进行搜索,除地铁数据外的处理
	$('#position ul[class="filter_posi_list"]').each(function(){
		var type = $(this).attr('type');
		var length = $(this).children('li').length;
		if(type != 'subway'){ // 地铁的额外处理
			var _this = this;
			$(this).children('li').each(function(k,v){
				var class_name = $(this).attr('class');
				if(!class_name){ //最后一个li是隐藏/展示所有的li的，本身不做为数据
					$(this).bind('click',function(){
						$(this).attr('class','on');

						//其余的兄弟节点class置为空
						$(_this).children('li').each(function(index,val){
							var method = $(this).attr('method');
							if(index != k && method != 'showAllOps'){
								$(this).attr('class','');
							}
						})
						var attr_id = $(_this).attr('attr_id');
						var name = $(this).attr('title');
						show_search_condition(attr_id,name,'position');
					})
				}
					
			})
		}
	})
	//位置里面选定条件后进行搜索,地铁数据额外处理
	$('#position div[class="subway_station"] ul').each(function(){
		var _this = this;
		$(this).children('li').bind('click',function(){
			var attr_id = $(_this).attr('attr_id');
			var name = $(this).children('a').eq(0).attr('title');
			show_search_condition(attr_id,name,'position');
		})
	})

	//房价信息 按钮点击处理
	$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(k,v){
		var _this = this;
		$(this).bind('click',function(){
			$(_this).attr('class','on');
			$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(index,val){
				if(index != k){
					$(this).attr('class','');
				}
			})
			var attr_id = $(_this).attr('attr_id');
			var name = $(_this).attr('data-name');
			show_search_condition(attr_id,name,'price');
		})
	})

	//房价信息 自定义输入
	$('#priceConfirm').bind('click',function(){
		var lowPrice = parseInt($('#lowPrice').val());
		var highPrice = parseInt($('#highPrice').val());
		if(isNaN(lowPrice) || isNaN(highPrice) || (highPrice < lowPrice)){
			return;
		}else{
			$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(){
				$(this).attr('class','');
			})
			var attr_id = $(this).attr('attr_id');
			var name = lowPrice + '-' + highPrice + '元';
			show_search_condition(attr_id,name,'price');
		}
	})



	//页面上展示已有的搜索条件
	function show_search_condition(attr_id,name,type){
		$('#conditionZone .cond-list span').each(function(){
			var span_type = $(this).attr('type');
			if(span_type == type){ // 排他性的搜索,位置信息只能具备一个搜索条件
				$(this).remove();
			}
		})
		var span = '<span method="delCondition" data-type="allInOne" data-id="' + attr_id + '" title="删除此条件" type="' +type + '">' + name + '<i class="icon_close_hl"></i></span>';
		var a = $('#conditionZone .cond-list a');
		a.bind('click',function(){
			$(this).hide();
		})
		a.show();;
		$(span).insertBefore(a)
	}


	//ajax请求搜索
	function search(){

	}
})