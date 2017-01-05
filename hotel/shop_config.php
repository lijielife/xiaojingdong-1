<?php

/**
 * ECSHOP 管理中心商店设置
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: shop_config.php 17217 2011-01-19 06:29:08Z liubo $
 */


define('IN_ECS', true);

/* 代码 */
require(dirname(__FILE__) . '/includes/init.php');
require_once(ROOT_PATH . '/' . HOTEL_ADMIN_PATH . '/includes/lib_goods.php');

if($GLOBALS['_CFG']['certificate_id']  == '')
{
    $certi_id='error';
}
else
{
    $certi_id=$GLOBALS['_CFG']['certificate_id'];
}

$sess_id = $GLOBALS['sess']->get_session_id();

$auth = mktime();
$ac = md5($certi_id.'SHOPEX_SMS'.$auth);
$url = 'http://xxxxxxxxxxx/sms/index.php?certificate_id='.$certi_id.'&sess_id='.$sess_id.'&auth='.$auth.'&ac='.$ac;

/*------------------------------------------------------ */
//-- 列表编辑 ?act=list_edit
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'list_edit')
{

    /* 检查权限 */
    admin_priv('shop_base');
    /* 可选语言 */
    $dir = opendir('../languages');
    $lang_list = array();
    while (@$file = readdir($dir))
    {
        if ($file != '.' && $file != '..' &&  $file != '.svn' && $file != '_svn' && is_dir('../languages/' .$file))
        {
            $lang_list[] = $file;
        }
    }
    @closedir($dir);

    $supplier_id = isset($_REQUEST['supplier_id']) ? $_REQUEST['supplier_id'] : 0;
    if(!$supplier_id)
    {
        sys_msg(sprintf('商店id不能为空', 1));
    }


    /*$sql="select * from ecs_supplier_shop_config where code='jwdbj' and supplier_id=".$_SESSION['supplier_id'];
    $jwd=$db->getRow($sql);
    if(empty($jwd['id']))
    {
        $sql="insert into ecs_supplier_shop_config(parent_id, code,type,sort_order,supplier_id) VALUES ('1','jwdbj','jwd','1','".$_SESSION['supplier_id']."')";
     }   */

    $group_list = get_settings(array('1'), array('shop_header_color','shop_header_text'));
    //print_r($group_list);exit;
//    function get_street_type(){
//        $sql = "select str_id,str_name from ".$GLOBALS['ecs']->table('street_category')." where is_show = 1";
//        $info = $GLOBALS['db']->getAll($sql);
//        $ret = array();
//        foreach($info as $k=>$v){
//            $ret[$v['str_id']] = $v['str_name'];
//        }
//        return $ret;
//    }
    //$street_info = $db->getRow("select * from ".$ecs->table('supplier_street')." where supplier_id=".$_SESSION['supplier_id']);
    //$smarty->assign('stype',get_street_type());
    //$item_list[][9]['vars']=$street_info;
    // $group_list[9]['name']='店铺设置';
    //$group_list[9]['code']='shop_set';
    //$group_list[9]['vars']['0']['code']='shop';
    //$street_info = $db->getRow("select * from ".$ecs->table('supplier_street')." where supplier_id=".$_SESSION['supplier_id']);
    //$group_list[9]['vars'][]=$street_info;
    //$group_list[1]['vars']['0']['store_dir']='shop';
//echo "<pre>";
    //print_r($street_info);
//print_r($group_list);
    $smarty->assign('lang_list',    $lang_list);
    $smarty->assign('ur_here',      $_LANG['01_shop_config']);
    $smarty->assign('group_list',   $group_list);
    $smarty->assign('countries',    get_regions());
    $smarty->assign('supplier_id', $supplier_id);

    if (strpos(strtolower($_SERVER['SERVER_SOFTWARE']), 'iis') !== false)
    {
        $rewrite_confirm = $_LANG['rewrite_confirm_iis'];
    }
    else
    {
        $rewrite_confirm = $_LANG['rewrite_confirm_apache'];
    }
    $smarty->assign('rewrite_confirm', $rewrite_confirm);

    if ($_CFG['shop_country'] > 0)
    {
        $smarty->assign('provinces', get_regions(1, $_CFG['shop_country']));
        if ($_CFG['shop_province'])
        {
            $smarty->assign('cities', get_regions(2, $_CFG['shop_province']));
        }
    }
    
    $smarty->assign('cfg', $_CFG);

    //zhouhui
    $sql = "SELECT latitude,longitude FROM ".$ecs->table('supplier')." where supplier_id=". supplier_id;
    $supplier_info = $db->getRow($sql);
    $smarty->assign('supplier_info', $supplier_info);

    assign_query_info();
    $smarty->display('shop_config.htm');
}

