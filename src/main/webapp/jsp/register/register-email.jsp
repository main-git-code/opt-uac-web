<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
<%@ include file="/inc/inc.jsp"%>
<meta charset="UTF-8">
<title>注册－邮箱绑定</title>
<link href="${_base}/theme/baas/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/font-awesome.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/global.css" rel="stylesheet" type="text/css">
<link href="${_base}/theme/baas/css/login-regsiter.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${_base}/theme/baas/js/jquery-1.11.1.min.js" ></script>
<script type="text/javascript" src="${_base}/theme/baas/js/bootstrap.js" ></script>
<script type="text/javascript" src="${_base}/theme/baas/js/comp.js" ></script>
</head>

<body>

  <div class="login-header"><!--登录头部-->
     <div class="login-header-cnt">
       <div class="login-header-cnt-logo"><img src="${_base}/theme/baas/images/logo.png"></div>
       <div class="login-header-cnt-mail">邮箱绑定</div>
       </div>
     
     </div>
  
   <div class="regsiter-wrapper">
        <div class="regsiter-email-cnt">
          <ul>
          <li class="user">
          <p class="word">邮箱地址</p>
          <p><input type="text" class="int-medium" placeholder=""></p>
          <p><A href="#">获取校验码</A></p>
         </li>
          <li class="user">
          <p class="word">邮箱校验码</p>
          <p><input type="text" class="int-medium" placeholder=""></p>
         
         </li>
         <li class="reminder">
         <p><i class="icon-lightbulb"></i>温馨提示</p>
         <p class="reminder-word">
         <span>1 . 邮箱也可以作为登录账号</span>
         <span>2 . 邮箱可以帮助您找回账户密码</span>
         <span>3 . 接收产品开通、到期、故障等通知服务</span>
         </p>
         </li>
         
         <li class="regsiter-email-btn"><input type="button" value="下次再说" class="next-btn"><input type="button" value="提交" class="next-btn next-btn-hover"></li>
          </ul>
        
        </div>
       
    
     
    </div>

   <div class="login-foot">
   ©2016 版权所有 亚信集团股份有限公司 京ICP备11005544号-15 京公网安备110108007119号
   
   </div>
   
  

</body>
</html>
