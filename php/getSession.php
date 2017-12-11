<?php
@header('Content-Type:text/html;charset=utf-8');
session_start();
if(isset($_SESSION['id'])){
	$id=$_SESSION['id'];
    include "db_connect.php";
    $sql="SELECT * FROM bbs_user WHERE userid='$id'";
	$query=mysql_query($sql);
	$json = "";

	while ($row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		
		foreach ($row as $key => $value) {
			$row[$key] = $value;
		}
		$json .= urldecode(json_encode($row)).',';
	}


	echo substr($json, 0, strlen($json)-1);
          
}else{
	echo "未登陆";
}
?>