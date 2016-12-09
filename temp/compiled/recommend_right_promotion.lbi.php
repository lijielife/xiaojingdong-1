<?php if ($this->_var['promotion_goods']): ?>
<div class="sale-discount">
  <h3>限时抢购</h3>
  <ul class="saleDiscount">
    <?php $_from = $this->_var['promotion_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'goods');$this->_foreach['index_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['index_goods']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['goods']):
        $this->_foreach['index_goods']['iteration']++;
?> 
    <?php if ($this->_foreach['index_goods']['iteration'] < 6): ?>
    <li>
      <div class="sale-con">
        <p class="time-remain" count_down="<?php echo $this->_var['goods']['lefttime']; ?>"> 
        	<span id="leftTime<?php echo $this->_var['key']; ?>"> 
            	<em time_id="d" class="main-bg-color"></em> 天 
                <em time_id="h" class="main-bg-color"></em> 小时
                <em time_id="m" class="main-bg-color"></em> 分 
                <em time_id="s" class="main-bg-color"></em> 秒 
            </span> 
        </p>
        <p class="goods-thumb"> 
        	<a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods']['name']); ?>"><img src="<?php echo $this->_var['goods']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods']['name']); ?>"></a>
        </p>
        <p class="goods-name"> <a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods']['name']); ?>"><?php echo $this->_var['goods']['short_style_name']; ?></a> </p>
        <p class="goods-price"> 
          <span class="main-color"> 
          <?php if ($this->_var['goods']['promote_price'] != ""): ?> 
          <?php echo $this->_var['goods']['promote_price']; ?> 
          <?php else: ?> 
          <?php echo $this->_var['goods']['shop_price']; ?> 
          <?php endif; ?> 
          </span> 
          <span class="goods-discount main-color"><?php echo $this->_var['goods']['zhekou']; ?>折</span> 
        </p>
      </div>
    </li>
    <?php endif; ?> 
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </ul>
  <div class="arrow pre" style="opacity: 0;"></div>
  <div class="arrow next" style="opacity: 0;"></div>
</div>
<script type="text/javascript">
	Move(".next",".pre",".saleDiscount",".sale-discount","1");
</script>
<?php endif; ?>