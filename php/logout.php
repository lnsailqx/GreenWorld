<?php
	@header('Content-Type:text/html;charset=utf-8');
	error_reporting(NULL);
	ini_set('display_errors','Off');
	
	session_start();
	session_destroy();
	echo 'success';
?>