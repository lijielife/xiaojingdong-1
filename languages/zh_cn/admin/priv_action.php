<?php

/**
 * ECSHOP 权限名称语言文件
 * ============================================================================
 * 版权所有 2005-2011 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: priv_action.php 17217 2011-01-19 06:29:08Z liubo $
 */
/* 权限管理的一级分组 */
$_LANG['goods'] = '商品管理';
$_LANG['cms_manage'] = '文章管理';
$_LANG['users_manage'] = '会员管理';
$_LANG['priv_manage'] = '权限管理';
$_LANG['sys_manage'] = '系统设置';
$_LANG['order_manage'] = '订单管理';
$_LANG['promotion'] = '促销管理';
$_LANG['email'] = '邮件管理';
$_LANG['templates_manage'] = '模板管理';
$_LANG['db_manage'] = '数据库管理';
$_LANG['sms_manage'] = '短信管理';
$_LANG['pickup_point'] = '自提点管理';
$_LANG['chat_manage'] = '即时通信管理';
/* 代码增加 By  www.68ecshop.com Start */
$_LANG['stats'] = '报表统计';
/* 代码增加 By  www.68ecshop.com End */

// 商品管理部分的权限
$_LANG['goods_manage'] = '商品添加/编辑';
$_LANG['remove_back'] = '商品删除/恢复';
$_LANG['cat_manage'] = '分类添加/编辑';
$_LANG['cat_drop'] = '分类转移/删除';
$_LANG['attr_manage'] = '商品属性管理';
$_LANG['brand_manage'] = '商品品牌管理';
$_LANG['comment_priv'] = '用户评论管理';
$_LANG['order_comment_priv'] = '订单评论管理'; // 代码增加 订单评论
$_LANG['goods_type'] = '商品类型';
$_LANG['tag_manage'] = '标签管理';
$_LANG['goods_auto'] = '商品自动上下架';
$_LANG['topic_manage'] = '专题管理';
/* 代码删除 By  www.68ecshop.com Start */
//$_LANG['virualcard'] = '虚拟卡管理';
/* 代码删除 By  www.68ecshop.com End */
$_LANG['picture_batch'] = '图片批量处理';
$_LANG['goods_export'] = '商品批量导出';
$_LANG['goods_batch'] = '商品批量上传/修改';
$_LANG['gen_goods_script'] = '生成商品代码';
$_LANG['suppliers_goods'] = '供货商商品管理';
$_LANG['question_manage'] = '用户咨询';
$_LANG['shaidan_manage'] = '用户晒单';
$_LANG['scan_store'] = '出入库管理';

// 文章管理部分的权限
$_LANG['article_cat'] = '文章分类管理';
$_LANG['article_manage'] = '文章内容管理';
$_LANG['shopinfo_manage'] = '网店信息管理';
$_LANG['shophelp_manage'] = '网店帮助管理';
$_LANG['vote_priv'] = '在线调查管理';
$_LANG['article_auto'] = '文章自动发布';

// 会员信息管理
$_LANG['integrate_users'] = '会员数据整合';
$_LANG['sync_users'] = '同步会员数据';
$_LANG['users_manages'] = '会员添加/编辑';
$_LANG['users_drop'] = '会员删除';
$_LANG['user_rank'] = '会员等级管理';
$_LANG['feedback_priv'] = '会员留言管理';
$_LANG['surplus_manage'] = '会员余额管理';
$_LANG['account_manage'] = '会员账户管理';

// 权限管理部分的权限
$_LANG['admin_manage'] = '管理员添加/编辑';
$_LANG['admin_drop'] = '删除管理员';
$_LANG['allot_priv'] = '分派权限';
$_LANG['logs_manage'] = '管理日志列表';
$_LANG['logs_drop'] = '删除管理日志';
$_LANG['template_manage'] = '模板管理';
$_LANG['agency_manage'] = '办事处管理';
$_LANG['suppliers_manage'] = '供货商管理';
$_LANG['role_manage'] = '角色管理';

// 系统设置部分权限
$_LANG['shop_config'] = '商店设置';
$_LANG['webcollect_manage'] = '网罗天下管理';
$_LANG['ship_manage'] = '配送方式管理';
$_LANG['payment'] = '支付方式管理';
$_LANG['shiparea_manage'] = '配送区域管理';
$_LANG['area_manage'] = '地区列表管理';
$_LANG['friendlink'] = '友情链接管理';
$_LANG['db_backup'] = '数据库备份';
$_LANG['db_renew'] = '数据库恢复';
$_LANG['flash_manage'] = '首页主广告管理'; // Flash 播放器管理
$_LANG['navigator'] = '自定义导航栏';
$_LANG['cron'] = '计划任务';
$_LANG['affiliate'] = '推荐设置';
$_LANG['affiliate_ck'] = '分成管理';
$_LANG['sitemap'] = '站点地图管理';
$_LANG['file_check'] = '文件校验';
$_LANG['file_priv'] = '文件权限检验';
$_LANG['reg_fields'] = '会员注册项管理';
$_LANG['website_login'] = '合作登录管理';

