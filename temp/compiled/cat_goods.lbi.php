<?php
$GLOBALS['smarty']->assign('cat_recommend_type',get_cat_recommend_type($GLOBALS['smarty']->_var['goods_cat']['id']));
?>

<div class="floor" floor="<?php echo $this->_var['sort_order']; ?>" color="<?php echo $this->_var['ext_info']['cat_color']; ?>">
		<div class="floor-layout">
			<?php
	 		$GLOBALS['smarty']->assign('index_image3',get_advlist('首页-分类ID'.$GLOBALS['smarty']->_var['goods_cat']['id'].'通栏广告', 1));
	 		?>
			<?php $_from = $this->_var['index_image3']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad_0_53134400_1481099636');$this->_foreach['index_image'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['index_image']['total'] > 0):
    foreach ($_from AS $this->_var['ad_0_53134400_1481099636']):
        $this->_foreach['index_image']['iteration']++;
?>
			<a href="<?php echo $this->_var['ad_0_53134400_1481099636']['url']; ?>" target="_blank" class="banner-ad">
				<img src="<?php echo $this->_var['ad_0_53134400_1481099636']['image']; ?>" alt="" height="100" width="1210">
			</a>
			<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			<div class="floor-con">
				<div class="floor-title">
					<h2>
						<span> <?php echo $this->_var['sort_order']; ?>F </span>
						<a href="<?php echo $this->_var['goods_cat']['url']; ?>" target="_blank"><?php echo htmlspecialchars($this->_var['goods_cat']['name']); ?></a>
					</h2>
                    <ul class="floor-tabs-nav">
						<li class="floor-tabs-selected">
							<h3 style="border-color: <?php echo $this->_var['ext_info']['cat_color']; ?> <?php echo $this->_var['ext_info']['cat_color']; ?> #fff; color: <?php echo $this->_var['ext_info']['cat_color']; ?>;">精挑细选</h3>
						</li>
						<?php
						$GLOBALS['smarty']->assign('child_cat',get_child_cat($GLOBALS['smarty']->_var['goods_cat']['id'], 3));
						?>
						<?php $_from = $this->_var['child_cat']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_item');$this->_foreach['child_cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['child_cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat_item']):
        $this->_foreach['child_cat']['iteration']++;
?>
						<li class="">
							<h3><?php echo htmlspecialchars($this->_var['cat_item']['name']); ?></h3>
						</li>
						<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
					</ul>
				</div>
                <script type="text/javascript">
				$(function() {
					var sWidth = $("#focus_<?php echo $this->_var['goods_cat']['id']; ?>").width(); //获取焦点图的宽度（显示面积）
					var len = $("#focus_<?php echo $this->_var['goods_cat']['id']; ?> ul li").length; //获取焦点图个数
					var index = 0;
					var picTimer;
				     //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
					var btn = "<div class='btn'>";
				
					for(var i=0; i < len; i++) {
						btn += "<span></span>";
					}
					btn += "</div>";
					$("#focus_<?php echo $this->_var['goods_cat']['id']; ?>").append(btn);
					$("#focus_<?php echo $this->_var['goods_cat']['id']; ?> .btnBg").css("opacity",0.5);
				
					//为小按钮添加鼠标滑入事件，以显示相应的内容
					$("#focus_<?php echo $this->_var['goods_cat']['id']; ?> .btn span").css("opacity",0.3).mouseover(function() {
						index = $("#focus_<?php echo $this->_var['goods_cat']['id']; ?> .btn span").index(this);
						showPics(index);
					}).eq(0).trigger("mouseover");
				
					//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
					$("#focus_<?php echo $this->_var['goods_cat']['id']; ?> ul").css("width",sWidth * (len));
					
					//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
					$("#focus_<?php echo $this->_var['goods_cat']['id']; ?>").hover(function() {
						clearInterval(picTimer);
					},function() {
						picTimer = setInterval(function() {
							showPics(index);
							index++;
							if(index == len) {index = 0;}
						},3000); //此4000代表自动播放的间隔，单位：毫秒
					}).trigger("mouseleave");
					
					//显示图片函数，根据接收的index值显示相应的内容
					function showPics(index) { //普通切换
						var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
						$("#focus_<?php echo $this->_var['goods_cat']['id']; ?> ul").stop(true,false).animate({"left":nowLeft},300);
						$("#focus_<?php echo $this->_var['goods_cat']['id']; ?> .btn span").stop(true,false).animate({"opacity":"0.3"},300).eq(index).stop(true,false).animate({"opacity":"0.7"},300); //为当前的按钮切换到选中的效果
					}
				});
				
				</script>
                <div class="floor-content">
                	<div class="floor-left" style="border-top: 1px <?php echo $this->_var['ext_info']['cat_color']; ?> solid;">
                    	<?php
						$GLOBALS['smarty']->assign('index_image',get_advlist('首页-分类ID'.$GLOBALS['smarty']->_var['goods_cat']['id'].'-左侧图片', 3));
	 					?>
						<?php if ($this->_var['index_image']): ?>
                        <div id="focus_<?php echo $this->_var['goods_cat']['id']; ?>" class="floor-banner">
                        	<ul>
                            <?php $_from = $this->_var['index_image']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad_0_53232100_1481099636');$this->_foreach['index_image'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['index_image']['total'] > 0):
    foreach ($_from AS $this->_var['ad_0_53232100_1481099636']):
        $this->_foreach['index_image']['iteration']++;
