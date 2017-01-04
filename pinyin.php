<?php
/**
 * Created by PhpStorm.
 * User: ry
 * Date: 17/1/2
 * Time: 上午10:32
 */


//include_once('vendor/overtrue/pinyin/autoload.php');
//include_once('includes/pinyin/src/FileDictLoader.php');
//include_once('includes/pinyin/src/DictLoaderInterface.php');
//include_once('includes/pinyin/src/GeneratorFileDictLoader.php');
//include_once('includes/pinyin/src/MemoryFileDictLoader.php');
//require 'vendor/autoload.php';

include_once('includes/vendor/autoload.php');

use Overtrue\Pinyin\Pinyin;

$pinyin = new Pinyin();


//$d = $pinyin->convert('带着希望去旅行，比到达终点更美好');
//print_r($d);


// ["dai", "zhe", "xi", "wang", "qu", "lu", "xing", "bi", "dao", "da", "zhong", "dian", "geng", "mei", "hao"]

//$pinyin->convert('带着希望去旅行，比到达终点更美好', PINYIN_UNICODE);
// ["dài","zhe","xī","wàng","qù","lǚ","xíng","bǐ","dào","dá","zhōng","diǎn","gèng","měi","hǎo"]

//$pinyin->convert('带着希望去旅行，比到达终点更美好', PINYIN_ASCII);

echo $pinyin->abbr('带着希望去旅行');
echo '<br>';

$d = $pinyin->sentence('带着希望去旅行');

$p = str_replace(' ','',$d);
echo $p;