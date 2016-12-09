<ul class="tabs-nav">
<?php if ($this->_var['promotion_goods']): ?>
  <li class=""><i class="arrow"></i>
    <h3>疯狂抢购</h3>
  </li>
<?php endif; ?>
<?php if ($this->_var['top_goods']): ?>
  <li class=""><i class="arrow"></i>
    <h3>热销排行</h3>
  </li>
<?php endif; ?>
<?php if ($this->_var['hot_goods']): ?>
  <li class=""><i class="arrow"></i>
    <h3>商城热卖</h3>
  </li>
<?php endif; ?>
<?php if ($this->_var['best_goods']): ?>
  <li class=""><i class="arrow"></i>
    <h3>商城推荐</h3>
  </li>
<?php endif; ?>
<?php if ($this->_var['new_goods']): ?>
  <li class="tabs-selected"><i class="arrow"></i>
    <h3>新品上市</h3>
  </li>
<?php endif; ?>
</ul>
