<?php
/**
 * Created by PhpStorm.
 * 艺龙网的数据抓取
 * User: ry
 * Date: 16/12/27
 * Time: 下午9:08
 */


/**
 * 主函数,返回艺龙网在这个城市设定的数据
 * @param $city 城市中文名
 */
function get_elong_data($city)
{
    //判断城市的数据是否在数据库存在,如已存在,则无需远端抓取,否则抓取艺龙的数据
    $sql = 'SELECT cat_id FROM' . $GLOBALS['ecs']->table('hotels_type') . " WHERE cat_name='" . addslashes($city) . "'";
    $cat_id = $GLOBALS['db']->getOne($sql);
    if($cat_id)
    {
        return $cat_id;
    }

    //1、把艺龙网的城市编号抓下来
    $citys_info = get_city_info_from_yl();
    //print_r($citys_info);exit;

    //2、查询前端传过来的城市属于对应艺龙网的页面url
    $yl_url = get_url_from_citys_info($city,$citys_info);
    if(!$yl_url)
    {
        die('抱歉,您输入的城市暂无数据,请联系开发者');
    }
    //3、新建hotels_type
    $goods_type['cat_name']   = $city;
    $goods_type['attr_group'] = '默认分组' . "\n" . '机场/车站' . "\n" . "地铁";
    $goods_type['enabled']    = 1;
    $goods_type['type'] = 'search';
    if ($GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('hotels_type'), $goods_type) == false)
    {
        //sys_msg('新建酒店类型失败', 1);
        die('新建酒店类型失败');
    }
    $cat_id = $GLOBALS['db']->insert_id();
    $info = get_city_detail_from_yl($yl_url);
    //4、插入具体属性值
    if(!$info)
    {
        //艺龙获取数据失败
        $sql = "DELETE FROM " . $GLOBALS['ecs']->table('hotels_type') . " WHERE cat_id = '$cat_id'";
        $GLOBALS['db']->query($sql);
        die('远端获取酒店数据失败');
        //return false;
    }
    foreach($info as $key => $val)
    {
        $type = trim($val['type']);
        if($type == '机场/车站')
        {
            //机场车站里面又分为火车站、机场、汽车客运站。这几个要单独出来做独立的属性
            $info = $val['info'];
            $info = explode(',',$info);
            foreach($info as $v)
            {
                $info1 = explode(':',$v);
                $attr = array(
                    'cat_id'          => $cat_id,
                    'attr_name'       => $info1[0],
                    'attr_index'      => 1, //关键字索引
                    'attr_input_type' => 1, //从下面的列表中选择
                    'is_linked'       => 0,
                    'attr_txm'		  => 0,
                    'attr_values'     => str_replace(' ',"\n",trim($info1[1])),
                    'attr_type'       => 2, //复选属性
                    'attr_group'      => 1, //机场/车站分组
                    'is_attr_gallery' => 0
                );
                $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('hotels_attribute'), $attr, 'INSERT');
            }
        }
        elseif($type == '地铁站')
        {
            //地铁站里面有多列地铁,每列地铁就是一个属性
            $info = $val['info'];
            $info = explode(',',$info);
            foreach($info as $v)
            {
                $info1 = explode(':',$v);
                $attr = array(
                    'cat_id'          => $cat_id,
                    'attr_name'       => $info1[0],
                    'attr_index'      => 1, //关键字索引
                    'attr_input_type' => 1, //从下面的列表中选择
                    'is_linked'       => 0,
                    'attr_txm'		  => 0,
                    'attr_values'     => str_replace(' ',"\n",trim($info1[1])),
                    'attr_type'       => 2, //复选属性
                    'attr_group'      => 2, //地铁分组
                    'is_attr_gallery' => 0
                );
                $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('hotels_attribute'), $attr, 'INSERT');
            }
        }
        else
        {
            $attr = array(
                'cat_id'          => $cat_id,
                'attr_name'       => trim($type),
                'attr_index'      => 1, //关键字索引
                'attr_input_type' => 1, //从下面的列表中选择
                'is_linked'       => 0,
                'attr_txm'		  => 0,
                'attr_type'       => 2, //复选属性
                'attr_group'      => 0, //默认分组
                'is_attr_gallery' => 0
            );
            $info = $val['info'];
            $info = explode(',',$info);
            $attr_values = '';
            foreach($info as $v)
            {
                $attr_values .= $v . "\n\r";
            }
            $attr['attr_values'] = str_replace(' ',"\n",trim($attr_values));
            $GLOBALS['db']->autoExecute($GLOBALS['ecs']->table('hotels_attribute'), $attr, 'INSERT');
        }
    }
    return $cat_id;
}




/**
 * 把艺龙网的城市编号信息抓取下拉,并存放到文本中
 * add by ry
 */
