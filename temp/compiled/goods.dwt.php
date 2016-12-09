<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="http://try7.jiaodaoren.com/" />
<meta name="Generator" content="68ECSHOP v4_2" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<title><?php echo $this->_var['page_title']; ?></title>



<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/goods.css" />
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/magiczoom.js" ></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/magiczoom_plus.js" ></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/scrollpic.js"></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/gw_totop.js" ></script>
<?php echo $this->smarty_insert_scripts(array('files'=>'jquery.json.js,transport.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'common.js')); ?>
</head>
<body>
<div id="bg" class="bg" style="display:none;"></div>
<?php echo $this->fetch('library/pricecut_notice.lbi'); ?>
<?php echo $this->fetch('library/arrive_notice.lbi'); ?>
<?php echo $this->fetch('library/page_header.lbi'); ?>
<div class="margin-w1210 clearfix">
  	<?php echo $this->fetch('library/ur_here.lbi'); ?>
	<div id="product-intro" class="goods-info"> 
      <div id="preview">
        <div class="goods-img" id="li_<?php echo $this->_var['goods']['goods_id']; ?>"> 
        	<a href="<?php if ($this->_var['pictures']['0']['img_original']): ?><?php echo $this->_var['pictures']['0']['img_original']; ?><?php else: ?><?php echo $this->_var['goods']['original_img']; ?><?php endif; ?>" class="MagicZoom" id="zoom" rel="zoom-position: right;"> 
                <?php if ($this->_var['pictures']): ?> 
                <img  src="<?php echo $this->_var['pictures']['0']['img_url']; ?>" class="goodsimg pic_img_<?php echo $this->_var['goods']['goods_id']; ?>" id="goods_bimg" width="400" height="400" /> 
                <?php else: ?> 
                <img src="<?php echo $this->_var['goods']['goods_img']; ?>" class="goodsimg pic_img_<?php echo $this->_var['goods']['goods_id']; ?>" id="goods_bimg" width="400" height="400" /> 
                <?php endif; ?> 
          	</a> 
        </div>
        <div style="height:10px; line-height:10px; clear:both;"></div>
         
        <?php echo $this->fetch('library/goods_gallery.lbi'); ?> 
        
        <div class="goods-gallery-bottom">
        	<?php if ($this->_var['cfg']['show_goodssn']): ?>
        	<div class="goods-sn fl">
            	<span class="goods-sn-color">商品货号</span>
                <span><?php echo $this->_var['goods']['goods_sn']; ?></span>
            </div>
            <?php endif; ?> 
            <a class="goods-compare compare-btn fr" data-goods="<?php echo $this->_var['goods']['goods_id']; ?>" data-type="<?php echo $this->_var['goods']['type']; ?>" onclick="Compare.add(<?php echo $this->_var['goods']['goods_id']; ?>,'<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>','<?php echo $this->_var['goods']['goods_type']; ?>', '<?php echo $this->_var['goods']['goods_thumb']; ?>', '<?php if ($_SESSION['user_name']): ?><?php if ($this->_var['goods']['is_promote'] && $this->_var['goods']['gmt_end_time']): ?><?php echo $this->_var['goods']['promote_price']; ?><?php else: ?><?php echo $this->_var['goods']['shop_price_formated']; ?> <?php endif; ?><?php else: ?><?php echo $this->_var['goods']['market_price']; ?><?php endif; ?>')"><i></i>对比</a>
            
            <a href="javascript:collect(<?php echo $this->_var['goods']['goods_id']; ?>)" class="goods-col <?php if ($this->_var['goods']['is_collet'] == 1): ?>goods-col-t<?php endif; ?> fr">
            	<b></b><i><?php if ($this->_var['goods']['is_collet'] == 1): ?>已<?php endif; ?>收藏 (<?php if ($this->_var['collect_num'] != 0): ?><?php echo $this->_var['collect_num']; ?><?php else: ?>0<?php endif; ?>)</i>
            </a>   
            <div class="bdsharebuttonbox fr">
        		<a class="bds_more" href="#" data-cmd="more" style="background: transparent url(themes/68ecshopcom_360buy/images/goods-icon.png) no-repeat -110px -166px;color: #999;line-height: 25px;height: 25px; margin: 0px 10px; padding-left:20px; display: block;">分享</a>
            </div>
        </div>
		<script type="text/javascript">
        	window._bd_share_config = {
			"common": {
				"bdSnsKey": {},
				"bdText": "",
				"bdMini": "2",
				"bdMiniList": false,
				"bdPic": "",
				"bdStyle": "0",
				"bdSize": "16"
			},
			"share": {}
		};
		with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ (-new Date() / 36e5)];
        </script>
      </div>
      <div class="goods-detail-info">
          <form action="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" method="post" name="ECS_FORMBUY" id="ECS_FORMBUY" >        
               <div class="goods-name">
                  <h1><?php echo $this->_var['goods']['goods_style_name']; ?></h1>
               </div>
               <?php if ($this->_var['goods']['goods_brief']): ?>
               <div class="goods-brief"><span><?php echo $this->_var['goods']['goods_brief']; ?></span></div>
               <?php endif; ?>
               <div id="goods-price">
                 <div class="mar-l">
                      <?php if ($this->_var['goods']['is_promote'] && $this->_var['goods']['gmt_end_time']): ?> 
                      <span class="price">促销价</span><strong class="p-price" id="ECS_GOODS_AMOUNT"></strong> 
                      <?php else: ?> 
                      <span class="price">售价</span><strong class="p-price" id="ECS_GOODS_AMOUNT"></strong> 
                      <?php endif; ?> 
                      <span class="depreciate"><a href="javascript:showDiv(<?php echo $this->_var['goods']['goods_id']; ?>);">降价通知</a></span> 
                 </div>
                 <div class="show-price"> 
                    <?php if ($this->_var['cfg']['show_marketprice']): ?>
                    <div class="market-prices-spe"> 
                    	<span class="price">市场价</span>
                        <font class="market-price"><?php echo $this->_var['goods']['market_price']; ?></font> 
                    </div>
                    <?php endif; ?> 
                    <?php if ($this->_var['goods']['is_promote'] && $this->_var['goods']['gmt_end_time']): ?>
                    <div class="market-prices-spe">
                    	<?php echo $this->smarty_insert_scripts(array('files'=>'lefttime.js')); ?><i></i>
                        <font class="f4" id="leftTime"><?php echo $this->_var['lang']['please_waiting']; ?></font> 
                    </div>
                    <?php endif; ?> 
                    <?php if ($this->_var['rank_prices']): ?>
                    <div class="rank-prices">
                      <div id="vip1" onmouseover="hidevip1()"> 
                      	<span class="rmbPrice">会员等级价格<i></i></span> 
                      </div>
                      <div class="hover" style="display:none;" id="vip2" onmouseover="hidevip1()" onmouseout="showvip1()"> 
                      	<span class="rmbPrice">会员等级价格<i></i></span> 
                        <?php $_from = $this->_var['rank_prices']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'rank_price');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['rank_price']):
