<?php
 @header('Content-Type:text/html;charset=utf-8');

include "db_connect.php";


date_default_timezone_set($timezone); //北京时间
  $topicid=$_GET['topicid'];



  
 	$sql="SELECT a.*,b.username FROM bbs_topic as a LEFT JOIN bbs_user as b  ON a.userid=b.userid WHERE a.topicid='$topicid' ";
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