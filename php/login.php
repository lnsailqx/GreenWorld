<?php
@header('Content-Type:text/html;charset=utf-8');
// error_reporting(NULL);ini_set('display_errors','Off');
if (isset($_SESSION['username'])) {
	//登陆后处理

} else {
	session_start();
	include "db_connect.php";
	$username = $_POST["username"];
	$password = md5($_POST["password"]);
	$validate = $_POST["vaild"];

	$sql = "SELECT * FROM bbs_user WHERE username='$username' AND password='$password'";

	$query = mysql_query($sql);
	$row = mysql_fetch_assoc($query);
}
if ($validate != $_SESSION["authnum_session"]) {
	//判断session值与用户输入的验证码是否一致;
	echo "验证码输入有误";
} else {
	if (mysql_affected_rows() == 1) {
		$_SESSION['username'] = $row['username'];
		$_SESSION['id'] = $row['userid'];
		echo $_SESSION['username'];
		//登陆时间
		$date1 = time();
		$date = date('Y-m-d-h-i-s', $date1);
		$update = "UPDATE bbs_user SET lastlogin = '{$date}' where username = '{$username}'";
		mysql_query($update);

	} else {
		echo "账号或密码有误";
	}
}

if (isset($_SESSION['username'])) {
	//登陆后处理

}

mysql_close($link);
