<?php


/**
 * ECSHOP 属性规格管理
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: attribute.php 17217 2011-01-19 06:29:08Z liubo $
*/

define('IN_ECS', true);



require(dirname(__FILE__) . '/includes/init.php');
require(ROOT_PATH . '/includes/lib_elong.php');


/* 汉字转拼音所用插件 */
include_once(ROOT_PATH . 'includes/vendor/autoload.php');
use Overtrue\Pinyin\Pinyin;


/* act操作项的初始化 */
$_REQUEST['act'] = trim($_REQUEST['act']);
if (empty($_REQUEST['act']))
{
    $_REQUEST['act'] = 'list';
}

$exc = new exchange($ecs->table("hotels_attribute"), $db, 'attr_id', 'attr_name');

/*------------------------------------------------------ */
//-- 属性列表
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'list')
{
    $goods_type = isset($_GET['goods_type']) ? intval($_GET['goods_type']) : 0;

    $smarty->assign('ur_here',          '酒店属性');
    $smarty->assign('action_link',      array('href' => 'hotels_attribute.php?act=add&goods_type='.$goods_type , 'text' => $_LANG['10_attribute_add']));
    $smarty->assign('goods_type_list',  goods_type_list($goods_type)); // 取得商品类型
    $smarty->assign('full_page',        1);

    $list = get_attrlist();
    //print_r($list);exit;

    $smarty->assign('attr_list',    $list['item']);
    $smarty->assign('filter',       $list['filter']);
    $smarty->assign('record_count', $list['record_count']);
    $smarty->assign('page_count',   $list['page_count']);

    $sort_flag  = sort_flag($list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    /* 显示模板 */
    assign_query_info();
    $smarty->display('hotels_attribute_list.htm');
}

/*------------------------------------------------------ */
//-- 排序、翻页
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'query')
{
    $list = get_attrlist();

    $smarty->assign('attr_list',    $list['item']);
    $smarty->assign('filter',       $list['filter']);
    $smarty->assign('record_count', $list['record_count']);
    $smarty->assign('page_count',   $list['page_count']);

    $sort_flag  = sort_flag($list['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('attribute_list.htm'), '',
        array('filter' => $list['filter'], 'page_count' => $list['page_count']));
}

/*------------------------------------------------------ */
//-- 添加/编辑属性
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'add' || $_REQUEST['act'] == 'edit')
{
    /* 检查权限 */
    admin_priv('attr_manage');

    /* 添加还是编辑的标识 */
    $is_add = $_REQUEST['act'] == 'add';
    $smarty->assign('form_act', $is_add ? 'insert' : 'update');

    /* 取得属性信息 */
    if ($is_add)
    {
        $goods_type = isset($_GET['goods_type']) ? intval($_GET['goods_type']) : 0;
        $attr = array(
            'attr_id' => 0,
            'cat_id' => $goods_type,
            'attr_name' => '',
            'attr_input_type' => 0,
            'attr_index'  => 0,
            'attr_values' => '',
            'attr_type' => 0,
            'is_linked' => 0,
			 'attr_txm' => 0,
        );
    }
    else
    {
        $sql = "SELECT * FROM " . $ecs->table('hotels_attribute') . " WHERE attr_id = '$_REQUEST[attr_id]'";
        $attr = $db->getRow($sql);
    }

    $smarty->assign('attr', $attr);
    $smarty->assign('attr_groups', get_attr_groups($attr['cat_id']));

    /* 取得商品分类列表 */
    $smarty->assign('goods_type_list', goods_type_list($attr['cat_id']));

    /* 模板赋值 */
    $smarty->assign('ur_here', $is_add ?$_LANG['10_attribute_add']:$_LANG['52_attribute_add']);
    $smarty->assign('action_link', array('href' => 'hotels_attribute.php?act=list', 'text' => $_LANG['09_attribute_list']));

    /* 显示模板 */
    assign_query_info();
    $smarty->display('hotels_attribute_info.htm');
}

