<ul id="fullScreenSlides" class="full-screen-slides">
  <?php $_from = $this->_var['flash']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'flash_0_51865000_1481099636');$this->_foreach['myflash'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['myflash']['total'] > 0):
    foreach ($_from AS $this->_var['flash_0_51865000_1481099636']):
        $this->_foreach['myflash']['iteration']++;
?>
  <li style=" background:url(<?php echo $this->_var['flash_0_51865000_1481099636']['src']; ?>) center no-repeat;<?php if (! ($this->_foreach['myflash']['iteration'] <= 1)): ?>display: none; <?php else: ?> display:list-item<?php endif; ?>"> 
  	<a href="<?php echo $this->_var['flash_0_51865000_1481099636']['url']; ?>" target="_blank" title="<?php echo $this->_var['flash_0_51865000_1481099636']['title']; ?>">&nbsp;</a> 
  </li>
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</ul>
<ul class="full-screen-slides-pagination">
	<?php $_from = $this->_var['flash']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'flash_0_51865000_1481099636');$this->_foreach['myflash'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['myflash']['total'] > 0):
    foreach ($_from AS $this->_var['flash_0_51865000_1481099636']):
        $this->_foreach['myflash']['iteration']++;
?>
	<li <?php if (($this->_foreach['myflash']['iteration'] <= 1)): ?>class="current"<?php endif; ?>><a href="javascript:;"><?php echo $this->_foreach['myflash']['iteration']; ?></a></li>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</ul>
<div class="focus-trigeminy">
  <div class="carousel">
    <ul class="box">
        <?php
		 $GLOBALS['smarty']->assign('index_lit_img1',get_advlist('首页幻灯片-小图下',6));
		?>
        <?php $_from = $this->_var['index_lit_img1']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad_0_51865000_1481099636');$this->_foreach['index_image'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['index_image']['total'] > 0):
    foreach ($_from AS $this->_var['ad_0_51865000_1481099636']):
        $this->_foreach['index_image']['iteration']++;
?> 
        <li><a href="<?php echo $this->_var['ad_0_51865000_1481099636']['url']; ?>" target="_blank" title="<?php echo $this->_var['ad_0_51865000_1481099636']['name']; ?>"><img src="<?php echo $this->_var['ad_0_51865000_1481099636']['image']; ?>"  alt="<?php echo $this->_var['ad_0_51865000_1481099636']['name']; ?>" /></a> </li>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </ul>
  </div>
  <a href="javascript:void(0);" class="prev" title="上一个">&lt;</a>
  <a href="javascript:void(0);" class="next" title="下一个">&gt;</a>
</div>
<script type="text/javascript">
$(function(){
	$('.focus-trigeminy').hover(function(){
			$('.prev,.next').fadeTo('fast',0.4);
		},function(){
			$('.prev,.next').fadeTo('fast',0);
	})
	Move(".next",".prev",".box",".focus-trigeminy","3");
})
</script>