function get_city_info_from_yl()
{
    $file = ROOT_PATH .'data/hotel/city.json';
    if(!file_exists($file))
    {
        $url_list = array(
            'http://openapi.elong.com/suggest/hotcity/hotel/2.html',
            'http://openapi.elong.com/suggest/hotcity/hotel/3.html',
            'http://openapi.elong.com/suggest/hotcity/hotel/4.html',
            'http://openapi.elong.com/suggest/hotcity/hotel/5.html',
            'http://openapi.elong.com/suggest/hotcity/hotel/6.html'
        );
        $infos = array();
        foreach ($url_list as $url)
        {
            $info = file_get_contents($url);
            $info = json_decode($info,true);
            $infos[] = $info['result'];
        }
        file_put_contents($file,json_encode($infos));
        return $infos;
    }
    else
    {
        $info = file_get_contents($file);
        return json_decode($info,true);
    }
}


/**
 * 查询前端传过来的城市属于对应艺龙网的页面url
 *
 * @param   string   $city     城市名
 * @param   array    $citys_info     城市数据
 *
 * @return  string  $url
 */
function get_url_from_citys_info($city,$citys_info)
{
    $url = '';
    $city = trim($city);
    foreach($citys_info as $val)
    {
        $cityList = $val['cityList'];
        foreach($cityList as $k => $v)
        {
            //todo ,这样判断会有问题,比如九江,艺龙会有两个 ,九江、 庐山(九江),后者在数组位置靠前,这样的话反而出错,以后再修复
            if(stripos($v['cityNameCn'],$city) !== false)
            {
                $url = 'http://hotel.elong.com/' . strtolower($v['cityNameEn']) . '/';
                break;
            }
        }
    }
    return $url;
}


/**
 * 根据城市地址抓取艺龙网具体的城市信息
 * 数据结构demo参见 根目录/data/hotel/下面的文件
 * add by ry
 *
 * @param string $yl_url 艺龙的某个城市地址, eg. http://hotel.elong.com/changsha/
 */
function get_city_detail_from_yl($yl_url)
{
    /* 抓取艺龙网相关城市的页面数据
      google的gnaon框架在抓取数据的时候不是特别方便,特别是在HTML的DOM节点选择上,这方面的文档资料也不多,换成下面的phpQuery
    include_once('includes/ganon.php');
    $html = file_get_dom($yl_url);
    if($html)
    {
        $uls = $html('.filter_posi_list');
        foreach($uls as $k => $ul)
        {
            echo 'ul序号' . $k .'<br>';
            if($k == 2)
            {

                foreach ($ul('ul[class="clearfix"]') as $a)
                {
                    echo  $a->getPlainText() . '<br>';
                    break;
                }
            }
            elseif($k == 3)
            {
                //echo '11';
                //$div = $ul('.lis_pos');
                foreach($html('div[class="lis_pos"]') as $val)
                {
                    //echo '12';
                    foreach($val('div[class="filter_lis_tit"]') as $v)
                    {
                        echo $v->getPlainText() . '<br>';
                        //break;
                    }
                    foreach($val('ul[class="filter_posi_list"]') as $v1)
                    {
                        echo $v1->getPlainText() . '<br>';
                        break;
                    }
                    break;
                }
            }
            else
            {
                foreach ($ul('li') as $li)
                {
                    echo $li->title . '<br>';
                }
            }

            //print_r($ul->getInnerText());
            echo '<br>';
            //$lis = $ul->li;
            //var_dump($lis);
            //break;
        }
    }
    else
    {
        echo 'a';
    }
    */

    include_once(ROOT_PATH . 'includes/phpQuery.php');
    phpQuery::newDocumentFile($yl_url);

    $info = array();
    foreach(pq(".filter_posi_type li") as $key => $val)
    {
        $info[$key] = array(
            'type' => trim(pq($val)->text())
        );
    }
    foreach(pq('.filter_posi_show')->children() as $k => $v)
    {
        $msg = '';
        //if($k == 2)

        if(stripos($info[$k]['type'],'地铁') !== false)
        {
            //获取城市全部地铁信息
            $d = pq("#m_adsContainer + script")->text();
            $d = explode(',resultKeywordType',$d);
            $m = explode('subwayMap:',$d[0]);
            $subway_infos = json_decode($m[1],true);

            foreach(pq($v)->find('.subway_num_list li') as $v1)
            {
                $subway_name_en = pq($v1)->attr('data-subwaykey');
                $subway_info = '';
                foreach($subway_infos[$subway_name_en] as $vv)
                {
                    $subway_info .= $vv['poiNameCn'] . ' ';
                }
                $subway_info = trim($subway_info);
                $subway_name_cn = pq($v1)->children('a')->text();
                $msg .= $subway_name_cn . ':' . $subway_info . ',';
            }
        }
        //elseif($k == 3)
        elseif(stripos($info[$k]['type'],'机场') !== false)
        {
            foreach(pq($v)->find('.lis_pos') as $v2)
            {
                foreach(pq($v2)->find('.filter_lis_tit') as $v3)
                {
                    $msg .= pq($v3)->text(). ':';
                }
                foreach(pq($v2)->find('li') as $v4)
                {
                    $msg .= pq($v4)->attr('title') . ' ';
                }
                $msg .= ',';
            }
        }
        else
        {
            foreach(pq($v)->find('li') as $v3)
            {
                $msg .= pq($v3)->attr('title') . ',';
            }
        }
        $info[$k]['info'] =  trim($msg,',');
    }
    return $info;
}