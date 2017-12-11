<?php
 @header('Content-Type:text/html;charset=utf-8');
 session_start();

include "db_connect.php";
date_default_timezone_set($timezone);
$topicid=$_GET['topicid'];
if(isset($_SESSION['id'])){
	$userid=$_SESSION['id'];
	$sql="select * from bbs_goodcount where topicid='$topicid' and userid='$userid'";
	$sql=mysql_query($sql);
	if(mysql_affected_rows()==0){
		echo 'false';
	}else{
		echo 'true';
	}
}else{
	echo 'false';
}

?>