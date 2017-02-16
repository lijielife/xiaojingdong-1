<?php

/**
 * 酒店相关函数库
 * add by ry
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

/**
 * 根据酒店id获取酒店信息,供搜索结果页展示
 * @param $id
 */
function get_hotel_info_by_id($id)
{
    $info = array();

    $sql = "SELECT province,city,district,address,supplier_tel,supplier_desc,supplier_name,latitude,longitude FROM ".
        $GLOBALS['ecs']->table('supplier') . " WHERE supplier_id='" . addslashes($id) . "'";
    $result = $GLOBALS['db']->getAll($sql);


    if($result)
    {

        //获取酒店名称、地址
        $info = $result[0];
        $info['id'] = $id;
        $info['province_cn']   = get_address_cn($info['province']);
        $info['city_cn']       = get_address_cn($info['city']);
        $info['district_cn']   = get_address_cn($info['district']);
        $info['hotel_address'] = $info['province_cn'] . $info['city_cn'] . $info['district_cn'] . $info['address'];

        $info['photos'] = array();
        //获取酒店图片
        $sql = "SELECT goods_attr_id,img_url,img_desc,thumb_url,img_original FROM " . $GLOBALS['ecs']->table('hotels_gallery') .
            " WHERE goods_id='" . addslashes($id) . "'";
        $photos = $GLOBALS['db']->getAll($sql);
        foreach ($photos as $val)
        {
            $key = $val['img_desc'];
            $info['photos'][$key][] = $val;
            if($val['goods_attr_id'] == 0)
            {
                //酒店正面宣传图特殊处理,原则上正面宣传图只允许一张
                $info['photos'][0] = $val;
            }
        }
//        if($photos)
//        {
//            //正面图只取一张
//            $info['photos'] = array(
//                'img_url' => $photos[0]['img_url'],
//                'thumb_url' => $photos[0]['thumb_url'],
//                'img_original' => $photos[0]['img_original']
//            );
//        }
//        else
//        {
//            $info[$photos] = '';
//        }

        //todo 获取酒店价格、获取酒店评价并生成口碑、获取酒店最新预订信息
        $info['lowprice'] = mt_rand(100,500);
        $info['dianpin'] = mt_rand(1000,5000);
        $info['good_dianpin'] = mt_rand(50,100) . '%';
        $info['service_fen'] = intval(trim($info['good_dianpin'],'%')) * 5/100; //服务分数
        $info['lastest_buy'] = mt_rand(0,60) . '分钟前';

    }
    return $info;
}

/**
 * 根据酒店id获取酒店所有房间信息
 * @param $id
 */
function get_rooms_info($id)
{
    $info = array();

    $sql = "SELECT province,city,district,address,supplier_tel,supplier_desc,supplier_name,latitude,longitude FROM ".
        $GLOBALS['ecs']->table('supplier') . " WHERE supplier_id='" . addslashes($id) . "'";
    $result = $GLOBALS['db']->getAll($sql);


    if($result)
    {

        //获取酒店名称、地址
        $info = $result[0];
        $info['id'] = $id;
        $info['province_cn']   = get_address_cn($info['province']);
        $info['city_cn']       = get_address_cn($info['city']);
        $info['district_cn']   = get_address_cn($info['district']);
        $info['hotel_address'] = $info['province_cn'] . $info['city_cn'] . $info['district_cn'] . $info['address'];

        $info['photos'] = array();
        //获取酒店图片
        $sql = "SELECT goods_attr_id,img_url,img_desc,thumb_url,img_original FROM " . $GLOBALS['ecs']->table('hotels_gallery') .
            " WHERE goods_id='" . addslashes($id) . "'";
        $photos = $GLOBALS['db']->getAll($sql);
        foreach ($photos as $val)
        {
            $key = $val['img_desc'];
            $info['photos'][$key][] = $val;
            if($val['goods_attr_id'] == 0)
            {
                //酒店正面宣传图特殊处理,原则上正面宣传图只允许一张
                $info['photos'][0] = $val;
            }
        }


        //todo 获取酒店价格、获取酒店评价并生成口碑、获取酒店最新预订信息
        $info['lowprice'] = mt_rand(100,500);
        $info['dianpin'] = mt_rand(1000,5000);
        $info['good_dianpin'] = mt_rand(50,100) . '%';
        $info['service_fen'] = intval(trim($info['good_dianpin'],'%')) * 5/100; //服务分数
        $info['lastest_buy'] = mt_rand(0,60) . '分钟前';

    }
    return $info;
}


/**
 * 获取省份、城市、地区的具体中文
 * @param $id supplier表中的province、city的id编号
 */
function get_address_cn($id)
{
    $sql = "SELECT region_name FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_id='" . addslashes($id) . "'";
    return $GLOBALS['db']->getOne($sql);
}

/**
 * 获取当天时间和下一天时间。格式为 yyyy-mm-dd 2017-01-11
 */