/*------------------------------------------------------ */
//-- 邮件服务器设置
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'mail_settings')
{
    /* 检查权限 */
    admin_priv('shop_config');

    $arr = get_settings(array(5));

    assign_query_info();

    $smarty->assign('ur_here',      $_LANG['mail_settings']);
    $smarty->assign('cfg', $arr[5]['vars']);
    $smarty->display('shop_config_mail_settings.htm');
}

/*------------------------------------------------------ */
//-- 提交   ?act=post
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'post')
{
    $supplier_id = isset($_REQUEST['supplier_id']) ? $_REQUEST['supplier_id'] : 0;
    if(!$supplier_id)
    {
        sys_msg(sprintf('商店id不能为空', 1));
    }
    $type = empty($_POST['type']) ? '' : $_POST['type'];
    $jd=$_POST['jingdu'];
    $wd=$_POST['weidu'];

    //zhouhui
    $db->query("UPDATE ".$ecs->table('supplier')." set latitude='$wd',longitude='$jd' where supplier_id=".$supplier_id);
    //$jd= substr($jd,7);
    //$wd= substr($wd,7);
    $sql="select * from ecs_supplier_shop_config where code='jingdu' and supplier_id=".$supplier_id;
    $jingdu=$db->getRow($sql);
    if(empty($jingdu['id']))
    {
        $sql="insert into ecs_supplier_shop_config(parent_id, code,type,value,sort_order,supplier_id) VALUES ('1','jingdu','jwd','".$jd."','1','".$supplier_id."')";
        @$db->query($sql);
    }else{
        $sql="update ecs_supplier_shop_config set value='".$jd."' where code='jingdu' and supplier_id=".$supplier_id;
        @$db->query($sql);
    }

    $sql="select * from ecs_supplier_shop_config where code='weidu' and supplier_id=".$supplier_id;
    $weidu=$db->getRow($sql);
    if(empty($weidu['id']))
    {
        $sql="insert into ecs_supplier_shop_config(parent_id, code,type,value,sort_order,supplier_id) VALUES ('1','weidu','jwd','".$wd."','1','".$supplier_id."')";
        @$db->query($sql);
    }else{
        $sql="update ecs_supplier_shop_config set value='".$wd."' where code='weidu' and supplier_id=".$supplier_id;
        @$db->query($sql);
    }




    /* 检查权限 */
    //admin_priv('shop_config');

    /* 允许上传的文件类型 */
    $allow_file_types = '|GIF|JPG|PNG|BMP|SWF|DOC|XLS|PPT|MID|WAV|ZIP|RAR|PDF|CHM|RM|TXT|CERT|';

    /* 保存变量值 */
    $count = count($_POST['value']);
    $arr = array();
    $sql = 'SELECT id, value FROM ' . $ecs->table('supplier_shop_config') . ' WHERE supplier_id='.$supplier_id;
    $res= $db->query($sql);
    while($row = $db->fetchRow($res))
    {
        $arr[$row['id']] = $row['value'];
    }
    foreach ($_POST['value'] AS $key => $val)
    {
        if($arr[$key] != $val)
        {
            $sql = "UPDATE " . $ecs->table('supplier_shop_config') . " SET value = '" . trim($val) . "' WHERE id = '" . $key . "' AND supplier_id=".$supplier_id;
            $db->query($sql);
        }
    }

    /* 处理上传文件 */
    $file_var_list = array();
    $sql = "SELECT * FROM " . $ecs->table('supplier_shop_config') . " WHERE parent_id > 0 AND type = 'file' AND supplier_id=".$supplier_id;
    $res = $db->query($sql);
    while ($row = $db->fetchRow($res))
    {
        $file_var_list[$row['code']] = $row;
    }

    foreach ($_FILES AS $code => $file)
    {
        /* 判断用户是否选择了文件 */
        if ((isset($file['error']) && $file['error'] == 0) || (!isset($file['error']) && $file['tmp_name'] != 'none'))
        {
            /* 检查上传的文件类型是否合法 */
            if (!check_file_type($file['tmp_name'], $file['name'], $allow_file_types))
            {
                sys_msg(sprintf($_LANG['msg_invalid_file'], $file['name']));
            }
            else
            {
                if ($code == 'shop_logo')
                {
                    include_once('includes/lib_template.php');
                    $info = get_template_info($_CFG['template']);

                    $logoinfo = explode('.',$info['logo']);
                    $info['logo'] = 'logo_supplier'.$_SESSION['supplier_id'].'.'.$logoinfo[1];//对店铺logo重启名称

                    //$file_name = str_replace('{$template}', $_CFG['template'], $file_var_list[$code]['store_dir']) . $info['logo'];
                    $to_path =  ROOT_PATH.DATA_DIR.'/supplier/logo/';
                    $file_name = $to_path.$info['logo'];
                }
                elseif ($code == 'watermark')
                {
                    $ext = array_pop(explode('.', $file['name']));
                    $file_name = $file_var_list[$code]['store_dir'] . 'watermark.' . $ext;
                    if (file_exists($file_var_list[$code]['value']))
                    {
                        @unlink($file_var_list[$code]['value']);
                    }
                }
                elseif($code == 'wap_logo')
                {
                    $ext = array_pop(explode('.', $file['name']));
                    $file_name = $file_var_list[$code]['store_dir'] . 'wap_logo.' . $ext;
                    if (file_exists($file_var_list[$code]['value']))
                    {
                        @unlink($file_var_list[$code]['value']);
                    }
                }
                else
                {
                    $file_name = $file_var_list[$code]['store_dir'] . $file['name'];
                }

                /* 判断是否上传成功 */
                if (move_upload_file($file['tmp_name'], $file_name))
                {
                    if($code == 'shop_logo'){
                        include_once(ROOT_PATH . 'includes/cls_image.php');
                        $image = new cls_image($_CFG['bgcolor']);
                        $image->create_pic_name = 'logo_supplier'.$supplier_id;
                        $file_name = '/'.$image->make_thumb($file_name,360,180,$to_path);
                    }

                    $sql = "UPDATE " . $ecs->table('supplier_shop_config') . " SET value = '$file_name' WHERE code = '$code' AND supplier_id=".$supplier_id;
                    $db->query($sql);
                }
                else
                {
                    sys_msg(sprintf($_LANG['msg_upload_failed'], $file['name'], $file_var_list[$code]['store_dir']));
                }
            }
        }
    }

    /* 处理发票类型及税率 */
    /*
    if (!empty($_POST['invoice_rate']))
    {
        foreach ($_POST['invoice_rate'] as $key => $rate)
        {
            $rate = round(floatval($rate), 2);
            if ($rate < 0)
            {
                $rate = 0;
            }
            $_POST['invoice_rate'][$key] = $rate;
        }
        $invoice = array(
            'type' => $_POST['invoice_type'],
            'rate' => $_POST['invoice_rate']
        );
        $sql = "UPDATE " . $ecs->table('shop_config') . " SET value = '" . serialize($invoice) . "' WHERE code = 'invoice_type'";
        $db->query($sql);
    }
    */
    /* 记录日志 */
    //admin_log('', 'edit', 'shop_config');

    /* 清除缓存 */
    clear_all_files();

    $links[] = array('text' => $_LANG['back_shop_config'], 'href' => 'shop_config.php?act=list_edit');
    sys_msg($_LANG['save_success'], 0, $links);

    /*
    $_CFG = load_config();

    $shop_country   = $db->getOne("SELECT region_name FROM ".$ecs->table('region')." WHERE region_id='$_CFG[shop_country]'");
    $shop_province  = $db->getOne("SELECT region_name FROM ".$ecs->table('region')." WHERE region_id='$_CFG[shop_province]'");
    $shop_city      = $db->getOne("SELECT region_name FROM ".$ecs->table('region')." WHERE region_id='$_CFG[shop_city]'");

    $spt = '<script type="text/javascript" src="http://api.ecshop.com/record.php?';
    $spt .= "url=" .urlencode($ecs->url());
    $spt .= "&shop_name=" .urlencode($_CFG['shop_name']);
    $spt .= "&shop_title=".urlencode($_CFG['shop_title']);
    $spt .= "&shop_desc=" .urlencode($_CFG['shop_desc']);
    $spt .= "&shop_keywords=" .urlencode($_CFG['shop_keywords']);
    $spt .= "&country=".urlencode($shop_country)."&province=".urlencode($shop_province)."&city=".urlencode($shop_city);
    $spt .= "&address=" .urlencode($_CFG['shop_address']);
    $spt .= "&qq=$_CFG[qq]&ww=$_CFG[ww]&ym=$_CFG[ym]&msn=$_CFG[msn]";
    $spt .= "&email=$_CFG[service_email]&phone=$_CFG[service_phone]&icp=".urlencode($_CFG['icp_number']);
    $spt .= "&version=".VERSION."&language=$_CFG[lang]&php_ver=" .PHP_VERSION. "&mysql_ver=" .$db->version();
    $spt .= "&charset=".EC_CHARSET;


    if ($type == 'mail_setting')
    {
        $links[] = array('text' => $_LANG['back_mail_settings'], 'href' => 'shop_config.php?act=mail_settings');
        sys_msg($_LANG['mail_save_success'].$spt, 0, $links);
    }
    else
    {
        $links[] = array('text' => $_LANG['back_shop_config'], 'href' => 'shop_config.php?act=list_edit');
        sys_msg($_LANG['save_success'].$spt, 0, $links);
    }*/
}

