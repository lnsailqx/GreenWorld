<?php
@header('Content-Type:text/html;charset=utf-8');
session_start();
include "db_connect.php";
$topicid=$_POST["topicid"];
if(isset($_SESSION['id'])){
	$userid=$_SESSION['id'];
	$sql = "SELECT * FROM bbs_goodcount WHERE userid='$userid' AND topicid='$topicid'";
	$query = mysql_query($sql);
	$row = mysql_fetch_assoc($query);
	if(mysql_affected_rows()==0){
		$sql1="UPDATE bbs_topic SET goodcount=goodcount+1 WHERE topicid='$topicid'";
		$query1=mysql_query($sql1);
		$sql2="SELECT goodcount FROM bbs_topic WHERE topicid='$topicid'";
    	$query2=mysql_query($sql2);
    	$row2=mysql_fetch_assoc($query2);
    	echo $row2['goodcount'];
    	$sql3="INSERT INTO bbs_goodcount (userid,topicid) VALUES('$userid','$topicid')";
    	$query3=mysql_query($sql3);
	}else{
	$sql4="DELETE FROM bbs_goodcount WHERE userid='$userid' AND topicid='$topicid'";
	$query4=mysql_query($sql4);
	$sql6="UPDATE bbs_topic SET goodcount=goodcount-1 WHERE topicid='$topicid'";
	$query6=mysql_query($sql6);
	$sql5="SELECT goodcount FROM bbs_topic WHERE topicid='$topicid'";
    $query5=mysql_query($sql5);
    $row5=mysql_fetch_assoc($query5);
    echo $row5['goodcount'];
}
}
?>