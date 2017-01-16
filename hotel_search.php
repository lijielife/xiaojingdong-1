<?php
/**
* 酒店 搜索程序
*/

define('IN_ECS', true);
define('_SP_', chr(0xFF).chr(0xFE));
define('UCS2', 'ucs-2be');


require(dirname(__FILE__) . '/includes/init.php');
require(dirname(__FILE__) . '/includes/lib_elong.php');

/* act操作项的初始化 */
$_REQUEST['act'] = trim($_REQUEST['act']);
if (empty($_REQUEST['act']))
{
    $_REQUEST['act'] = 'list';
}

//酒店列表
if ($_REQUEST['act'] == 'list')
{
    $city = isset($_REQUEST['city']) ? trim($_REQUEST['city']) : '';
    $cityid = isset($_REQUEST['cityid']) ? trim($_REQUEST['cityid']) : '';
    $checkin = isset($_REQUEST['checkin']) ? trim($_REQUEST['checkin']) : '';
    $checkout = isset($_REQUEST['checkout']) ? trim($_REQUEST['checkout']) : '';
    $keywords = isset($_REQUEST['keywords']) ? trim($_REQUEST['keywords']) : '';
    $kwtype = isset($_REQUEST['kwtype']) ? trim($_REQUEST['kwtype']) : '';

    if(!$city || !$checkin || !$checkout)
    {
        die('城市名、入住时间、退房时间不能为空');
    }
    else
    {
        $smarty->assign('city', $city);
        $smarty->assign('cityid', $cityid);
        $smarty->assign('kwtype', $kwtype);
        $smarty->assign('checkin', $checkin);
        $smarty->assign('checkout', $checkout);
        $smarty->assign('keywords', $keywords);
    }

    //根据城市名,获取城市的位置信息
    $position_info = get_city_positions($city);
    if(!$position_info)
    {
        die('城市位置信息未录入,请联系管理员');
    }

    //位置信息html
    $position_html = create_position_html($position_info);
    $smarty->template_dir   = ROOT_PATH . 'themes/elong';
    $smarty->assign('position_html', $position_html);

    //房价、品牌、服务、主题pin信息html
    $price_html = create_price_html();
    $star_html = create_star_html();
    $brand_html = create_brand_html();
    $theme_html = create_theme_html();
    $service_html = create_service_html();
    $smarty->assign('price_html', $price_html);
    $smarty->assign('star_html', $star_html);
    $smarty->assign('brand_html', $brand_html);
    $smarty->assign('theme_html', $theme_html);
    $smarty->assign('service_html', $service_html);


    $hotel_ids = array();


    //列举城市下的酒店
    $city_search = get_city_hotels($city);
    if($city_search)
    {
        //关键字搜索
        if(isset($keywords) && !empty($keywords))
        {
            $keyword_search = search_by_keywords($keywords,$kwtype);
            if($keyword_search)
            {
                $hotel_ids = array_merge($city_search,$keyword_search);
            }
        }
        else
        {
            $hotel_ids = $city_search;
        }
    }

    //根据酒店的supplier_id,生成酒店信息
    //todo 生成的信息可以根据价格、销量进行排序,酒店过多的话需要进行分页
    $hotels_info = array();
    foreach($hotel_ids as $key => $val)
    {
        $hotels_info[$val] = get_hotel_info_by_id($val);
    }

    //print_r($hotels_info);exit;
    $smarty->assign('hotels_num',count($hotels_info));
    $smarty->assign('hotels_info',$hotels_info);
    $smarty->display('search.html');


}

//搜索前的准备,把城市信息准备好,避免搜索时还需要到艺龙网抓数据
elseif ($_REQUEST['act'] == 'ajax_search_pre')
{
    $response = array(
        'err' => 0,
        'msg' => ''
    );
    //酒店如果未填写城市信息,直接报错
    $city = isset($_REQUEST['city']) ? $_REQUEST['city'] : '';
    if(!$city)
    {
        $response['err'] = 1;
        $response['msg'] = '请先设置酒店所在的城市';
    }
    else
    {
        //把城市id转化成具体的城市名称
        $city = str_replace('市','',$city);
        $sql = "SELECT region_name FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_name = '" . addslashes($city) . "'";
        $city_cn =  $GLOBALS['db']->getOne($sql);
        if(!$city_cn)
        {
            $response['err'] = 1;
            $response['msg'] = '城市不存在';
        }
        else
        {
            $cat_id = get_elong_data($city_cn);
            if($cat_id)
            {
                $response['msg'] = $cat_id;
            }
            else
            {
                $response['err'] = 1;
                $response['msg'] = '系统出错,请联系管理员';
            }
        }
    }
    die(json_encode($response));
}