/*------------------------------------------------------ */
//-- 插入/更新属性
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'insert' || $_REQUEST['act'] == 'update')
{
    //var_dump($_POST);exit;
    /* 检查权限 */
    admin_priv('attr_manage');

    /* 插入还是更新的标识 */
    $is_insert = $_REQUEST['act'] == 'insert';

    /* 检查名称是否重复 */
    $exclude = empty($_POST['attr_id']) ? 0 : intval($_POST['attr_id']);
    if (!$exc->is_only('attr_name', $_POST['attr_name'], $exclude, " cat_id = '$_POST[cat_id]'"))
    {
        sys_msg($_LANG['name_exist'], 1);
    }

    $cat_id = $_REQUEST['cat_id'];

    /* 取得属性信息 */
    $attr = array(
        'cat_id'          => $_POST['cat_id'],
        'attr_name'       => $_POST['attr_name'],
        'attr_index'      => $_POST['attr_index'],
        'attr_input_type' => $_POST['attr_input_type'],
        'is_linked'       => $_POST['is_linked'],
		'attr_txm'		  => $_POST['attr_txm'],
        'attr_values'     => isset($_POST['attr_values']) ? $_POST['attr_values'] : '',
        'attr_type'       => empty($_POST['attr_type']) ? '0' : intval($_POST['attr_type']),
		
        'attr_group'      => isset($_POST['attr_group']) ? intval($_POST['attr_group']) : 0
    );

    /* 入库、记录日志、提示信息 */
    if ($is_insert)
    {
        $db->autoExecute($ecs->table('hotels_attribute'), $attr, 'INSERT');
      	$insert_id=$db->insert_id();
        admin_log($_POST['attr_name'], 'add', 'attribute');
        $links = array(
            array('text' => $_LANG['add_next'], 'href' => '?act=add&goods_type=' . $_POST['cat_id']),
            array('text' => $_LANG['back_list'], 'href' => '?act=list'),
        );
        //将下面代码注释掉  By www.ecshop68.com
        //sys_msg(sprintf($_LANG['add_ok'], $attr['attr_name']), 0, $links);
    }
    else
    {
        $db->autoExecute($ecs->table('hotels_attribute'), $attr, 'UPDATE', "attr_id = '$_POST[attr_id]'");
        admin_log($_POST['attr_name'], 'edit', 'attribute');
        $links = array(
            array('text' => $_LANG['back_list'], 'href' => '?act=list&amp;goods_type='.$_POST['cat_id'].''),
        );
        //将下面代码注释掉  By www.ecshop68.com
        //sys_msg(sprintf($_LANG['edit_ok'], $attr['attr_name']), 0, $links);
    }

	/* 增加代码_start By www.ecshop68.com */
	$attr_id_www_ecshop68_com = $is_insert ? $insert_id : $_POST['attr_id'];

	$msg_attr_www_ecshop68_com = $is_insert ?   $_LANG['add_ok']  : $_LANG['edit_ok'];
	if($_POST['is_attr_gallery'] == '1')
	{
		$sql_www_ecshop68_com="update " .$ecs->table("hotels_attribute"). " set  is_attr_gallery=0 where cat_id='".$_POST['cat_id']."' ";
		$db->query($sql_www_ecshop68_com);
	}
	$sql_www_ecshop68_com="update " .$ecs->table("attribute"). " set  is_attr_gallery='$_POST[is_attr_gallery]' where attr_id='$attr_id_www_ecshop68_com' ";
	$db->query($sql_www_ecshop68_com);
	sys_msg(sprintf($msg_attr_www_ecshop68_com, $attr['attr_name']), 0, $links);
	/* 增加代码_end By www.ecshop68.com */

}

/*------------------------------------------------------ */
//-- 删除属性(一个或多个)
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'batch')
{
    /* 检查权限 */
    admin_priv('attr_manage');

    /* 取得要操作的编号 */
    if (isset($_POST['checkboxes']))
    {
        $count = count($_POST['checkboxes']);
        $ids   = isset($_POST['checkboxes']) ? join(',', $_POST['checkboxes']) : 0;

        $sql = "DELETE FROM " . $ecs->table('hotels_attribute') . " WHERE attr_id " . db_create_in($ids);
        $db->query($sql);

        $sql = "DELETE FROM " . $ecs->table('hotels_attr') . " WHERE attr_id " . db_create_in($ids);
        $db->query($sql);

        /* 记录日志 */
        admin_log('', 'batch_remove', 'attribute');
        clear_cache_files();

        $link[] = array('text' => $_LANG['back_list'], 'href' => 'hotels_attribute.php?act=list');
        sys_msg(sprintf($_LANG['drop_ok'], $count), 0, $link);
    }
    else
    {
        $link[] = array('text' => $_LANG['back_list'], 'href' => 'hotels_attribute.php?act=list');
        sys_msg($_LANG['no_select_arrt'], 0, $link);
    }
}

