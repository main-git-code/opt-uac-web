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
    		"click [id='changeImage']":"_getImageRandomCode"
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
					"accountId":1,
					"checkType": function(){
						return $("#confirmType").val()
					}
				},
				url :_base+"/retakePassword/sendVerify",
				processing: true,
				message : "正在处理中，请稍候...",
				success : function(data) {
					if(data.responseHeader.resultCode=="9999"){
		        		$('#showSmsMsg').text("1分钟后可重复发送 ");
		    			$("#errorSmsMsg").attr("style","display:block");
		    			$("#phoneVerifyCode").val("");
						return false;
		        	}
				},
				error : function(){
					alert("网络连接超时!");
				}
			});
		},
		//检查身份信息
		_confirmInfo:function(){
			var _this = this;
			ajaxController.ajax({
				type : "POST",
				data : _this._getSafetyConfirmData(),
				url :_base+"/retakePassword/confirmInfo",
				processing: true,
				message : "正在处理中，请稍候...",
				success : function(data) {
					var statusCode = data.statusCode;
					var url = data.data;
					if(statusCode == "1"){
						window.location.href = _base+url;
					}else{
						alert(data.statusInfo);
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
				"accountId":"1",
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
