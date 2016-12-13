<?php
/**
 *
 * @ IonCube Priv8 Decoder V1 By H@CK3R $2H  
 *
 * @ Version  : 1,0,0,3
 * @ Author   : H@CK3R $2H  
 * @ Release on : 01-01-2014
 * @ Email  : Hacker.S2h@Gmail.com
 *
 **/

if ( !defined( "IN_ECS" ) )
{
    exit( "Hacking attempt" );
}

function get_intro_list( )
{
    return array( "is_best" => $GLOBALS['_LANG']['is_best'], "is_new" => $GLOBALS['_LANG']['is_new'], "is_hot" => $GLOBALS['_LANG']['is_hot'], "is_promote" => $GLOBALS['_LANG']['is_promote'], "all_type" => $GLOBALS['_LANG']['all_type'] );
}

function get_unit_list( )
{
    return array( "1" => $GLOBALS['_LANG']['unit_kg'], "0.001" => $GLOBALS['_LANG']['unit_g'] );
}

function get_user_rank_list( )
{
    $sql = "SELECT * FROM ".$GLOBALS['ecs']->table( "user_rank" )." ORDER BY min_points";
    return $GLOBALS['db']->getAll( $sql );
}

function get_member_price_list( $goods_id )
{
    $price_list = array( );
    $sql = "SELECT user_rank, user_price FROM ".$GLOBALS['ecs']->table( "member_price" )." WHERE goods_id = '{$goods_id}'";
    $res = $GLOBALS['db']->query( $sql );
    $row = $GLOBALS['db']->fetchRow( $res );
    $price_list[$row['user_rank']] = $row['user_price'];
    return $price_list;
}

function handle_goods_attr( $goods_id, $id_list, $is_spec_list, $value_price_list )
{
    $goods_attr_id = array( );
    foreach ( $id_list as $key => $id )
    {
        $is_spec = $is_spec_list[$key];
        if ( $is_spec == "false" )
        {
            $value = $value_price_list[$key];
            $price = "";
        }
        else
        {
            $value_list = array( );
            $price_list = array( );
            if ( $value_price_list[$key] )
            {

                $vp_list = explode( chr( 13 ), $value_price_list[$key] );
                //$vp_list = $value_list;
                foreach ( $vp_list as $v_p )
                {
                    //$arr = $value_price_list;
                    $arr = explode( chr( 9 ), $v_p );
                    $value_list[] = $arr[0];
                    $price_list[] = $arr[1];
                }
            }
            $value = join( chr( 13 ), $value_list );
            $price = join( chr( 13 ), $price_list );
        }
        $sql = "SELECT goods_attr_id FROM ".$GLOBALS['ecs']->table( "goods_attr" )." WHERE goods_id = '{$goods_id}' AND attr_id = '{$id}' AND attr_value = '{$value}' LIMIT 0, 1";
        //$result_id = $GLOBALS['ecs']->table;

        $result_id = $GLOBALS['db']->getOne( $sql );
        if ( !empty( $result_id ) )
        {
            $sql = "UPDATE ".$GLOBALS['ecs']->table( "goods_attr" )." SET attr_value = '{$value}'  WHERE goods_id = '{$goods_id}'  AND attr_id = '{$id}' AND goods_attr_id = '{$result_id}'";
            $goods_attr_id[$id] = $result_id;
        }
        else
        {
            $sql = "INSERT INTO ".$GLOBALS['ecs']->table( "goods_attr" )." (goods_id, attr_id, attr_value, attr_price) "."VALUES ('{$goods_id}', '{$id}', '{$value}', '{$price}')";
        }
        $GLOBALS['db']->query( $sql );
        if ( $goods_attr_id[$id] == "" )
        {
            $goods_attr_id[$id] = $GLOBALS['db']->insert_id( );
            continue;
        }
    }
    return $goods_attr_id;
}

function handle_member_price( $goods_id, $rank_list, $price_list )
{
    foreach ( $rank_list as $key => $rank )
    {
        //$price = $key;
        $price = $price_list[$key];
        $sql = "SELECT COUNT(*) FROM ".$GLOBALS['ecs']->table( "member_price" )." WHERE goods_id = '{$goods_id}' AND user_rank = '{$rank}'";
        if ( 0 < $GLOBALS['db']->getOne( $sql ) )
        {
            if ( $price < 0 )
            {
                $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "member_price" )." WHERE goods_id = '{$goods_id}' AND user_rank = '{$rank}' LIMIT 1";
            }
            else
            {
                $sql = "UPDATE ".$GLOBALS['ecs']->table( "member_price" )." SET user_price = '{$price}' "."WHERE goods_id = '{$goods_id}' "."AND user_rank = '{$rank}' LIMIT 1";
            }
        }
        else if ( $price == 0 - 1 )
        {
            $sql = "";
        }
        else
        {
            $sql = "INSERT INTO ".$GLOBALS['ecs']->table( "member_price" )." (goods_id, user_rank, user_price) "."VALUES ('{$goods_id}', '{$rank}', '{$price}')";
        }
        if ( $sql )
        {
            $GLOBALS['db']->query( $sql );
            continue;
        }
    }
}

function handle_other_cat( $goods_id, $cat_list )
{
    $sql = "SELECT cat_id FROM ".$GLOBALS['ecs']->table( "goods_cat" )." WHERE goods_id = '{$goods_id}'";
    $exist_list = $GLOBALS['db']->getCol( $sql );
    $delete_list = array_diff( $exist_list, $cat_list );
    if ( $delete_list )
    {
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods_cat" )." WHERE goods_id = '{$goods_id}' "."AND cat_id ".db_create_in( $delete_list );
        $GLOBALS['db']->query( $sql );
    }
    $add_list = array_diff( $cat_list, $exist_list, array( 0 ) );;
    foreach ( $add_list as $cat_id )
    {
        $sql = "INSERT INTO ".$GLOBALS['ecs']->table( "goods_cat" )." (goods_id, cat_id) "."VALUES ('{$goods_id}', '{$cat_id}')";
        $GLOBALS['db']->query( $sql );
    }
}