/*------------------------------------------------------ */
//-- 编辑属性名称
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'edit_attr_name')
{
    check_authz_json('attr_manage');

    $id = intval($_POST['id']);
    $val = json_str_iconv(trim($_POST['val']));

    /* 取得该属性所属商品类型id */
    $cat_id = $exc->get_name($id, 'cat_id');

    /* 检查属性名称是否重复 */
    if (!$exc->is_only('attr_name', $val, $id, " cat_id = '$cat_id'"))
    {
        make_json_error($_LANG['name_exist']);
    }

    $exc->edit("attr_name='$val'", $id);

    admin_log($val, 'edit', 'attribute');

    make_json_result(stripslashes($val));
}

/*------------------------------------------------------ */
//-- 编辑排序序号
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'edit_sort_order')
{
    check_authz_json('attr_manage');

    $id = intval($_POST['id']);
    $val = intval($_POST['val']);

    $exc->edit("sort_order='$val'", $id);

    admin_log(addslashes($exc->get_name($id)), 'edit', 'attribute');

    make_json_result(stripslashes($val));
}

/*------------------------------------------------------ */
//-- 删除商品属性
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'remove')
{
    check_authz_json('attr_manage');

    $id = intval($_GET['id']);

    $db->query("DELETE FROM " .$ecs->table('hotels_attribute'). " WHERE attr_id='$id'");
    $db->query("DELETE FROM " .$ecs->table('hotels_attr'). " WHERE attr_id='$id'");

    $url = 'hotels_attribute.php?act=query&' . str_replace('act=remove', '', $_SERVER['QUERY_STRING']);

    ecs_header("Location: $url\n");
    exit;
}

/*------------------------------------------------------ */
//-- 获取某属性商品数量
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'get_attr_num')
{
    check_authz_json('attr_manage');

    $id = intval($_GET['attr_id']);

    $sql = "SELECT COUNT(*) ".
           " FROM " . $ecs->table('hotels_attr') . " AS a, ".
           $ecs->table('goods') . " AS g ".
           " WHERE g.goods_id = a.goods_id AND g.is_delete = 0 AND attr_id = '$id' ";

    $goods_num = $db->getOne($sql);

    if ($goods_num > 0)
    {
        $drop_confirm = sprintf($_LANG['notice_drop_confirm'], $goods_num);
    }
    else
    {
        $drop_confirm = $_LANG['drop_confirm'];
    }

    make_json_result(array('attr_id'=>$id, 'drop_confirm'=>$drop_confirm));
}

/*------------------------------------------------------ */
//-- 获得指定商品类型下的所有属性分组
/*------------------------------------------------------ */

elseif ($_REQUEST['act'] == 'get_attr_groups')
{
    check_authz_json('attr_manage');

    $cat_id = intval($_GET['cat_id']);
    $groups = get_attr_groups($cat_id);

    make_json_result($groups);
}

/* 代码增加_start   By  www.68ecshop.com */
/*------------------------------------------------------ */
//-- 设置颜色,这里作废
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'savecolor')
{
	$sql = "delete from ". $ecs->table('attribute_color') ." where attr_id= '$_REQUEST[attr_id]' ";
	$db->query($sql);
	foreach ($_REQUEST['color_name'] AS $color_key=> $color_name)
	{
		if ($_REQUEST['color_code'][$color_key])
		{
			$sql="insert into ". $ecs->table('attribute_color') ."(attr_id, color_name, color_code) values('$_REQUEST[attr_id]', '$color_name', '". $_REQUEST['color_code'][$color_key] ."' )";
			$db->query($sql);
		}
	}
	$link[] = array('text' => '返回设置页面', 'href' => 'hotels_attribute.php?act=setcolor&attr_id='.$_REQUEST['attr_id']);
    sys_msg('恭喜，您已成功设置了颜色代码！', 0, $link);
}
elseif ($_REQUEST['act'] == 'setcolor')
{
    /* 检查权限 */
    admin_priv('attr_manage');
	
	$sql = "SELECT * FROM " . $ecs->table('attribute') . " WHERE attr_id = '$_REQUEST[attr_id]'";
    $attr = $db->getRow($sql); 
    $smarty->assign('attr', $attr);
	
	$colors_code=array();
	$sql="select * from ". $ecs->table('attribute_color') . " where attr_id = '$_REQUEST[attr_id]'";
	$res_color = $db->query($sql);
	while ($row_color = $db->fetchRow($res_color))
	{
		$colors_code[$row_color['color_name']] = $row_color['color_code'];
	}
	
	if($attr['attr_values'])
	{
		$color_list= str_replace("\r\n", "\n", $attr['attr_values']);
		$color_array = explode("\n", $color_list);
		$color_list=array();
		foreach ($color_array as $ckey=>$cval)
		{
			$color_list[$ckey]['color_name'] = $cval;
			$color_list[$ckey]['color_code'] = $colors_code[$cval] ? $colors_code[$cval] : '';
		}
	}
	
    $smarty->assign('color_list', $color_list);
	$smarty->assign('ur_here', '设置颜色');
    $smarty->assign('action_link', array('href' => 'attribute.php?act=list&goods_type='.$attr['cat_id'], 'text' => $_LANG['09_attribute_list']));
	 /* 显示模板 */
    assign_query_info();
    $smarty->display('attribute_setcolor.htm');

}