elseif ($_REQUEST['act'] == 'ajax_search')
{
//    sleep(3);
    $response = array(
        'err' => 0,
        'msg' => ''
    );

    $data = isset($_POST) ? $_POST : '' ;

    if(!$data)
    {
        $response['err'] = 1;
        $response['msg'] = 'data不能为空';
    }
    else
    {

        $result = array();

        //关键字搜索
        if(isset($data['keywords']) && isset($data['kwtype']) && !empty($data['keywords']) && !empty($data['kwtype']))
        {
            $result[] = search_by_keywords($data['keywords'],$data['kwtype']);
        }

        //属性&品牌检索
        foreach($data['attribute'] as $key => $val)
        {
            if($key == '10086')
            {
                foreach($val as $v)
                {
                    $sql = "SELECT s.supplier_id FROM " . $GLOBALS['ecs']->table('supplier') .
                           " AS s , " . $GLOBALS['ecs']->table('hotels_brand') . " AS b" .
                           " WHERE s.brand_id=b.brand_id AND b.brand_name='" . addslashes($v) . "'";

                    $supplier_id = $GLOBALS['db']->getOne($sql);
                    if($supplier_id)
                    {
                        $result[] = array(
                            $supplier_id
                        );
                    }
                }

            }
            else
            {
                $sql = "SELECT goods_id FROM " . $GLOBALS['ecs']->table('hotels_attr');
                $attr_where =  ' WHERE attr_id="' . addslashes($key) . '"';
                if(is_array($val))
                {
                    $or = '(';
                    foreach($val as $v)
                    {
                        $or .= '"' . addslashes($v) . '",';
                    }
                    $or = trim($or,',') . ')';
                    $attr_where .=  ' AND attr_value IN ' . $or;
                }
                else
                {
                    $attr_where .= '  AND attr_value="' . addslashes($val) . '" ';
                }
                $sql .= $attr_where;
                $tmp = array();
                foreach($GLOBALS['db']->getAll($sql) as $v)
                {
                    $goods_id = $v['goods_id'];
                    array_push($tmp,$goods_id);
                }
                $result[] = $tmp;
            }
        }

        //根据酒店id获取酒店信息
        $hotels_info = array();
        foreach($result as $key => $val)
        {
            $hotels_info[$key] = get_hotel_info_by_id($val);
        }
        $response['msg'] = $hotels_info;

    }
    die(json_encode($response));exit;
}


/**
 * 关键字检索
 * @param $keywords 关键字
 * @param $kwtype 关键字类型, hotel_name/酒店名 position/位置信息 brand/品牌信息 值为空则全文模糊匹配
 * @return array(id1,id2,id3,id4)
 */
function search_by_keywords($keywords,$kwtype)
{
    $result = array();
    if($kwtype == 'hotel_name')
    {
        $sql = 'SELECT supplier_id FROM ' . $GLOBALS['ecs']->table('supplier') . ' WHERE supplier_name = "' . addslashes($keywords) . '"' .
                " AND supplier_type=2";
        $ret = $GLOBALS['db']->getAll($sql);
        if($ret)
        {
           foreach ($ret as $val)
           {
               array_push($result,$val['supplier_id']);
           }

        }
    }
    elseif($kwtype == 'position')
    {
        $sql = 'SELECT goods_id FROM ' . $GLOBALS['ecs']->table('hotels_attr') . ' WHERE attr_value = "' . addslashes($keywords) . '"';
        $ret = $GLOBALS['db']->getAll($sql);
        if($ret)
        {
            foreach ($ret as $val)
            {
                array_push($result,$val['goods_id']);
            }

        }
    }
    elseif($kwtype == 'brand')
    {
        $sql = 'SELECT supplier_id FROM ' . $GLOBALS['ecs']->table('supplier') .
                ' AS s,' .  $GLOBALS['ecs']->table('hotels_brand') . ' AS b' .
                ' WHERE b.brand_name = "' . addslashes($keywords) . '"' .
                ' AND s.brand_id = b.brand_id AND s.supplier_type=2';
        $ret = $GLOBALS['db']->getAll($sql);
        if($ret)
        {
            foreach ($ret as $val)
            {
                array_push($result,$val['supplier_id']);
            }

        }
    }
    else
    {
        $sql = 'SELECT supplier_id FROM ' . $GLOBALS['ecs']->table('supplier') . ' WHERE supplier_name like "%' . addslashes($keywords) . '%"'.
              ' AND supplier_type=2';
        $result1 = $GLOBALS['db']->getAll($sql);
        if($result1)
        {
            foreach($result1 as $val)
            {
                array_push($result,$val['supplier_id']);
            }
        }

        $sql = 'SELECT goods_id FROM ' . $GLOBALS['ecs']->table('hotels_attr') . ' WHERE attr_value like "%' . addslashes($keywords) . '%"';
        $result2 = $GLOBALS['db']->getAll($sql);
        if($result2)
        {
            foreach($result2 as $val)
            {
                array_push($result,$val['goods_id']);
            }
        }

        $sql = 'SELECT supplier_id FROM ' . $GLOBALS['ecs']->table('supplier') .
            ' AS s,' .  $GLOBALS['ecs']->table('hotels_brand') . ' AS b' .
            ' WHERE b.brand_name like "%' . addslashes($keywords) . '%"' .
            ' AND s.brand_id = b.brand_id AND s.supplier_type=2';

        $result3 = $GLOBALS['db']->getAll($sql);
        if($result3)
        {
            foreach($result3 as $val)
            {
                array_push($result,$val['supplier_id']);
            }
        }
    }
    return $result;
}