function handle_link_goods( $goods_id )
{
    $sql = "UPDATE ".$GLOBALS['ecs']->table( "link_goods" )." SET "." goods_id = '{$goods_id}' "." WHERE goods_id = '0'"." AND admin_id = '{$_SESSION['admin_id']}'";
    $GLOBALS['db']->query( $sql );
    $sql = "UPDATE ".$GLOBALS['ecs']->table( "link_goods" )." SET "." link_goods_id = '{$goods_id}' "." WHERE link_goods_id = '0'"." AND admin_id = '{$_SESSION['admin_id']}'";
    $GLOBALS['db']->query( $sql );
}

function handle_group_goods( $goods_id )
{
    $sql = "UPDATE ".$GLOBALS['ecs']->table( "group_goods" )." SET "." parent_id = '{$goods_id}' "." WHERE parent_id = '0'"." AND admin_id = '{$_SESSION['admin_id']}'";
    $GLOBALS['db']->query( $sql );
}

function handle_goods_article( $goods_id )
{
    $sql = "UPDATE ".$GLOBALS['ecs']->table( "goods_article" )." SET "." goods_id = '{$goods_id}' "." WHERE goods_id = '0'"." AND admin_id = '{$_SESSION['admin_id']}'";
    $GLOBALS['db']->query( $sql );
}

function handle_gallery_image( $goods_id, $image_files, $image_descs, $image_urls )
{
    $proc_thumb = isset( $GLOBALS['shop_id'] ) && 0 < $GLOBALS['shop_id'] ? false : true;
    foreach ( $image_descs as $key => $img_desc )
    {
        $flag = false;
        if ( isset( $image_files['error'] ) )
        {
            if ( $image_files['error'][$key] == 0 )
            {
                $flag = true;
            }
        }
        else if ( $image_files['tmp_name'][$key] != "none" )
        {
            $flag = true;
        }
        if ( $flag )
        {
            if ( $proc_thumb )
            {
                $thumb_url = $GLOBALS['image']->make_thumb( $image_files['tmp_name'][$key], $GLOBALS['_CFG']['thumb_width'], $GLOBALS['_CFG']['thumb_height'] );
                $thumb_url = is_string( $thumb_url ) ? $thumb_url : "";
            }
            $upload = array( "name" => $image_files['name'][$key], "type" => $image_files['type'][$key], "tmp_name" => $image_files['tmp_name'][$key], "size" => $image_files['size'][$key] );
            if ( isset( $image_files['error'] ) )
            {
                $upload['error'] = $image_files['error'][$key];
            }

            $img_original = $GLOBALS['image']->upload_image( $upload );
            if ( $img_original === false )
            {
                sys_msg( $GLOBALS['image']->error_msg( ), 1, array( ), false );
            }

            $img_url = $img_original;
            if (!$proc_thumb)
            {
                $thumb_url = $img_original;
            }
            if ( $proc_thumb && 0 < gd_version( ) )
            {
                $pos = strpos( basename( $img_original ), '.' );
                $newname = dirname( $img_original )."/".$GLOBALS['image']->random_filename( ).substr( basename( $img_original ), $pos );
                copy( "../".$img_original, "../".$newname );
                $img_url = $newname;
                $GLOBALS['image']->add_watermark( "../".$img_url, "", $GLOBALS['_CFG']['watermark'], $GLOBALS['_CFG']['watermark_place'], $GLOBALS['_CFG']['watermark_alpha'] );
            }

            $img_original =  reformat_image_name( 'gallery', $goods_id, $img_original, 'source' );
            $img_url = reformat_image_name( 'gallery', $goods_id, $img_url, 'goods' );
            $thumb_url = reformat_image_name( 'gallery_thumb', $goods_id, $thumb_url, 'thumb' );


            $sql = "INSERT INTO ".$GLOBALS['ecs']->table( "goods_gallery" )." (goods_id, img_url, img_desc, thumb_url, img_original) "."VALUES ('{$goods_id}', '{$img_url}', '{$img_desc}', '{$thumb_url}', '{$img_original}')";
            $GLOBALS['db']->query( $sql );
            if ( $proc_thumb && !$GLOBALS['_CFG']['retain_original_img'] && !empty( $img_original ) )
            {
                $GLOBALS['db']->query( "UPDATE ".$GLOBALS['ecs']->table( "goods_gallery" )." SET img_original='' WHERE `goods_id`='{$goods_id}'" );
                @unlink( @"../".@$img_original );
                continue;
            }
            continue;
        }

        if ( !empty( $image_urls[$key] ) && $image_urls[$key] != $GLOBALS['_LANG']['img_file'] && $image_urls[$key] != "http://" && copy( trim( $image_urls[$key] ), ROOT_PATH."temp/".basename( $image_urls[$key] ) ) )
        {
            $image_url = trim( $image_urls[$key] );;
            $down_img = ROOT_PATH . 'temp/' . basename( $image_url );
            if ( $proc_thumb )
            {
                $thumb_url = is_string( $thumb_url ) ? $thumb_url : "";
                $thumb_url = reformat_image_name( 'gallery_thumb', $goods_id, $thumb_url, 'thumb' );
            }
            if ( !$proc_thumb )
            {
                $thumb_url = htmlspecialchars( $image_url );
            }

            $img_original = htmlspecialchars( $image_url );
            //$img_url = $img_desc;
            $sql = "INSERT INTO ".$GLOBALS['ecs']->table( "goods_gallery" )." (goods_id, img_url, img_desc, thumb_url, img_original) "."VALUES ('{$goods_id}', '{$img_url}', '{$img_desc}', '{$thumb_url}', '{$img_original}')";
            $GLOBALS['db']->query( $sql );
            @unlink( @$down_img );
            continue;
        }
    }
}

function update_goods( $goods_id, $field, $value )
{
    if ( $goods_id )
    {
        clear_cache_files( );
        $sql = "UPDATE ".$GLOBALS['ecs']->table( "goods" )." SET {$field} = '{$value}' , last_update = '".gmtime( )."' "."WHERE goods_id ".db_create_in( $goods_id );
        return $GLOBALS['db']->query( $sql );
    }
    return false;
}

