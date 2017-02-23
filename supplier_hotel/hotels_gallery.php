<?php


define('IN_ECS', true);


require(dirname(__FILE__) . '/includes/init.php');

$supplier_id = $_SESSION['supplier_id'];


$gallery_list = array(
    array(
        'attr_id' => 0,
        'attr_value' => '正面图'
    ),
    array(
        'attr_id' => 1,
        'attr_value' => '外观/大堂'
    ),
    array(
        'attr_id' => 2,
        'attr_value' => '客房'
    ),
    array(
        'attr_id' => 3,
        'attr_value' => '其他'
    )
);

/* 显示商品信息页面 */
assign_query_info();
$smarty->assign('gallery_list',$gallery_list);
$smarty->assign('gallery_count',count($gallery_list));
$smarty->assign('supplier_id',$supplier_id);
$smarty->display('hotels_gallery.htm');