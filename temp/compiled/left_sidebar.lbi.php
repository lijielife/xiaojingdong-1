<div class="elevator">
	<div class="elevator-floor">
		<?php $_from = $this->_var['cat_goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item_0_64559500_1481099636');$this->_foreach['loop'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['loop']['total'] > 0):
    foreach ($_from AS $this->_var['key'] => $this->_var['item_0_64559500_1481099636']):
        $this->_foreach['loop']['iteration']++;
?>
		<a class="smooth" href="javascript:;">
			<b class="fs"><?php echo $this->_foreach['loop']['iteration']; ?>F</b>
			<em class="fs-name"><?php echo $this->_var['item_0_64559500_1481099636']['ext_info']['short_name']; ?></em>
			<?php if (($this->_foreach['loop']['iteration'] == $this->_foreach['loop']['total']) == false): ?>
			<i class="fs-line"></i>
			<?php endif; ?>
		</a>
		<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	</div>
</div>