?> 
                        <br/>
                        <span class="rmbPrice"> <?php echo $this->_var['rank_price']['rank_name']; ?>：<?php echo $this->_var['rank_price']['price']; ?></span> 
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
                      </div>
                      <script type="text/javascript">
						function hidevip1(){ 
						document.getElementById('vip1').style.display="none";
						document.getElementById('vip2').style.display="block";
						}
						function showvip1(){ 
						document.getElementById('vip1').style.display="block";
						document.getElementById('vip2').style.display="none";
						}
					  </script> 
                    </div>
                    <?php endif; ?> 
                  </div>
                </div>
               <ul id="summary1">
                  <?php if ($this->_var['goods']['goods_brand'] != "" && $this->_var['cfg']['show_brand']): ?>
                  <li class="padd">
                    <div class="dt">商品品牌</div>
                    <div class="dd"> <a href="<?php echo $this->_var['goods']['goods_brand_url']; ?>" ><?php echo $this->_var['goods']['goods_brand']; ?></a></div>
                  </li>
                  <?php endif; ?> 
                  <?php if ($this->_var['cfg']['use_integral']): ?>
                  <li class="padd">
                    <div class="dt">可使积分</div>
                    <div class="dd"><?php echo $this->_var['goods']['integral']; ?> <?php echo $this->_var['points_name']; ?></div>
                  </li>
                  <?php endif; ?> 
                  <?php if ($this->_var['cfg']['show_goodsweight']): ?>
                  <li class="padd">
                    <div class="dt">商品重量</div>
                    <div class="dd"> <?php echo $this->_var['goods']['goods_weight']; ?> </div>
                  </li>
                  <?php endif; ?> 
                  <?php if ($this->_var['cfg']['show_addtime']): ?>
                  <li class="padd">
                    <div class="dt">上架时间</div>
                    <div class="dd"> <?php echo $this->_var['goods']['add_time']; ?> </div>
                  </li>
                  <?php endif; ?>
                </ul>
               <div id="summary-qita">
                  <ul class="qita">
                    <li>
                      <p>累积评价<span><a href="<?php echo $this->_var['url']; ?>#os_pinglun"><?php echo $this->_var['review_count']; ?>人评价</a></span></p>
                    </li>
                    <li>
                      <p>累计销量<span><?php echo $this->_var['goods']['count']; ?></span></p>
                    </li>
                    <?php if ($this->_var['goods']['give_integral_2'] == '-1'): ?>
                    <li style="border:none">
                      <p>赠送积分<span><font id="ECS_GOODS_AMOUNT_jf"><?php echo $this->_var['goods']['give_integral']; ?></font></span></p>
                      <?php elseif ($this->_var['goods']['give_integral_2'] > 0): ?>
                    <li style="border:none">
                      <p>赠送积分<span><?php echo $this->_var['goods']['give_integral']; ?></span></p>
                    </li>
                    <?php else: ?>
                    <li style="border:none">
                      <p>赠送积分<span>0</span></p>
                    </li>
                    <?php endif; ?>
                  </ul>
               </div>
               <ul id="summary">
                  <?php if ($this->_var['promotion']): ?>
                  <li class="padd padd-promotion clearfix"> 
                    <?php $_from = $this->_var['promotion']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
        $this->_foreach['name']['iteration']++;
