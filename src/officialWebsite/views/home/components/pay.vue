<template>
  <div><el-button @click='qryUserInfo' type="primary">{{this.test}}</el-button></div>
</template>

<script>
//import $ from './jquery.min.js'
export default {
    data(){
        return{
            device_number : "13032300848", //业务号码
            oper_no:"CD2848",
             origin:"ztRequest",
             Jsessionid:'AE4712B17FDE0221580033C966E23CFE',
			 recharge_fee:'',
            order_id:sessionStorage.getItem("order_id"),
             requestParams: null,
             pay_back_result:'',
             nextCallback:function(){}
        }
	},
	props:{
		test:{
			default:'立即支付',
			type:String
		},
		payMoney:{
			default:'0.01',
			type:String
		}
	},
    mounted(){
        
        let node=document.createElement("script");
        let jq="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
        node.setAttribute("src",jq);
        node.onload = ()=>{ 
            this.initParam();
        }   
        document.getElementById("app").appendChild(node);
        setTimeout(()=>{
            
        })
        
    },
    methods:{
        // 调用查询接口

	qryUserInfo() {
		if(this.payMoney!=null&&this.payMoney!=undefined&&this.payMoney!=''){
			localStorage.setItem("payMoney",this.payMoney);
		}else{
			this.$message("请输入充值金额");
			return
		}
		let self=this;
		var flag = true;
		if (this.device_number == "") {
			flag = false;
			alert("业务号码不能为空！");
			return;
		}
		
		if (true) {
			// 组装请求参数
			var dataJson = {
				"input_text" : this.device_number,
				"oper_no" : this.oper_no,
				"origin" : this.origin
			};

			console.log("=============根据号码查询信息请求参数"+ JSON.stringify(dataJson));

			$.ajax({
				type : "post",
				url : "http://123.147.223.92:8861/uss_web/rest/saleOpen/getUserList",
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
				async : true,
				data : dataJson,
				dataType : "json",
				crossDomain : true == !(document.all),
				beforeSend : function(xhr) {
					console.log("加载中");
				},
				success : function(data) {
					console.log("===============根据号码查询信息返回参数："+ JSON.stringify(data));
					if(data==null){return}
					if (data.type == "success") {
						var cust_info = data.args.cust_info[0];
						$("#userName").html(cust_info.cust_name);
						$("#preBalance").html(cust_info.current_balance + "元");

						// 返回参数存入缓存
						self.cacheGetUserListData(cust_info);

						// 支付按钮可点击
						$("#payBtn").removeClass("disabled");
					}else if(data.type == "error"){
						alert(data.content);
						$("#deviceNum").val("");
						$("#userName").val("");
						$("#preBalance").val("");
						return;
					}
				},
				error : function(error) {
					
					$("#deviceNum").val("");
					$("#userName").html("");
					$("#preBalance").html("");
	
					alert(error.content);
				},
				complete : function() {
					//mui.loading.hide();	
				}
			});
		}
	},

	// 缓存数据
	cacheGetUserListData(cust_info){
		var data=cust_info;

		data.accept_type='8'
		data.discount_fee='0.00';
		data.order_type='01';
		data.goods_num="1";
		sessionStorage.setItem("device_guishu",cust_info.device_guishu);
		this.checkStand(data);
		//return data;
		
	},


// 调用收营台
	checkStand(data) {
		
		//验证缴费金额
		this.recharge_fee = "0.01";
		//echarge_fee = fee.substring(0,$("#payAmount").html().length-1); //缴费金额
				
		var redirect_url = window.location.href;
		
		if(!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.recharge_fee)){
			alert("金额不合法,最多输入两位小数点！");
			return;
		}else if(this.recharge_fee > 500){
			alert("一次缴费金额不能超过500元！");
			return;
		}
		
	
		var dataJson = {
			"origin" : this.origin,
			"oper_no" : this.oper_no,
			"jsessionid":this.Jsessionid,
			"accept_type" : data.accept_type,
			"business_flag" : data.business_flag,
			"detail_name" : "老树家园租金缴纳",
			"device_number" : this.device_number,
			"discount_fee" : data.discount_fee,
			"goodsDetail" : [ {
				"goods_id" : this.device_number,
				"goods_name" : "老树家园租金缴纳",
				"goods_num" : data.goods_num,
				"goods_price" : this.recharge_fee
			}],
			"order_type" : data.order_type,
			"payed_fee" : this.recharge_fee,
			"real_fee" : this.recharge_fee,
			"redirect_url" : redirect_url,
			"remark" : "沃受理缴费",
			"req_way" : "APP",
			"tele_type" : data.tele_type,
			"total_fee" : this.recharge_fee,
			"busi_id" : "10000007",
			//整合的上账需要的参数
			/*"pay_type" : callbackParam.pay_type,    
			"business_flag" : data.business_flag,        
			"discount_fee" : data.discount_fee,          
			"orig_fee" : recharge_fee,              
			"real_fee" : recharge_fee,              
			"fee_type" : recharge_fee,              
			"pay_total" : recharge_fee,             
			"phone_no" : device_number,             
			"order_sub_type" : order_sub_type,      
			"current_balance" : data.current_balance,    
			"customer_name" : data.cust_name,            
			// "cs_order_id" : order_id.substring(2),               
			//"order_id" : order_id.substring(2),     
			"trade_time" : callbackParam.trade_time,
			"pay_source" : "72"                     */

		};

		console.log("调用收营台请求参数====================" + JSON.stringify(dataJson));
		$.ajax({
			type : "post",
			url : "http://123.147.223.92:8861/uss_web/rest/cashDesk/AppPayReq",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			async : true,
			data : dataJson,
			dataType : "json",
			crossDomain : true == !(document.all),
			beforeSend : function(xhr) {
				console.log("收银台加载中")
			},
			success : function(respData) {
				console.log("调用收营台返回参数======================：" + JSON.stringify(respData));
				if (respData.type == "success") {
					var args = respData.args;

					var pay_ip = args.pay_ip; // pay_ip
					var data = args.data; // data
					var order_id = args.order_id; // order_id
					console.log("orderid为："+order_id)
					//order_id写入缓存
					sessionStorage.setItem("order_id",order_id);
					//recharge_fee写入缓存
					sessionStorage.setItem("recharge_fee",this.recharge_fee);

					// 跳转到收银台界面
					var url = pay_ip + "/authority/busiReq/payrdr";
					var paycentralData = decodeURIComponent(data);

					// 屏蔽原来页面的内容
					var $elementShow = $("body");
					$elementShow.hide();
					// 动态创建收银台iframe
					$("<form id=YuForm target=_self><input  name=data value=" + paycentralData + "> <input name=req_way value=APP></form>").appendTo('body');

					$("#YuForm").attr('action', url);
					$("#paycentralData").val(paycentralData);
					document.getElementById("YuForm").submit();

				}else if(respData.type == "error") {
					alert(respData.content);
				}

			},
			error : function(error) {
				console.log("发生错误："+error)
				/*mui.loading.hide();
				mui.alert(error.content);*/
			},
			complete : function() {
				//mui.loading.hide();
			}

		});
	},
	// 初始化参数
	initParam(){
        console.log("扫描。。。。")
		// 获取支付中心回调回来的参数
        var pay_back_result = this.getParam("result");
        console.log(this.pay_back_result)
		//pay_back_result = "SUCCESS"
		if (pay_back_result != "" && pay_back_result != undefined && pay_back_result != null){
			console.log("*************chargeDisabled函数*********************");
			console.log("order_id:"+this.order_id+";pay_back_result:"+this.pay_back_result);
			let order_id=sessionStorage.getItem("order_id");
			// UNPAID 表示支付中心未支付直接返回
			if (order_id != null && order_id != "" && order_id != undefined &&pay_back_result != 'UNPAID') {
				this.toScanPayResult();
			}	
			if(pay_back_result=="UNPAID"){
				alert("支付失败")
			}
		}		
	},
	toScanPayResult() {
	
	console.log("*************toScanPayResult函数*********************");
	
	
	// 组装参数
	var data = {
		"origin" : this.origin,
		"oper_no" : this.oper_no,
		"order_id" : this.order_id,
		"real_fee" : this.recharge_fee,
		"payTotal" : this.recharge_fee
	};

	this.waitForPaymentResult(data,this.callPayCharge);
},
// 查询结果必须需要回调函数
waitForPaymentResult(data,callback) {
	
	console.log("*************waitForPaymentResult函数*********************");
	
	if (!data) {
		alert('支付参数不能为空');
		return;
	}
	if (callback && typeof (callback) == 'function') {
		this.nextCallback = callback;
	} else {
		alert("等待支付结果需要传入回调函数");
		return;
	}
	this.scanPayResult(this.order_id);
},
//扫描支付结果
scanPayResult(order_id){
	
	console.log("*************scanPayResult函数*********************");
	
	var dataJson = {
		"order_id" : order_id,
		"oper_no" : this.oper_no,
		"origin" : this.origin
	};

	console.log("调用支付结果请求参数======================：" + JSON.stringify(dataJson));
let self=this;
	$.ajax({
		type : "post",
		url :"http://123.147.223.92:8861/uss_web/rest/cashDesk/scanPayResult",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		async : true,
		data : dataJson,
		dataType : "json",
		crossDomain : true == !(document.all),
		beforeSend : function(xhr) {
			//mui.loading.show();
		},
		success : function(data) {
			console.log("调用支付结果接口返回参数======================："+ JSON.stringify(data));
		
			if(data.type == "success"){
				var args = data.args;
				if (args.result_code == "200") {
					// 写订单
					console.log("支付成功 下一步填写订单");
					var pay_type = args.pay_type;
					var trade_time = args.trade_time;
					var payFlage = "SUCCESS";
					
					// 调用回调函数通知页面进行下一步操作
					var callbackParam = {
						"flag" : payFlage,
						"pay_type" : pay_type,
						"cs_order_id" : order_id,
						"trade_time" : trade_time
					};
					//alert("支付成功")
					self.$emit("payResult","success");
				 }else if(args.result_code == "100") {
					// 支付失败不填写订单（订单的填写是由BSS接口 沃受理不能控制填写订单的支付状态）
                    console.log("支付失败");
                    alert("支付失败")
					self.$emit("payResult","error");
				}else{
                    alert("支付失败");
                    self.$emit("payResult","error");
				}
			}else{
                alert("支付失败");
                self.$emit("payResult","error");
			}
		},
		error : function(error) {
            alert("支付失败");
            self.$emit("payResult","error");
		},
		complete : function() {
		},
	});
},

 callPayCharge(callbackParam) {
	if (callbackParam.flag != "SUCCESS") {
		console.log("支付返回的状态值为" + callbackParam.flag);
		return;
	}

	// 标志暂时写死 
	var submit_flag = "0";

	alert("支付成功")

},








    /**
     * 获取html后面字符串所传参数的
     
     */
    getParam(key) {
            if (this.requestParams == null) {
                this.requestParams = this.getRequestParam();
            }

            if ("all" == key) {
                return this.requestParams;
            } else {
                return this.requestParams[key];
            }
        },
        
    getRequestParam: function () {
        var url = decodeURI(window.location.href); //获取

        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.split('?');
            var strs = str[1].split("&");
            for (var i = 0; i < strs.length; i++) {
                var args = strs[i].split("=");
                theRequest[args[0]] = args[1];
            }
        }
        return theRequest;
    }
    }
}
</script>

<style>

</style>
