<?php

/**
 * ECSHOP 管理中心供货商管理
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.68ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: 68ecshop $
 * $Id: suppliers.php 15013 2009-05-13 09:31:42Z 68ecshop $
 */

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
require(ROOT_PATH . 'languages/' .$_CFG['lang']. '/admin/supplier.php');
/* 汉字转拼音所用插件 */
include_once(ROOT_PATH . 'includes/vendor/autoload.php');
use Overtrue\Pinyin\Pinyin;
$smarty->assign('lang', $_LANG);

/*------------------------------------------------------ */
//-- 供货商列表
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'list')
{
     /* 检查权限 */
     admin_priv('suppliers_manage');

    /* 查询 */
    $result = suppliers_list();

    /* 模板赋值 */
    $smarty->assign('ur_here', $_LANG['supplier_reg_list']); // 当前导航

    $smarty->assign('full_page',        1); // 翻页参数

    $smarty->assign('supplier_list',    $result['result']);
    $smarty->assign('filter',       $result['filter']);
    $smarty->assign('record_count', $result['record_count']);
    $smarty->assign('page_count',   $result['page_count']);
    $smarty->assign('sort_suppliers_id', '<img src="images/sort_desc.gif">');

    /* 显示模板 */
    assign_query_info();
    $smarty->display('supplier_list.htm');
}

/*------------------------------------------------------ */
//-- 排序、分页、查询
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'query')
{
    check_authz_json('suppliers_manage');

    $result = suppliers_list();

    $smarty->assign('supplier_list',    $result['result']);
    $smarty->assign('filter',       $result['filter']);
    $smarty->assign('record_count', $result['record_count']);
    $smarty->assign('page_count',   $result['page_count']);

    /* 排序标记 */
    $sort_flag  = sort_flag($result['filter']);
    $smarty->assign($sort_flag['tag'], $sort_flag['img']);

    make_json_result($smarty->fetch('supplier_list.htm'), '',
        array('filter' => $result['filter'], 'page_count' => $result['page_count']));
}


/*------------------------------------------------------ */
//-- 查看、编辑供货商
/*------------------------------------------------------ */
elseif ($_REQUEST['act']== 'edit')
{
    /* 检查权限 */
    admin_priv('suppliers_manage');
    $suppliers = array();

     /* 取得供货商信息 */
     $id = $_REQUEST['id'];
	 $status = intval($_REQUEST['status']);
     $sql = "SELECT * FROM " . $ecs->table('supplier') . " WHERE supplier_id = '$id'";
     $supplier = $db->getRow($sql);
     if (count($supplier) <= 0)
     {
          sys_msg('该供应商不存在！');
     }
     
	/* 省市县 */
	$supplier_country = $supplier['country'] ?  $supplier['country'] : $_CFG['shop_country'];
	$smarty->assign('country_list',       get_regions());	
	$smarty->assign('province_list', get_regions(1, $supplier_country));
	$smarty->assign('city_list', get_regions(2, $supplier['province']));
	$smarty->assign('district_list', get_regions(3, $supplier['city']));
	$smarty->assign('supplier_country', $supplier_country);
	 /* 供货商等级 */
	 $sql="select rank_id,rank_name from ". $ecs->table('supplier_rank') ." order by sort_order";
	$supplier_rank=$db->getAll($sql);
	$smarty->assign('supplier_rank', $supplier_rank);

     $smarty->assign('ur_here', $_LANG['edit_supplier']);
	 $lang_supplier_list = $status=='1' ? $_LANG['supplier_list'] :  $_LANG['supplier_reg_list'];
     $smarty->assign('action_link', array('href' => 'supplier.php?act=list', 'text' =>$lang_supplier_list ));

     $smarty->assign('form_action', 'update');
     $smarty->assign('supplier', $supplier);

     assign_query_info();

     $smarty->display('supplier_info.htm');
   

}