?> 
                    <?php if (($this->_foreach['name']['iteration'] <= 1)): ?>
                    <div class="dt">促销信息</div>
                    <?php else: ?>
                    <div class="dt">&nbsp;</div>
                    <?php endif; ?> 
                    <?php if ($this->_var['item']['type'] == "snatch"): ?>
                    <div class="dd"> 
                    	<a class="activity-68 activity_4" href="snatch.php" title="<?php echo $this->_var['lang']['snatch']; ?>" style="font-weight:100; color:#fff; text-decoration:none;"><?php echo $this->_var['lang']['snatch']; ?></a> 
                        <a href="snatch.php" title="<?php echo $this->_var['item']['act_name']; ?>" class="activity_con"><?php echo sub_str($this->_var['item']['act_name'],30); ?></a> 
                    </div>
                    <?php elseif ($this->_var['item']['type'] == "group_buy"): ?>
                    <div class="dd"> 
                    	<a class="activity-68 activity_4" href="group_buy.php" title="<?php echo $this->_var['lang']['group_buy']; ?>" style="font-weight:100; color:#fff; text-decoration:none;"><?php echo $this->_var['lang']['group_buy']; ?></a> 
                        <a href="group_buy.php" title="<?php echo $this->_var['$item']['act_name']; ?>" class="activity_con"><?php echo sub_str($this->_var['item']['act_name'],30); ?></a> 
                    </div>
                    <?php elseif ($this->_var['item']['type'] == "auction"): ?>
                    <div class="dd"> 
                    	<a class="activity-68 activity_4" href="auction.php" title="<?php echo $this->_var['lang']['auction']; ?>" style="font-weight:100; color:#fff; text-decoration:none;"><?php echo $this->_var['lang']['auction']; ?></a> 
                        <a href="auction.php" title="<?php echo $this->_var['item']['act_name']; ?>" class="activity_con"><?php echo sub_str($this->_var['item']['act_name'],30); ?></a> 
                    </div>
                    <?php elseif ($this->_var['item']['type'] == "favourable"): ?>
                    <div id="manzeng" class="dd <?php if ($this->_var['item']['gift'] == array ( )): ?><?php else: ?>J_MenuItem<?php endif; ?>" style="position:relative;"> 
                    	<a class="activity-68 <?php if ($this->_var['item']['gift'] == array ( )): ?>activity_1<?php else: ?>activity_2<?php endif; ?>" href="activity.php" title="<?php echo $this->_var['lang']['favourable']; ?>"><?php echo $this->_var['item']['act_type']; ?></a> 
                        <a id="zeng" href="activity.php" title="<?php echo $this->_var['lang']['favourable']; ?>" class="activity_con"><?php echo $this->_var['item']['act_name']; ?><?php if ($this->_var['item']['gift'] == array ( )): ?><?php else: ?><i></i><?php endif; ?></a> 
                        <?php if ($this->_var['item']['gift'] !== array ( )): ?>
                      	<div id="aa" class="zengpin" style="display:none;">
                        	<b class="tip_flag"></b> 
                        	<?php if ($this->_var['item']['act_range'] == 0): ?>
                            <h3>优惠范围：全部商品</h3>
                            <?php elseif ($this->_var['item']['act_range'] == 1): ?>
                            <h3>优惠范围：全部分类</h3>
                            <?php elseif ($this->_var['item']['act_range'] == 2): ?>
                            <h3>优惠范围：品牌</h3>
                            <?php elseif ($this->_var['item']['act_range'] == 3): ?>
                            <h3>优惠范围：商品</h3>
                            <?php endif; ?>
                            <ul>
                              <?php $_from = $this->_var['item']['gift']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'gift');if (count($_from)):
    foreach ($_from AS $this->_var['gift']):
