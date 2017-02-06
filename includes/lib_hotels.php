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

?>