/*------------------------------------------------------ */
//-代码增加 By ry ,为指定酒店增加/查询酒店类型
//-包括酒店周边的信息(商圈、地铁、机场、景点、地铁等,供搜索用)、酒店设施(酒店政策、房间设施)
/*--------------------------------------------------------*/
elseif ($_REQUEST['act'] == 'hotel_attribute_view')
{
    require_once('includes/lib_goods.php');
    $supplier_id = isset($_REQUEST['supplier_id']) ? $_REQUEST['supplier_id'] : 0;

    $supplier_id = $_SESSION['supplier_id'];

    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : 'service';
    if($type == 'service')
    {
        //添加酒店的服务设置,供详情页显示用,根据设计,酒店类型只有一个。不会像商品类型一样,分手机数码、衣帽鞋柜等等
        $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('hotels_type'). " WHERE type='" . addslashes($type) . "' LIMIT 1";
        $ret = $GLOBALS['db']->getOne($sql);
        $cat_id = $ret['cat_id'];
    }
    elseif($type == 'search')
    {
        //酒店如果未填写城市信息,直接报错
        $sql = "SELECT city FROM" . $GLOBALS['ecs']->table('supplier') . "WHERE supplier_id='" . addslashes($supplier_id) . "'";
        $city = $GLOBALS['db']->getOne($sql);
        if(!$city)
        {
            die('请先设置酒店所在的城市');
        }
        else
        {
            //把城市id转化成具体的城市名称
            $sql = "SELECT region_name FROM " . $GLOBALS['ecs']->table('region') . " WHERE region_id = '" . addslashes($city) . "'";
            $city_cn =  $GLOBALS['db']->getOne($sql);
            $cat_id = get_elong_data($city_cn);
        }
    }
    //die('z');
    $smarty->assign('goods_attr_html', build_hotels_attr_html($cat_id, $supplier_id));
    $smarty->assign('supplier_id', $supplier_id);
    $smarty->assign('cat_id', $cat_id);
    $smarty->assign('type', $type);
    /* 显示商品信息页面 */
    assign_query_info();
    $smarty->display('hotel_attribute_view.htm');
}


