<?php
@header('Content-Type:text/html;charset=utf-8');
// error_reporting(NULL);ini_set('display_errors','Off');
session_start();
$username = $_POST["username"];
$password = md5($_POST["password"]);
$vaild= $_POST["vaild"];

if($vaild==$_SESSION['authnum_session']){
	include "db_connect.php";

$sql = "SELECT username FROM bbs_user WHERE username='$username'";
$query = mysql_query($sql);
$row = mysql_fetch_assoc($query);
if (mysql_affected_rows() == 0) {
	$insert = "INSERT INTO bbs_user (username,password) VALUES('$username','$password')";
	$result = mysql_query($insert);
	if ($result == true) {
		echo $username;
		$sql1 = "SELECT username,userid FROM bbs_user WHERE username='$username'";
		$query1 = mysql_query($sql1);
		$row1 = mysql_fetch_assoc($query1);
		$_SESSION['username'] = $row1['username'];
		$_SESSION['id'] = $row1['userid'];
	}
} else {
	echo "已经有该账户";
	echo mysql_error();
}
mysql_close($link);
}else{
	echo "验证码输入有误";
}

?>