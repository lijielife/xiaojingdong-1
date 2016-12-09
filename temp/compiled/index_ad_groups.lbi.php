<?php
 $GLOBALS['smarty']->assign('index_ad_groups',get_advlist('首页生活的橱窗',5));
?>
<?php if (index_ad_groups): ?>
<div class="w1210 ad-groups">
    <div class="mc">
      <div class="sc-list">
        <?php $_from = $this->_var['index_ad_groups']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad_0_52255600_1481099636');if (count($_from)):
    foreach ($_from AS $this->_var['ad_0_52255600_1481099636']):
?> 
        <div class="item w-bg">
          <a class="s-img" target="_blank" href="<?php echo $this->_var['ad_0_52255600_1481099636']['url']; ?>"><img width="242px" height="350px" src="<?php echo $this->_var['ad_0_52255600_1481099636']['image']; ?>" /></a> 
        </div>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
      </div>
    </div>
</div>
<?php endif; ?>
