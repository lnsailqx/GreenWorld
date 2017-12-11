 <?php
 @header('Content-Type:text/html;charset=utf-8');
 include "db_connect.php";

 	$sql="SELECT * FROM bbs_user LIMIT 10";
	$query=mysql_query($sql);
	$json = "";
	//数组转化为JSON的过程
	while ($row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json .= urldecode(json_encode($row)).',';
	}

	// echo '['.substr( $json, 0,  strlen($json)-1 ).']';
	echo '['.substr($json, 0, strlen($json)-1).']';  
?>