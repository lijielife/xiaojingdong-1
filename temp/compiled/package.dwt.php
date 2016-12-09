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
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/package.css" />
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-1.9.1.min.js" ></script>
<?php echo $this->smarty_insert_scripts(array('files'=>'jquery.json.js,transport.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'common.js')); ?>
</head>
<body>
<?php echo $this->fetch('library/page_header.lbi'); ?>
<div class="margin-w1210 clearfix">
  	<?php echo $this->fetch('library/ur_here.lbi'); ?>
    <div class="box spc-main">
      <?php $_from = $this->_var['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'val');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['val']):
        $this->_foreach['name']['iteration']++;
?> 
       <a name="<?php echo $this->_var['val']['act_id']; ?>"></a>
      <div class="floor" id="floor<?php echo $this->_var['val']['act_id']; ?>">
        <div class="title main-color">
            <span class="floor-name"><?php echo $this->_var['val']['act_name']; ?></span>
        </div>
      	<div class="content">
          <div class="item-container">
            <div class="item clearfix">
              <div class="goods-count icon">此套装：<?php echo $this->_var['val']['goods_list_count']; ?>件</div>
              <div class="item-l fl">
                <div class="stage">
                  <table >
                    <tbody>
                      <tr>
                      <?php $_from = $this->_var['val']['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['name']['iteration']++;
?> 
                        <td>
                          <div class="img"> 
                        	<a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" title="<?php echo $this->_var['goods']['goods_name']; ?>" target="_blank"> 
                            	<img src="<?php echo $this->_var['goods']['goods_thumb']; ?>" alt="<?php echo $this->_var['goods']['goods_name']; ?>" /> 
                            </a> 
                          </div>
                          <p class="info1"> 
                            <a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" title="<?php echo $this->_var['goods']['goods_name']; ?>" target="_blank"><?php echo sub_str($this->_var['goods']['goods_name'],10); ?></a><br>
                            <span class="gray"></span><span class="yen main-color"> <?php if ($this->_var['rank_prices']): ?><?php echo $this->_var['goods']['rank_price']; ?><?php else: ?><?php echo $this->_var['goods']['shop_price']; ?><?php endif; ?> </span><span class="num yen">X <?php echo $this->_var['goods']['goods_number']; ?></span>
                          </p>
                        </td>
                        <td <?php if (($this->_foreach['name']['iteration'] == $this->_foreach['name']['total'])): ?>style="display:none"<?php endif; ?>><span class="plus icon"></span></td>
                      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="item-r fr">
                <div class="fl"> <span class="equal icon"></span> </div>
                <div class="fr">
                  <h4><a title="<?php echo $this->_var['val']['act_name']; ?>" target="_blank"><?php echo $this->_var['val']['act_name']; ?></a></h4>
                  <p> 
                    <span class="main-color">套装价：</span><br>
                    <span class="main-color yen"><span class="price"><?php echo $this->_var['val']['package_price']; ?></span></span> <br>
                    <del class="yen gray"><?php echo $this->_var['val']['subtotal']; ?></del><br>
                    <span class="save-icon icon"></span><span class="yen main-color"><?php echo $this->_var['val']['saving']; ?></span> 
                  </p>
                  <a href="javascript:addPackageToCart(<?php echo $this->_var['val']['act_id']; ?>)" title="<?php echo $this->_var['val']['act_name']; ?>" target="_self" class="buy-icon main-bg-color">立即购买</a> </div>
              </div>
            </div>
            <div class="desc">
            	<table width="100%" border="0" cellpadding="5" cellspacing="1">
                	<tr>
          				<th width="8%">起始时间：</th>
          				<td><?php echo $this->_var['val']['start_time']; ?>&nbsp;~&nbsp;<?php echo $this->_var['val']['end_time']; ?></td>
        			</tr>
                    <tr>
          				<th>简单描述：</th>
          				<td><?php echo $this->_var['val']['act_desc']; ?></td>
        			</tr>
                </table>

            </div>
          </div>
        </div>
      </div>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
    </div>
</div>
<?php echo $this->fetch('library/right_sidebar.lbi'); ?>
<div class="site-footer">
    <div class="footer-related">
  		<?php echo $this->fetch('library/help.lbi'); ?>
  		<?php echo $this->fetch('library/page_footer.lbi'); ?>
  </div>
</div>
</body>
</html>
