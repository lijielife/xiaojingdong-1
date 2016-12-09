<?php if ($this->_var['bought_goods']): ?>
<div class="aside-con collect" style="height:auto;">
	<div class="aside-tit">
    	<h2>购买了该商品的用户还购买了</h2>
    </div>
    <div class="aside-list colList">
      <div class="clock colFrame" style="height:auto;">
        <ul style="height:auto;">
          <?php $_from = $this->_var['bought_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'bought_goods_data');$this->_foreach['bought_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['bought_goods']['total'] > 0):
    foreach ($_from AS $this->_var['bought_goods_data']):
        $this->_foreach['bought_goods']['iteration']++;
?>
          <li class="fore <?php if (($this->_foreach['bought_goods']['iteration'] <= 1)): ?>fore1<?php endif; ?>" >
            <div class="p-img"><a target="_blank" title="<?php echo htmlspecialchars($this->_var['bought_goods_data']['goods_name']); ?>" href="<?php echo $this->_var['bought_goods_data']['url']; ?>"><img width="100" height="100" alt="" src="<?php echo $this->_var['bought_goods_data']['goods_thumb']; ?>" /></a> 
            </div>
            <div class="rate"><a target="_blank" title="<?php echo htmlspecialchars($this->_var['bought_goods_data']['goods_name']); ?>" href="<?php echo $this->_var['bought_goods_data']['url']; ?>"><?php echo sub_str($this->_var['bought_goods_data']['short_name'],12); ?></a></div>
            <div class="p-price"><strong class="main-color"><?php if ($this->_var['bought_goods']['promote_price'] != ""): ?><?php echo $this->_var['bought_goods_data']['promote_price']; ?><?php else: ?><?php echo $this->_var['bought_goods_data']['shop_price']; ?><?php endif; ?></strong></div>
          </li>
          <?php if (! ($this->_foreach['bought_goods']['iteration'] == $this->_foreach['bought_goods']['total'])): ?>
          <div class="blank5"></div>
          <?php endif; ?> 
          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </ul>
      </div>
    </div>
</div>
<?php endif; ?> 