// 订单管理部分权限
$_LANG['order_os_edit'] = '编辑订单状态';
$_LANG['order_ps_edit'] = '编辑付款状态';
$_LANG['order_ss_edit'] = '编辑发货状态';
$_LANG['order_edit'] = '添加编辑订单';
$_LANG['order_view'] = '查看未完成订单';
$_LANG['order_view_finished'] = '查看已完成订单';
$_LANG['order_rebate'] = '计算订单佣金';
$_LANG['repay_manage'] = '退款申请管理';
$_LANG['booking'] = '缺货登记管理';
$_LANG['sale_order_stats'] = '订单销售统计';
$_LANG['client_flow_stats'] = '客户流量统计';
$_LANG['delivery_view'] = '查看发货单';
$_LANG['back_view'] = '查看退货单';
/* 增值税发票_添加_START_www.68ecshop.com */
$_LANG['invoice_manage'] = '发票管理';
/* 增值税发票_添加_END_www.68ecshop.com */

// 促销管理
/* 代码删除 By  www.68ecshop.com Start */
//$_LANG['snatch_manage'] = '夺宝奇兵';
/* 代码删除 By  www.68ecshop.com End */
$_LANG['bonus_manage'] = '红包管理';
/* 代码删除 By  www.68ecshop.com Start */
//$_LANG['card_manage'] = '祝福贺卡';
//$_LANG['pack'] = '商品包装';
/* 代码删除 By  www.68ecshop.com End */
$_LANG['ad_manage'] = '广告管理';
$_LANG['gift_manage'] = '赠品管理';
$_LANG['auction'] = '拍卖活动';
/* 代码删除 By  www.68ecshop.com Start */
//$_LANG['group_by'] = '拼团活动';
/* 代码删除 By  www.68ecshop.com End */
$_LANG['favourable'] = '优惠活动';
$_LANG['whole_sale'] = '批发管理';
$_LANG['package_manage'] = '超值礼包';
$_LANG['exchange_goods'] = '积分商城商品';
$_LANG['pre_sale'] = '预售管理';

// 邮件管理
$_LANG['attention_list'] = '关注管理';
$_LANG['email_list'] = '邮件订阅管理';
$_LANG['magazine_list'] = '杂志管理';
$_LANG['view_sendlist'] = '邮件队列管理';
$_LANG['send_mail'] = '发送邮件管理';

// 模板管理
$_LANG['template_select'] = '模板选择';
$_LANG['template_setup'] = '模板设置';
$_LANG['library_manage'] = '库项目管理';
$_LANG['lang_edit'] = '语言项编辑';
$_LANG['backup_setting'] = '模板设置备份';
$_LANG['mail_template'] = '邮件模板管理';

// 数据库管理
$_LANG['db_backup'] = '数据备份';
$_LANG['db_renew'] = '数据恢复';
$_LANG['db_optimize'] = '数据表优化';
$_LANG['sql_query'] = 'SQL查询';

// 短信管理
$_LANG['my_info'] = '账号信息';
$_LANG['sms_send'] = '发送短信';
$_LANG['sms_charge'] = '短信充值';
$_LANG['send_history'] = '发送记录';
$_LANG['charge_history'] = '充值记录 ';

// 微信管理
$_LANG['weixin_manage'] = '微信模块';
$_LANG['weixin_config'] = '微信设置';
$_LANG['weixin_addconfig'] = '多微信设置';
$_LANG['weixin_menu'] = '自定义菜单';
$_LANG['weixin_notice'] = '提醒设置';
$_LANG['weixin_keywords'] = '功能变量';
$_LANG['weixin_fans'] = '粉丝管理';
$_LANG['weixin_news'] = '消息推送';
$_LANG['weixin_addqcode'] = '生成二维码';
$_LANG['weixin_qcode'] = '管理二维码';
$_LANG['weixin_reg'] = '注册管理';
// 活动管理
$_LANG['weixin_act'] = '活动管理';
$_LANG['weixin_award'] = '中奖管理';
$_LANG['weixin_oauth'] = 'OAuth设置';
$_LANG['weixin_qiandao'] = '签到设置';
$_LANG['weixin_addkey'] = '关键字回复';

// 自提点管理部分的权限
$_LANG['pickup_point_manage'] = '自提点添加/编辑';
$_LANG['pickup_point_batch'] = '自提点批量上传';

// 即时通信管理部分的权限
$_LANG['chat'] = '即时通信';
$_LANG['chat_settings'] = '聊天服务器设置';
$_LANG['customer'] = '客服管理';
$_LANG['third_customer'] = '第三方客服';
//虚拟团购
$_LANG['virtual'] = '虚拟团购';

/* 代码增加 By  www.68ecshop.com Start */
// 报表统计
$_LANG['industry_stats'] = '行业分析';
$_LANG['users_stats'] = '会员统计';
$_LANG['shops_stats'] = '店铺统计';
$_LANG['orders_stats'] = '订单统计';
$_LANG['goods_stats'] = '商品分析';
$_LANG['sells_stats'] = '销售报告';
$_LANG['after_sells_stats'] = '售后统计';
$_LANG['client_keyword_stats'] = '客户搜索记录';
$_LANG['client_flow_stats'] = '客户统计';
/* 代码增加 By  www.68ecshop.com End */
?>