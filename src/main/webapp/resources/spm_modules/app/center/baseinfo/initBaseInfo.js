define('app/center/baseinfo/initBaseInfo', function (require, exports, module) {
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
    var BaseInfoPager = Widget.extend({
    	//属性，使用时由类的构造函数传入
    	attrs: {
    	},
    	//事件代理
    	events: {
    		//key的格式: 事件+空格+对象选择器;value:事件方法
    		//"click [id='submitBtn']":"_confirmInfo",
    		
        },
        init: function(){
        	_renderIndustryInfo();
        	_hideErroText();
        },
    	//重写父类
    	setup: function () {
    		BaseInfoPager.superclass.setup.call(this);
    		this._renderIndustryInfo();
    		this._hideErroText();
    		this._bindHandle();
    	},
    	_bindHandle: function(){
    		$("#submitBtn").on("click",this._validInfo);
    		$("#submitBtn").on("click",this._submit);
    		
    	},
    	//加载账户数据、业务类型
    	_renderIndustryInfo: function(){
			var _this = this;
			//初始化展示业务类型
			_this._changPage();
			_this._getIndustry();
			
		},
		_hideInfo: function(){
	   		 $("#errorNickNameMsg").attr("style","display:none");
	   		 $("#errorTenMsg").attr("style","display:none");
	   		 $("#errorTypeMsg").attr("style","display:none");
		},
		_hideErroText: function(){
			var _this = this;
			//初始化展示业务类型
			_this._hideInfo();
   		},
		_changPage:function(){
			var email = $("#email").val();
			var tenantName = $("#tenant").val();
			if(email==""){
				$("#haveEmail").attr("style","display:none");
			}else{
				$("#bandEmail").attr("style","display:none");
			}
			if(tenantName==""){
				$("#oneInfo").attr("style","display:none");
			}else{
				$("#allInfo").attr("style","display:none");
			}
		},
		_validInfo: function(){
			var nickNmae = $("#nickName").val();
			var tenantName = $("#tenantName").val();
			var industryType = $("#indutry").val();
			var bk = $("#setnick").is(":visible");
			var isindus = $("#allInfo").is(":visible");
			$("#errorNickNameMsg").attr("style","display:none");
			if(nickNmae==""&&bk){
				$('#showNickNameMsg').text("请输入昵称");
    			$("#errorNickNameMsg").attr("style","display:block");
				$("#flag").val("0");
				return false;
			}
			if(nickNmae!=""&&(!bk)){
				if(/^\S{4,40}/.test(nickNmae)){
					$("#flag").val("1");
				}else{
					$('#showNickNameMsg').text("4~40位字符，不能包含空格");
	    			$("#errorNickNameMsg").attr("style","display:block");
					$("#flag").val("0");
					return false;
				}
			}
			if(isindus){
				$("#errorTenMsg").attr("style","display:none");
				if(tenantName==""){
					$('#showTenMsg').text("请输入企业名称");
	    			$("#errorTenMsg").attr("style","display:block");
					$("#flag").val("0");
					return false;
				}else if(industryType=="00"){
					$('#showTypeMsg').text("请选择企业类型");
	    			$("#errorTypeMsg").attr("style","display:block");
					$("#flag").val("0");
					return false;
				}else if(/^\S{4,40}/.test(tenantName)){
					$("#flag").val("1");
				}else{
					$('#showTenMsg').text("4~40位字符，不能包含空格");
	    			$("#errorTenMsg").attr("style","display:block");
					$("#flag").val("0");
					return false;
				}
				
			}
		},
		_getIndustry:function(){
			var _this = this;
			ajaxController.ajax({
				type : "POST",
				data : {
				},
				url :_base+"/center/baseInfo/listIndutry",
				processing: true,
				message : "正在处理中，请稍候...",
				success : function(data) {
					var indutrys = $("#indutry");
					indutrys.empty();
					var option1 = $("<option id='indusvoid'>").text("请选择").val("00");
					indutrys.append(option1);
					for(var i=0;i<data.length;i++) {
						var option = $("<option>").text(data[i].industryName).val(data[i].industryCode);
						indutrys.append(option);
					}
				}
				
			});
		},
		
		_submit:function(){
			var flag = $("#flag").val();
			if(flag!="0"){
				var _this = this;
				var	param={
						nickName:	$("#nickName").val(),  
						tenantName: $("#tenantName").val(),		   
						industryCode:$("#indutry").val(),
						accountId:$("#accountId").val()
					   };
				ajaxController.ajax({
					type : "POST",
					dataType: "json",
				    data: param,
					url :_base+"/center/baseInfo/updateBaseInfo",
					processing: true,
					message : "正在处理中，请稍候...",
					success : function(data) {
						window.location.href="../center/baseInfo/getAccountInfo"
						location.reload();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						 alert(XMLHttpRequest.status);
						 alert(XMLHttpRequest.readyState);
						 alert(textStatus);
						}
					
				});
			}
			
		},
    });
    
    
    module.exports = BaseInfoPager
});
