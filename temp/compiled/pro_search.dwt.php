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
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/pro_search.css"/>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-lazyload.js" ></script>
<?php echo $this->smarty_insert_scripts(array('files'=>'jquery.json.js,transport.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'utils.js,common.js')); ?>
</head>
<body >
<?php echo $this->fetch('library/page_header.lbi'); ?>
<div class="margin-w1210 clearfix">
      
      <div class="cate"> <span>分类</span>
        <ul class="cate-all">
          <li class="qita" style="margin-top:3px;">
          	<a href="pro_search.php?category=0&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=goods_id&order=<?php echo $this->_var['pager']['order']; ?>" title="" <?php if ($this->_var['pager']['category'] == '' || $this->_var['pager']['category'] == '0'): ?>class="cur"<?php endif; ?>>全部</a>
          </li>
          <li class="qita">
            <div class="cate-main">
              <ul class="cate-one">
                <?php $_from = $this->_var['categories_pro']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['cat']['iteration']++;
?>
                <li class="J_MenuItem"> <a href="javascript:void(0)" <?php if ($this->_var['pager']['pcategory'] == $this->_var['cat']['id']): ?>class="cur"<?php endif; ?>><?php echo $this->_var['cat']['name']; ?></a> </li>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
              </ul>
              <script type="text/javascript">
							$(document).ready(function(){
							$( ".J_MenuItem" ).each( function( index ){ 
								$(this).click( function(){		
									$( ".zengpin" ).eq( index ).slideToggle().siblings("div.zengpin").hide();
									$(".J_MenuItem").children("a").removeClass("cur");
									$(this).children("a").addClass("cur");
								});
								$('.all').click( function(){		
									$( ".zengpin" ).eq( index ).hide();			 
			
								});
								});
							});
						</script> 
              <?php $_from = $this->_var['categories_pro']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['cat']['iteration']++;
?>
              <p>
              <div id="zengpin" class="zengpin" style="display:none;"> <b class="tip-flag"></b>
                <ul>
                  <li><a href="pro_search.php?category=<?php echo $this->_var['cat']['id']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=goods_id&order=<?php echo $this->_var['pager']['order']; ?>" <?php if ($this->_var['pager']['category'] == $this->_var['cat']['id']): ?>class="cur"<?php endif; ?>>全部</a></li>
                  <?php $_from = $this->_var['cat']['cat_id']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'child');if (count($_from)):
    foreach ($_from AS $this->_var['child']):
?>
                  <li><a href="pro_search.php?category=<?php echo $this->_var['child']['id']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=goods_id&order=<?php echo $this->_var['pager']['order']; ?>" <?php if ($this->_var['pager']['category'] == $this->_var['child']['id']): ?>class="cur"<?php endif; ?>><?php echo htmlspecialchars($this->_var['child']['name']); ?></a></li>
                  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                </ul>
              </div>
              </p>
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
            </div>
          </li>
        </ul>
      </div>
      <div class="clearfix"></div>
       
      
      <div id="pro-filter">
        <form method="GET" name="listform" >
          <div class='fore1'>
            <ul class='order'>
              <li class="<?php if ($this->_var['pager']['sort'] == $this->_var['list_default_sort']): ?>curr<?php endif; ?>" style="border-left:none"> <a href="pro_search.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=<?php echo $this->_var['list_default_sort']; ?>&order=<?php if ($this->_var['pager']['sort'] == $this->_var['list_default_sort'] && $this->_var['pager']['order'] == 'DESC'): ?>ASC<?php else: ?>DESC<?php endif; ?>">默认</a><b class="icon-order-<?php if ($this->_var['pager']['sort'] == $this->_var['list_default_sort'] && $this->_var['pager']['order'] == 'DESC'): ?>ASC<?php else: ?>DESC<?php endif; ?>"></b> </li>
              <li class="<?php if ($this->_var['pager']['sort'] == 'salenum'): ?>curr<?php endif; ?>"> <a href="pro_search.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=salenum&order=<?php if ($this->_var['pager']['sort'] == 'salenum' && $this->_var['pager']['order'] == 'DESC'): ?>ASC<?php else: ?>DESC<?php endif; ?>">销量</a><b class="icon-order-<?php if ($this->_var['pager']['sort'] == 'salenum' && $this->_var['pager']['order'] == 'ASC'): ?>ASC<?php else: ?>DESC<?php endif; ?>"></b> </li>
              <li class="<?php if ($this->_var['pager']['sort'] == 'promote_price'): ?>curr<?php endif; ?>"> <a href="pro_search.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=promote_price&order=<?php if ($this->_var['pager']['sort'] == 'promote_price' && $this->_var['pager']['order'] == 'DESC'): ?>ASC<?php else: ?>DESC<?php endif; ?>">价格</a><b class="icon-order-<?php if ($this->_var['pager']['sort'] == 'promote_price' && $this->_var['pager']['order'] == 'ASC'): ?>ASC<?php else: ?>DESC<?php endif; ?>"></b> </li>
              <li class="<?php if ($this->_var['pager']['sort'] == 'zhekou'): ?>curr<?php endif; ?>"> <a href="pro_search.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter=<?php echo $this->_var['filterid']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=zhekou&order=<?php if ($this->_var['pager']['sort'] == 'zhekou' && $this->_var['pager']['order'] == 'ASC'): ?>DESC<?php else: ?>ASC<?php endif; ?>">折扣</a><b class="icon-order-<?php if ($this->_var['pager']['sort'] == 'zhekou' && $this->_var['pager']['order'] == 'DESC'): ?>DESC<?php else: ?>ASC<?php endif; ?>"></b> </li>
            </ul>
            <div class='pro-pagin'> 
              <?php if ($this->_var['pager']['page_prev']): ?> 
              <a href="<?php echo $this->_var['pager']['page_prev']; ?>" class="prev" title="上一页"></a> 
              <?php else: ?> 
              <span class="prev-disabled"></span> 
              <?php endif; ?> 
              <span class='text'><span><?php echo $this->_var['pager']['page']; ?></span>/<?php echo $this->_var['pager']['page_count']; ?></span> 
              <?php if ($this->_var['pager']['page_next']): ?> 
              <a href="<?php echo $this->_var['pager']['page_next']; ?>" class="next" class="下一页"></a> 
              <?php else: ?> 
              <span class="next-disabled"></span> 
              <?php endif; ?> 
            </div>
            <div style="height:0px; line-height:0px; clear:both;"></div>
          </div>
        </form>
      </div>
      
      <div class="pro-search-list">
          <div class="bd">
          		 <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'goods');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['goods']):
        $this->_foreach['name']['iteration']++;
