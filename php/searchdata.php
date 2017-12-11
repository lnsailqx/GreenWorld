<?php
 @header('Content-Type:text/html;charset=utf-8');

include "db_connect.php";


date_default_timezone_set($timezone); //北京时间
  $Num=$_GET['result'];
  $type=$_GET['type'];



  
 	$sql="SELECT a.imgloc,a.title,a.topicid,b.username FROM bbs_topic as a LEFT JOIN bbs_user as b  ON a.userid=b.userid WHERE a.type='$type' order by a.createtime DESC LIMIT $Num, 10";
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