?>
                              <li> <a href="goods.php?id=<?php echo $this->_var['gift']['id']; ?>" target="_blank" style="display:block;"> <img src="<?php echo $this->_var['gift']['thumb']; ?>" title="<?php echo $this->_var['gift']['name']; ?>" alt="<?php echo sub_str($this->_var['gift']['name'],6); ?>" /> </a>
                                <p><?php echo $this->_var['gift']['price']; ?>元</p>
                              </li>
                              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </ul>
                      	</div>
                      	<?php endif; ?> 
                      </div>
                    <?php endif; ?> 
                    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
                    <script type="text/javascript">
    				$(document).ready(function(){
						var a = $("#summary").children("li");
					  	var b = $("#summary"); 
					  	if($(a).length > 0){ 
							b.css({"display":"inline-block"});
					
						} 
						else{ 
							b.css({"display":"none"});
						} 
						$( ".J_MenuItem" ).each( function( index ){
							var zindex = $(this).css("z-index");    
							$(this).mouseover( function(){	
								$(this).css("z-index", ""+(zindex+2) );		
								$( ".zengpin" ).eq( index ).show();			 
								
							});
							$(this).mouseleave( function(){
								$(this).css("z-index", ""+(zindex-2) );
								$( ".zengpin" ).eq( index ).hide();    
								
							});
						});
					});
					</script> 
                    <?php if ($this->_var['goods']['bonus_money']): ?>
                    <div class="dt">&nbsp;</div>
                    <div class="dd"> 
                    	<a class="activity-68 activity_3" href="user.php?act=bonus" >红包</a> 
                        <a href="user.php?act=bonus" title="" class="activity_con">购买此商品可获得红包&nbsp;<font style="color:#f52648"><?php echo $this->_var['goods']['bonus_money']; ?></font></a> 
                    </div>
                    <?php endif; ?> 
                  </li>
                  <?php endif; ?> 
                  <?php if ($this->_var['volume_price_list']): ?>
                  <li class="padd"> 
                  	<font class="volume-price f1"><?php echo $this->_var['lang']['volume_price']; ?>：</font>
                    <table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#eeeeee">
                      <tr>
                        <td align="center" bgcolor="#FFFFFF"><strong><?php echo $this->_var['lang']['number_to']; ?></strong></td>
                        <td align="center" bgcolor="#FFFFFF"><strong><?php echo $this->_var['lang']['preferences_price']; ?></strong></td>
                      </tr>
                      <?php $_from = $this->_var['volume_price_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('price_key', 'price_list');if (count($_from)):
    foreach ($_from AS $this->_var['price_key'] => $this->_var['price_list']):
?>
                      <tr>
                        <td align="center" bgcolor="#FFFFFF" class="shop"><?php echo $this->_var['price_list']['number']; ?></td>
                        <td align="center" bgcolor="#FFFFFF" class="shop"><?php echo $this->_var['price_list']['format_price']; ?></td>
                      </tr>
                      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    </table>
                  </li>
                  <?php endif; ?>
                  
                  <?php if ($this->_var['goods']['is_shipping']): ?>
                  <li class="padd padd-spe"> <?php echo $this->_var['lang']['goods_free_shipping']; ?></li>
                  <?php endif; ?>
                </ul>
               <ul id="choose" class="choose_bor">
                  <?php if ($this->_var['pups'] && $this->_var['ppts']): ?>
                  <li>
                    <div class="pickup-point-wrap">
                      <div class="dt">自提</div>
                      <div id="pickup_point" onmouseenter="show_list()" onmouseleave="hide_list()">自提点列表</div>
                      <div id="area_label" onmouseenter="show_area()" onmouseleave="hide_area()">所在区域</div>
                      <div id="pickup_point_list" onmouseenter="show_list()" onmouseleave="hide_list()"> </div>
                      <div id="area_list_wrap" onmouseenter="show_area()" onmouseleave="hide_area()">
                        <div id="area_menu"> <a id="province" href="javascript:void(0);">省</a> <a id="city" href="javascript:void(0);">市</a> <a class="hover" id="district" href="javascript:void(0);">区</a>
                          <div style="clear:both"></div>
                        </div>
                        <ul id="area_list">
                        </ul>
                      </div>
                      <div style="clear:both"></div>
                    </div>
                  </li>
                  <?php endif; ?>
                   
                  <?php $_from = $this->_var['specification']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('spec_key', 'spec');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['spec_key'] => $this->_var['spec']):
        $this->_foreach['name']['iteration']++;
