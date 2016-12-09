<div class="store-rec-slide"> 
  <?php if ($this->_var['tag_info']): ?>
  <ul class="store-rec-nav">
    <?php $_from = $this->_var['tag_info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'tag');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['tag']):
?>
    <li <?php if ($this->_var['tag']['select'] == 1): ?>class="selected"<?php endif; ?> onclick="qiehuan(<?php echo $this->_var['key']; ?>)"><?php echo $this->_var['tag']['name']; ?><i></i></li>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </ul>
  <?php endif; ?>
  <ul class="store-rec-content">
    <li class="store-rec-pannel">
        <div class="store-con">
          <p style="position: absolute; z-index: 0; opacity: 1; display: block;" class="store-wall-pannel"> 
            <?php $_from = $this->_var['supplier_logo']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'supp');$this->_foreach['supp'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['supp']['total'] > 0):
    foreach ($_from AS $this->_var['supp']):
        $this->_foreach['supp']['iteration']++;
?> 
            <?php $_from = $this->_var['supp']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'info');$this->_foreach['info'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['info']['total'] > 0):
    foreach ($_from AS $this->_var['info']):
        $this->_foreach['info']['iteration']++;
?> 
            <a class="store-item <?php if ($this->_foreach['info']['iteration'] % 6 == 0): ?>store-item-spe<?php endif; ?> item-row-<?php echo ($this->_foreach['supp']['iteration'] - 1); ?> item-col-<?php echo ($this->_foreach['info']['iteration'] - 1); ?>" href="<?php echo $this->_var['info']['shop_url']; ?>" target="_blank"> 
            	<img class="store-logo" src="<?php echo $this->_var['info']['shop_logo']; ?>" title="<?php echo $this->_var['info']['shop_name']; ?>" alt="<?php echo $this->_var['info']['shop_name']; ?>" height="45" width="90"> 
            </a> 
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
          </p>
        </div>
    </li>
  </ul>
</div>
<script>
function qiehuan(num){
	Ajax.call('other.php?act=supplier_tag', 'id=' + num, qiehuanResponse, 'GET', 'JSON');
}
function qiehuanResponse(result){
	document.getElementById('index-store').innerHTML = result.result;
		$(".store-con img").each(function(k,img){
		new JumpObj(img,10);
	});
}
</script>