<div class="aside-con aside-con1">
  <div class="aside-tit">
    <h2>同类品牌</h2>
  </div>
  <div class="aside-list">
    <ul>
      <?php $GLOBALS['smarty']->assign('get_cat_brands',get_cat_brands($this->_var['goods']['cat_id']));?>
      <?php $_from = $this->_var['get_cat_brands']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'brand_cat');$this->_foreach['get_cat_brands'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['get_cat_brands']['total'] > 0):
    foreach ($_from AS $this->_var['brand_cat']):
        $this->_foreach['get_cat_brands']['iteration']++;
?>
      <li><a href="brand.php?id=<?php echo $this->_var['brand_cat']['id']; ?>" title="<?php echo $this->_var['brand_cat']['name']; ?>"><?php echo $this->_var['brand_cat']['name']; ?></a></li>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </ul>
  </div>
</div>