?>
                  <li id="choose-version">
                    <div class="dt"><?php echo $this->_var['spec']['name']; ?></div>
                    <div class="dd catt"> 
                       
                      <?php if ($this->_var['spec']['attr_type'] == 1): ?> 
                      <?php if ($this->_var['cfg']['goodsattr_style'] == 1): ?> 
                      
                      <input type="hidden" name="spec_attr_type" value="<?php echo $this->_var['spec_key']; ?>">
                      <input type="hidden" name="attr_types" id="spec_attr_type_<?php echo $this->_var['spec_key']; ?>" value="0">
                      <ul class="ys_xuan" id="xuan_<?php echo $this->_var['spec_key']; ?>">
                        <div class="catt" id="catt_<?php echo $this->_var['spec_key']; ?>"> 
                          <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?> 
                          <a onclick="show_attr_status(this,<?php echo $this->_var['goods']['goods_id']; ?>, <?php echo $this->_var['attr_id']; ?>);<?php if ($this->_var['spec_key'] == $this->_var['attr_id']): ?>get_gallery_attr(<?php echo $this->_var['id']; ?>, <?php echo $this->_var['value']['id']; ?>);<?php endif; ?>"  href="javascript:" name="<?php echo $this->_var['value']['id']; ?>" id="xuan_a_<?php echo $this->_var['value']['id']; ?>"  title="[<?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?> <?php echo $this->_var['value']['format_price']; ?>]" <?php if ($this->_var['value']['disabled'] == 'disabled' && $this->_var['spec_count'] == 1): ?>class="wuxiao"<?php endif; ?>>
                          <?php if ($this->_var['value']['goods_attr_thumb']): ?>
                          <div class="spec-img"><img src="<?php echo $this->_var['value']['goods_attr_thumb']; ?>" width=40 height=40 title="<?php echo $this->_var['value']['label']; ?>" alt="<?php echo $this->_var['value']['label']; ?>" /></div>
                          <label class="spec-name"><?php echo $this->_var['value']['label']; ?></label>
                          <?php else: ?>
                          <div class="value-label"><?php echo $this->_var['value']['label']; ?></div>
                          <?php endif; ?>
                          <input style="display:none" id="spec_value_<?php echo $this->_var['value']['id']; ?>" type="radio" name="spec_<?php echo $this->_var['spec_key']; ?>" value="<?php echo $this->_var['value']['id']; ?>" disabled="<?php echo $this->_var['value']['disabled']; ?>" />
                          </a> 
                          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
                        </div>
                      </ul>
                      <div class="clear"></div>
                      <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                       
                      <?php else: ?>
                      <select name="spec_<?php echo $this->_var['spec_key']; ?>">
                        <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
                        <option label="<?php echo $this->_var['value']['label']; ?>" value="<?php echo $this->_var['value']['id']; ?>"><?php echo $this->_var['value']['label']; ?> <?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?><?php if ($this->_var['value']['price'] != 0): ?><?php echo $this->_var['value']['format_price']; ?><?php endif; ?></option>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                      </select>
                      <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                      <?php endif; ?> 
                      <?php else: ?> 
                      <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
                      <label for="spec_value_<?php echo $this->_var['value']['id']; ?>">
                        <input type="checkbox" name="spec_<?php echo $this->_var['spec_key']; ?>" value="<?php echo $this->_var['value']['id']; ?>" id="spec_value_<?php echo $this->_var['value']['id']; ?>" onclick="changePrice()" />
                        <?php echo $this->_var['value']['label']; ?> [<?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?> <?php echo $this->_var['value']['format_price']; ?>] </label>
                      <br />
                      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                      <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                      <?php endif; ?> 
                    </div>
                  </li>
                  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
                   
                  <script type="text/javascript">
					var myString=new Array();
					
					<?php $_from = $this->_var['prod_exist_arr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('pkey', 'prod');if (count($_from)):
    foreach ($_from AS $this->_var['pkey'] => $this->_var['prod']):
?>
					myString[<?php echo $this->_var['pkey']; ?>]="<?php echo $this->_var['prod']; ?>";
					<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
					
				  </script> 
                   
                  
                  <li id="choose-amount">
                    <div class="dt">数量</div>
                    <div class="dd">
                      <div class="wrap-input"> 
                        <script language="javascript" type="text/javascript">  function goods_cut(){var num_val=document.getElementById('number');  var new_num=num_val.value;  var Num = parseInt(new_num);  if(Num>1)Num=Num-1;  num_val.value=Num;}  function goods_add(){var num_val=document.getElementById('number');  var new_num=num_val.value;  var Num = parseInt(new_num);  Num=Num+1;  num_val.value=Num;} </script> 
                        <a class="btn-reduce" href="javascript:;" onclick="goods_cut();changePrice();">减少数量</a>
                        <input name="number" type="text" class="text"  id="number" value="1" onblur="changePrice();"/>
                        <a class="btn-add" href="javascript:;" onclick="goods_add();changePrice();">增加数量</a> 
                        <?php if ($this->_var['cfg']['show_goodsnumber']): ?>
                          （库存<font id="shows_number"><?php echo $this->_var['goods']['goods_number']; ?> </font>）
                        <?php else: ?>
                            <?php if ($this->_var['goods']['goods_number'] == 0): ?>
                                &nbsp;&nbsp;缺货
                            <?php else: ?>
                                &nbsp;&nbsp;有货
                            <?php endif; ?>
                        <?php endif; ?>
                      </div>
                    </div>
                  </li>
                  <?php if ($this->_var['tag'] == 1): ?>
                  <li class="padd">
                    <div>
                      <div class="dt">限购数量</div>
                      <div class="dd"><?php echo $this->_var['goods']['buymax']; ?></div>
                    </div>
                  </li>
                  <?php endif; ?>
                </ul>
               <div class="buyNub-buy-wrap">
                	<div id="choose-btns1" class="buyNub-buy" style="display:none"> 
                    	<a onclick="tell_me(<?php echo $this->_var['goods']['goods_id']; ?>)" class="tell-me"><i></i>到货通知</a>
                  	</div>
                  	<div id="choose-btns" class="buyNub-buy"> 
                        <?php if ($this->_var['goods_n'] > 0): ?> 
                        <a href="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>,0,1)" name="bi_addToCart" class="u-buy1">立即购买</a> <a href="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" name="bi_addToCart" class="u-buy2">加入购物车</a> 
                        <?php else: ?> 
                        <a onclick="tell_me(<?php echo $this->_var['goods']['goods_id']; ?>)" class="tell-me"><i></i>到货通知</a>
                        <?php endif; ?> 
                        <a id="phone" class="btn-phone" style="position:relative;cursor:pointer">
                        	手机购买<i></i>
                            <div id="phone-tan" style="display:none"> 
                              <span class="arr"></span>
                              <div class="m-qrcode-wrap"> <img src="erweima_png.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" width="100" height="100" /> </div>
                            </div>
                        </a>  
                  	</div>
					<script type="text/javascript">
                        $("#phone").mouseover( function(){	
                            $( "#phone-tan" ).show();
                        });
                        $("#phone").mouseleave( function(){
                            $( "#phone-tan" ).hide();
                        });
                    </script> 
                </div>       
          </form>
      </div>
      <div id="supp_info"> 
        <?php if ($this->_var['goods']['supplier_id']): ?> 
        <?php echo $this->fetch('library/ghs_info.lbi'); ?> 
        <?php else: ?> 
        <?php echo $this->fetch('library/ziying_info.lbi'); ?> 
        <?php endif; ?> 
      </div>
    </div>
  	<?php echo $this->fetch('library/goods_best.lbi'); ?>
    <div class="left-con">
    	<?php echo $this->fetch('library/goods_related_category.lbi'); ?>
        <?php echo $this->fetch('library/goods_similar_brand.lbi'); ?>
        <?php echo $this->fetch('library/goods_new.lbi'); ?>
        <?php echo $this->fetch('library/goods_related.lbi'); ?> 
		<?php echo $this->fetch('library/goods_fittings.lbi'); ?> 
		<?php echo $this->fetch('library/bought_goods.lbi'); ?>
        
<?php echo $this->fetch('library/ad_position.lbi'); ?>

      	<div class="blank"></div>
      	
<?php echo $this->fetch('library/ad_position.lbi'); ?>
 
    </div>
    <div class="right-con">
    	<?php echo $this->fetch('library/goods_package_ecshop68.lbi'); ?>
        <div id="wrapper">
        <div class="mt" id="main-nav-holder">
          <ul class="tab" id="nav">
            <li class="boldtit-list h-list" onclick="change_widget(1, this);"><a href="<?php echo $this->_var['url']; ?>#os_canshu">规格参数</a></li>
            <li class="boldtit-list" onclick="change_widget(1, this);"><a href="<?php echo $this->_var['url']; ?>#os_jieshao" >商品介绍</a></li>
            <li class="boldtit-list" onclick="change_widget(1, this);"><a href="<?php echo $this->_var['url']; ?>#os_pinglun" >商品评价(<?php echo $this->_var['review_count']; ?>)</a></li>
            <li class="boldtit-list" onclick="change_widget(1, this);"><a href="<?php echo $this->_var['url']; ?>#os_shouhou" >售后保障</a></li>
          </ul>
          <div class="goods-ce-right"> 
          	<a href="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" name="bi_addToCart"  class="right-add" >加入购物车</a>
            <div class="ce-right">
              <ul class="abs-ul">
                <li class="abs-active"><i></i><span>规格参数</span></li>
                <li><i></i><span>产品介绍</span></li>
                <li><i></i><span>商品评价</span></li>
                <li><i></i><span>包装清单</span></li>
                <li><i></i><span>售后服务</span></li>
                <li><i></i><span>常见问题</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="main_widget_1">
          <div class="mc" id="os_canshu">
            <ul class="detail-list">
              <li>商品名称：<?php echo $this->_var['goods']['goods_style_name']; ?></li>
              <li>商品编号：<?php echo $this->_var['goods']['goods_sn']; ?></li>
              <li>品牌：<a href="<?php echo $this->_var['goods']['goods_brand_url']; ?>" ><?php echo $this->_var['goods']['goods_brand']; ?></a></li>
              <li>上架时间：<?php echo $this->_var['goods']['add_time']; ?></li>
              <li>商品毛重：<?php echo $this->_var['goods']['goods_weight']; ?></li>
              <?php if ($this->_var['cfg']['show_goodsnumber']): ?>
              <li>库存： 
                <?php if ($this->_var['goods']['goods_number'] == 0): ?> 
                <?php echo $this->_var['lang']['stock_up']; ?> 
                <?php else: ?> 
                <?php echo $this->_var['goods']['goods_number']; ?> <?php echo $this->_var['goods']['measure_unit']; ?> 
                <?php endif; ?> 
              </li>
              <?php endif; ?>
              <?php if ($this->_var['properties']): ?> 
              <?php $_from = $this->_var['properties']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'property_group');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['property_group']):