?> 
                 <?php if ($this->_var['goods']['goods_name'] != ''): ?>
                <div class="pro-search-info <?php if ($this->_foreach['name']['iteration'] % 2 == 1): ?>pro-search-info-t<?php endif; ?>">
                  <div class="img"> 
                  	<a href="<?php echo $this->_var['goods']['url']; ?>" target="_blank"> 
                  		<img data-original="<?php echo $this->_var['goods']['goods_thumb']; ?>" src="themes/68ecshopcom_360buy/images/loading.gif" alt="<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>" class="img-ks-lazyload"> 
                        <?php if ($this->_var['goods']['goods_number'] == 0): ?> 
                        <div class="sold-out"></div>
                        <?php endif; ?>
                    </a>
                    <div class="discount"> 
                      <b class="big"><?php echo $this->_var['goods']['zhekou']; ?></b>
                      <p class="dis-txt">折</p>
                    </div>
                  </div>
                  <div class="text-content">
                    <div class="meta">
                      <div class="desc">
                      	<i></i><span class="txt main-color" endTime="<?php echo $this->_var['goods']['pro_end_time']; ?>"></span> 
                        <span class="count"><?php echo $this->_var['goods']['count1']; ?>人已购买</span>
                      </div>
                      <div class="title-des">
                      	<a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>" target="_blank"> <?php echo $this->_var['goods']['goods_name']; ?></a>
                      </div>
                    </div>
                    <div class="pb-content">
                      <div class="price">  
                      	<span class="act"> 
                        	<span class="big main-color">
                            <?php if ($this->_var['goods']['promote_price'] != ""): ?> 
                            <?php echo $this->_var['goods']['promote_price']; ?> 
                            <?php else: ?> 
                            <?php echo $this->_var['goods']['shop_price']; ?> 
                            <?php endif; ?> 
                            </span>
                        </span>
                        <span class="tag gray"><?php echo $this->_var['goods']['shop_price']; ?></span>
                      </div>
                      <a class="btn-doing" title="立即抢购" href="<?php echo $this->_var['goods']['url']; ?>" target="_blank">立即抢购</a> 
                    </div>
                  </div>
                </div>
                <?php endif; ?>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
          </div>
       </div>
	<?php echo $this->fetch('library/pages.lbi'); ?> 
</div>
<?php echo $this->fetch('library/right_sidebar.lbi'); ?> 
<div class="site-footer">
  <div class="footer-related">
  	<?php echo $this->fetch('library/help.lbi'); ?> 
	<?php echo $this->fetch('library/page_footer.lbi'); ?>
  </div>
</div>
<script type="text/javascript">
$("img").lazyload({
    effect       : "fadeIn",
	 skip_invisible : true,
	 failure_limit : 20
});
</script> 
<script>
$(function(){
updateEndTime();
});
//倒计时函数
function updateEndTime()
{
 var date = new Date();
    /* 代码修改 By  www.68ecshop.com 促销商品时间精确到时分 Start */
// var time = date.getTime()+8*60*60*1000;
    var time = date.getTime();
    /* 代码修改 By  www.68ecshop.com 促销商品时间精确到时分 End */

    $(".txt").each(function(i){
 
 var endDate =this.getAttribute("endTime"); //结束时间字符串

 //转换为时间日期类型
 var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) {return parseInt(a, 10) - 1;}).match(/\d+/g) + ')');

 var endTime = endDate1.getTime(); //结束时间毫秒数
 
 var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
  if(lag > 0)
  {
   var second = Math.floor(lag % 60);     
   var minite = Math.floor((lag / 60) % 60);
   var hour = Math.floor((lag / 3600) % 24);
   var day = Math.floor((lag / 3600) / 24);
   $(this).html(day+"天"+hour+"小时"+minite+"分"+second+"秒");
  }
  else
   $(this).html("团购已经结束啦！");
 });
 setTimeout("updateEndTime()",1000);
}
</script>
</body>
</html>
