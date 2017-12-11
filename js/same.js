function underline(index){
	var lead=$(".lead")[index||0],
		left=lead.offsetLeft,
		width=lead.offsetWidth;
	$("#underline").css({
		left:left,
		width:width
	});
	$(".lead").mouseover(function(){
		$("#underline").stop().animate({
			left:this.offsetLeft,
			width:this.offsetWidth
		},1500,"elasticout");
	}).mouseout(function(){
		$("#underline").stop().animate({
			left:left,
			width:width
		},1500,"elasticout");
	});
}

function hasLogin(fn1,fn2){
	$.ajax({
		url:"../php/getSession.php",
		success:function(data){
			if(data=="未登陆"){
				fn1();
			}else{
				fn2($.parseJSON(data));
			}
		}
	});
}

function logregis(){
	$(".close").mouseover(function(){
		$(this).stop().animate({opacity:0.8});
	}).mouseout(function(){
		$(this).stop().animate({opacity:0.2});
	});
	$("#vaild").click(function(){
		this.src="../php/captcha.php?id="+Math.random();
	});
	$(".login").click(function(){
		$(".boxlogin").css("display","block");
		$(".shuru").value("");
		console.log($("#username"));
		$("#username").focus();
		$("#name").innerHTML(this.innerHTML);
		$("#validate").value(this.innerHTML);
		$(".back").animate({
			opacity:0.2
		}).add($(".loginbox").animate({
			opacity:1,
			marginTop:0
		})).css("display","block");
		window.onkeydown=function(e){
			e=e||window.event;
			var keycode=e.keycode||e.which;
			if(keycode==13){
				$("#validate")[0].click();
			}
		}
	});
	$(".boxclose").click(function(){
		$(".boxlogin").animate({
			opacity:0
		},function(){
			if($(".loginbox").index(this)>=0){
				$(".boxlogin").css("display","none");
				$(this).css("marginTop",-200);
			}
		});
		window.onkeydown="";
	});
	$("#validate").click(function(){
		var username=$("#username").value(),
			password=$("#password").value(),
			vaild=$("#value").value(),
			exp=/^\w+$/;
		if(username==""){
			alert("用户名为空，请输入用户名");
			$("#username").focus();
			return;
		}else if(password==""){
			alert("密码为空，请输入密码");
			$("#password").focus();
			return;
		}else if(vaild==""){
			alert("验证码为空，请输入验证码");
			$("#value").focus();
			return;
		}else if(!exp.test(username)){
			alert("用户名输入格式有误，请重新输入");
			$("#username").select();
			return;
		}else if(!exp.test(password)){
			alert("密码输入格式有误，请重新输入");
			$("#password").select();
			return;
		}else if(!exp.test(vaild)){
			alert("验证码输入格式有误，请重新输入");
			$("#value").select();
			return;
		}
		if(this.value=="登录"){
			var url="../php/login.php";
		}else{
			var url="../php/register.php";
		}
		$.ajax({
			method:"post",
			url:url,
			data:{
				username:username,
				password:password,
				vaild:vaild
			},
			success:function(data){
				if(data=="验证码输入有误"){
					alert(data);
					$("#vaild")[0].click();
					$("#value").focus().select();
				}else if(!exp.test(data)){
					alert(data);
					$(".shuru").value("");
					$("#username").focus();
				}else{
					alert("用户"+data+$("#validate").value()+"成功");
					location=location;
				}
			}
		});
	});
}

function user(data){
	window.username=username=data.username;
	$("#login").innerHTML(username).click(function(){
		location="personal.html";
	});
	$("#register").innerHTML("注销").click(function(){
		$.ajax({
			url:"../php/logout.php",
			success:function(){
				alert("注销登录");
				location=location;
			}
		});
	});
}

function data(fn){
	fn.call($.htmlDATA());
}