?> 
              <?php $_from = $this->_var['property_group']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'property');if (count($_from)):
    foreach ($_from AS $this->_var['property']):
?>
              <li ><?php echo htmlspecialchars($this->_var['property']['name']); ?>：<?php echo $this->_var['property']['value']; ?></li>
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
              <?php endif; ?>
            </ul>
          </div>
          <div class="mc" id="os_jieshao">
            <div class="blank20"></div>
            <div class="detail-content"> <?php echo $this->_var['goods']['goods_desc']; ?> </div>
          </div>
          <div class="mc" id="os_pinglun">
            <div class="blank20"></div>
            <?php echo $this->fetch('library/my_comments.lbi'); ?> </div>
          <div class="mc" id="os_advantage">
            <div class="blank20"></div>
            <?php echo $this->fetch('library/packing_list.lbi'); ?> </div>
          <div class="mc" id="os_shouhou">
            <div class="blank20"></div>
            <?php echo $this->fetch('library/baozhang.lbi'); ?> </div>
          <div class="mc" id="os_changjian">
            <div class="blank20"></div>
            <?php echo $this->fetch('library/common_problem.lbi'); ?> </div>
        </div>
      </div>
		<script type="text/javascript">
			$(".ce-right").height($("#main_widget_1").height());
            var obj11 = document.getElementById("main-nav-holder");
			var top11 = getTop(obj11);
			var isIE6 = /msie 6/i.test(navigator.userAgent);
			function getTop(e){
				var offset = e.offsetTop;
				if(e.offsetParent != null) offset += getTop(e.offsetParent);
				return offset;
			}
	    </script> 
    </div>