/*------------------------------------------------------ */
//-- 发送测试邮件
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'send_test_email')
{
    /* 检查权限 */
    check_authz_json('shop_config');

    /* 取得参数 */
    $email          = trim($_POST['email']);

    /* 更新配置 */
    $_CFG['mail_service'] = intval($_POST['mail_service']);
    $_CFG['smtp_host']    = trim($_POST['smtp_host']);
    $_CFG['smtp_port']    = trim($_POST['smtp_port']);
    $_CFG['smtp_user']    = json_str_iconv(trim($_POST['smtp_user']));
    $_CFG['smtp_pass']    = trim($_POST['smtp_pass']);
    $_CFG['smtp_mail']    = trim($_POST['reply_email']);
    $_CFG['mail_charset'] = trim($_POST['mail_charset']);

    if (send_mail('', $email, $_LANG['test_mail_title'], $_LANG['cfg_name']['email_content'], 0))
    {
        make_json_result('', $_LANG['sendemail_success'] . $email);
    }
    else
    {
        make_json_error(join("\n", $err->_message));
    }
}

/*------------------------------------------------------ */
//-- 删除上传文件
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'del')
{
    /* 检查权限 */
    //check_authz_json('shop_config');

    /* 取得参数 */
    $code          = trim($_GET['code']);

    $filename = $_CFG[$code];

    //删除文件
    @unlink($filename);

    //更新设置
    update_configure($code, '');

    /* 记录日志 */
    //admin_log('', 'edit', 'shop_config');

    /* 清除缓存 */
    clear_all_files();

    sys_msg($_LANG['save_success'], 0);

}
/*------------------------------------------------------ */
//-- 通过抓取艺龙网的当地城市的酒店位置信息,写入到数据库中并在后台展示给管理员,让其为酒店选定相关的属性
//-- 前提是先设定好酒店所在的城市,然后再根据ajax请求
//-- 艺龙网的数据网址demo : http://hotel.elong.com/beijing/
//-- 返回的是ajax数据
//-- add by ry
/*------------------------------------------------------ */
elseif ($_REQUEST['act'] == 'get_hotel_attr')
{
    /* 检查权限 */
    admin_priv('shop_config');
    $supplier_id = isset($_REQUEST['supplier_id']) ? $_REQUEST['supplier_id'] : 0;
    if(!$supplier_id)
    {
        sys_msg(sprintf('酒店id不能为空', 1));
    }

    $city = isset($_REQUEST['city']) ? $_REQUEST['city'] : '';
    if(!$city)
    {
        sys_msg(sprintf('城市不能为空', 1));
    }

    $response = array(
        'err' => 0,
        'msg' => ''
    );


    //判断城市的数据是否在数据库存在,如已存在,则无需远端抓取,否则抓取艺龙的数据
    $sql = 'SELECT cat_id FROM' . $ecs->table('hotels_type') . " WHERE cat_name='" . addslashes($city) . "'";
    $cat_id = $GLOBALS['db']->getOne($sql);
    if(!$cat_id)
    {

        //把艺龙网的城市编号抓下来
        $citys_info = get_city_info_from_yl();

        //查询前端传过来的城市属于对应艺龙网的页面url
        $yl_url = get_url_from_citys_info($city,$citys_info);
        if(!$yl_url)
        {
            die('抱歉,您输入的城市暂无数据,请联系开发者');
        }
        //$city_detail = get_city_detail_from_yl($yl_url);


        /* 数据入库,建立新的商品类型 */

        //1、新建hotels_type
        $goods_type['cat_name']   = $city;
        $goods_type['attr_group'] = '默认分组' . "\n" . '机场/车站' . "\n" . "地铁";
        $goods_type['enabled']    = 1;
        if ($GLOBALS['db']->autoExecute($ecs->table('hotels_type'), $goods_type) == false)
        {
            sys_msg('新建酒店类型失败', 1);
        }
        $cat_id = $GLOBALS['db']->insert_id();
//    echo $cat_id;exit;
//    $cat_id = 5;
        $info = get_city_detail_from_yl($yl_url);
        //2、插入具体属性值
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
                    $GLOBALS['db']->autoExecute($ecs->table('hotels_attribute'), $attr, 'INSERT');
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
                    $GLOBALS['db']->autoExecute($ecs->table('hotels_attribute'), $attr, 'INSERT');
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
                $GLOBALS['db']->autoExecute($ecs->table('hotels_attribute'), $attr, 'INSERT');
            }
        }
    }

    $html = build_hotels_attr_html($cat_id);
    echo $html;
}