/**
 * 获取某个城市的位置信息
 * @param $city
 * @return bool
 */
function get_city_positions($city)
{
    $city = trim(str_replace('市','',$city));
    $sql = "SELECT cat_id  FROM" . $GLOBALS['ecs']->table('hotels_type') . " WHERE cat_name = '" . addslashes($city) . "'";
    $cat_id = $GLOBALS['db']->getOne($sql);
    if(!$cat_id)
    {
        //die(json_encode($response));
        return false;
    }
    $sql = "SELECT attr_name,attr_values,attr_group,attr_id FROM ". $GLOBALS['ecs']->table('hotels_attribute') . " WHERE cat_id='$cat_id' ";

    $result = $GLOBALS['db']->getAll($sql);
    foreach($result as $k => $v)
    {
        $attr_values = explode("\n",$v['attr_values']);
        $result[$k]['attr_values'] = $attr_values;
    }
    return $result;
}



/**
 * 根据位置信息,创建html,直接返回给前段,避免前端动态生成的逻辑复杂
 * @param $position_info 位置信息
 * @return $html html 代码
 */
function create_position_html($position_info)
{

    $html = '<div class="filter_option"><div class="filter_unlimited" data-id="-1" method="location">不限</div>';
    $html .= '<ul class="filter_posi_type">';


    //地铁、机场/汽车站/火车站和其余的位置信息区分开
    $position_default = array();
    $position_subway = array();
    $position_airport = array();

    foreach($position_info as  $val)
    {
        $group = $val['attr_group'];
        if($group == 0)
        {
            $position_default[] = $val;
        }
        elseif ($group == 1)
        {
            $position_airport[] = $val;
        }
        elseif($group == 2)
        {
            $position_subway[] = $val;
        }
    }


    //tab
    foreach($position_default as $key => $val)
    {
        $name = $val['attr_name'];
        if($key == 0)
        {
            $html .= '<li class="on" method="locationTab" data-typeid="5">'.$name.'<i class="icon_triangle_8b"></i></li>';
        }
        else
        {
            $html .= '<li class="" method="locationTab" data-typeid="5">'.$name.'<i class="icon_triangle_8b"></i></li>';
        }
    }

    //地铁tab
    if(count($position_subway) > 0)
    {
        $html .= '<li method="locationTab" data-typeid="601">地铁站<i class="icon_triangle_8b"></i></li>';
    }

    //机场/车站/客运站tab
    if(count($position_airport) > 0)
    {
        $html .= '<li method="locationTab" data-typeid="60" class="">机场/车站<i class="icon_triangle_8b"></i></li>';
    }

    $html .= '</ul><div class="filter_posi_show">';


    //处理数据
    foreach($position_default as $key => $val)
    {
        if($key == 0)
        {
            $html .= '<ul class="filter_posi_list" attrid="'.$val['attr_id'].'" method="locationArr" data-typeid="5">';
        }
        else
        {
            $html .= '<ul class="filter_posi_list" attrid="'.$val['attr_id'].'" method="locationArr" data-typeid="5" style="display: none;">';
        }

        foreach($val['attr_values'] as $k => $v)
        {
            $v = trim($v);
            if($k <= 7)
            {
                $html .= '<li class="" title="'.$v.'" method="location"  data-name="'.$v.'" data-typeid="5"><i class="icon_radio1"></i>'.
                    '<span>'.$v.'</span><input type="radio"></li>';
            }
            else
            {
                $html .= '<li class="" title="'.$v.'" style="display:none" method="location"  data-name="'.$v.'" data-typeid="5"><i class="icon_radio1"></i>'.
                    '<span>'.$v.'</span><input type="radio"></li>';
            }

        }
        if(count($val['attr_values']) <= 7)
        {
            $html .= '</ul>';
        }
        else
        {
            $html .= '<li class="filter_more on icon_hl_more1" style="display: block;" method="showAllOps" data-typeid="5" data-showall="0"></li></ul>';
        }

    }

    //地铁的html
    if(count($position_subway) > 0)
    {
        $html .= '<ul class="filter_posi_list" method="locationArr" type="subway" data-typeid="601"  style="display:none">';
        $html .= '<li class="subway_num_wrap"><div class="subway_num"><div class="subway_num_list" id="subway_num_list"><ul class="clearfix">';
        //收集所有地铁线路
        $position_subway_lines = array();
        foreach($position_subway as $val)
        {
            $position_subway_lines[] = $val['attr_name'];
        }
        foreach($position_subway_lines as $key => $val)
        {
            //地铁有多条,这里面需要全部展示
            if($key == 0)
            {
                $html .= '<li data-subwaykey="" class="check" method="subwayName"><a href="javascript:void(0);">'.$val.'</a></li>';
            }
            else
            {
                $html .= '<li data-subwaykey=""  method="subwayName"><a href="javascript:void(0);">'.$val.'</a></li>';
            }

        }
        $html .= '</ul></div>';

        //收集每条地铁的站点数
        $html .= '<div class="subway_station">';
        foreach($position_subway as $key => $val)
        {
            $id = 'subwaycontainer_' . $key;
            if($key == 0)
            {
                $html .= '<ul class="clearfix" attrid="'.$val['attr_id'].'" method="subwayContainer" id="'.$id.'">';
            }
            else
            {
                $html .= '<ul class="clearfix" attrid="'.$val['attr_id'].'" style="display:none" method="subwayContainer" id="'.$id.'">';
            }


            foreach($val['attr_values'] as $k => $v)
            {
                $v = trim($v);
                if($k == 0)
                {
                    $html .= '<li class="first"><a title="'.$v.'" href="javascript:void(0);" method="location" data-id="60000390" data-name="'.$v.'" data-typeid="601">';
                }
                elseif ( ($k+1) == count($val['attr_values']))
                {
                    $html .= '<li class="last"><a title="'.$v.'" href="javascript:void(0);" method="location" data-id="60000390" data-name="'.$v.'" data-typeid="601">';
                }
                else
                {
                    $html .= '<li class=""><a title="'.$v.'" href="javascript:void(0);" method="location" data-id="60000390" data-name="'.$v.'" data-typeid="601">';
                }

                $html .= '<span class="fist"></span><span class="secd">'.$v.'</span></a></li>';
            }
            $html .= '</ul>';
        }
        $html .= '  </div> </div></li></ul>';
    }

    //机场、车站、客运站的html
    if(count($position_airport) > 0)
    {
        $html .= '<div class="filter_lis_pos" method="locationArr" data-typeid="60" style="display:none">';
        //$html .= '<li class="subway_num_wrap"><div class="subway_num"><div class="subway_num_list"><ul class="clearfix">';
        foreach($position_airport as $val)
        {
            if($val['attr_name'] == '火车站')
            {
                $class = 'icons-train';
            }
            elseif($val['attr_name'] == '汽车客运站')
            {
                $class = 'icons-car';

            }
            elseif ($val['attr_name'] == '机场')
            {
                $class = 'icons-airport';
            }
            $html .= '<div class="lis_pos"><div class="filter_lis_tit"><span class="'.$class.'"></span>'.$val['attr_name'].'</div><ul class="filter_posi_list" attrid="'.$val['attr_id'].'" type="airport">';
            foreach($val['attr_values'] as $v)
            {
                $v = trim($v);
                $html .= '<li class="" title="'.$v.'" method="location" data-id="60001279" data-name="'.$v.'" data-typeid="60">';
                $html .= '<i class="icon_radio1"></i><span>'.$v.'</span><input type="radio"></li>';
            }
            $html .= '</ul></div>';
        }
        $html .= '</div>';
    }

    $html .= '</div></div>';

    return $html;
}





