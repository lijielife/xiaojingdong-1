<?php

/**
 * 酒店详情页
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

$smarty->template_dir   = ROOT_PATH . 'themes/elong';
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
if(!$id)
{
//    header("Location:hotel.php");
//    exit;
}
$dates = get_now_next_date();
$checkin = isset($_REQUEST['checkin']) ? $_REQUEST['checkin'] : $dates[0];
$checkout = isset($_REQUEST['checkout']) ? $_REQUEST['checkout'] : $dates[1];

//获取酒店的信息
$info = get_hotel_info_by_id($id);
if(!$info)
{
    echo '<script>alert("酒店不存在!");window.location.href="hotel.php";</script>';
    exit;
}

//print_r($info);

$city = trim($info['city_cn'],'市') . '市';
$city_hotels_url = "hotel_search.php?act=list&city=$city&checkin=$checkin&checkout=$checkout&keywords=";
$smarty->assign('city',$city);
$smarty->assign('city_hotels_url',$city_hotels_url);

$smarty->assign('info',$info);

//酒店正面照
$hotel_big_pic_html = create_hotel_big_pic_html($info['photos']);
$smarty->assign('hotel_big_pic_html',$hotel_big_pic_html);

//酒店照片分类
$hotel_pic_type_html = create_hotel_pic_type_html($info['photos']);
$smarty->assign('hotel_pic_type_html',$hotel_pic_type_html);

//酒店分类详细照片
$hotel_image_detail_html = create_hotel_image_detail_html($info['photos']);
$smarty->assign('hotel_image_detail_html',$hotel_image_detail_html);

//酒店房间信息
$room_html = create_room_html($id);
$smarty->assign('room_html',$room_html);

$d = get_package_goods_list($id);
print_r($d);exit;

$smarty->display('detail.html');


/**
 * 创造酒店正面照的html
 */
function create_hotel_big_pic_html($photos)
{
    $photos = $photos[0];
    $html = '<div class="hrela_pic_w"><div class="wac" id="wac" style="display: block;">';
    $html .= '<img src="'.$photos['img_original'].'" onerror="this.src=\'http://www.elongstatic.com/web/hotel/pic/no-pic-b.jpg?t=20161212115214\' height="325"></div>';
    $html .= '<div id="360pano" class="wbc" style="display: none;"></div>';
    $html .= '<div id="headSosofullview" class="wcc" style="position:absolute;display:none;width:100%;height:400px;"></div></div>';
    return $html;

}

/**
 * 创造酒店照片分类的html
 */
function create_hotel_pic_type_html($photos)
{
    unset($photos[0]);
    $keys = array_keys($photos);
    $all_photo_count = 0 ;
    foreach($keys as $key)
    {
        $all_photo_count += count($photos[$key]);
    }
    $html = '<div class="hrela_picinfo"><ul id="hotelDetailTabHandle" class="hrela_pinfo_list">';
    $html .= '<li class="cur on" data-handle="allImage" method="tabImg">全部图片(' . $all_photo_count . ')</li><li>|</li>';
    foreach($keys as $key => $val)
    {
        if($key + 1 < count($keys))
        {
            $html .= '<li class="cur" data-handle="'. $val . '" method="tabImg">' .$val . '(' . count($photos[$val]) . ')</li><li>|</li>';
        }
        else
        {
            $html .= '<li class="cur" data-handle="'. $val . '" method="tabImg">' .$val . '(' . count($photos[$val]) . ')</li></ul>';
        }

    }
    $html .= '</ul></div>';
    return $html;

}



/**
 * 创建酒店各分类详细照片的html
 * @param $photos
 */