function get_now_next_date()
{
    $now = date('Y-m-d');
    $next = date("Y-m-d",strtotime("+1 day"));
    return array($now,$next);
}




/**
 * 获得推荐酒店
 *
 * @access  public
 * @param   string      $type       推荐类型，可以是 index(首页), hot(热门）
 * @param   string      $city       城市名,获取某个城市的推荐酒店，暂未实现该功能
 * @return  array
 */
function get_recommend_hotels($type = '', $city = '')
{
    if (!in_array($type, array('index','hot')))
    {
        return array();
    }

    if($type == 'index')
    {
        $sql = 'SELECT s.supplier_id, s.supplier_name, s.supplier_desc,s.city' .
               ' FROM ' . $GLOBALS['ecs']->table('supplier') . ' AS s ,' .
               $GLOBALS['ecs']->table('hotels_tag') . ' AS ht WHERE s.supplier_id = ht.supplier_id ' .
               ' AND  s.supplier_type = 2 AND ht.is_index = 1 AND s.status = 1 '.
               ' ORDER BY s.add_time  DESC';
        $hotels_res = $GLOBALS['db']->getAll($sql);
        if (!empty($hotels_res))
        {
            foreach($hotels_res as $key => $data)
            {
                //获取酒店大图
                $id = $data['supplier_id'];
                $hotels_res[$key]['url'] = 'hotel_info.php?id='.$id;
                $sql = "SELECT img_original,thumb_url,img_url FROM " . $GLOBALS['ecs']->table('hotels_gallery') . " WHERE goods_id='$id' AND goods_attr_id=0";
                $photos = $GLOBALS['db']->getOne($sql);
                $hotels_res[$key]['img_url'] = $photos;

                //获取城市信息
                $city = $data['city'];
                $city_cn = get_address_cn($city);
                $hotels_res[$key]['city_cn'] = $city_cn;

                $sql = "SELECT parent_id FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_id='$city'";
                $province_id = $GLOBALS['db']->getOne($sql);
                $province_cn = get_address_cn($province_id);
                $hotels_res[$key]['province_cn'] = $province_cn;

                
            }
        }
        return $hotels_res;

            
    }

    //取不同推荐对应的商品
    // static $type_goods = array();
    // if (empty($type_goods[$type]))
    // {
    //     //初始化数据
    //     $type_goods['index'] = array();
    //     $type_goods['hot'] = array();
    //     $data = false;
    //     if ($data === false)
    //     {
    //         $sql = 'SELECT g.goods_id, g.is_best, g.is_new,g.goods_brief, g.is_hot, g.is_promote, b.brand_name,g.sort_order ' .
    //            ' FROM ' . $GLOBALS['ecs']->table('goods') . ' AS g ' .
    //            ' LEFT JOIN ' . $GLOBALS['ecs']->table('brand') . ' AS b ON b.brand_id = g.brand_id ' .
    //            ' WHERE g.is_on_sale = 1 AND g.is_alone_sale = 1 AND g.is_delete = 0 AND (g.is_best = 1 OR g.is_new =1 OR g.is_hot = 1)'.
    //            ' ORDER BY g.sort_order, g.last_update DESC';
    //         $goods_res = $GLOBALS['db']->getAll($sql);
    //         //定义推荐,最新，热门，促销商品
    //         $goods_data['best'] = array();
    //         $goods_data['new'] = array();
    //         $goods_data['hot'] = array();
    //         $goods_data['brand'] = array();
    //         if (!empty($goods_res))
    //         {
    //             foreach($goods_res as $data)
    //             {
    //                 if ($data['is_best'] == 1)
    //                 {
    //                     $goods_data['best'][] = array('goods_id' => $data['goods_id'], 'sort_order' => $data['sort_order']);
    //                 }
    //                 if ($data['is_new'] == 1)
    //                 {
    //                     $goods_data['new'][] = array('goods_id' => $data['goods_id'], 'sort_order' => $data['sort_order']);
    //                 }
    //                 if ($data['is_hot'] == 1)
    //                 {
    //                     $goods_data['hot'][] = array('goods_id' => $data['goods_id'], 'sort_order' => $data['sort_order']);
    //                 }
    //                 if ($data['brand_name'] != '')
    //                 {
    //                     $goods_data['brand'][$data['goods_id']] = $data['brand_name'];
    //                 }
    //             }
    //         }
    //         write_static_cache('recommend_goods', $goods_data);
    //     }
    //     else
    //     {
    //         $goods_data = $data;
    //     }

    //     $time = gmtime();
    //     $order_type = $GLOBALS['_CFG']['recommend_order'];

    //     //按推荐数量及排序取每一项推荐显示的商品 order_type可以根据后台设定进行各种条件显示
    //     static $type_array = array();
    //     $type2lib = array('best'=>'recommend_best', 'new'=>'recommend_new', 'hot'=>'recommend_hot');
    //     if (empty($type_array))
    //     {
    //         foreach($type2lib as $key => $data)
    //         {
    //             if (!empty($goods_data[$key]))
    //             {
    //                 $num = get_library_number($data);
    //                 $data_count = count($goods_data[$key]);
    //                 $num = $data_count > $num  ? $num : $data_count;
    //                 if ($order_type == 0)
    //                 {
    //                     //usort($goods_data[$key], 'goods_sort');
    //                     $rand_key = array_slice($goods_data[$key], 0, $num);
    //                     foreach($rand_key as $key_data)
    //                     {
    //                         $type_array[$key][] = $key_data['goods_id'];
    //                     }
    //                 }
    //                 else
    //                 {
    //                     $rand_key = array_rand($goods_data[$key], $num);
    //                     if ($num == 1)
    //                     {
    //                         $type_array[$key][] = $goods_data[$key][$rand_key]['goods_id'];
    //                     }
    //                     else
    //                     {
    //                         foreach($rand_key as $key_data)
    //                         {
    //                             $type_array[$key][] = $goods_data[$key][$key_data]['goods_id'];
    //                         }
    //                     }
    //                 }
    //             }
    //             else
    //             {
    //                 $type_array[$key] = array();
    //             }
    //         }
    //     }

    //     //取出所有符合条件的商品数据，并将结果存入对应的推荐类型数组中
    //     $sql = 'SELECT g.goods_id, g.goods_name, g.goods_name_style,g.goods_brief , g.market_price, g.shop_price AS org_price, g.promote_price, ' .
    //             "IFNULL(mp.user_price, g.shop_price * '$_SESSION[discount]') AS shop_price, ".
    //             "promote_start_date, promote_end_date, g.goods_brief, g.goods_thumb, g.goods_img, RAND() AS rnd " .
    //             'FROM ' . $GLOBALS['ecs']->table('goods') . ' AS g ' .
    //             "LEFT JOIN " . $GLOBALS['ecs']->table('member_price') . " AS mp ".
    //             "ON mp.goods_id = g.goods_id AND mp.user_rank = '$_SESSION[user_rank]' ";
    //     $type_merge = array_merge($type_array['new'], $type_array['best'], $type_array['hot']);
    //     $type_merge = array_unique($type_merge);
    //     $sql .= ' WHERE g.goods_id ' . db_create_in($type_merge);
    //     $sql .= ' ORDER BY g.sort_order, g.last_update DESC';

    //     $result = $GLOBALS['db']->getAll($sql);
    //     foreach ($result AS $idx => $row)
    //     {
    //         if ($row['promote_price'] > 0)
    //         {
    //             $promote_price = bargain_price($row['promote_price'], $row['promote_start_date'], $row['promote_end_date']);
    //             $goods[$idx]['promote_price'] = $promote_price > 0 ? price_format($promote_price) : '';
    //         }
    //         else
    //         {
    //             $goods[$idx]['promote_price'] = '';
    //         }

    //         $goods[$idx]['id']           = $row['goods_id'];
    //         $goods[$idx]['goods_brief']  = $row['goods_brief'];
    //         $goods[$idx]['name']         = $row['goods_name'];
    //         $goods[$idx]['brief']        = $row['goods_brief'];
    //         $goods[$idx]['brand_name']   = isset($goods_data['brand'][$row['goods_id']]) ? $goods_data['brand'][$row['goods_id']] : '';
    //         $goods[$idx]['goods_style_name']   = add_style($row['goods_name'],$row['goods_name_style']);

    //         $goods[$idx]['short_name']   = $GLOBALS['_CFG']['goods_name_length'] > 0 ?
    //                                            sub_str($row['goods_name'], $GLOBALS['_CFG']['goods_name_length']) : $row['goods_name'];
    //         $goods[$idx]['short_style_name']   = add_style($goods[$idx]['short_name'],$row['goods_name_style']);
    //         $goods[$idx]['market_price'] = price_format($row['market_price']);
    //         $goods[$idx]['shop_price']   = price_format($row['shop_price']);
    //         $goods[$idx]['thumb']        = get_image_path($row['goods_id'], $row['goods_thumb'], true);
    //         $goods[$idx]['goods_img']    = get_image_path($row['goods_id'], $row['goods_img']);
    //         $goods[$idx]['url']          = build_uri('goods', array('gid' => $row['goods_id']), $row['goods_name']);
    //         if (in_array($row['goods_id'], $type_array['best']))
    //         {
    //             $type_goods['best'][] = $goods[$idx];
    //         }
    //         if (in_array($row['goods_id'], $type_array['new']))
    //         {
    //             $type_goods['new'][] = $goods[$idx];
    //         }
    //         if (in_array($row['goods_id'], $type_array['hot']))
    //         {
    //             $type_goods['hot'][] = $goods[$idx];
    //         }
    //     }
    // }
    // return $type_goods[$type];
}

?>