/**
 * 创建房价信息的html
 */
function create_price_html()
{
    $html = '';
    $attr = get_attribute_info('房价');
    if($attr)
    {
        $html = '<div class="filter_item" id="price" attrid="'.$attr['attr_id'].'" method="priceFilterPart" data-multi="1">'.
                    '<div class="filter_title">'.
                        '<span class="icon_filter_pri"></span>房价'.
                        '<i class="b-line"></i></div>'.
                    '<div class="filter_option_box">'.
                        '<div class="filter_option">'.
                            '<div method="price"  data-low="0" data-high="0" class="filter_unlimited filter_unlimited_on">不限</div>'.
                            '<div class="filter_custom">'.
                                '<span class="mr5">自定义</span>'.
                                '<span class="mr5">'.
                                    '<input id="lowPrice" method="lowPrice" type="input" class="input_f12" onkeyup="value=value.replace(/[^\d]/g,\'\')" ></span>'.
                                '<span class="mr5 cddd">—</span>'.
                                '<span class="mr5">'.
                                    '<input id="highPrice" method="highPrice" type="input" class="input_f12" onkeyup="value=value.replace(/[^\d]/g,\'\')" ></span>'.
                                '<span id= "priceConfirm" method="priceConfirm" data-id="999" class="btn_filter_sure">确定</span></div>'.
                            '<ul class="filter_cb_list filter_cb_list1">';
        foreach($attr['attr_values'] as $val)
        {
            $html .= '<li method="price" data-id="1" data-low="0" data-high="150" data-name="'.$val.'">'.
                                    '<i class="icon_radio1"></i>'.
                                    '<span>'.$val.'</span>'.
                                    '<input type="radio"></li>';

        }
        $html .= ' </ul></div></div></div> ';
    }
    return $html;
}