/**
 * 设置系统设置
 *
 * @param   string  $key
 * @param   string  $val
 *
 * @return  boolean
 */
function update_configure($key, $val='')
{
    if (!empty($key))
    {
        $sql = "UPDATE " . $GLOBALS['ecs']->table('supplier_shop_config') . " SET value='$val' WHERE code='$key' AND supplier_id=".$_SESSION['supplier_id'];

        return $GLOBALS['db']->query($sql);
    }

    return true;
}



/**
 * 获得设置信息
 *
 * @param   array   $groups     需要获得的设置组
 * @param   array   $excludes   不需要获得的设置组
 *
 * @return  array
 */
function get_settings($groups=null, $excludes=null)
{
    global $db, $ecs, $_LANG;


    $config_groups = '';
    $excludes_groups = '';

    if (!empty($groups))
    {
        foreach ($groups AS $key=>$val)
        {
            $config_groups .= " AND (id='$val' OR parent_id='$val')";
        }
    }

    if (!empty($excludes))
    {
        foreach ($excludes AS $key=>$val)
        {
            $excludes_groups .= " AND (parent_id<>'$val' AND id<>'$val')";
        }
    }

    create_shop_settiongs();


    /* 取出全部数据：分组和变量 */
    $sql = "SELECT * FROM " . $ecs->table('supplier_shop_config') .
        " WHERE supplier_id=".$_REQUEST['supplier_id']." AND type<>'hidden' ORDER BY parent_id, sort_order, id";
    $item_list = $db->getAll($sql);
    /* 整理数据 */
    $group_list = array();
    foreach ($item_list AS $key => $item)
    {
        $pid = $item['parent_id'];
        $item['name'] = isset($_LANG['cfg_name'][$item['code']]) ? $_LANG['cfg_name'][$item['code']] : $item['code'];
        $item['desc'] = isset($_LANG['cfg_desc'][$item['code']]) ? $_LANG['cfg_desc'][$item['code']] : '';

        //print_r($item);continue;

        $needless_codes = array('ww','service_email','shop_logo','shop_index_num');

        //去除商店设置里面的无用信息并修改一些中文名称
        if(in_array($item['code'],$needless_codes))
        {
            continue;
        }
        else
        {
            if($item['code'] == 'shop_info')
            {
                $item['name'] = '酒店信息';
            }
            else if($item['code'] == 'shop_name')
            {
                $item['name'] = '酒店名称';
            }
            else if($item['code'] == 'shop_title')
            {
                $item['name'] = '酒店标题';
                $item['desc'] = '酒店的标题将显示在浏览器的标题栏';
            }
            else if($item['code'] == 'shop_keywords')
            {
                $item['name'] = '酒店关键字';
            }
            else if($item['code'] == 'shop_closed')
            {
                $item['name'] = '暂时关闭酒店';
            }
            else if($item['code'] == 'close_comment')
            {
                $item['name'] = '关闭酒店的原因';
            }
            else if($item['code'] == 'shop_notice')
            {
                $item['name'] = '酒店公告';
                $item['desc'] = '以上内容将显示在酒店公告中,注意控制公告内容长度不要超过公告显示区域大小。';
            }
        }

        if ($item['code'] == 'sms_shop_mobile')
        {
            $item['url'] = 1;
        }
        if ($pid == 0)
        {
            /* 分组 */
            if ($item['type'] == 'group')
            {
                $group_list[$item['id']] = $item;
            }
        }
        else
        {
            /* 变量 */
            if (isset($group_list[$pid]))
            {
                if ($item['store_range'])
                {
                    $item['store_options'] = explode(',', $item['store_range']);

                    foreach ($item['store_options'] AS $k => $v)
                    {
                        $item['display_options'][$k] = isset($_LANG['cfg_range'][$item['code']][$v]) ?
                            $_LANG['cfg_range'][$item['code']][$v] : $v;
                    }
                }
                $group_list[$pid]['vars'][] = $item;

            }
        }

    }

    return $group_list;
}


/**
 * 把艺龙网的城市编号信息抓取下拉,并存放到文本中
 * add by ry
 */
function get_city_info_from_yl()
{
    if(!file_exists('../data/hotel/city.json'))
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
        file_put_contents('../data/hotel/city.json',json_encode($infos));
        return $infos;
    }
    else
    {
        $info = file_get_contents('../data/hotel/city.json');
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
    include_once('includes/phpQuery.php');
    phpQuery::newDocumentFile($yl_url);

    $info = array();
    foreach(pq(".filter_posi_type li") as $key => $val)
    {
        $info[$key] = array(
            'type' => pq($val)->text()
        );
    }
    foreach(pq('.filter_posi_show')->children() as $k => $v)
    {
        $msg = '';
        if($k == 2)
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
        elseif($k == 3)
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
    //echo json_encode($info);exit;
}
?>