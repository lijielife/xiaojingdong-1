<div class="aside-con aside-con1">
  <div class="aside-tit">
    <h2>相关分类</h2>
  </div>
  <div class="aside-list">
    <ul>
      <?php
             $parent_cat_id = get_parent_cat_id($GLOBALS['smarty']->_var['goods']['cat_id']);
             $GLOBALS['smarty']->assign('child_cat',get_child_cat($parent_cat_id));
              ?>
      <?php $_from = $this->_var['child_cat']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_0_38058100_1481099703');$this->_foreach['child_cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['child_cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat_0_38058100_1481099703']):
        $this->_foreach['child_cat']['iteration']++;
?>
      <li><a href="<?php echo $this->_var['cat_0_38058100_1481099703']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['cat_0_38058100_1481099703']['name']); ?>"><?php echo sub_str($this->_var['cat_0_38058100_1481099703']['name'],6); ?></a></li>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </ul>
  </div>
</div>