function create_hotel_image_detail_html($photos)
{
    unset($photos[0]);
    $keys = array_keys($photos);



    $html = '<ul data-handle="container" data="allImage" class="hrela_spic_list" style="width: 1980px; margin-left: 0px;">';

    //创建全部图片
    $class = 'on';
    foreach($keys as $key)
    {
        $val = $photos[$key];
        foreach($val as $v)
        {
            if($class == 'on') //只能有一个class=on
            {
                $html .= '<li class="on"> ';
            }
            else
            {
                $html .= '<li>';
            }
            $class = '';
            $html .= '<img onerror=\'this.src="http://www.elongstatic.com/hotels/pic/no_pics_CN.gif\' title="' . $key . '"';
            $html .= 'data-big="' . $v['img_original'] . '" width="80" height="80" src="' . $v['thumb_url'] . '"></li>';
        }
    }
    $html .= '</ul>';


    //创建每一个分类
    foreach($keys as $key)
    {
        $val = $photos[$key];
        $class = 'on';
        $html .= '<ul data-handle="container" data="'.$key.'" style="width: 2880px; margin-left: 0px;display: none;" class="hrela_spic_list" >';
        foreach($val as $v)
        {
            if($class == 'on') //只能有一个class=on
            {
                $html .= '<li class="on"> ';
            }
            else
            {
                $html .= '<li>';
            }
            $class = '';
            $html .= '<img onerror=\'this.src="http://www.elongstatic.com/hotels/pic/no_pics_CN.gif\' title="' . $key . '"';
            $html .= 'data-big="' . $v['img_original'] . '" width="80" height="80" src="' . $v['thumb_url'] . '"></li>';
        }
        $html .= '</ul>';
    }

    return $html;

}


/**
 * 创建酒店房间的html
 * @param $photos
 */
function create_room_html($supplier_id)
{
    //获取该酒店的全部的room
    $sql = 'SELECT goods_id FROM ' . $GLOBALS['ecs']->table('goods') . " WHERE supplier_id = '$supplier_id'";
//    $sql = 'SELECT goods_id FROM ' . $GLOBALS['ecs']->table('goods') . " WHERE goods_id = 297";
//    die($sql);
    $row = $GLOBALS['db']->getAll($sql);
    $html = '';
    foreach ($row as $val)
    {
        $id = $val['goods_id'];

        $taocan = get_package_goods_list($id); // 套餐
        $photos = get_goods_gallery_attr($id); // 房间图片
        $name = get_goods_attr_value($id,'goods_name'); // 房间名
        $market_price = get_goods_attr_value($id,'market_price');  //市场价格
        $shop_price = get_goods_attr_value($id,'shop_price');  //酒店价格
        $desc = get_goods_attr_value($id,'goods_desc');  //酒店价格
        $goods_thumb = get_goods_attr_value($id,'goods_thumb');

        print_r($taocan);
        print_r($photos);
        print_r($name);
        print_r($market_price);
        print_r($shop_price);


        $html .= '<div class="htype_item on" data-handle="roomType" data-roomid="0001">';
        $html .= ' <div class="htype_info clearfix" method="togRoom">';
        $html .= '<div class="htype_info_pic left"><img src="'.$goods_thumb['goods_thumb'].'"  width="80" height="80"></div> <div class="htype_info_pb right">'; //todo 房间的主图片
        $html .= '<p class="cf55"><span class="t14 c555">¥</span><span class="htype_info_num">'.intval($shop_price['shop_price']).'</span><span class="t12">起</span></p>';
        $html .= '<p class="htype_info_total mt5 ">共4个产品<i class="icon_triangle_8b"></i></p></div>';
        $html .= '<div class="htype_info_nt">
                                            <p class="htype_info_name">
                                                <span class="l37d">'.$name['goods_name'].'</span></p>
                                            <p class="htype_info_ty">'.$desc['goods_desc'].'
                                            
                                        </div></div>';

        //房型详细信息start
        $html .= ' <div data-handle="roomTable" style="display:block;" class="htype_info_list btddd">
                                        <table cellpadding="0" cellspacing="0" class="htype-table">
                                            <thead>
                                                <tr>
                                                    <th class="ht_empty">&nbsp;</th>
                                                    <th class="ht_name">产品名称</th>
                                                    <th class="ht_supply">供应商</th>
                                                    <th class="ht_brak">早餐</th>
                                                    <th class="ht_rule">取消规则</th>
                                                    <th class="ht_pri">
                                                        <span class="night">日均价</span></th>
                                                    <th class="ht_retu">&nbsp;</th>
                                                    <th class="ht_pay">&nbsp;</th>
                                                    <th class="ht_book">&nbsp;</th>
                                                    <th class="ht_last">&nbsp;</th></tr>
                                            </thead>
                                            <tbody>';
        $html .= '<tr data-handle="rp" style="">
                                            <td class="ht_empty">&nbsp;</td>
                                            <td class="ht_name">
                                                <span title="标准价">'.$name['goods_name'].'</span>
                                                <i class="icon_tuijia"></i>
                                            </td>
                                            <td class="ht_supply">代理</td>
                                            <td class="ht_brak">无早</td>
                                            <td class="ht_rule">
                                                <span class="ht_rule_free" method="cancelTip" canceltype="0">免费取消</span></td>
                                            <td class="ht_pri">
                                                <!-- 只有非促销的五折不展示价格日历 -->
                                                <span method="AvgPrice" class="ht_pri_h cur">¥
                                                    <span class="ht_pri_num">'.intval($shop_price['shop_price']).'</span></span>
                                            </td>';
                                        $dif = intval($market_price['market_price']) - intval($shop_price['shop_price']);
                                        if($dif > 0)
                                        {
                                            $html .= '<td class="ht_retu">
                                                <span method="coupon">'.intval($market_price['market_price']).'优惠'.$dif.'</span>
                                            </td>';
                                        }
                                        else
                                        {
                                             $html .= '<td class="ht_retu"></td>';
                                        }
                                           
        $html .= '
                                            <td class="ht_pay">
                                                <i class=""></i>
                                            </td>
                                            <td class="ht_book">
                                                <a class="btn_com_w1" rel="nofollow" method="order">预订</a>
                                                <p class="t12 cf55">仅剩3间</p></td>
                                            <td class="ht_last">&nbsp;</td></tr>';
        $html .= ' <tr class="ht_tr_other">
                                                    <td class="ht_empty">&nbsp;</td>
                                                    <td colspan="9" class="ht_other">
                                                        <ul class="ht_pic_list clearfix">';

        //房间图片
        foreach($photos as $photo)
        {
            $html .='<li method="ShowImage"><img  bigimgurl="'. $photo['img_original'].'" width="96" height="96" src="'.$photo['thumb_url'].'"></li>';
        }
        $html .= '</ul></td></tr></tbody></table></div></div>';

    }
    return $html;

}