function delete_goods( $goods_id )
{
    if ( empty( $goods_id ) )
    {
        return null;
    }
    else
    {
        $sql = "SELECT DISTINCT goods_id FROM ".$GLOBALS['ecs']->table( "goods" )." WHERE goods_id ".db_create_in( $goods_id )." AND is_delete = 1";
        $goods_id = $GLOBALS['db']->getCol( $sql );
        if ( empty( $goods_id ) )
        {
            return null;
        }
        else
        {
            $sql = "SELECT goods_thumb, goods_img, original_img ".( "FROM " ).$GLOBALS['ecs']->table( "goods" )." WHERE goods_id ".db_create_in( $goods_id );
            $res = $GLOBALS['db']->query( $sql );
            $goods = $GLOBALS['db']->fetchRow( $res );
            if ( !empty( $goods['goods_thumb'] ) )
            {
                @unlink( @"../".@$goods['goods_thumb'] );
            }
            if ( !empty( $goods['goods_img'] ) )
            {
                @unlink( @"../".@$goods['goods_img'] );
            }
            if ( !empty( $goods['original_img'] ) )
            {
                @unlink( @"../".@$goods['original_img'] );
            }
        }
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "products" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "SELECT img_url, thumb_url, img_original ".( "FROM " ).$GLOBALS['ecs']->table( "goods_gallery" )." WHERE goods_id ".db_create_in( $goods_id );


        $res = $GLOBALS['db']->query( $sql );
//        $sql = "SELECT * ".( "FROM " ).$GLOBALS['ecs']->table( "bar_code" )." WHERE goods_id ".db_create_in( $goods_id );
//        $res = $GLOBALS['db']->query( $sql );
        while ( $row = $GLOBALS['db']->fetchRow( $res ) )
        {
            if ( !empty( $row['img_url'] ) )
            {
                @unlink( @"../".@$row['img_url'] );
            }
            if ( !empty( $row['thumb_url'] ) )
            {
                @unlink( @"../".@$row['thumb_url'] );
            }
            if ( !empty( $row['img_original'] ) )
            {
                @unlink( @"../".@$row['img_original'] );
            }
        }
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods_gallery" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "collect_goods" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods_article" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods_attr" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "goods_cat" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "member_price" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "group_goods" )." WHERE parent_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "group_goods" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "link_goods" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "link_goods" )." WHERE link_goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "tag" )." WHERE goods_id ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "comment" )." WHERE comment_type = 0 AND id_value ".db_create_in( $goods_id );
        $GLOBALS['db']->query( $sql );
        $sql = "DELETE FROM ".$GLOBALS['ecs']->table( "virtual_card" )." WHERE goods_id ".db_create_in( $goods_id );
        if ( !$GLOBALS['db']->query( $sql, "SILENT" ) && $GLOBALS['db']->errno( ) != 1146 )
        {
            exit( $GLOBALS['db']->error( ) );
        }
        clear_cache_files( );
    }

}

function generate_goods_sn( $goods_id )
{
    $goods_sn = $GLOBALS['_CFG']['sn_prefix'].str_repeat( "0", 6 - strlen( $goods_id ) ).$goods_id;
    $sql = "SELECT goods_sn FROM ".$GLOBALS['ecs']->table( "goods" )." WHERE goods_sn LIKE '".mysql_like_quote( $goods_sn )."%' AND goods_id <> '{$goods_id}' "." ORDER BY LENGTH(goods_sn) DESC";
    $sn_list = $GLOBALS['db']->getCol( $sql );
    if ( in_array( $goods_sn, $sn_list ) )
    {
        $max = pow( 10, strlen( $sn_list[0] ) - strlen( $goods_sn ) + 1 ) - 1;
        $new_sn = $goods_sn.mt_rand( 0, $max );
        while ( in_array( $new_sn, $sn_list ) )
        {
            $new_sn = $goods_sn.mt_rand( 0, $max );
        }
        //$goods_sn = strlen( $goods_sn );
        $goods_sn = $new_sn;

    }
    return $goods_sn;
}

function check_goods_sn_exist( $goods_sn, $goods_id = 0 )
{
    $goods_sn = trim($goods_sn);
    $goods_id = intval($goods_id);
    if ( strlen( $goods_sn ) == 0 )
    {
        return true;
    }
    if ( empty( $goods_id ) )
    {
        $sql = "SELECT goods_id FROM ".$GLOBALS['ecs']->table( "goods" )."\r\n                WHERE goods_sn = '{$goods_sn}'";
    }
    else
    {
        $sql = "SELECT goods_id FROM ".$GLOBALS['ecs']->table( "goods" )."\r\n                WHERE goods_sn = '{$goods_sn}'\r\n                AND goods_id <> '{$goods_id}'";
    }
    $res = $GLOBALS['db']->getOne($sql);
    //$res = trim( $goods_sn );
    if ( empty( $res ) )
    {
        return false;
    }
    return true;
}

function get_attr_list( $cat_id, $goods_id = 0 )
{
    if ( empty( $cat_id ) )
    {
        return array();
    }
    $sql = "SELECT a.attr_id, a.attr_name, a.attr_input_type, a.attr_type,a.attr_txm, a.attr_values, v.attr_value, v.attr_price ".( "FROM " ).$GLOBALS['ecs']->table( "attribute" )." AS a "."LEFT JOIN ".$GLOBALS['ecs']->table( "goods_attr" )." AS v "."ON v.attr_id = a.attr_id AND v.goods_id = '{$goods_id}' "."WHERE a.cat_id = ".intval( $cat_id )." OR a.cat_id = 0 "."ORDER BY a.sort_order, a.attr_type, a.attr_id, v.attr_price, v.goods_attr_id";
    $row = $GLOBALS['db']->GetAll( $sql );
    return $row;
}