/* 代码增加 ry ,为指定酒店增加酒店类型 - 数据提交 */
elseif ($_REQUEST['act'] == 'add_hotel_attribute')
{
    $supplier_id = isset($_REQUEST['supplier_id']) ? $_REQUEST['supplier_id'] : 0;
    if(!$supplier_id)
    {
        sys_msg(sprintf('酒店id不能为空', 1));
    }

    $type = isset($_POST['type']) ? $_POST['type'] : '';
//    if(!type)
//    {
//        sys_msg(sprintf('商品类型type不能为空', 1));
//    }

    $cat_id = isset($_POST['cat_id']) ? $_POST['cat_id'] : '';
    if(!$cat_id)
    {
        sys_msg(sprintf('商品类型id不能为空', 1));
    }

    if ((isset($_POST['attr_id_list']) && isset($_POST['attr_value_list'])) || (empty($_POST['attr_id_list']) && empty($_POST['attr_value_list'])))
    {
        // 取得原有的属性值
        $goods_attr_list = array();

        $keywords_arr = explode(" ", $_POST['keywords']);

        $keywords_arr = array_flip($keywords_arr);

        if (isset($keywords_arr['']))
        {
            unset($keywords_arr['']);
        }

//        if($type == 'service')
//        {
//            //酒店设施
//            $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('hotels_type'). " WHERE type='service' LIMIT 1";
//            $ret = $GLOBALS['db']->getOne($sql);
//            $cat_ids = $ret['cat_id'];
//        }
//        elseif($type == 'search')
//        {
//            //酒店检索
//            $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('hotels_type'). " WHERE type='search' ";
//            $ret = $GLOBALS['db']->getOne($sql);
//            $cat_id = $ret['cat_id'];
//        }
//        else
//        {
//            sys_msg(sprintf('未知的商品类型,应该是serice/search二者选其一', 1));
//        }
//        $cat_id = get_hotels_type();
        $sql = "SELECT attr_id, attr_index FROM " . $ecs->table('hotels_attribute') . " WHERE cat_id = '".addslashes($cat_id) . "'";
        $attr_res = $db->query($sql);
        $attr_list = array();

        while ($row = $db->fetchRow($attr_res))
        {
            $attr_list[$row['attr_id']] = $row['attr_index'];
        }

        //获取hotels_type表的type字段
        $sql = "SELECT `type` FROM " . $ecs->table('hotels_type') . " WHERE cat_id = '".addslashes($cat_id) . "'";
        $type = $db->getOne($sql);



        //获取属性值
        $sql = "SELECT g.*, a.attr_type FROM " . $ecs->table('hotels_attr') . " AS g
                    LEFT JOIN " . $ecs->table('hotels_attribute') . " AS a
                        ON a.attr_id = g.attr_id
                WHERE g.goods_id = '$supplier_id' AND a.cat_id='" . addslashes($cat_id) . "'";

        $res = $db->query($sql);



        while ($row = $db->fetchRow($res))
        {
            $goods_attr_list[$row['attr_id']][$row['attr_value']] = array(
                'sign'          => 'delete',
                'goods_attr_id' => $row['goods_attr_id']
            );
        }



        // 循环现有的，根据原有的做相应处理
        if(isset($_POST['attr_id_list']))
        {
            $pinyin = new Pinyin();
            foreach ($_POST['attr_id_list'] AS $key => $attr_id)
            {
                $attr_value = $_POST['attr_value_list'][$key];
                $attr_price = $_POST['attr_price_list'][$key];
                $attr_price = ($attr_price>=0) ? $attr_price : 0;
                if (!empty($attr_value))
                {
                    //获取attr_value的全拼和首字母拼音
                    $quanpin = $pinyin->sentence($attr_value); //全拼
                    $shoupin = $pinyin->abbr($attr_value);//首字母拼音


                    if (isset($goods_attr_list[$attr_id][$attr_value]))
                    {
                        // 如果原来有，标记为更新
                        $goods_attr_list[$attr_id][$attr_value]['quanpin'] = $quanpin;
                        $goods_attr_list[$attr_id][$attr_value]['shoupin'] = $shoupin;
                        $goods_attr_list[$attr_id][$attr_value]['sign'] = 'update';
                        $goods_attr_list[$attr_id][$attr_value]['attr_price'] = $attr_price;
                    }
                    else
                    {
                        // 如果原来没有，标记为新增
                        $goods_attr_list[$attr_id][$attr_value]['quanpin'] = $quanpin;
                        $goods_attr_list[$attr_id][$attr_value]['shoupin'] = $shoupin;
                        $goods_attr_list[$attr_id][$attr_value]['sign'] = 'insert';
                        $goods_attr_list[$attr_id][$attr_value]['attr_price'] = $attr_price;
                    }
                    $val_arr = explode(' ', $attr_value);
                    foreach ($val_arr AS $k => $v)
                    {
                        if (!isset($keywords_arr[$v]) && $attr_list[$attr_id] == "1")
                        {
                            $keywords_arr[$v] = $v;
                        }
                    }
                }
            }
        }
        $keywords = join(' ', array_flip($keywords_arr));
        //todo 把关键字更新到酒店的shop_setting,方便以后检索
        //$sql = "UPDATE " .$ecs->table('goods'). " SET keywords = '$keywords' WHERE goods_id = '$goods_id' LIMIT 1";
        //$db->query($sql);
        //print_r($goods_attr_list);exit;

        /* 插入、更新、删除数据 */
        foreach ($goods_attr_list as $attr_id => $attr_value_list)
        {
            foreach ($attr_value_list as $attr_value => $info)
            {
                if ($info['sign'] == 'insert')
                {
                    $sql = "INSERT INTO " .$ecs->table('hotels_attr'). " (attr_id, goods_id, attr_value, attr_price,search_type,quanpin,shoupin)".
                        "VALUES ('$attr_id', '$supplier_id', '$attr_value', '$info[attr_price]','$type','$info[quanpin]','$info[shoupin]')";
                }
                elseif ($info['sign'] == 'update')
                {
                    $sql = "UPDATE " .$ecs->table('hotels_attr'). " SET search_type='$type',attr_price = '$info[attr_price]',quanpin = '$info[quanpin]' , shoupin = '$info[shoupin]' WHERE goods_attr_id = '$info[goods_attr_id]' LIMIT 1";
                }
                else
                {
                    //删除商品属性
                    $sql = "DELETE FROM " .$ecs->table('hotels_attr'). " WHERE goods_attr_id = '$info[goods_attr_id]' LIMIT 1";
                    $db->query($sql);

                    //todo 调研这块删除有无影响
                    //删除商品属性对应的货品信息
                    //$sql = "DELETE FROM " .$ecs->table('products'). " WHERE goods_id = '$goods_id' and (goods_attr = '".$info['goods_attr_id']."' or goods_attr like '%|".$info['goods_attr_id']."' or goods_attr like '".$info['goods_attr_id']."|%' or goods_attr like '%|".$info['goods_attr_id']."|%')";
                    //$db->query($sql);
                    continue;
                }
                $db->query($sql);

                //同步购物车中相关商品价格
                //tongbu_cart_price(intval($_REQUEST['goods_id']));
            }
        }
    }

    echo 'success';

}