/**
 * 取得跟商品关联的礼包列表
 *
 * @param   string  $goods_id    商品编号
 *
 * @return  礼包列表
 */
function get_package_goods_list($goods_id)
{
    $now = gmtime();
    $sql = "SELECT pg.goods_id, ga.act_id, ga.act_name, ga.act_desc, ga.goods_name, ga.start_time,
                   ga.end_time, ga.is_finished, ga.ext_info
            FROM " . $GLOBALS['ecs']->table('goods_activity') . " AS ga, " . $GLOBALS['ecs']->table('package_goods') . " AS pg
            WHERE pg.package_id = ga.act_id
            AND ga.start_time <= '" . $now . "'
            AND ga.end_time >= '" . $now . "'
            AND pg.goods_id = " . $goods_id . "
            GROUP BY ga.act_id
            ORDER BY ga.act_id ";
    $res = $GLOBALS['db']->getAll($sql);

    foreach ($res as $tempkey => $value)
    {
        $subtotal = 0;
        $row = unserialize($value['ext_info']);
        unset($value['ext_info']);
        if ($row)
        {
            foreach ($row as $key=>$val)
            {
                $res[$tempkey][$key] = $val;
            }
        }

        $sql = "SELECT pg.package_id, pg.goods_id, pg.goods_number, pg.admin_id, p.goods_attr, g.goods_sn, g.goods_name, g.market_price, g.goods_thumb, IFNULL(mp.user_price, g.shop_price * '$_SESSION[discount]') AS rank_price
                FROM " . $GLOBALS['ecs']->table('package_goods') . " AS pg
                    LEFT JOIN ". $GLOBALS['ecs']->table('goods') . " AS g
                        ON g.goods_id = pg.goods_id
                    LEFT JOIN ". $GLOBALS['ecs']->table('products') . " AS p
                        ON p.product_id = pg.product_id
                    LEFT JOIN " . $GLOBALS['ecs']->table('member_price') . " AS mp
                        ON mp.goods_id = g.goods_id AND mp.user_rank = '$_SESSION[user_rank]'
                WHERE pg.package_id = " . $value['act_id']. "
                ORDER BY pg.package_id, pg.goods_id";

        $goods_res = $GLOBALS['db']->getAll($sql);

        foreach($goods_res as $key => $val)
        {
            $goods_id_array[] = $val['goods_id'];
            $goods_res[$key]['goods_thumb']  = get_image_path($val['goods_id'], $val['goods_thumb'], true);
            $goods_res[$key]['market_price'] = price_format($val['market_price']);
            $goods_res[$key]['rank_price']   = price_format($val['rank_price']);
            $subtotal += $val['rank_price'] * $val['goods_number'];
        }

        /* 取商品属性 */
        $sql = "SELECT ga.goods_attr_id, ga.attr_value
                FROM " .$GLOBALS['ecs']->table('goods_attr'). " AS ga, " .$GLOBALS['ecs']->table('attribute'). " AS a
                WHERE a.attr_id = ga.attr_id
                AND a.attr_type = 1
                AND " . db_create_in($goods_id_array, 'goods_id');
        $result_goods_attr = $GLOBALS['db']->getAll($sql);

        $_goods_attr = array();
        foreach ($result_goods_attr as $value)
        {
            $_goods_attr[$value['goods_attr_id']] = $value['attr_value'];
        }

        /* 处理货品 */
        $format = '[%s]';
        foreach($goods_res as $key => $val)
        {
            if ($val['goods_attr'] != '')
            {
                $goods_attr_array = explode('|', $val['goods_attr']);

                $goods_attr = array();
                foreach ($goods_attr_array as $_attr)
                {
                    $goods_attr[] = $_goods_attr[$_attr];
                }

                $goods_res[$key]['goods_attr_str'] = sprintf($format, implode('，', $goods_attr));
            }
        }

        $res[$tempkey]['goods_list']    = $goods_res;
        $res[$tempkey]['subtotal']      = price_format($subtotal);
        $res[$tempkey]['saving']        = price_format(($subtotal - $res[$tempkey]['package_price']));
        $res[$tempkey]['package_price'] = price_format($res[$tempkey]['package_price']);
    }

    return $res;
}


