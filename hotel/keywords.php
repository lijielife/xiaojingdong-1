<?php
/**
 * Created by PhpStorm.
 * User: ry
 * Date: 16/12/26
 * Time: 上午10:50
 * 前端输入城市名字,后台抓取艺龙网的城市推荐数据
 */


if(!file_exists('city.json'))
{
    $url1 = 'http://openapi.elong.com/suggest/hotcity/hotel/2.html';
    $ret1 = file_get_contents($url1);
}