/* 代码增加_end  By   www.68ecshop.com */

/*------------------------------------------------------ */
//-- PRIVATE FUNCTIONS
/*------------------------------------------------------ */

/**
 * 获取属性列表,只返回酒店设施的属性
 *
 * @return  array
 */
function get_attrlist()
{
    /* 查询条件 */
    $filter = array();
    $filter['goods_type'] = empty($_REQUEST['goods_type']) ? 0 : intval($_REQUEST['goods_type']);
    $filter['sort_by']    = empty($_REQUEST['sort_by']) ? 'sort_order' : trim($_REQUEST['sort_by']);
    $filter['sort_order'] = empty($_REQUEST['sort_order']) ? 'DESC' : trim($_REQUEST['sort_order']);

    $where = (!empty($filter['goods_type'])) ? " WHERE a.cat_id = '$filter[goods_type]' " : '';

    $sql = "SELECT COUNT(*) FROM " . $GLOBALS['ecs']->table('hotels_attribute') . " AS a $where";
    $filter['record_count'] = $GLOBALS['db']->getOne($sql);

    /* 分页大小 */
    $filter = page_and_size($filter);

    /* 查询 */
    $sql = "SELECT a.*, t.cat_name " .
            " FROM " . $GLOBALS['ecs']->table('hotels_attribute') . " AS a ".
            " LEFT JOIN " . $GLOBALS['ecs']->table('hotels_type') . " AS t ON a.cat_id = t.cat_id " . $where .
            " AND t.type='service'".
            " ORDER BY $filter[sort_by] $filter[sort_order] ".
            " LIMIT " . $filter['start'] .", $filter[page_size]";
    $row = $GLOBALS['db']->getAll($sql);

    foreach ($row AS $key => $val)
    {
        $row[$key]['attr_input_type_desc'] = $GLOBALS['_LANG']['value_attr_input_type'][$val['attr_input_type']];
        $row[$key]['attr_values']      = str_replace("\n", ", ", $val['attr_values']);
    }

    $arr = array('item' => $row, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);

    return $arr;
}


/**
 * 根据属性数组创建属性的表单,为酒店设施服务 add by ry
 *
 * @access  public
 * @param   int     $cat_id     分类编号
 * @param   int     $goods_id   商品编号
 * @return  string
 */