/*------------------------------------------------------ */
//-- 提交添加、编辑供货商
/*------------------------------------------------------ */
elseif ($_REQUEST['act']=='update')
{
    /* 检查权限 */
    admin_priv('suppliers_manage');   

   /* 提交值 */
   $supplier_id =  intval($_POST['id']);
   $status_url = intval($_POST['status_url']);
   $supplier = array(
							'rank_id'   => intval($_POST['rank_id']),
                            'country'   => intval($_POST['country']),
							'province'   => intval($_POST['province']),
							'city'   => intval($_POST['city']),
							'district'   => intval($_POST['district']),
							'address'   => trim($_POST['address']),
                            'tel'   => trim($_POST['tel']),
							'email'   => trim($_POST['email']),
							'contcat_back'   => trim($_POST['contcat_back']),
							'contcat_shop'   => trim($_POST['contcat_shop']),
							'contcat_yunying'   => trim($_POST['contcat_yunying']),
							'contcat_shouhou'   => trim($_POST['contcat_shouhou']),
							'contcat_caiwu'   => trim($_POST['contcat_caiwu']),
							'system_fee'   => trim($_POST['system_fee']),
							'supplier_bond'   => trim($_POST['supplier_bond']),
							'supplier_rebate'   => trim($_POST['supplier_rebate']),
							'supplier_remark'   => trim($_POST['supplier_remark']),
							'status'   => intval($_POST['status'])
                           );

  /* 取得供货商信息 */
  $sql = "SELECT * FROM " . $ecs->table('supplier') . " WHERE supplier_id = '" . $supplier_id ."' ";
  $supplier_old = $db->getRow($sql);
  if (empty($supplier_old['supplier_id']))
  {
        sys_msg('该供货商信息不存在！');
  }

/* 保存供货商信息 */
$db->autoExecute($ecs->table('supplier'), $supplier, 'UPDATE', "supplier_id = '" . $supplier_id . "'");

 /* 清除缓存 */
clear_cache_files();

/* 提示信息 */
$links[] = array('href' => 'supplier.php?act=list', 'text' => ($status_url ? $_LANG['back_supplier_list'] : $_LANG['back_supplier_reg']));
sys_msg($_LANG['edit_supplier_ok'], 0, $links);    

}


/*------------------------------------------------------ */
//-- 查看、编辑供货商基本信息,由酒店供货商自己填写
/*------------------------------------------------------ */
elseif ($_REQUEST['act']== 'supplier_base_info')
{
    /* 检查权限 */
    admin_priv('supplier_manage');
    $suppliers = array();

    /* 取得供货商信息 */
    //$id = $_REQUEST['supplier_id'];
//   $status = intval($_REQUEST['status']);
    $sql = "SELECT * FROM " . $ecs->table('supplier') . " WHERE supplier_id = '$_SESSION[supplier_id]'";
    $supplier = $db->getRow($sql);
    if (count($supplier) <= 0)
    {
        sys_msg('该酒店不存在！');
    }

    //print_r($supplier);exit;

    /* 省市县 */
    $supplier_country = $supplier['country'] ?  $supplier['country'] : $_CFG['shop_country'];
    $smarty->assign('country_list',       get_regions());
    $smarty->assign('province_list', get_regions(1, $supplier_country));
    $smarty->assign('city_list', get_regions(2, $supplier['province']));
    $smarty->assign('district_list', get_regions(3, $supplier['city']));
    $smarty->assign('supplier_country', $supplier_country);
    /* 供货商等级 */
    $sql="select rank_name from ". $ecs->table('supplier_rank') ." where rank_id = ".$supplier['rank_id'];
    $rank_name=$db->getOne($sql);
    $supplier['rank_name'] = $rank_name;
    // $sql="select rank_id,rank_name from ". $ecs->table('supplier_rank') ." order by sort_order";
    //$supplier_rank=$db->getAll($sql);
    //$smarty->assign('supplier_rank', $supplier_rank);

    /* 店铺类型 */
    // $sql="select str_name from ". $ecs->table('street_category') ." where str_id = ".$supplier['type_id'];
    // $type_name=$db->getOne($sql);
    // $supplier['type_name'] = $type_name;

    $smarty->assign('ur_here', $_LANG['edit_supplier']);
//   $lang_supplier_list = $status=='1' ? $_LANG['supplier_list'] :  $_LANG['supplier_reg_list'];
//      $smarty->assign('action_link', array('href' => 'supplier.php?act=list', 'text' =>$lang_supplier_list ));
    if ($_REQUEST['status'] == '1')
    {
        $lang_supplier_list = $_LANG['supplier_list'];
        $smarty->assign('action_link', array('href' => 'supplier.php?act=list&status=1', 'text' =>$lang_supplier_list ));
    }
    else
    {
        $lang_supplier_list = $_LANG['supplier_reg_list'];
        $smarty->assign('action_link', array('href' => 'supplier.php?act=list', 'text' =>$lang_supplier_list ));
    }

    $smarty->assign('form_action', 'update');


    //获取酒店所属的品牌
    if($supplier['brand_id'])
    {
        $supplier['brand_name'] = $GLOBALS['db']->getOne("SELECT brand_name FROM " . $GLOBALS['ecs']->table('hotels_brand') . "WHERE brand_id='$supplier[brand_id]'");
    }
    else
    {
        $supplier['brand_name'] = '';
    }
    $smarty->assign('supplier', $supplier);
    /* 代码增加 By  www.68ecshop.com Start */
    // 商品等级
    $smarty->assign('rank_id', $supplier['rank_id']);
    //$smarty->assign('supplier_rank_list', get_supplier_rank_list());

    /* 代码增加 By  www.68ecshop.com End */

    //获取酒店列表
    $smarty->assign('brand_list', get_hotel_brand_list());

    $smarty->assign('brand_list_new', get_hotel_brand_list(true));



    //获取是否推荐和首页
    $is_index = $is_groom = 0;
    $sql = "SELECT * FROM" . $GLOBALS['ecs']->table('hotels_tag') . " WHERE supplier_id='$id'";
    $data = $GLOBALS['db']->getAll($sql);
    if($data)
    {
        foreach($data as $val)
        {
            $is_index = $val['is_index'];
            $is_groom = $val['is_groom'];
        }
    }
    $smarty->assign('is_index', $is_index);
    $smarty->assign('is_groom', $is_groom);


    assign_query_info();

    $smarty->display('supplier_base_info.htm');


}