</div>

<script type="text/javascript" src="<?php echo $this->_var['option']['static_path']; ?>js/compare.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['option']['static_path']; ?>js/json2.js"></script>
<div id="compareBox">
  <div class="menu">
    <ul>
      <li class="current" data-value='compare'>对比栏</li>
      <li data-value='history'>最近浏览</li>
    </ul>
    <a class="hide-compare" href="javascript:;" title="隐藏"></a>
    <div style="clear:both"></div>
  </div>
  <div id="compareList"></div>
  <div id="historyList" style="display:none;"> <span id="sc-prev" class="sc-prev scroll-btn"></span> <span id="sc-next" class="sc-next scroll-btn"></span>
    <div class="scroll_wrap"> <?php 
$k = array (
  'name' => 'history_list',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?> </div>
  </div>
</div>
<script type="text/javascript">
var goods_id = <?php echo $this->_var['goods_id']; ?>;
var goodsattr_style = <?php echo empty($this->_var['cfg']['goodsattr_style']) ? '1' : $this->_var['cfg']['goodsattr_style']; ?>;
var gmt_end_time = <?php echo empty($this->_var['promote_end_time']) ? '0' : $this->_var['promote_end_time']; ?>;
<?php $_from = $this->_var['lang']['goods_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
var goodsId = <?php echo $this->_var['goods_id']; ?>;
var now_time = <?php echo $this->_var['now_time']; ?>;
var suppid = <?php echo $this->_var['goods']['supplier_id']; ?>;
</script>
<script>
window.onload = function(){
  Compare.init();
  fixpng();
}
<?php $_from = $this->_var['lang']['compare_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
<?php if ($this->_var['key'] != 'button_compare'): ?>
var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
<?php else: ?>
var button_compare = '';
<?php endif; ?>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
var compare_no_goods = "<?php echo $this->_var['lang']['compare_no_goods']; ?>";
var btn_buy = "<?php echo $this->_var['lang']['btn_buy']; ?>";
var is_cancel = "<?php echo $this->_var['lang']['is_cancel']; ?>";
var select_spe = "<?php echo $this->_var['lang']['select_spe']; ?>";
//changePrice();
changePriceAll();
fixpng();
ShowMyComments(<?php echo $this->_var['goods']['goods_id']; ?>,0,1);
try {onload_leftTime();}
catch (e) {}

/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice(){
  var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
  var qty = document.forms['ECS_FORMBUY'].elements['number'].value;
  Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
}

/**
 * 接收返回的信息
 */
function changePriceResponse(res){
  if (res.err_msg.length > 0){
	if(res.qty==0){
		document.getElementById('choose-btns').style.display = 'none';
    	document.getElementById('choose-btns1').style.display = 'block';
	}
    alert(res.err_msg);
	document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;
 }else{
	  document.getElementById('choose-btns').style.display = 'block';
     document.getElementById('choose-btns1').style.display = 'none';
    document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;

    if (document.getElementById('ECS_GOODS_AMOUNT')){
      document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
	  if (res.result_jf){
		document.getElementById('ECS_GOODS_AMOUNT_jf').innerHTML = res.result_jf;
	  }
    }
    if(document.getElementById('shows_number')){
	document.getElementById('shows_number').innerHTML = res.attr_num;
    }
    if(document.getElementById('mark_price')){
	document.getElementById('mark_price').innerHTML = res.result1;
    }
  }

  
}

/**
* 获取商品范围价格
*/
function changePriceAll(){
	var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
	var qty = document.forms['ECS_FORMBUY'].elements['number'].value;
	Ajax.call('goods.php', 'act=allprice&id=' + goodsId + '&attr=' + attr + '&number=1', changePriceResponse, 'GET', 'JSON');
}
<?php if (! $_SESSION['user_id'] > 0): ?>
$('.item-operate .collet-btn').click(function(){
	$('.pop-login,.pop-mask').show();	
})
<?php endif; ?>
</script>
<script src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js" type="text/javascript"></script>
<script>
Ajax.call('goods.php', 'act=get_pickup_info&province='+remote_ip_info.province+'&city='+remote_ip_info.city+'&district='+remote_ip_info.district+'&suppid='+suppid,
	function(res){
		if(res.error == 0) {
			var result = '<ul>';
			for(var i=0; i<res.result.length; i++){
				result += '<li>店名：'+res.result[i].shop_name+'<br>联系人：'+res.result[i].contact+'&nbsp;&nbsp;联系方式：'+res.result[i].phone + '<br>地址：'+res.result[i].address+'</li>';
			}
			result += '</ul>';
			if(res.result.length > 0){
				document.getElementById('pickup_point_list').innerHTML = result;
				
			}else{
				document.getElementById('pickup_point_list').innerHTML = '<div style="padding:10px 0;text-align:center;">该地区尚未开放自提点</div>';
				
			}
			hide_area();
			show_list();
			document.getElementById('province').innerHTML = res.city_info.province;
			document.getElementById('province').onclick = function(){
				get_area_list(<?php echo $this->_var['shop_country']; ?>, '');
			}
			document.getElementById('city').innerHTML = res.city_info.city;
			document.getElementById('city').onclick = function(){
				get_area_list(res.city_info.province_id, res.city_info.province);
			}

			
			document.getElementById('area_label').innerHTML = res.city_info.province + '&nbsp;' + res.city_info.city;
			get_area_list(res.city_info.city_id, res.city_info.city);
		}
	}, 'GET', 'JSON');
function show_list(){
	document.getElementById('pickup_point').style.borderBottom = "1px solid #fff";
	document.getElementById('pickup_point_list').style.display = "block";
}
function hide_list(){
	document.getElementById('pickup_point').style.borderBottom = "1px solid #ccc";
	document.getElementById('pickup_point_list').style.display = "none";
}
function get_area_list(parent_id, name){
	Ajax.call('goods.php', 'act=get_area_list&parent_id='+parent_id, function(res) {
		var result = '';
		for(var i=0; i<res.length; i++){
			result += '<li';
			if(res[i].region_name.length>5)
				result += ' style="widht:170px;"';
			result += '><a href="javascript:void(0)" ';
			if(res[i].region_type == 3)
				result += 'onclick="get_pickup_point_list('+res[i].region_id+', this)">';
			else
				result += 'onclick="get_area_list('+res[i].region_id+', \''+res[i].region_name+'\')">';
			result+=res[i].region_name+'</a></li>';
		}
		result += '';
		document.getElementById('area_list').innerHTML = result;
		
		switch(res[0].region_type){
			case '1':
				document.getElementById('province').onclick = function(){get_area_list(parent_id, name);};
				document.getElementById('city').innerHTML = '市';
				document.getElementById('district').innerHTML = '区';
				switch_hover('province');
				break;
			case '2':
				document.getElementById('city').onclick = function(){get_area_list(parent_id, name);};
				document.getElementById('province').innerHTML = name;
				//document.getElementById('city').innerHTML = '市';
				document.getElementById('district').innerHTML = '区';
				switch_hover('city');
				break;
			case '3':
				document.getElementById('city').innerHTML = name;
				document.getElementById('district').innerHTML = '区';
				switch_hover('district');
				break;
		}
		hide_list();
		//show_area();
	}, 'GET', 'JSON');
}

function switch_hover(sel){
	if(sel == 'province'){
		document.getElementById('city').className = '';
		document.getElementById('district').className = '';
		document.getElementById('province').className = 'hover';
	}else if(sel == 'city'){
		document.getElementById('city').className = 'hover';
		document.getElementById('district').className = '';
		document.getElementById('province').className = '';
	}else{
		document.getElementById('city').className = '';
		document.getElementById('district').className = 'hover';
		document.getElementById('province').className = '';
	}
}

function get_pickup_point_list(region_id, obj){
	var name = obj.innerHTML;
	document.getElementById('district').innerHTML = name;
	var label = document.getElementById('province').innerHTML + '&nbsp;' +
				document.getElementById('city').innerHTML + '&nbsp;' +
				document.getElementById('district').innerHTML;
	document.getElementById('area_label').innerHTML = label;
	
	Ajax.call('goods.php', 'act=get_pickup_point_list&district_id='+region_id+'&suppid='+suppid, function(res) {
		var result = '<ul>';
			if(res.length > 0){
				for(var i=0; i<res.length; i++){
					result += '<li>'+res[i].shop_name+'&nbsp;&nbsp;地址：'+res[i].address+
								'<br>联系人：'+res[i].contact+'&nbsp;&nbsp;联系方式：'+res[i].phone + '</li>';
				}
				result += '</ul>';
				document.getElementById('pickup_point_list').innerHTML = result;
				
			}else{
				document.getElementById('pickup_point_list').innerHTML = '<div style="padding:10px 0;text-align:center;">该地区尚未开放自提点</div>';
				
			}
			hide_area();
			show_list();
			
			
	}, 'GET', 'JSON');
}
function show_area(){
	document.getElementById('area_label').style.borderBottom = "1px #fff solid";
	document.getElementById('area_list_wrap').style.display = "block";
}
function hide_area(){
	document.getElementById('area_label').style.borderBottom = "1px solid #ccc";
	document.getElementById('area_list_wrap').style.display = "none";
}
</script>
<?php echo $this->fetch('library/right_sidebar.lbi'); ?>
<div class="site-footer">
    <div class="footer-related">
  		<?php echo $this->fetch('library/help.lbi'); ?>
  		<?php echo $this->fetch('library/page_footer.lbi'); ?>
  </div>
</div>
</body>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/compare.js"></script>
<script>
<?php if (! $_SESSION['user_id'] > 0): ?>
$(function(){
	$('.goods-col').click(function(){
		$('.pop-login,.pop-mask').show();	
	})
})<?php endif; ?>
</script>
</html>