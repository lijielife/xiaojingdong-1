<div id="shop-info">
  <dl class="shop-title">
    <dt><span>平台自营</span></dt>
  </dl>
  <div class="shop-info-detail">
      <div class="blank10"></div>
      <dl>
        <dt>商家名称：</dt>
        <dd><?php echo $this->_var['shop_name']; ?></dd>
      </dl>
      <?php if ($this->_var['service_email']): ?>
      <dl>
        <dt>客服邮件：</dt>
        <dd><?php echo $this->_var['service_email']; ?></dd>
      </dl>
      <?php endif; ?>
      <?php if ($this->_var['service_phone']): ?>
      <dl>
        <dt>客服电话：</dt>
        <dd><?php echo $this->_var['service_phone']; ?></dd>
      </dl>
      <?php endif; ?>
      <dl>
        <dt>所在地区：</dt>
        <dd><?php echo $this->_var['shop_address']; ?></dd>
      </dl>
      <ul class="service-promise">
        <li class="service-promise1"><a href="javascript:;" title="货到付款"></a></li>
        <li class="service-promise2"><a href="javascript:;" title="正品保障"></a></li>
        <li class="service-promise3" style="margin:0;"><a href="javascript:;" title="当天配送"></a></li>
      </ul>
      <div id="enter-shop"> 
        <div class="shop-customer clearfix">
            <?php $_from = $this->_var['qq']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'im');if (count($_from)):
    foreach ($_from AS $this->_var['im']):
?>
            <?php if ($this->_var['im']): ?>
            <a class="btn-customer" href="http://wpa.qq.com/msgrd?V=1&amp;uin=<?php echo $this->_var['im']; ?>&amp;Site=<?php echo $this->_var['shop_name']; ?>&amp;Menu=yes" target="_blank" title="点击这里联系我">
                <i><img src="http://wpa.qq.com/pa?p=1:<?php echo $this->_var['im']; ?>:4" height="16" border="0" alt="QQ" /></i>联系QQ
            </a>
            <?php endif; ?>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            <?php $_from = $this->_var['ww']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'im');if (count($_from)):
    foreach ($_from AS $this->_var['im']):
?>
            <?php if ($this->_var['im']): ?>
            <a class="btn-customer btn-customer-ww" href="http://amos1.taobao.com/msg.ww?v=2&uid=<?php echo urlencode($this->_var['im']); ?>&s=2" target="_blank">
                <i><img src="http://amos1.taobao.com/online.ww?v=2&uid=<?php echo urlencode($this->_var['im']); ?>&s=2" width="16" height="16" border="0" alt="淘宝旺旺" /></i>联系旺旺
            </a>
            <?php endif; ?>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </div>
        <div id="attention-shop">
            <p>扫一扫，手机访问微商城</p>
            <img src="erweima_supplier.php?sid=0" width="120" height="120" />
        </div>
      </div>
	</div>
</div>
