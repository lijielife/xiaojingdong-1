<?php
/**
* 酒店 搜索程序
*/

define('IN_ECS', true);
define('_SP_', chr(0xFF).chr(0xFE));
define('UCS2', 'ucs-2be');


define('IN_ECS', true);
define('_SP_', chr(0xFF).chr(0xFE));
define('UCS2', 'ucs-2be');


require(dirname(__FILE__) . '/includes/init.php');


$smarty->template_dir   = ROOT_PATH . 'themes/elong';
//assign_dynamic('elong/search.html');
$smarty->display('search.html');

?>