/**
 * 创建星级信息的html
 */
function create_star_html()
{
    $html = '';
    $attr = get_attribute_info('星级');
    if($attr)
    {
        $html = '<div class="filter_item" id="star" attrid="'.$attr['attr_id'].'" method="starFilterPart" data-multi="1">'.
            '<div class="filter_title">'.
            '<span class="icon_filter_star"></span>星级'.
            '<i class="b-line"></i></div>'.
            '<div class="filter_option_box">'.
            '<div class="filter_option">'.
            '<div method="star"  class="filter_unlimited filter_unlimited_on">不限</div>'.
            '<ul class="filter_cb_list" >';
        foreach($attr['attr_values'] as $val)
        {
            $html .= '<li method="star"  data-name="' . $val . '" data-selected="0">'.
                '<i class="icon_checkbox1"></i>'.
                '<span>'.$val.'</span>'.
                '<input type="checkbox"></li>';

        }
        $html .= ' </ul></div></div></div> ';
    }
    return $html;
}


/**
 * 创建品牌信息的html
 */
function create_brand_html()
{
    $html = '';
    $attr = get_brandlist();
    if($attr)
    {
        $html = '<div class="filter_item" id="brand" attrid="10086" method="brandFilterPart" data-multi="1">'.
            '<div class="filter_title">'.
            '<span class="icon_filter_prod"></span>品牌'.
            '<i class="b-line"></i></div>'.
            '<div class="filter_option_box">'.
            '<div class="filter_option">'.
            '<div method="brand"  class="filter_unlimited filter_unlimited_on">不限</div>'.
            '<ul class="filter_cb_list" method="brandList" >';
        foreach($attr as $key => $val)
        {
            if($key <= 7)
            {
                $html .= '<li method="brand"  data-name="' . $val['brand_name'] . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val['brand_name'].'</span>'.
                    '<input type="checkbox"></li>';
            }
            else
            {
                $html .= '<li method="brand"  style="display:none" data-name="' . $val['brand_name'] . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val['brand_name'].'</span>'.
                    '<input type="checkbox"></li>';
            }

        }
        if(count($attr) < 8)
        {
            $html .= ' </ul></div></div></div> ';
        }
        else
        {
            $html .= ' </ul><div class="icon_hl_more1 filter_more" method="showAllOps" data-showall="0"></div></div></div></div> ';
        }

    }
    return $html;
}

/**
 * 创建主题信息的html
 */
