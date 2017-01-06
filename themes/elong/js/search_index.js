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

	/**************************** 选定某个搜索条件后的逻辑处理   start   ********************************************/

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
						var attrid = $(_this).attr('attrid');
						var name = $(this).attr('title');
						show_search_condition(attrid,name,'position');
						go_search();
					})
				}
					
			})
		}
	})
	//位置里面选定条件后进行搜索,地铁数据额外处理
	$('#position div[class="subway_station"] ul').each(function(){
		var _this = this;
		var attrid = $(_this).attr('attrid');
		$(this).children('li').bind('click',function(){
			var name = $(this).children('a').eq(0).attr('title');
			show_search_condition(attrid,name,'position');
			go_search();
		})
	})

	//房价信息 按钮点击处理
	$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(k,v){
		var attrid = $('#price').attr('attrid');
		var _this = this;
		$(this).bind('click',function(){
			$(_this).attr('class','on');
			$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(index,val){
				if(index != k){
					$(this).attr('class','');
				}
			})
			var name = $(_this).attr('data-name');
			show_search_condition(attrid,name,'price');
			go_search();
		})
	})

	//房价信息 自定义输入
	$('#priceConfirm').bind('click',function(){
		var attrid = $('#price').attr('attrid');
		var lowPrice = parseInt($('#lowPrice').val());
		var highPrice = parseInt($('#highPrice').val());
		if(isNaN(lowPrice) || isNaN(highPrice) || (highPrice < lowPrice)){
			return;
		}else{
			$('#price ul[class="filter_cb_list filter_cb_list1"] li').each(function(){
				$(this).attr('class','');
			})
			var name = lowPrice + '-' + highPrice + '元';
			show_search_condition(attrid,name,'price');
			go_search();
			
		}
	})

	//星级信息选择绑定
	$('#star ul[class="filter_cb_list"] li').each(function(k,v){
		var _this = this;
		var attrid = $('#star').attr('attrid');
		$(this).bind('click',function(){
			var type = 'star_' + k
			var class_name = $(this).attr('class');
			if(class_name != 'on'){ 
				//注意，艺龙的js先把它变成了on,所以这里是取消该条件
				$('#conditionZone span[method="delCondition"]').each(function(){
					var span_type = $(this).attr('type');
					if(span_type == type){
						$(this).remove();
						var length = $('#conditionZone span[method="delCondition"]').length;
						if(length == 0){
							$('#conditionZone a[method="cleanCondition"]').hide();
						}
						go_search();
					}
				})
			}else{
				var name = $(_this).attr('data-name');
				show_search_condition(attrid,name,type);
				go_search();
			}
			
		})
	})

	//品牌信息选择绑定
	$('#brand ul[class="filter_cb_list"] li').each(function(k,v){
		var _this = this;
		var attrid = $('#brand').attr('attrid');
		$(this).bind('click',function(){
			var type = 'brand_' + k
			var class_name = $(this).attr('class');
			if(class_name != 'on'){ 
				//注意，艺龙的js先把它变成了on,所以这里是取消该条件
				$('#conditionZone span[method="delCondition"]').each(function(){
					var span_type = $(this).attr('type');
					if(span_type == type){
						$(this).remove();
						var length = $('#conditionZone span[method="delCondition"]').length;
						if(length == 0){
							$('#conditionZone a[method="cleanCondition"]').hide();
						}
						go_search();
					}
				})
			}else{
				var name = $(_this).attr('data-name');
				show_search_condition(attrid,name,type);
				go_search();
			}
			
		})
	})

	//主题选择绑定
	$('#theme ul[class="filter_cb_list"] li').each(function(k,v){
		var _this = this;
		var attrid = $('#theme').attr('attrid');
		$(this).bind('click',function(){
			var type = 'theme_' + k
			var class_name = $(this).attr('class');
			if(class_name != 'on'){ 
				//注意，艺龙的js先把它变成了on,所以这里是取消该条件
				$('#conditionZone span[method="delCondition"]').each(function(){
					var span_type = $(this).attr('type');
					if(span_type == type){
						$(this).remove();
						var length = $('#conditionZone span[method="delCondition"]').length;
						if(length == 0){
							$('#conditionZone a[method="cleanCondition"]').hide();
						}
						go_search();
					}
				})
			}else{
				var name = $(_this).attr('data-name');
				show_search_condition(attrid,name,type);
				go_search();
			}
			
		})
	})

	//服务选择绑定
	$('#service ul[class="filter_cb_list"] li').each(function(k,v){
		var _this = this;
		var attrid = $('#service').attr('attrid');
		$(this).bind('click',function(){
			var type = 'service_' + k
			var class_name = $(this).attr('class');
			// console.log(class_name);
			if(class_name != 'on'){ 
				//注意，艺龙的js先把它变成了on,所以这里是取消该条件
				$('#conditionZone span[method="delCondition"]').each(function(){
					var span_type = $(this).attr('type');
					if(span_type == type){
						$(this).remove();
						var length = $('#conditionZone span[method="delCondition"]').length;
						if(length == 0){
							$('#conditionZone a[method="cleanCondition"]').hide();
						}
						go_search();
					}
				})
			}else{
				var name = $(_this).attr('data-name');
				show_search_condition(attrid,name,type);
				go_search();
			}
			
		})
	})

	/**************************** 选定某个搜索条件后的逻辑处理  end    ********************************************/



	/****************************   删除某个搜索条件的js效果  start ********************************************/
	//清除位置信息
	function clear_position_select(){
		$('#position li').each(function(){
			var class_name = $(this).attr('class');
			if(class_name == 'on'){
				$(this).attr('class','');
			}
		})

		//地铁特殊处理
		$('#position a').each(function(){
			var class_name = $(this).attr('class');
			if(class_name == 'on'){
				$(this).attr('class','');
			}
		})
	}
	//房价
	function clear_price_select(){
		
		$('#price li').each(function(){
			var class_name = $(this).attr('class');
			if(class_name == 'on'){
				$(this).attr('class','');
			}
		})
	}
	//星级
	function clear_star_select(index){
		
		$('#star li').each(function(k,v){
			if(k == index){
				$(this).attr('class','');
			}
			
		})
	} 
	//品牌
	function clear_brand_select(index){
		
		$('#brand li').each(function(k,v){
			if(k == index){
				$(this).attr('class','');
			}
		})
	} 
	//主题
	function clear_theme_select(index){
		
		$('#theme li').each(function(k,v){
			if(k == index){
				$(this).attr('class','');
			}
		})
	} 
	//服务
	function clear_service_select(index){
		
		$('#service li').each(function(k,v){
			if(k == index){
				$(this).attr('class','');
			}
		})
	} 

	/****************************   删除某个搜索条件的js效果  end ********************************************/


	//页面上展示已有的搜索条件
	function show_search_condition(attrid,name,type){
		$('#conditionZone .cond-list span').each(function(){
			var span_type = $(this).attr('type');
			if(span_type == type){ // 排他性的搜索,位置信息只能具备一个搜索条件
				$(this).remove();
			}
		})
		var span = '<span method="delCondition" data-type="allInOne" attrid="' + attrid + '" title="删除此条件" type="' +type + '">' + name + '<i class="icon_close_hl"></i></span>';
		var a = $('#conditionZone .cond-list a');
		a.bind('click',function(){
			//前面的条件删除，艺龙的js已经处理了
			$(this).hide();

			clear_position_select();
			clear_price_select();

			$('#star li').each(function(){
				var class_name = $(this).attr('class');
				if(class_name == 'on'){
					$(this).attr('class','');
				}
			})
			$('#brand li').each(function(){
				var class_name = $(this).attr('class');
				if(class_name == 'on'){
					$(this).attr('class','');
				}
			})
			$('#theme li').each(function(){
				var class_name = $(this).attr('class');
				if(class_name == 'on'){
					$(this).attr('class','');
				}
			})
			$('#service li').each(function(){
				var class_name = $(this).attr('class');
				if(class_name == 'on'){
					$(this).attr('class','');
				}
			})
		})
		a.show();;
		$(span).insertBefore(a);
		
		//条件删除绑定
		$('#conditionZone span[method="delCondition"]').bind('click',function(){
			var type = $(this).attr('type');
			$(this).remove();
			var length = $('#conditionZone span[method="delCondition"]').length;
			if(length == 0){
				$('#conditionZone a[method="cleanCondition"]').hide();
			}

			//上面选择的条件，也要设置为未选
			if(type == 'position'){
				clear_position_select();
			}
			else if(type == 'price'){
				clear_price_select();
			}
			else if(type.indexOf('star') != -1){
				var index = type.split('_');
				clear_star_select(index[1]);
			}	
			else if(type.indexOf('brand') != -1){
				var index = type.split('_');
				clear_brand_select(index[1]);
			}	
			else if(type.indexOf('theme') != -1){
				var index = type.split('_');
				clear_theme_select(index[1]);
			}	
			else if(type.indexOf('service') != -1){
				var index = type.split('_');
				clear_service_select(index[1]);
			}
		})
	}




	//开始检索
	function go_search(){
		$('#loading').show();
		//获取所有的检索条件
		var conditions = {}
		conditions['keywords'] = $('#keywords').val();
		conditions['checkin'] = $('#checkin').val();
		conditions['checkout'] = $('#checkout').val();
		conditions['city'] = $('#hotelCity').val();

		$('#conditionZone span[method="delCondition"]').each(function(){
			var attrid = $(this).attr('attrid');
			var name = $(this).text().split('<i')[0];	
			var type = $(this).attr('type');
			if(type == 'position' || type  == 'price'){
				conditions[attrid] = name;
			}
			else if( type.indexOf('star')!=-1 || type.indexOf('brand')!=-1 || type.indexOf('service')!=-1 || type.indexOf('theme')!=-1 ) {
				if(conditions.hasOwnProperty(attrid)){
					conditions[attrid].push(name);
				}else{
					conditions[attrid] = [name];
				}
			}
		})

		$.ajax({
			url : 'hotel_search.php?act=ajax_search',
			dataType : 'json',
			type : 'POST',
			data : {'data':conditions},
			success : function(data){
				console.log('success');
				$('#loading').hide();
			},
			error : function(data){
				console.log('error');
			}
		})
		
	}

})