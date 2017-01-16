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

print_r($info);

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

