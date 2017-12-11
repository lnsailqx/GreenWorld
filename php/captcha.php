<?php
session_start();
require 'ValidateCode.class.php';  //图片生成类路径
$_vc = new ValidateCode();		
$_vc->doimg();		
$_SESSION['authnum_session'] = $_vc->getCode();//验证码保存到SESSION中
echo $_SESSION['authnum_session'];
?>