function get_goods_type_specifications( )
{
    $sql = "SELECT DISTINCT cat_id FROM ".$GLOBALS['ecs']->table( "attribute" )." WHERE attr_type = 1";
    $row = $GLOBALS['db']->GetAll($sql);
    $return_arr = array( );
    if ( !empty( $row ) )
    {
        foreach ( $row as $value )
        {
            $return_arr[$value['cat_id']] = $value['cat_id'];
        }
    }
    return $return_arr;
}
/**
 * 根据属性数组创建属性的表单
 *
 * @access  public
 * @param   int     $cat_id     分类编号
 * @param   int     $goods_id   商品编号
 * @return  string
 */
function build_attr_html($cat_id, $goods_id = 0 , $bar_code = 0)
{
    $attr = get_attr_list($cat_id, $goods_id);
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

        $html .= ($val['attr_type'] == 1 || $val['attr_type'] == 2) ?
            $GLOBALS['_LANG']['spec_price'].' <input type="text" name="attr_price_list[]" value="' . $val['attr_price'] . '" size="5" maxlength="10" />' :
            ' <input type="hidden" name="attr_price_list[]" value="0" />';

        if($val[attr_txm] > 0){
            $html .="<span class=\"notice-span\" style=\"display:block\" id=\"attr_".$val['attr_id'] ."\">此属性是条码属性，您只有选择完所有的条码属性后才能输入“组合属性”的对应条形码</span>";
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
function build_attr_html_old( $cat_id, $goods_id = 0, $bar_code = 0 )
{
    $attr = get_attr_list( $cat_id, $goods_id );
    $html = "<table width=\"100%\" id=\"attrTable\">";
    $spec = 477;
    foreach ( $attr as $key => $val )
    {
        $html .= "<tr><td class='label'>";
        if ( $val['attr_type'] == 1 || $val['attr_type'] == 2 )
        {
            $html .= ($spec != $val['attr_id']) ? "<a href='javascript:;' onclick='addSpec(this)'>[+]</a>" : "<a href='javascript:;' onclick='removeSpec(this)'>[-]</a>";
            $spec = $val['attr_id'];
        }
        $html .= "{$val['attr_name']}</td><td><input type='hidden' name='attr_id_list[]' value='{$val['attr_id']}' txm='{$val['attr_txm']}' class='ctxm_{$val['attr_txm']}' />";
        if ( $val['attr_input_type'] == 0 )
        {
            $html .= "<input name=\"attr_value_list[]\" type=\"text\" value=\"".htmlspecialchars( $val['attr_value'] )."\" size=\"40\" /> ";
        }
        else
        {
            if ( $val['attr_input_type'] == 2 )
            {
                $html .= "<textarea name=\"attr_value_list[]\" rows=\"3\" cols=\"40\">".htmlspecialchars( $val['attr_value'] )."</textarea>";
            }
            else
            {
                if ( 0 < $val[attr_txm] )
                {
                    $html .= "<select class=attr_num_".$val[attr_id]." name=\"attr_value_list[]\" onchange=\"getType(".$val[attr_txm].",".$cat_id.",".$this.value.",".$goods_id.")\">";
                }
                else
                {
                    $html .= "<select class=attr_num_".$val[attr_id]." name=\"attr_value_list[]\" >";
                }
                $html .= "<option value=\"\">".$GLOBALS['_LANG']['select_please']."</option>";
                $attr_values = explode( '', $val['attr_values'] );
                foreach ( $attr_values as $opt )
                {
                    //$opt = $bar_code;
                    $opt = trim( htmlspecialchars( $opt ) );;
                    $html .= $val['attr_value'] != $opt ? "<option value=\"".$opt."\">".$opt."</option>" : "<option value=\"".$opt."\" selected=\"selected\">".$opt."</option>";
                }
                $html .= "</select> ";
            }
        }
        $html .= $val['attr_type'] == 1 || $val['attr_type'] == 2 ? $GLOBALS['_LANG']['spec_price']." <input type=\"text\" name=\"attr_price_list[]\" value=\"".$val['attr_price']."\" size=\"5\" maxlength=\"10\" />" : " <input type=\"hidden\" name=\"attr_price_list[]\" value=\"0\" />";
        $html .= "</td></tr>";
    }
    $html .= "</table>";
    if ( $bar_code )
    {
        $html .= "<div id=\"input_txm\"><table  width=\"100%\"  >";
        foreach ( $bar_code as $value )
        {
            $html .= "<tr><td class=\"label\">条形码</td><td><input type=\"hidden\" name=\"txm_shu[]\" value=".$value['taypes'].">".$value['taypes']."<td/><td><input type=\"text\" name=\"tiaoxingm[]\" value=".$value['bar_code']."></td></tr>";
        }
        $html .= "</table ></div>";
    }
    else
    {
        $html .= "<div id=\"input_txm\"></div>";
    }
    return $html;
}

function get_linked_goods( $goods_id )
{
    $sql = "SELECT lg.link_goods_id AS goods_id, g.goods_name, lg.is_double ".( "FROM " ).$GLOBALS['ecs']->table( "link_goods" )." AS lg, ".$GLOBALS['ecs']->table( "goods" )." AS g "."WHERE lg.goods_id = '{$goods_id}' "."AND lg.link_goods_id = g.goods_id ";
    if ( $goods_id == 0 )
    {
        $sql .= " AND lg.admin_id = '{$_SESSION['admin_id']}'";
    }
    $row = $GLOBALS['db']->getAll( $sql );
    foreach ( $row as $key => $val )
    {
        $linked_type = $val['is_double'] == 0 ? $GLOBALS['_LANG']['single'] : $GLOBALS['_LANG']['double'];
        $row[$key]['goods_name'] = $val['goods_name']." -- [{$linked_type}]";
        unset( $row[$key]['is_double'] );
    }
    return $row;
}

function get_group_goods( $goods_id )
{
    $sql = "SELECT gg.goods_id, CONCAT(g.goods_name, ' -- [', gg.goods_price, ']') AS goods_name ".( "FROM " ).$GLOBALS['ecs']->table( "group_goods" )." AS gg, ".$GLOBALS['ecs']->table( "goods" )." AS g "."WHERE gg.parent_id = '{$goods_id}' "."AND gg.goods_id = g.goods_id ";
    if ( $goods_id == 0 )
    {
        $sql .= " AND gg.admin_id = '{$_SESSION['admin_id']}'";
    }
    //$row = $GLOBALS['ecs']->table( "goods" );
    $row = $GLOBALS['db']->getAll($sql);
    return $row;
}

function get_goods_articles( $goods_id )
{
    $sql = "SELECT g.article_id, a.title ".( "FROM " ).$GLOBALS['ecs']->table( "goods_article" )." AS g, ".$GLOBALS['ecs']->table( "article" )." AS a "."WHERE g.goods_id = '{$goods_id}' "."AND g.article_id = a.article_id ";
    if ( $goods_id == 0 )
    {
        $sql .= " AND g.admin_id = '{$_SESSION['admin_id']}'";
    }
    //$row = $GLOBALS['ecs']->table( "article" );
    $row = $GLOBALS['db']->getAll($sql);
    return $row;
}

function goods_list( $is_delete, $real_goods = 1, $conditions = "" )
{
    $param_str = "-".$is_delete."-".$real_goods;
    $result = get_filter( $param_str );
    if ( $result === false )
    {
        $day = getdate();
        $today = local_mktime($day['hours'], $day['minutes'], 59, $day['mon'], $day['mday'], $day['year']);

        $filter['city'] = empty( $_REQUEST['city'] ) ? 0 : intval( $_REQUEST['city'] );
        $filter['county'] = empty( $_REQUEST['county'] ) ? 0 : intval( $_REQUEST['county'] );
        $filter['district_id'] = empty( $_REQUEST['district_id'] ) ? 0 : intval( $_REQUEST['district_id'] );
        $filter['cat_id'] = empty( $_REQUEST['cat_id'] ) ? 0 : intval( $_REQUEST['cat_id'] );
        $filter['supplier_status'] = $_REQUEST['supplier_status'] != "" ? $_REQUEST['supplier_status'] : "";
        $filter['intro_type'] = empty( $_REQUEST['intro_type'] ) ? "" : trim( $_REQUEST['intro_type'] );
        $filter['is_promote'] = empty( $_REQUEST['is_promote'] ) ? 0 : intval( $_REQUEST['is_promote'] );
        $filter['stock_warning'] = empty( $_REQUEST['stock_warning'] ) ? 0 : intval( $_REQUEST['stock_warning'] );
        $filter['brand_id'] = empty( $_REQUEST['brand_id'] ) ? 0 : intval( $_REQUEST['brand_id'] );
        $filter['keyword'] = empty( $_REQUEST['keyword'] ) ? "" : trim( $_REQUEST['keyword'] );
        $filter['suppliers_id'] = !empty( $_REQUEST['suppliers_id'] ) ? empty( $_REQUEST['suppliers_id'] ) ? $_SESSION['suppliers_id'] : trim( $_REQUEST['suppliers_id'] ) : "";
        $filter['is_on_sale'] = isset( $_REQUEST['is_on_sale'] ) ? empty( $_REQUEST['is_on_sale'] ) && $_REQUEST['is_on_sale'] === 0 ? "" : trim( $_REQUEST['is_on_sale'] ) : "";
        if ( isset( $_REQUEST['is_ajax'] ) && $_REQUEST['is_ajax'] == 1 )
        {
            $filter['keyword'] = json_str_iconv( $filter['keyword'] );
        }
        $filter['sort_by'] = empty( $_REQUEST['sort_by'] ) ? "goods_id" : trim( $_REQUEST['sort_by'] );
        $filter['sort_order'] = empty( $_REQUEST['sort_order'] ) ? "DESC" : trim( $_REQUEST['sort_order'] );
        $filter['extension_code'] = empty( $_REQUEST['extension_code'] ) ? "" : trim( $_REQUEST['extension_code'] );
        $filter['is_delete'] = $is_delete;
        $filter['real_goods'] = $real_goods;
        $where = (0 < $filter['cat_id']) ? " AND ".get_children( $filter['cat_id'], "sgc" ) : "";
        switch ( $filter['intro_type'] )
        {
            case "is_best" :
                $where .= " AND is_best=1";
                break;
            case "is_hot" :
                $where .= " AND is_hot=1";
                break;
            case "is_new" :
                $where .= " AND is_new=1";
                break;
            case "is_promote" :
                $where .= " AND is_promote = 1 AND promote_price > 0 AND promote_start_date <= '{$today}' AND promote_end_date >= '{$today}'";
                break;
            case "all_type" :
                $where .= " AND (is_best=1 OR is_hot=1 OR is_new=1 OR (is_promote = 1 AND promote_price > 0 AND promote_start_date <= '".$today."' AND promote_end_date >= '".$today."'))";
        }
        if ( $filter['stock_warning'] )
        {
            $where .= " AND goods_number <= warn_number ";
        }
        if ( $filter['brand_id'] )
        {
            $where .= " AND brand_id='{$filter['brand_id']}'";
        }
        if ( $filter['supplier_status'] != "" )
        {
            $where .= " AND supplier_status='{$filter['supplier_status']}'";
        }
        if ( $filter['extension_code'] )
        {
            $where .= " AND extension_code='{$filter['extension_code']}'";
        }
        if ( $filter['city'] )
        {
            $where .= " AND dig.city='{$filter['city']}'";
        }
        if ( $filter['county'] )
        {
            $where .= " AND dig.county='{$filter['county']}'";
        }
        if ( $filter['district_id'] )
        {
            $where .= " AND dig.district_id={$filter['district_id']}";
        }
        if ( !empty( $filter['keyword'] ) )
        {
            $where .= " AND (goods_sn LIKE '%".mysql_like_quote( $filter['keyword'] )."%' OR goods_name LIKE '%".mysql_like_quote( $filter['keyword'] )."%')";
        }
        if ( - 1 < $real_goods )
        {
            $where .= " AND is_real='{$real_goods}'";
        }

        if ( $filter['is_on_sale'] !== "" )
        {
            $where .= " AND (is_on_sale = '".$filter['is_on_sale']."')";
        }
        if ( !empty( $filter['suppliers_id'] ) )
        {
            $where .= " AND (supplier_id = '".$filter['suppliers_id']."')";
        }
        $where .= $conditions;
        if ( !$real_goods && $filter['extension_code'] == "virtual_good" )
        {
            $sql = "SELECT COUNT(distinct(g.goods_id)) FROM ".$GLOBALS['ecs']->table( "goods" )." AS g,".$GLOBALS['ecs']->table( "supplier_goods_cat" )." as sgc, ".$GLOBALS['ecs']->table( "virtual_district" )." as dis, ".$GLOBALS['ecs']->table( "virtual_goods_district" )." as dig"." WHERE dis.supplier_id = ".$_SESSION['supplier_id']." AND sgc.goods_id=g.goods_id  and dis.goods_id = g.goods_id and dis.district_id = dig.district_id AND is_delete='{$is_delete}' AND sgc.supplier_id='".$_SESSION['supplier_id']."' {$where}";
        }
        else
        {
            $sql = "SELECT COUNT(distinct(g.goods_id)) FROM ".$GLOBALS['ecs']->table( "goods" )." AS g,".$GLOBALS['ecs']->table( "supplier_goods_cat" )." as sgc WHERE sgc.goods_id=g.goods_id AND is_delete='{$is_delete}' AND sgc.supplier_id='".$_SESSION['supplier_id']."' {$where}";
        }
        $filter['record_count'] = $GLOBALS['db']->getOne( $sql );
        $filter = page_and_size( $filter );
        if ( !$real_goods && $filter['extension_code'] == "virtual_good" )
        {
            $sql = "SELECT distinct(g.goods_id), goods_name, goods_type, goods_sn, shop_price, is_on_sale, is_best, is_new, is_hot, sort_order,supplier_status, goods_number,exclusive, integral, "." (promote_price > 0 AND promote_start_date <= '{$today}' AND promote_end_date >= '{$today}') AS is_promote "." FROM ".$GLOBALS['ecs']->table( "goods" )." AS g,".$GLOBALS['ecs']->table( "supplier_goods_cat" )." as sgc,".$GLOBALS['ecs']->table( "virtual_district" )." as dis, ".$GLOBALS['ecs']->table( "virtual_goods_district" )." as dig"." WHERE dis.supplier_id = ".$_SESSION['supplier_id']." AND sgc.goods_id=g.goods_id and dis.goods_id = g.goods_id and dis.district_id = dig.district_id  AND is_delete='{$is_delete}' AND sgc.supplier_id='".$_SESSION['supplier_id']."' {$where}"." ORDER BY {$filter['sort_by']} {$filter['sort_order']} "." LIMIT ".$filter['start'].",{$filter['page_size']}";
        }
        else
        {
            $sql = "SELECT distinct(g.goods_id), goods_name, goods_type, goods_sn, shop_price, is_on_sale, is_best, is_new, is_hot, sort_order,supplier_status, goods_number,exclusive, integral, "." (promote_price > 0 AND promote_start_date <= '{$today}' AND promote_end_date >= '{$today}') AS is_promote "." FROM ".$GLOBALS['ecs']->table( "goods" )." AS g,".$GLOBALS['ecs']->table( "supplier_goods_cat" )." as sgc WHERE sgc.goods_id=g.goods_id AND is_delete='{$is_delete}' AND sgc.supplier_id='".$_SESSION['supplier_id']."' {$where}"." ORDER BY {$filter['sort_by']} {$filter['sort_order']} "." LIMIT ".$filter['start'].",{$filter['page_size']}";
        }
        $filter['keyword'] = stripslashes( $filter['keyword'] );
        set_filter( $filter, $sql, $param_str );
    }
    else
    {

        $sql = $result['sql'];
        $filter = $result['filter'];
        //$sql = $GLOBALS;
        //$filter = $GLOBALS['db']->getOne( $sql );
    }

    $row = $GLOBALS['db']->getAll( $sql );
    foreach ( $row as $k => $v )
    {
        $sql = "select d.district_id,v.district_name from ".$GLOBALS['ecs']->table( "virtual_district" )." as d \r\n            left join ".$GLOBALS['ecs']->table( "goods" )." as g on  d.goods_id = g.goods_id\r\n            left join ".$GLOBALS['ecs']->table( "virtual_goods_district" )." as v on v.district_id = d.district_id\r\n            where d.goods_id = '{$v['goods_id']}' and d.supplier_id=".$_SESSION['supplier_id'];
        $res = $GLOBALS['db']->getAll( $sql );;
        $str = "";
        foreach ( $res as $key => $value )
        {
            $str = $str.$value['district_name'].",";
        }
        $row[$k]['district'] = substr( $str, 0, strlen( $str ) - 1 );
    }
    return array( "goods" => $row, "filter" => $filter, "page_count" => $filter['page_count'], "record_count" => $filter['record_count'] );
}

function check_goods_product_exist( $goods_id, $conditions = "" )
{
    if ( empty( $goods_id ) )
    {
        return - 1;
    }
    $sql = "SELECT goods_id  FROM ".$GLOBALS['ecs']->table( "products" )."  WHERE goods_id = '{$goods_id}'".$conditions." LIMIT 0, 1";
    $result = $GLOBALS['db']->getRow( $sql );
    if ( empty( $result ) )
    {
        return 0;
    }
    return 1;
}

function product_number_count( $goods_id, $conditions = "" )
{
    if ( empty( $goods_id ) )
    {
        return - 1;
    }
    $sql = "SELECT SUM(product_number) FROM ".$GLOBALS['ecs']->table( "products" )." WHERE goods_id = '{$goods_id}'".$conditions;
    $nums = $GLOBALS['db']->getOne($sql);
    $nums = empty( $nums ) ? 0 : $nums;
    return $nums;
}

function product_goods_attr_list( $goods_id )
{
    if ( empty( $goods_id ) )
    {
        return array( );
    }
    $sql = "SELECT goods_attr_id, attr_value FROM ".$GLOBALS['ecs']->table( "goods_attr" )." WHERE goods_id = '{$goods_id}'";
    $return_arr = array();
    $results = $GLOBALS['db']->getAll( $sql );

    foreach ( $results as $value )
    {
        $return_arr[$value['goods_attr_id']] = $value['attr_value'];
    }
    return $return_arr;
}

function get_goods_specifications_list( $goods_id )
{
    if ( empty( $goods_id ) )
    {
        return array( );
    }
    $sql = "SELECT g.goods_attr_id, g.attr_value, g.attr_id, a.attr_name FROM ".$GLOBALS['ecs']->table( "goods_attr" )." AS g LEFT JOIN ".$GLOBALS['ecs']->table( "attribute" )." AS a  ON a.attr_id = g.attr_id WHERE goods_id = '{$goods_id}' AND a.attr_type = 1 ORDER BY g.attr_id ASC";
    $results = $GLOBALS['db']->getAll( $sql );
    return $results;
}

function product_list( $goods_id, $conditions = "" )
{
    $param_str = "-".$goods_id;
    $result = get_filter( $param_str );
    if ( $result === false )
    {
        $day = getdate();
        $today = local_mktime(23, 59, 59, $day['mon'], $day['mday'], $day['year']);

        $filter['goods_id'] = $goods_id;
        $filter['keyword'] = empty( $_REQUEST['keyword'] ) ? "" : trim( $_REQUEST['keyword'] );
        $filter['stock_warning'] = empty( $_REQUEST['stock_warning'] ) ? 0 : intval( $_REQUEST['stock_warning'] );
        if ( isset( $_REQUEST['is_ajax'] ) && $_REQUEST['is_ajax'] == 1 )
        {
            $filter['keyword'] = json_str_iconv( $filter['keyword'] );
        }
        $filter['sort_by'] = empty( $_REQUEST['sort_by'] ) ? "product_id" : trim( $_REQUEST['sort_by'] );
        $filter['sort_order'] = empty( $_REQUEST['sort_order'] ) ? "DESC" : trim( $_REQUEST['sort_order'] );
        $filter['extension_code'] = empty( $_REQUEST['extension_code'] ) ? "" : trim( $_REQUEST['extension_code'] );
        $filter['page_count'] = isset( $filter['page_count'] ) ? $filter['page_count'] : 1;
        $where = "";
        if ( $filter['stock_warning'] )
        {
            $where .= " AND goods_number <= warn_number ";
        }
        if ( !empty( $filter['keyword'] ) )
        {
            $where .= " AND (product_sn LIKE '%".$filter['keyword']."%')";
        }
        $where .= $conditions;

        $sql = "SELECT COUNT(*) FROM ".$GLOBALS['ecs']->table( "products" )." AS p WHERE goods_id = {$goods_id} {$where}";
        $filter['record_count'] = $GLOBALS['db']->getOne( $sql );
        $sql = "SELECT product_id, goods_id, goods_attr, product_sn, product_number FROM ".$GLOBALS['ecs']->table( "products" )." AS g  WHERE goods_id = {$goods_id} {$where} ORDER BY {$filter['sort_by']} {$filter['sort_order']}";
        $filter['keyword'] = stripslashes( $filter['keyword'] );
    }
    else
    {
        $sql = $result['sql'];;
        $filter = $result['filter'];
    }

    $row = $GLOBALS['db']->getAll( $sql );
    $goods_attr = product_goods_attr_list( $goods_id );
    foreach ( $row as $key => $value )
    {
        $_goods_attr_array = explode( '|', $value['goods_attr'] );
        if ( is_array( $_goods_attr_array ) )
        {
            $_temp = "";
            foreach ( $_goods_attr_array as $_goods_attr_value )
            {
                $_temp[] = $goods_attr[$_goods_attr_value];
            }
            $row[$key]['goods_attr'] = $_temp;
        }
    }
    return array( "product" => $row, "filter" => $filter, "page_count" => $filter['page_count'], "record_count" => $filter['record_count'] );
}

function get_product_info( $product_id, $filed = "" )
{
    $return_array = array( );
    if ( empty( $product_id ) )
    {
        return $return_array;
    }
    $filed =  trim($filed);
    if ( empty( $filed ) )
    {
        $filed = "*";
    }
    $sql = "SELECT {$filed} FROM  ".$GLOBALS['ecs']->table( "products" )." WHERE product_id = '{$product_id}'";
    $return_array = $GLOBALS['db']->getRow( $sql );
    return $return_array;
}

function check_goods_specifications_exist( $goods_id )
{
    $goods_id = intval( $goods_id );
    $sql = "SELECT COUNT(a.attr_id) FROM ".$GLOBALS['ecs']->table( "attribute" )." AS a, ".$GLOBALS['ecs']->table( "goods" )." AS g WHERE a.cat_id = g.goods_type AND g.goods_id = '{$goods_id}'";
    $count = $GLOBALS['db']->getOne( $sql );
    if ( 0 < $count )
    {
        return true;
    }
    return false;
}

function check_goods_attr_exist( $goods_attr, $goods_id, $product_id = 0 )
{
    $goods_id = intval( $goods_id );
    if ( strlen( $goods_attr ) == 0 || empty( $goods_id ) )
    {
        return true;
    }
    if ( empty( $product_id ) )
    {
        $sql = "SELECT product_id FROM ".$GLOBALS['ecs']->table( "products" )." WHERE goods_attr = '{$goods_attr}' AND goods_id = '{$goods_id}'";
    }
    else
    {
        $sql = "SELECT product_id FROM ".$GLOBALS['ecs']->table( "products" )." WHERE goods_attr = '{$goods_attr}' AND goods_id = '{$goods_id}' AND product_id <> '{$product_id}'";
    }

    $res = $GLOBALS['db']->getOne( $sql );
    if ( empty( $res ) )
    {
        return false;
    }
    return true;
}

function check_product_sn_exist( $product_sn, $product_id = 0 )
{

    $product_sn = trim( $product_sn );
    $product_id = intval( $product_id );
    if ( strlen( $product_sn ) == 0 )
    {
        return true;
    }
    $sql = "SELECT goods_id FROM ".$GLOBALS['ecs']->table( "goods" )."WHERE goods_sn='{$product_sn}'";
    if ( $GLOBALS['db']->getOne( $sql ) )
    {
        return true;
    }
    if ( empty( $product_id ) )
    {
        $sql = "SELECT product_id FROM ".$GLOBALS['ecs']->table( "products" )." WHERE product_sn = '{$product_sn}'";
    }
    else
    {
        $sql = "SELECT product_id FROM ".$GLOBALS['ecs']->table( "products" )." WHERE product_sn = '{$product_sn}' AND product_id <> '{$product_id}'";
    }
    $res = $GLOBALS['db']->getOne($sql);
    if ( empty( $res ) )
    {
        return false;
    }
    return true;
}
/**
 * 格式化商品图片名称（按目录存储）
 *
 */
function reformat_image_name($type, $goods_id, $source_img, $position='')
{
    $rand_name = gmtime() . sprintf("%03d", mt_rand(1,999));
    $img_ext = substr($source_img, strrpos($source_img, '.'));
    $dir = 'images';
    if (defined('IMAGE_DIR'))
    {
        $dir = IMAGE_DIR;
    }
    $sub_dir = date('Ym', gmtime());
    if (!make_dir(ROOT_PATH.$dir.'/'.$sub_dir))
    {
        return false;
    }
    if (!make_dir(ROOT_PATH.$dir.'/'.$sub_dir.'/source_img'))
    {
        return false;
    }
    if (!make_dir(ROOT_PATH.$dir.'/'.$sub_dir.'/goods_img'))
    {
        return false;
    }
    if (!make_dir(ROOT_PATH.$dir.'/'.$sub_dir.'/thumb_img'))
    {
        return false;
    }
    switch($type)
    {
        case 'goods':
            $img_name = $goods_id . '_G_' . $rand_name;
            break;
        case 'goods_thumb':
            $img_name = $goods_id . '_thumb_G_' . $rand_name;
            break;
        case 'gallery':
            $img_name = $goods_id . '_P_' . $rand_name;
            break;
        case 'gallery_thumb':
            $img_name = $goods_id . '_thumb_P_' . $rand_name;
            break;
    }
    if ($position == 'source')
    {
        if (move_image_file(ROOT_PATH.$source_img, ROOT_PATH.$dir.'/'.$sub_dir.'/source_img/'.$img_name.$img_ext))
        {
            return $dir.'/'.$sub_dir.'/source_img/'.$img_name.$img_ext;
        }
    }
    elseif ($position == 'thumb')
    {
        if (move_image_file(ROOT_PATH.$source_img, ROOT_PATH.$dir.'/'.$sub_dir.'/thumb_img/'.$img_name.$img_ext))
        {
            return $dir.'/'.$sub_dir.'/thumb_img/'.$img_name.$img_ext;
        }
    }
    else
    {
        if (move_image_file(ROOT_PATH.$source_img, ROOT_PATH.$dir.'/'.$sub_dir.'/goods_img/'.$img_name.$img_ext))
        {
            return $dir.'/'.$sub_dir.'/goods_img/'.$img_name.$img_ext;
        }
    }
    return false;
}

function reformat_image_name_old( $type, $goods_id, $source_img, $position = "" )
{
    $rand_name = gmtime( ).sprintf( "%03d", mt_rand( 1, 999 ) );
    $img_ext = substr( $source_img, strrpos( $source_img, '.' ) );
    $dir = "images";
    if ( defined( "IMAGE_DIR" ) )
    {
        $dir = IMAGE_DIR;
    }

    $sub_dir = date( 'Ym', gmtime() );
    if ( !make_dir( ROOT_PATH.$dir."/".$sub_dir ) )
    {
        return false;
    }
    if ( !make_dir( ROOT_PATH.$dir."/".$sub_dir."/source_img" ) )
    {
        return false;
    }
    if ( !make_dir( ROOT_PATH.$dir."/".$sub_dir."/goods_img" ) )
    {
        return false;
    }
    if ( !make_dir( ROOT_PATH.$dir."/".$sub_dir."/thumb_img" ) )
    {
        return false;
    }
    switch ( $type )
    {
        case "goods" :
            $img_name = $goods_id."_G_".$rand_name;
            break;
        case "goods_thumb" :
            $img_name = $goods_id."_thumb_G_".$rand_name;
            break;
        case "gallery" :
            $img_name = $goods_id."_P_".$rand_name;
            break;
        case "gallery_thumb" :
            $img_name = $goods_id."_thumb_P_".$rand_name;
    }
    if ( $position == "source" )
    {
        if ( move_image_file( ROOT_PATH.$source_img, ROOT_PATH.$dir."/".$sub_dir."/source_img/".$img_name.$img_ext ) )
        {
            return $dir."/".$sub_dir."/source_img/".$img_name.$img_ext;
        }
    }
    if ( $position == "thumb" )
    {
        return $dir."/".$sub_dir."/thumb_img/".$img_name.$img_ext;
    }
    if ( move_image_file( ROOT_PATH.$source_img, ROOT_PATH.$dir."/".$sub_dir."/thumb_img/".$img_name.$img_ext ) && move_image_file( ROOT_PATH.$source_img, ROOT_PATH.$dir."/".$sub_dir."/goods_img/".$img_name.$img_ext ) )
    {
        return $dir."/".$sub_dir."/goods_img/".$img_name.$img_ext;
    }
    return false;
}

function move_image_file( $source, $dest )
{
    if ( @copy( @$source, @$dest ) )
    {
        @unlink( @$source );
        return true;
    }
    return false;
}

function spec_price( $spec )
{
    if ( !empty( $spec ) )
    {
        if ( is_array( $spec ) )
        {
            foreach ( $spec as $key => $val )
            {
                $spec[$key] = addslashes( $val );
            }
        }
        else
        {
            $spec = addslashes( $spec );
        }

        $where = db_create_in( $spec, 'goods_attr_id' );
        $sql = "SELECT SUM(attr_price) AS attr_price FROM ".$GLOBALS['ecs']->table( "goods_attr" )." WHERE {$where}";
        $price = floatval( $GLOBALS['db']->getOne( $sql ) );
    }
    else
    {
        $price = 294;
    }
    return $price;
}


?>
