<?php
/**
 * Created by PhpStorm.
 * User: ry
 * Date: 17/1/3
 * Time: 下午2:34
 * 酒店关键字搜索,用户输入后的自动补全提示
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');


/* 汉字转拼音所用插件 */
include_once(dirname(__FILE__)  . '/includes/vendor/autoload.php');
use Overtrue\Pinyin\Pinyin;
$pinyin = new Pinyin();


$response = array(
    'err' => 0,
    'msg' => ''
);

$keywords = isset($_REQUEST['keywords']) ? trim($_REQUEST['keywords']) : '';
if(!$keywords)
{
    die(json_encode($response));
}

$city = isset($_REQUEST['city']) ? trim($_REQUEST['city']) : '';
if(!$city)
{
    die(json_encode($response));
}
else
{
    $city = str_replace('市','',$city);
    $sql = "SELECT cat_id  FROM" . $GLOBALS['ecs']->table('hotels_type') . " WHERE cat_name = '" . addslashes($city) . "'";
    $cat_id = $GLOBALS['db']->getOne($sql);
    if(!$cat_id)
    {
        die(json_encode($response));
    }
}


//字符串类型,全中文/含有中文/英文
$type = '';
if(preg_match('/^[\x{4e00}-\x{9fa5}]+$/u', $keywords)>0)
{
    $type = 'zh';
}
elseif(preg_match('/[\x{4e00}-\x{9fa5}]/u', $keywords)>0)
{
    die(json_encode($response));
}
else
{
    $type = 'cn';
}


if($type == 'zh')
{
    //中文检索
    if(str_len($keywords) >2)
    {
        /*
         //todo 找一个好点的中文分词
        //中文分词,远程调用不太稳定暂停使用,
        //
        $url = 'http://api.pullword.com/get.php?source='.$keywords . '&param1=0&param2=0';
        $split = file_get_contents($url);
        $split = explode(' ',$split);
        //print_r($split);
         * */


        //从该城市的酒店名、酒店品牌、酒店位置组成的词库中寻找可能类似的数据
        $positon_info = get_arr_values($cat_id);
        $hotels_name = get_city_hotels($city);
        //todo 酒店所属品牌查找

        //开始对比
        $result = array();
        foreach($positon_info as $p_info)
        {
            //位置信息对比
            $attr_value = $p_info['attr_value'];
            if(strpos($attr_value,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'postion',
                    'name' => $attr_value,
                    'keywords' => $keywords,
                    'postion_type' => $p_info['position']
                );
            }
        }

        foreach($hotels_name as $name)
        {
            //酒店名字对比
            $hname = $name['supplier_name'];
            if(strpos($hname,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'hotel_name',
                    'keywords' => $keywords,
                    'name' => $hname,
                );
            }
        }
        $response['msg'] = $result;
        die(json_encode($response));
    }
    else
    {
        die(json_encode($response));
    }

}
elseif($type == 'cn')
{
    //拼音检索
    if(str_len($keywords) >= 2)
    {
        //从该城市的酒店名、酒店品牌、酒店位置组成的词库中寻找可能类似的数据
        $positon_info = get_arr_values($cat_id);
        $hotels_name = get_city_hotels($city);
        //todo 酒店所属品牌查找

        //开始对比
        $result = array();
        foreach($positon_info as $p_info)
        {
            //全拼对比
            $quanpin = str_replace(' ','',$p_info['quanpin']);
            if(strpos($quanpin,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'postion',
                    'name' => $p_info['attr_value'],
                    'keywords' => $keywords,
                    'postion_type' => $p_info['position']
                );
            }

            //首字母拼音
            $shoupin = str_replace(' ','',$p_info['shoupin']);
            if(strpos($shoupin,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'postion',
                    'name' => $p_info['attr_value'],
                    'keywords' => $keywords,
                    'postion_type' => $p_info['position']
                );
            }
        }

        foreach($hotels_name as $name)
        {
            //全拼对比
            $quanpin = str_replace(' ','',$name['supplier_quanpin']);
            if(strpos($quanpin,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'hotel_name',
                    'keywords' => $keywords,
                    'name' => $name['supplier_name']
                );
            }

            //首字母拼音
            $shoupin = str_replace(' ','',$name['supplier_shoupin']);
            if(strpos($shoupin,$keywords) !== FALSE)
            {
                $result[] = array(
                    'type' => 'hotel_name',
                    'keywords' => $keywords,
                    'name' => $name['supplier_name']
                );
            }
        }
        $response['msg'] = $result;
        die(json_encode($response));


    }
    else
    {
        die(json_encode($response));
    }
}
else
{
    die(json_encode($response));
}

/**
 * 获取某个城市下面所有的位置属性
 * @param $cat_id hotel_type里中文城市名对应的id
 */
function get_arr_values($cat_id)
{
    $sql = "SELECT a.attr_value,a.quanpin,a.shoupin,a.goods_id,ha.attr_name AS position FROM ".
                $GLOBALS['ecs']->table('hotels_attr') . "AS a,".
                $GLOBALS['ecs']->table('hotels_attribute') . "AS ha".
            " WHERE ha.cat_id='$cat_id' AND ha.attr_id=a.attr_id";

    $result = $GLOBALS['db']->getAll($sql);
    return $result;
}

/**
 * 获取某个城市下面所有的酒店名字
 * @param $city 城市名,这里精确到市
 */
function get_city_hotels($city)
{
    $result = array();
    $sql = "SELECT region_id FROM ". $GLOBALS['ecs']->table('region') . " WHERE region_name='$city' LIMIT 1";
    $region_id = $GLOBALS['db']->getOne($sql);
    if($region_id)
    {
        $sql = "SELECT supplier_name,supplier_quanpin,supplier_shoupin FROM " . $GLOBALS['ecs']->table('supplier') . "WHERE city='$region_id'";
        $result = $GLOBALS['db']->getAll($sql);
    }
    return $result;

}

?>