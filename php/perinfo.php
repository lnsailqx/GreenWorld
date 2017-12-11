<?php
 @header('Content-Type:text/html;charset=utf-8');

include "db_connect.php";

session_start();
date_default_timezone_set($timezone); //北京时间
$Num=$_GET['result'];
$userid=$_SESSION['id'];



  
 	$sql="SELECT a.imgloc,a.title,a.topicid FROM bbs_topic as a LEFT JOIN bbs_user as b  ON a.userid=b.userid WHERE a.userid='$userid' order by a.createtime DESC LIMIT $Num,10";
	$query=mysql_query($sql);
	$json = "";
	while ($row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json .= urldecode(json_encode($row)).',';
	}


	echo '['.substr($json, 0, strlen($json)-1).']';  
?>