/**
 *  获取供应商列表信息
 *
 * @access  public
 * @param
 *
 * @return void
 */
function suppliers_list()
{
    $result = get_filter();
    if ($result === false)
    {
        $aiax = isset($_GET['is_ajax']) ? $_GET['is_ajax'] : 0;

        /* 过滤信息 */
        $filter['sort_by'] = empty($_REQUEST['sort_by']) ? 'supplier_id' : trim($_REQUEST['sort_by']);
        $filter['sort_order'] = empty($_REQUEST['sort_order']) ? 'ASC' : trim($_REQUEST['sort_order']);
		$filter['status'] = empty($_REQUEST['status']) ? '0' : intval($_REQUEST['status']);
       
        $where = 'WHERE 1 ';
		$where .= $filter['status'] ? " AND status = '". $filter['status']. "' " : "";

        /* 分页大小 */
        $filter['page'] = empty($_REQUEST['page']) || (intval($_REQUEST['page']) <= 0) ? 1 : intval($_REQUEST['page']);

        if (isset($_REQUEST['page_size']) && intval($_REQUEST['page_size']) > 0)
        {
            $filter['page_size'] = intval($_REQUEST['page_size']);
        }
        elseif (isset($_COOKIE['ECSCP']['page_size']) && intval($_COOKIE['ECSCP']['page_size']) > 0)
        {
            $filter['page_size'] = intval($_COOKIE['ECSCP']['page_size']);
        }
        else
        {
            $filter['page_size'] = 15;
        }

        /* 记录总数 */
        $sql = "SELECT COUNT(*) FROM " . $GLOBALS['ecs']->table('supplier') . $where;
        $filter['record_count']   = $GLOBALS['db']->getOne($sql);
        $filter['page_count']     = $filter['record_count'] > 0 ? ceil($filter['record_count'] / $filter['page_size']) : 1;

        /* 查询 */
        $sql = "SELECT supplier_id, rank_id, supplier_name, tel, system_fee, supplier_bond, supplier_rebate, supplier_remark,  ".
			      "status ".
                "FROM " . $GLOBALS['ecs']->table("supplier") . "
                $where
                ORDER BY " . $filter['sort_by'] . " " . $filter['sort_order']. "
                LIMIT " . ($filter['page'] - 1) * $filter['page_size'] . ", " . $filter['page_size'] . " ";

        set_filter($filter, $sql);
    }
    else
    {
        $sql    = $result['sql'];
        $filter = $result['filter'];
    }
    
	$rankname_list =array();
	$sql2 = "select * from ". $GLOBALS['ecs']->table("supplier_rank") ;
	$res2 = $GLOBALS['db']->query($sql2);
	while ($row2=$GLOBALS['db']->fetchRow($res2))
	{
		$rankname_list[$row2['rank_id']] = $row2['rank_name'];
	}

	$list=array();
	$res = $GLOBALS['db']->query($sql);
    while ($row = $GLOBALS['db']->fetchRow($res))
	{
		$row['rank_name'] = $rankname_list[$row['rank_id']];
		$row['status_name'] = $row['status']=='1' ? '通过' : ($row['status']=='0' ? "未审核" : "未通过");
		$list[]=$row;
	}

    $arr = array('result' => $list, 'filter' => $filter, 'page_count' => $filter['page_count'], 'record_count' => $filter['record_count']);

    return $arr;
}
/**
 * 取得酒店品牌列表
 * @return array 品牌列表 id => name
 */
function get_hotel_brand_list($t = false)
{
    include_once(ROOT_PATH . '/includes/Pinyin.php');
    $sql = 'SELECT brand_id, brand_name FROM ' . $GLOBALS['ecs']->table('hotels_brand') . ' ORDER BY sort_order';
    $res = $GLOBALS['db']->getAll($sql);

    $brand_list = array();
    foreach ($res AS $row)
    {
        // 代码修改_start_derek20150129admin_goods  www.68ecshop.com

        if ($t == true)
        {
            $brand_list[$row['brand_id']]['name'] = addslashes($row['brand_name']);
            $brand_list[$row['brand_id']]['name_pinyin'] = Pinyin($brand_list[$row['brand_id']]['name'],1,1);
            $brand_list[$row['brand_id']]['name_p'] = substr($brand_list[$row['brand_id']]['name_pinyin'],0,1);
        }
        else
        {
            $brand_list[$row['brand_id']] = addslashes($row['brand_name']);
        }
        // 代码修改_end_derek20150129admin_goods  www.68ecshop.com
    }

    return $brand_list;
}
?>