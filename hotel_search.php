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
    $keywords = trim($_REQUEST['keywords']);

    if(!$city || !$checkin || !$checkout)
    {
        die('城市名、入住时间、退房时间不能为空');
    }
    else
    {
        $smarty->assign('city', $city);
        $smarty->assign('cityid', $cityid);
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

    $position_html = create_position_html($position_info);
//    echo $position_html;exit;
//    print_r($position_info);exit;
    $smarty->template_dir   = ROOT_PATH . 'themes/elong';
    $smarty->assign('position_html', $position_html);


    //todo 根据检索条件,搜索酒店信息


    //todo 房价、星级、品牌、主题、服务、人数这些属性取出来,并附值给页面

    //todo 获取酒店的类型中的服务、星级、主题的attr_id,并赋值给页面

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
    sleep(3);
    print_r(json_encode($_POST));exit;
}


/**
 * 获取某个城市的位置信息
 * @param $city
 * @return bool
 */
function get_city_positions($city)
{
    $city = str_replace('市','',$city);
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
        //$result[$k]['attr_id'] = $attr_values;

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

//    print_r($position_default);
//    print_r($position_subway);
//    print_r($position_airport);
//    exit;

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

//        if($name == '商圈')
//        {
//            $html .= '<li class="" method="locationTab" data-typeid="5">商圈<i class="icon_triangle_8b"></i></li>';
//        }
//        if($name == '行政区')
//        {
//            $html .= '<li method="locationTab" data-typeid="4">行政区<i class="icon_triangle_8b"></i></li>';
//        }
//
////        $group = $val['attr_group'];
////        if($group == 2)
////        {
////            //地铁
////            if($subway_ul_li_num == 0)
////            {
////                //地铁有多条,这里面tab栏只需要一个即可
////                $subway_ul_li_num += 1;
////                $html .= '<li method="locationTab" data-typeid="601">地铁站<i class="icon_triangle_8b"></i></li>';
////            }
////        }
////        elseif($group == 1)
////        {
////            //机场/车站
////            if($airport_ul_li_num == 0)
////            {
////                //地铁有多条,这里面tab栏只需要一个即可
////                $airport_ul_li_num += 1;
////                $html .= '<li method="locationTab" data-typeid="60" class="on">机场/车站<i class="icon_triangle_8b"></i></li>';
////            }
////        }
//
//        if($name == '医院')
//        {
//            $html .= '<li method="locationTab" data-typeid="61">医院<i class="icon_triangle_8b"></i></li>';
//        }
//        if($name == '大学')
//        {
//            $html .= '<li method="locationTab" data-typeid="62">大学<i class="icon_triangle_8b"></i></li>';
//        }
//        if($name == '市内景点')
//        {
//            $html .= '<li method="locationTab" data-typeid="63">市内景点<i class="icon_triangle_8b"></i></li>';
//        }
//        if($name == '市外景点')
//        {
//            $html .= '<li method="locationTab" data-typeid="64">市外景点<i class="icon_triangle_8b"></i></li>';
//        }
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

        foreach($val['attr_values'] as $v)
        {
            $v = trim($v);
            $html .= '<li class="" title="'.$v.'" method="location"  data-name="'.$v.'" data-typeid="5"><i class="icon_radio1"></i>'.
                '<span>'.$v.'</span><input type="radio"></li>';
        }
        $html .= '</ul>';
//        if($name == '商圈')
//        {
//            $html .= '<ul class="filter_posi_list" method="locationArr" data-typeid="5" style="display: none;">';
//            foreach($val['attr_values'] as $v)
//            {
//                $html .= '<li class="" title="'.$v.'" method="location"  data-name="$v" data-typeid="5"><i class="icon_radio1"></i>'.
//                                        '<span>'.$v.'</span><input type="radio"></li>';
//            }
//            $html .= '</ul>';
//        }
//        if($name == '行政区')
//        {
//            $html .= '<ul class="filter_posi_list" method="locationArr" data-typeid="5" style="display: none;">';
//            foreach($val['attr_values'] as $v)
//            {
//                $html .= '<li class="" title="'.$v.'" method="location"  data-name="$v" data-typeid="4"><i class="icon_radio1"></i>'.
//                    '<span>'.$v.'</span><input type="radio"></li>';
//            }
//            $html .= '</ul>';
//        }
//
//        $group = $val['attr_group'];
//        if($group == 2)
//        {
//            //地铁有多条,这里面需要全部展示
//            $html .= '<ul class="filter_posi_list" method="locationArr" data-typeid="601" style="">';
//            $html .= '<li class="subway_num_wrap"><div class="subway_num"><div class="subway_num_list"><ul class="clearfix">';
//
//        }
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
//$smarty->template_dir   = ROOT_PATH . 'themes/elong';
//assign_dynamic('elong/search.html');
//$smarty->display('search.html');

?>