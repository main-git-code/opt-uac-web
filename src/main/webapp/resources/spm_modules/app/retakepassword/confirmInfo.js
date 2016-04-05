define('app/retakepassword/confirmInfo', function (require, exports, module) {
    'use strict';
    var $=require('jquery'),
    Widget = require('arale-widget/1.2.0/widget'),
    Dialog = require("artDialog/src/dialog"),
    Uploader = require('arale-upload/1.2.0/index'),
    AjaxController=require('opt-ajax/1.0.0/index');
    
    require("jsviews/jsrender.min");
    require("jsviews/jsviews.min");
    require("treegrid/js/jquery.treegrid.min");
    require("treegrid/js/jquery.cookie");
    
    
    //实例化AJAX控制处理对象
    var ajaxController = new AjaxController();
    
    //定义页面组件类
    var ConfirmInfoPager = Widget.extend({
    	//属性，使用时由类的构造函数传入
    	attrs: {
    	},
    	//事件代理
    	events: {
    		//key的格式: 事件+空格+对象选择器;value:事件方法
    		"change [id='confirmType']":"_changeShowViewByType",
    		"click [id='submitBtn']":"_confirmInfo",
    		"click [id='sendVerify']":"_sendVerify",
    		"click [id='random_img']":"_getImageRandomCode",
    		"click [id='changeImage']":"_getImageRandomCode",
    		"blur [id='pictureVerifyCode']":"_checkPictureVerifyCode",
    		"blur [id='verifyCode']":"_checkSSmVerifyCode"
        },
        init: function(){
        	_getImageRandomCode();
        },
    	//重写父类
    	setup: function () {
    		ConfirmInfoPager.superclass.setup.call(this);
    		//加载数据
    		this.accountData = {
    			"phone":function(){
    				return $("#phoneValue").val();
    			},
    			"email":function(){
    				return $("#emailValue").val();
    			}
    		};
    		this._renderAccountInfo();
    	},
    	
    	//加载账户数据
    	_renderAccountInfo: function(){
			var _this = this;
			//控制身份认证方式的界面属性
			_this._controlConfirmTypeAttr();
			//初始化展示页面
			_this._initShowView();
		},
		//控制身份认证方式的界面属性
		_controlConfirmTypeAttr:function(){
			var _this = this;
			var email = _this.accountData.email;
			if(email == null || email == undefined){
				$("#confirmTypeDiv").attr("style","display:none");
			}else{
				$("#confirmTypeDiv").removeAttr("style");
			}
		},
		//初始化展示页面
		_initShowView:function(){
			var _this = this;
			var phone = _this.accountData.phone;
			$("#checkTypeName").html("手机号码");
			$("#checkTypeValue").html(phone);
			$("#verifyName").html("短信验证码");
		},
		//身份认证方式改变触发事件
		_changeShowViewByType:function(){
			var _this = this;
			var email = _this.accountData.email;
			var phone = _this.accountData.phone;
			var confirmType=$('#confirmType option:selected').val();
			if(confirmType == "1"){
				$("#checkTypeName").html("手机号码");
				$("#checkTypeValue").html(phone);
				$("#verifyName").html("短信验证码");
			}else if(confirmType == "2"){
				$("#checkTypeName").html("邮箱地址");
				$("#checkTypeValue").html(email);
				$("#verifyName").html("邮箱验证码");
			}
		},
		_getImageRandomCode:function(){
			var timestamp = (new Date()).valueOf();
			$("#pictureVerifyCode").val("");
			$("#random_img").attr("src",_base+"/retakePassword/getImageVerifyCode?timestamp="+timestamp);
		},
		_sendVerify:function(){
			 var step = 59;
             $('#sendVerify').val('重新发送60');
             var _res = setInterval(function(){
                 $("#sendVerify").attr("disabled", true);//设置disabled属性
                 $('#sendVerify').val('重新发送'+step);
                 step-=1;
                 if(step <= 0){
                 $("#sendVerify").removeAttr("disabled"); //移除disabled属性
                 $('#sendVerify').val('获取验证码');
                 clearInterval(_res);//清除setInterval
                 }
             },1000);
			var _this = this;
			ajaxController.ajax({
				type : "POST",
				data : {
					"checkType": function(){
						return $("#confirmType").val()
					}
				},
				url :_base+"/retakePassword/sendVerify?k="+uuid,
				processing: true,
				message : "正在处理中，请稍候...",
				success : function(data) {
					var resultCode = data.responseHeader.resultCode;
					if(resultCode=="100000"){
						var url = data.data;
						window.location.href = _base+url;
		        	}else {
		        		if(resultCode == "100002"){
			        		this._controlMsgText("ssmVerifyCodeMsg",data.statusInfo);
							this._controlMsgAttr("ssmVerifyCodeMsgDiv",2);
			        	}else{
			        		this._controlMsgText("ssmVerifyCodeMsg","");
							this._controlMsgAttr("ssmVerifyCodeMsgDiv",1);
			        	}
		        	}
				},
				error : function(){
					alert("网络连接超时!");
				}
			});
		},
		//检查验证码
		_checkSSmVerifyCode: function(){
			var verifyCode = jQuery.trim($("#verifyCode").val());
			if(verifyCode == "" || verifyCode == null || verifyCode == undefined){
	    		this._controlMsgText("ssmVerifyCodeMsg","请输入验证码");
				this._controlMsgAttr("ssmVerifyCodeMsgDiv",2);
				return false;
			}else{
				this._controlMsgText("ssmVerifyCodeMsg","");
				this._controlMsgAttr("ssmVerifyCodeMsgDiv",1);
				return true;
			}
		},
		//检查验证码
		_checkPictureVerifyCode: function(){
			var verifyCode = jQuery.trim($("#pictureVerifyCode").val());
			if(verifyCode == "" || verifyCode == null || verifyCode == undefined){
				this._controlMsgText("pictureVerifyMsg","请输入图形验证码");
				this._controlMsgAttr("pictureVerifyMsgDiv",2);
				return false;
			}else{
				this._controlMsgText("pictureVerifyMsg","");
				this._controlMsgAttr("pictureVerifyMsgDiv",1);
				return true;
			}
		},
		//控制显示内容
		_controlMsgText(id,msg){
			var doc = document.getElementById(id+"");
			doc.innerText=msg;
		},
		//控制显隐属性 1:隐藏 2：显示
		_controlMsgAttr(id,flag){
			var doc = document.getElementById(id+"");
			if(flag == 1){
				doc.setAttribute("style","display:none");
			}else if(flag == 2){
				doc.setAttribute("style","display");
			}
		},
		//检查身份信息
		_confirmInfo:function(){
			var _this = this;
			var checkSSMVerifyCode = this._checkSSmVerifyCode();
			var checkPictureVerifyCode = this._checkPictureVerifyCode();
			if(!(checkSSMVerifyCode&&checkPictureVerifyCode)){
    			return false;
    		}
			ajaxController.ajax({
				type : "POST",
				data : _this._getSafetyConfirmData(),
				url :_base+"/retakePassword/checkConfirmInfo?k="+uuid,
				processing: true,
				message : "正在处理中，请稍候...",
				success : function(data) {
					var status = data.responseHeader.resultCode;
					if(status == "000000"){
						var url = data.data;
						window.location.href = _base+url;
					}else{
						var msg = data.statusInfo;
						//验证码
						if(status == "100002"){
							_this._controlMsgText("ssmVerifyCodeMsg",msg);
							_this._controlMsgAttr("ssmVerifyCodeMsgDiv",2);
						}else{
							_this._controlMsgText("ssmVerifyCodeMsg","");
							_this._controlMsgAttr("ssmVerifyCodeMsgDiv",1);
						}
						//图片验证码
						if(status == "100001"){
							_this._controlMsgText("pictureVerifyMsg",msg);
							_this._controlMsgAttr("pictureVerifyMsgDiv",2);
						}else{
							_this._controlMsgText("pictureVerifyMsg","");
							_this._controlMsgAttr("pictureVerifyMsgDiv",1);
						}
					}
				},
				error : function(){
					alert("网络连接超时，请重新修改登录密码");
				}
			});
		},
		//获取界面填写验证信息
		_getSafetyConfirmData:function(){
			return{
				"confirmType":function () {
			        return jQuery.trim($("#confirmType").val())
			    },
				"pictureVerifyCode":function () {
			        return jQuery.trim($("#pictureVerifyCode").val())
			    },
				"verifyCode":function () {
			        return jQuery.trim($("#verifyCode").val())
			    }
			}
		}
		
    });
    
    
    module.exports = ConfirmInfoPager
});
