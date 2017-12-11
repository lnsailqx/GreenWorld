<?php
 @header('Content-Type:text/html;charset=utf-8');

session_start();
include "db_connect.php";
if(isset($_SESSION['id'])){
 $userid=$_SESSION['id'];
 $content=$_POST['content'];
 $topicid=$_POST['topicid'];

 $insert="INSERT INTO bbs_reply (topicid,content,userid) VALUES('$topicid','$content','$userid')";
$result=mysql_query($insert);
  if ($result==true) {
  	echo "success";
  	$sql1="UPDATE article SET replycount=replycount+1 WHERE topicid='$topicid'";
	$query1=mysql_query($sql1);
  }
}
else{
	echo "nologin";
}
?>