function build_hotels_attr_html($cat_id, $goods_id = 0 , $bar_code = 0)
{
    $attr = get_hotels_attr_list($cat_id, $goods_id);
    $html = '<table width="100%" id="attrTable">';
    $spec = 0;

    foreach ($attr AS $key => $val)
    {
        $html .= "<tr><td class='label'>";
        if($val[attr_txm] > 0){
            $html.="<a href=\"javascript:showNotice('attr_".$val['attr_id'] ."');\" title=\"点击此处查看提示信息\"><img src=\"images/notice.gif\" alt=\"点击此处查看提示信息\" border=\"0\" height=\"16\" width=\"16\"></a>";
        }
        if ($val['attr_type'] == 1 || $val['attr_type'] == 2)
        {
            $html .= ($spec != $val['attr_id']) ?
                "<a href='javascript:;' onclick='addSpec(this)'>[+]</a>" :
                "<a href='javascript:;' onclick='removeSpec(this)'>[-]</a>";
            $spec = $val['attr_id'];
        }


        $html.=$val[attr_name]."：</td><td><input type='hidden' name='attr_id_list[]' value='$val[attr_id]' txm='$val[attr_txm]' class='ctxm_$val[attr_txm]' />";

        if ($val['attr_input_type'] == 0)
        {
            $html .= '<input name="attr_value_list[]" type="text" value="' .htmlspecialchars($val['attr_value']). '" size="40" /> ';
        }
        elseif ($val['attr_input_type'] == 2)
        {
            $html .= '<textarea name="attr_value_list[]" rows="3" cols="40">' .htmlspecialchars($val['attr_value']). '</textarea>';
        }
        else
        {
            if($val[attr_txm] > 0){
                $html .= '<select class=attr_num_'.$val[attr_id].' name="attr_value_list[]" onchange="getType('.$val[attr_txm].','.$cat_id.','. $this.value.','.$goods_id.')">';
            }else{
                $html .= '<select class=attr_num_'.$val[attr_id].' name="attr_value_list[]" >';
            }
            $html .= '<option value="">' .$GLOBALS['_LANG']['select_please']. '</option>';

            $attr_values = explode("\n", $val['attr_values']);

            foreach ($attr_values AS $opt)
            {
                $opt    = trim(htmlspecialchars($opt));

                $html   .= ($val['attr_value'] != $opt) ?
                    '<option value="' . $opt . '">' . $opt . '</option>' :
                    '<option value="' . $opt . '" selected="selected">' . $opt . '</option>';
            }
            $html .= '</select> ';

        }
        $html .= '</td></tr>';
    }
    $html .= '</table>';

    if($bar_code){
        $html .= '<div id="input_txm"><table  width="100%"  >';
        foreach($bar_code as $value){
            $html .='<tr><td class="label">条形码</td><td><input type="hidden" name="txm_shu[]" value='.$value['taypes'].'>'.$value['taypes'].'<td/><td><input type="text" name="tiaoxingm[]" value='.$value['bar_code'].'></td></tr>';

        }
        $html .='</table ></div>';
    }else{
        $html .= '<div id="input_txm"></div>';
    }



    return $html;
}


/**
 * 取得酒店通用属性和某分类的属性，add by ry
 * @param   int     $cat_id     分类编号
 * @param   int     $goods_id   商品编号
 * @return  array   规格与属性列表
 */
function get_hotels_attr_list($cat_id, $goods_id = 0)
{
    if (empty($cat_id))
    {
        return array();
    }

    // 查询属性值及商品的属性值
    $sql = "SELECT a.attr_id, a.attr_name, a.attr_input_type, a.attr_type,a.attr_txm, a.attr_values, v.attr_value, v.attr_price ".
        "FROM " .$GLOBALS['ecs']->table('hotels_attribute'). " AS a ".
        "LEFT JOIN " .$GLOBALS['ecs']->table('hotels_attr'). " AS v ".
        "ON v.attr_id = a.attr_id AND v.goods_id = '$goods_id' ".
        "WHERE a.cat_id = " . intval($cat_id) ." OR a.cat_id = 0 ".
        "ORDER BY a.sort_order, a.attr_type, a.attr_id, v.attr_price, v.goods_attr_id";

    $row = $GLOBALS['db']->GetAll($sql);

    return $row;
}
/**
 * 获取酒店的类型,根据设计,酒店类型只有一个。不会像商品类型一样,分手机数码、衣帽鞋柜等等
 * add by ry
 */
//function get_hotels_type()
//{
//    $sql = "SELECT * FROM " .$GLOBALS['ecs']->table('hotels_type'). " LIMIT 1";
//    $ret = $GLOBALS['db']->getRow($sql);
//    return $ret['cat_id'];
//}

?>