?>
                            	<li>
                                	<a href="<?php echo $this->_var['ad_0_53232100_1481099636']['url']; ?>" target="_blank"><img src="<?php echo $this->_var['ad_0_53232100_1481099636']['image']; ?>" width="270" height="475" /></a>
                                </li>
                            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </ul>
                        </div>
                        <?php else: ?>
                        <div id="focus_<?php echo $this->_var['goods_cat']['id']; ?>" class="floor-banner">
                        	<ul>
                            	<li>
                                	<a href="javascript:;" target="_self"><img src="themes/68ecshopcom_360buy/images/default-img.jpg" width="270" height="475" /></a>
                                </li>
                            </ul>
                        </div>
						<?php endif; ?>
          
						<ul class="floor-words">
							<?php
            				$ii = 0;
							$GLOBALS['smarty']->assign('child_cat_hot',get_hot_cat_tree($GLOBALS['smarty']->_var['goods_cat']['id'], 3));
	    					?>
							<?php $_from = $this->_var['child_cat_hot']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_0_53232100_1481099636');$this->_foreach['name1'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name1']['total'] > 0):
    foreach ($_from AS $this->_var['cat_0_53232100_1481099636']):
        $this->_foreach['name1']['iteration']++;
?>
							<?php $_from = $this->_var['cat_0_53232100_1481099636']['child']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_child');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['cat_child']):
        $this->_foreach['name']['iteration']++;
?>
							<?php
	        				$ii = $ii + 1;
							$GLOBALS['smarty']->assign('ii', $ii);
							?>
							<?php if ($this->_var['ii'] < 9): ?>
							<li>
                            	<a href="<?php echo $this->_var['cat_child']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['cat_child']['name']); ?>">
									<?php echo htmlspecialchars($this->_var['cat_child']['name']); ?>
								</a>
                            </li>
							<?php endif; ?>
							<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
						</ul>
                    </div>
                    <div class="floor-right">
                    	
							<div class="floor-tabs-panel" style="border-top: 1px <?php echo $this->_var['ext_info']['cat_color']; ?> solid;">
								<?php
		 						$GLOBALS['smarty']->assign('best_goods', get_cat_recommend_goods('best', get_children($GLOBALS['smarty']->_var['goods_cat']['id']), 8));
								?>
								<?php $_from = $this->_var['best_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods_0_53232100_1481099636');$this->_foreach['cat_item_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['cat_item_goods']['total'] > 0):
    foreach ($_from AS $this->_var['goods_0_53232100_1481099636']):
        $this->_foreach['cat_item_goods']['iteration']++;
?>
								<div class="goods" id="li_<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>" <?php if ($this->_foreach['cat_item_goods']['iteration'] % 4 == 0): ?>style="width: 234px"<?php endif; ?>>
									<div class="wrap">
										<a target="_blank" href="<?php echo $this->_var['goods_0_53232100_1481099636']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>">
											<img src="<?php echo $this->_var['goods_0_53232100_1481099636']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>" height="140" width="140" class="pic_img_<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>">
										</a>
										<p class="title">
											<a target="_blank" href="<?php echo $this->_var['goods_0_53232100_1481099636']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>"><?php echo $this->_var['goods_0_53232100_1481099636']['short_style_name']; ?></a>
										</p>
										<p class="price">
											<span>
												<?php if ($this->_var['goods_0_53232100_1481099636']['promote_price'] != ""): ?>
												<?php echo $this->_var['goods_0_53232100_1481099636']['promote_price']; ?>
												<?php else: ?>
												<?php echo $this->_var['goods_0_53232100_1481099636']['shop_price']; ?>
												<?php endif; ?>
											</span>
										</p>
										<a class="add-cart" onclick="addToCart(<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>)" title="加入购物车"></a>
									</div>
								</div>
								<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							</div>
							<?php $_from = $this->_var['child_cat']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_item');$this->_foreach['child_cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['child_cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat_item']):
        $this->_foreach['child_cat']['iteration']++;