/**
 * 获得指定商品的相册
 *
 * @access  public
 * @param   integer     $goods_id
 * @return  array
 */
function get_goods_gallery_attr($goods_id, $goods_attr_id)
{

    $sql = 'SELECT img_id, img_original, img_url, thumb_url, img_desc' .
        ' FROM ' . $GLOBALS['ecs']->table('goods_gallery') .
        " WHERE goods_id = '$goods_id' and goods_attr_id='$goods_attr_id' order by img_sort,img_id LIMIT " . $GLOBALS['_CFG']['goods_gallery_number'];
    $row = $GLOBALS['db']->getAll($sql);
    if (count($row)==0)
    {
        $sql = 'SELECT img_id, img_original, img_url, thumb_url, img_desc' .
            ' FROM ' . $GLOBALS['ecs']->table('goods_gallery') .
            " WHERE goods_id = '$goods_id' and goods_attr_id='0' LIMIT " . $GLOBALS['_CFG']['goods_gallery_number'];
        $row = $GLOBALS['db']->getAll($sql);
    }
    /* 格式化相册图片路径 */
    foreach($row as $key => $gallery_img)
    {
        $row[$key]['img_url'] = get_image_path($goods_id, $gallery_img['img_url'], false, 'gallery');
        $row[$key]['thumb_url'] = get_image_path($goods_id, $gallery_img['thumb_url'], true, 'gallery');
        $row[$key]['img_original'] = get_image_path($goods_id, $gallery_img['img_original'], true, 'gallery');
    }
    return $row;
    $ret = array();
    foreach($row as $v){
        $ret[$v['img_id']] = $v;
    }
    ksort($ret);

    //file_put_contents('./3arr3.txt',var_export(array_values($ret),true));
    return array_values($ret);
}


/**
 * 获取商品的相关信息
 * @param int $goodsid 商品id
 * @param string $name  要获取商品的属性名称,多个，就用逗号分隔
 */
function get_goods_attr_value($goodsid,$name='goods_sn,goods_name')
{
    $sql = "select ".$name." from ". $GLOBALS['ecs']->table('goods') ." where goods_id=".$goodsid;
    $row = $GLOBALS['db']->getRow($sql);
    return $row;
}