function create_theme_html()
{
    $html = '';
    $attr = get_attribute_info('主题');
    if($attr)
    {
        $html = '<div class="filter_item" id="theme" attrid="'.$attr['attr_id'].'" method="themeFilterPart" data-multi="1">'.
            '<div class="filter_title">'.
            '<span class="icon_filter_theme"></span>主题'.
            '<i class="b-line"></i></div>'.
            '<div class="filter_option_box">'.
            '<div class="filter_option">'.
            '<div method="star"  class="filter_unlimited filter_unlimited_on">不限</div>'.
            '<ul class="filter_cb_list" >';
        foreach($attr['attr_values'] as $key => $val)
        {
            if($key <= 7)
            {
                $html .= '<li method="theme"  data-name="' . $val . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val.'</span>'.
                    '<input type="checkbox"></li>';
            }
            else
            {
                $html .= '<li method="theme" style="display:none" data-name="' . $val . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val.'</span>'.
                    '<input type="checkbox"></li>';
            }


        }
        if(count($attr['attr_values']) < 8)
        {
            $html .= ' </ul></div></div></div> ';
        }
        else
        {
            $html .= ' </ul><div class="icon_hl_more1 filter_more" method="showAllOps" data-showall="0"></div></div></div></div> ';
        }
    }
    return $html;
}

/**
 * 创建服务信息的html
 */
function create_service_html()
{
    $html = '';
    $attr = get_attribute_info('服务');
    if($attr)
    {
        $html = '<div class="filter_item filter_last" style="display:none" id="service" attrid="'.$attr['attr_id'].'" method="facilityFilterPart" data-multi="1">'.
            '<div class="filter_title">'.
            '<span class="icon_filter_serv"></span>服务'.
            '<i class="b-line"></i></div>'.
            '<div class="filter_option_box">'.
            '<div class="filter_option">'.
            '<div method="person"  class="filter_unlimited filter_unlimited_on">不限</div>'.
            '<ul class="filter_cb_list" method="facilityList" >';
        foreach($attr['attr_values'] as $key => $val)
        {
            if($key <= 7)
            {
                $html .= '<li method="facility"  data-name="' . $val . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val.'</span>'.
                    '<input type="checkbox"></li>';
            }
            else
            {
                $html .= '<li method="facility"  style="display:none" data-name="' . $val . '" data-selected="0">'.
                    '<i class="icon_checkbox1"></i>'.
                    '<span>'.$val.'</span>'.
                    '<input type="checkbox"></li>';
            }


        }
        if(count($attr['attr_values']) < 8)
        {
            $html .= ' </ul></div></div></div> ';
        }
        else
        {
            $html .= ' </ul><div class="icon_hl_more1 filter_more" method="showAllOps" data-showall="0"></div></div></div></div> ';
        }
    }
    return $html;
}

/**
 * 获取酒店通用属性,房价、星级、服务、主题
 * @param $type 属性type 值为 房价、星级、服务、主题之一
 */
function get_attribute_info($type)
{
    $result = array();
    $attr = $GLOBALS['db']->getAll("SELECT attr_id,attr_values FROM ".$GLOBALS['ecs']->table('hotels_attribute') . "WHERE attr_name='$type'");
    if($attr)
    {
        $attr = $attr[0];
        $attr_values = $attr['attr_values'];
        $attr_values = explode("\n",$attr_values); //todo windows下的分行符和unix不一样
        foreach($attr_values as $k => $v)
        {
            $attr_values[$k] = trim($v,"\r");
        }
        $result = array(
            'attr_id' => $attr['attr_id'],
            'attr_values' => $attr_values
        );
    }
    return $result;
}


/**
 * 获取品牌列表
 *
 * @access  public
 * @return  array
 */
function get_brandlist()
{
    $sql = "SELECT brand_name FROM ".$GLOBALS['ecs']->table('hotels_brand');
    return $GLOBALS['db']->getAll($sql);
}





/**
 * 获取城市下面的酒店
 * @param $city 城市中文名
 */
function get_city_hotels($city)
{
    $result = array();
    $city = trim($city,'市');

    $sql = "SELECT region_id FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_name LIKE '$city%'";
    $ret = $GLOBALS['db']->getAll($sql);
    if($ret)
    {
        foreach ($ret as $val)
        {
            $sql = "SELECT supplier_id FROM " . $GLOBALS['ecs']->table('supplier') . " WHERE city = '$val[region_id]' AND supplier_type=2";
            $ret1 = $GLOBALS['db']->getAll($sql);
            if($ret1)
            {
                foreach($ret1 as $v)
                {
                    $result[] = $v['supplier_id'];
                }
            }
        }
    }
    return $result;
}
?>