?>
							<?php
							$GLOBALS['smarty']->assign('child_cat_index', $child_cat_index);
							?>
							
							<div class="floor-tabs-panel floor-tabs-hide" style="border-top: 1px <?php echo $this->_var['ext_info']['cat_color']; ?> solid;">
                           
								<ul>
									<?php
									$GLOBALS['smarty']->assign('new_goods', get_cat_recommend_goods('new', get_children($GLOBALS['smarty']->_var['cat_item']['id']), 8));
									?>
									<?php $_from = $this->_var['new_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods_0_53232100_1481099636');$this->_foreach['goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['goods']['total'] > 0):
    foreach ($_from AS $this->_var['goods_0_53232100_1481099636']):
        $this->_foreach['goods']['iteration']++;
?>
									<div class="goods" id="li_<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>" <?php if ($this->_foreach['goods']['iteration'] % 4 == 0): ?>style="width: 234px"<?php endif; ?>>
										<div class="wrap">
											<a target="_blank" href="<?php echo $this->_var['goods_0_53232100_1481099636']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>">
												<img src="<?php echo $this->_var['goods_0_53232100_1481099636']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>" height="140" width="140" class="pic_img_<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>">
											</a>
											<p class="title">
												<a target="_blank" href="<?php echo $this->_var['goods_0_53232100_1481099636']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_53232100_1481099636']['name']); ?>"><?php echo $this->_var['goods_0_53232100_1481099636']['short_style_name']; ?></a>
											</p>
											<p class="price">
												<span class="j_CurPrice">
													<?php if ($this->_var['goods_0_53232100_1481099636']['promote_price'] != ""): ?>
													<?php echo $this->_var['goods_0_53232100_1481099636']['promote_price']; ?>
													<?php else: ?>
													<?php echo $this->_var['goods_0_53232100_1481099636']['shop_price']; ?>
													<?php endif; ?>
												</span>
											</p>
											<a class="add-cart" onclick="addToCart(<?php echo $this->_var['goods_0_53232100_1481099636']['id']; ?>)" title="加入购物车"></a>
										</div>
									</div>
									<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
								</ul>
							</div>
							<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    </div>
                </div>
                <?php
					$GLOBALS['smarty']->assign('catbrand',get_cat_brands($GLOBALS['smarty']->_var['goods_cat']['id'], 14));
	    		?>
                <?php if ($this->_var['catbrand']): ?>
                <div class="floor-brand">
					<div class="tabs-brand">
							<div class="brand">
								<div class="brand-con">
									<ul class="yyyy_<?php echo $this->_var['goods_cat']['id']; ?>"  style="position: absolute; width: 1210px; height: 40px; top: 0px; left: 1px;">
										<?php $_from = $this->_var['catbrand']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'item');$this->_foreach['catbrand'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['catbrand']['total'] > 0):
    foreach ($_from AS $this->_var['item']):
        $this->_foreach['catbrand']['iteration']++;
?>
										<li <?php if (($this->_foreach['catbrand']['iteration'] <= 1)): ?>class="fore1"<?php endif; ?>>
											<a href="<?php echo $this->_var['item']['url']; ?>" target="_blank" title="<?php echo htmlspecialchars($this->_var['item']['name']); ?>">
												<img width="100" height="40" src="data/brandlogo/<?php echo $this->_var['item']['logo']; ?>" alt="<?php echo htmlspecialchars($this->_var['item']['name']); ?>">
											</a>
										</li>
										<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
									</ul>
									<div class="brand-btn">
										<a class="brand-left right_<?php echo $this->_var['goods_cat']['id']; ?>" href="javascript:void(0)">&lt;</a>
										<a class="brand-right left_<?php echo $this->_var['goods_cat']['id']; ?>" href="javascript:void(0)">&gt;</a>
									</div>
								</div>
							</div>
						<script type="text/javascript">
						Move(".left_<?php echo $this->_var['goods_cat']['id']; ?>",".right_<?php echo $this->_var['goods_cat']['id']; ?>",".yyyy_<?php echo $this->_var['goods_cat']['id']; ?>",".brand","10");
						</script>
					</div>
				</div>
                <?php endif; ?>
			</div>
		</div>
</div>
