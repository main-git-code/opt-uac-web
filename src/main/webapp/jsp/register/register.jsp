<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
<%@ include file="/inc/inc.jsp"%>
<title>注册</title>
<link href="${_base}/theme/baas/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/font-awesome.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/global.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/login-regsiter.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${_base}/theme/baas/js/jquery.toggle-password.js" ></script> 
<script type="text/javascript" src="${_base}/theme/baas/js/comp.js" ></script>

<script type="text/javascript">
 (function () {
	seajs.use('app/register/register', function (RegisterPager) {
		var pager = new RegisterPager();
		pager.render();
	});
})(); 

 $(function(){
	$('#password').togglePassword({
		el: '#togglePassword'
	});
}); 
//判断输入密码的类型  
function CharMode(iN){  
if (iN>=48 && iN <=57) //数字  
return 1;  
if (iN>=65 && iN <=90) //大写  
return 2;  
if (iN>=97 && iN <=122) //小写  
return 4;  
else  
return 8;   
}  
//bitTotal函数  
//计算密码模式  
function bitTotal(num){  
modes=0;  
for (i=0;i<4;i++){  
if (num & 1) modes++;  
num>>>=1;  
}  
return modes;  
}  
//返回强度级别  
function checkStrong(sPW){  
if (sPW.length<=8)  
return 0; //密码太短  
Modes=0;  
for (i=0;i<sPW.length;i++){  
//密码模式  
Modes|=CharMode(sPW.charCodeAt(i));  
}  
return bitTotal(Modes);  
}  
 
//显示颜色  
function pwStrength(pwd){  
O_color="#eeeeee";  
L_color="#FF0000";  
M_color="#FF9900";  
H_color="#33CC00";  
if (pwd==null||pwd==''){  
Lcolor=Mcolor=Hcolor=O_color;  
}  
else{  
S_level=checkStrong(pwd);  
switch(S_level) {  
case 0:  
Lcolor=Mcolor=Hcolor=O_color;  
case 1:  
Lcolor=L_color;  
Mcolor=Hcolor=O_color;  
break;  
case 2:  
Lcolor=Mcolor=M_color;  
Hcolor=O_color;  
break;  
default:  
Lcolor=Mcolor=Hcolor=H_color;  
}  
}  
document.getElementById("strength_L").style.background=Lcolor;  
document.getElementById("strength_M").style.background=Mcolor;  
document.getElementById("strength_H").style.background=Hcolor;  
return;  
}  
</script>
</head>

<body>

  <div class="login-header"><!--登录头部-->
     <div class="login-header-cnt">
       <div class="login-header-cnt-logo"><img src="${_base}/theme/baas/images/logo.png"></div>
       <div class="login-header-cnt-mail">账户注册</div>
       <div class="login-header-cnt-right">已有云计费账号？ <a href="${_base}/login">立即登录>></a></div>
       </div>
     
  </div>

   <div class="regsiter-wrapper" id="register-form">
        <div class="regsiter-wrapper-cnt">
	         <ul>
		         <li class="regsiter-title">账户注册</li>
		         <li class="user">
		         	<input type="text" name="phone" id="phone"class="int-xxlarge-user" placeholder="手机号码作为登录账号">
		         	
		         	<span class="regsiter-note" id="errorPhoneMsg">
		         		<i class="icon-caret-left"></i>
		         		<img src="${_base}/theme/baas/images/error.png"><span id="showPhoneMsg"></span>
		         	</span>
		         </li>
		         
		         <li class="password">
		         	<input type="password" name="password" id="password"class="int-xxlarge" placeholder="密码" onKeyUp=pwStrength(this.value) onBlur=pwStrength(this.value)>
		         	<i class="icon-eye-open" id="togglePassword"></i>
		         	<span class="regsiter-note" id="errorPawMsg">
		         		<i class="icon-caret-left"></i>
		         		<img src="${_base}/theme/baas/images/error.png"><span id="showPawMsg"></span>
		         	</span>
		         	<div class="regsiter-set-password">
				          <p class="low" id="strength_L">
					          <span class="f00" id=""></span>
					          <span>低</span>
				          </p>
				           <p class="in" id="strength_M">
					          <span class="eb6100"></span>
					          <span>中</span>
				          </p>
				          <p class="gao" id="strength_H">
					          <span class="green"></span>
					          <span>高</span>
				          </p>
	          			</div>	
		         </li>
		         	
		         <li class="identifying">
		         	<input type="text" class="int-xlarge-identifying" placeholder="验证码" id="pictureVitenfy">
		         	<span ><A href="#"><img src="${_base}/reg/getImageVerifyCode" id="randomImg"></A></span>
		         	<span ><a href="#"id="refresh">看不清?换一个</a></span>
		         	<span class="regsiter-note" id="errorPicMsg">
		         		<i class="icon-caret-left"></i>
		         		<img src="${_base}/theme/baas/images/error.png"><span id="showPicMsg"></span>
		         	</span>
		         </li>
		         <li class="SMSidentifying">
		         	<input type="text" class="int-xlarge-SMSidentifying" placeholder="短信验证码" id="phoneVerifyCode">
		         	 <span class="yzm">
		         	<a >
		         	 	<input class="regsiter-getIdentify_btn"id="PHONE_IDENTIFY"  type="button" value="获取验证码" >
		         	</a>
		         	</span>
		         		
		         	<span class="regsiter-note" id="errorSmsMsg">
		         		<i class="icon-caret-left"></i><img src="${_base}/theme/baas/images/error.png">
		         		<span id="showSmsMsg"></span>
		         	</span>
		         </li>
		         <li>
		         	<input type="button" class="regsiter-btn" value="注 册"  id="BTN_REGISTER">
		         	<input type="hidden" id="errorPhoneFlag">
		         	<input type="hidden" id="errorPicFlag">
		         	<input type="hidden" id="errorPassFlag">
		         	<input type="hidden" id="errorSMSFlag">
		         </li>
		         <li class="zuns">* 注册表示您同意遵守<A href="#">《云计费服务条款》</A></li>
	
	         </ul>
   		</div>
    </div>
   <div class="login-foot">
   ©2016 版权所有 亚信集团股份有限公司 京ICP备11005544号-15 京公网安备110108007119号
   
   </div>
   
  

</body>
</html>
