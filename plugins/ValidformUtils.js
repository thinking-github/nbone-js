/**
 * ValidformUtils
 * 用法：
 * 1. //直接提交
 * $("#coupon_list_form").Validform(ValidformUtils.settings); <br>
 * 
   2.// 异步提交 Validform check 
  	var bool = ValidformUtils.checkTips(masterform);
 	if(!bool){
		return ;
	}
	
 * @author thinking
 * @see  Validform.js
 * @date 2015-12-12
 * 
 */
var ValidformUtilsClass = function(){
	var me  = this;
	
	me.settings = {
			tiptype:function(msg,o,cssctl){
				//layer.alert(msg);
				if(msg){
					// type:1=>正在检测 | 2=>通过
					//type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
					if(o.type != 2){
						layer.msg(msg);
					}
					
				}
		
	        },
	        tipSweep:false,
			datatype:{
				"pfAndNn"  : /^([+]?)\d*(\.\d+)?$/,         //正整数或者小数
				"nullable" : /^\s*$/,
				"nn"       : /^[0-9]*$/,                 //自然数
				"float"    : /^([+-]?)\d*\.\d+$/,        //浮点数
				"pf"       : /^([+]?)\d*\.\d+$/,         //正小数
				"mf"       : /^-\d*\.\d+$/,              //负小数
				"zh"       : /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/,
				"zh2-4"    : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
				"eq":function(gets,obj,curform,regxp){
					//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
					//验证 等于、不等于字段方法
					
					/**比较两种写法*/
					var test1 = "/^(?!-1$).+$/";
					var test2 = "/^(?!-1$)/";
					//扩展属性
					var validType = obj.attr("validType");
					var pattern  = "^(?"+validType+"$)";
					
					var reg  = new RegExp(pattern);
					
					if(reg.test(gets)){ return true; }
					
					return false;
					
					//注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
				},
				"minLength":function(gets,obj,curform,regxp){
					var value = gets;
					var length = value.length;
					//扩展属性
					var validType = obj.attr("validType");
					obj.attr("minLength1",length);
					var bool = length >= validType;
					return bool;   					
				},
				"maxLength":function(gets,obj,curform,regxp){
					var value  = gets;
					var length = value.length;
					//扩展属性
					var validType = obj.attr("validType");
					obj.attr("maxLength1",length);
					var bool = length <= validType;
					return  bool;  					
				}
			}
	
	};
	//用于第三次开发settings
	me.newSettings = {};
	
	me.tipmsg={//默认提示文字;
			w:{
				"nn"    : "请填写自然数！",
				"zh"    : "请填写中文！",
				"zh2-4" : "请填写2到4位中文字符！",
				"eq" 	: "请填写正确的值！",
				"minLength" :"您输入的长度太短!",
				"maxLength" :"您输入的长度太长!",
				"float":"请填写浮点数",
				"pfAndNn":"请输入正整数或者小数"
			}
		}
	//$.Tipmsg.w = tipmsg.w;
	
	me._init = function(){
		if(this.newSettings.datatype){
			$.extend(this.settings.datatype,this.newSettings.datatype);
			delete this.newSettings.datatype;
		}  
		//Validform function
		var settings = $.extend({},this.settings,this.newSettings);
		
		//还原
		this.newSettings = {};
		return settings;
	}
	//--------------自定义扩展方法-------------
	
	/**
	 * 检查验证from表单并且提示消息 验证通过返回true 否则返回false
	 * @author thinking
	 * @see check()
	 */
	me.checkTips = function(jqform,selector){
		
		var bool = this.check(jqform, false, selector);
		
		return bool;
	}
	
	/**
	 * @author thinking
	 * @param jqform    jquery form 对象
	 * @param bool      是否提示消息  false=验证并提示 true=只验证不提示 
	 * @param selector  jquery 选择器   当为空时验证整个表单,否则查找当前表单的元素进行验证
	 * @returns Boolean true=验证通过
	 */
	me.check = function(jqform,bool,selector){
		var settings = this._init();
		
		var form = jqform.Validform(settings);
		$.extend(form.tipmsg.w,this.tipmsg.w);
		
		var checked = form.check(bool,selector);
		
		delete form.forms;
		return checked;
	}
	/**
	 * @param tiptype Validform 规定的数值或者自定义回调函数
	 */
	me.tiptype = function (tiptype){
		
		me.newSettings.tiptype = tiptype;
		
		return this;
	}
	
	
}
var ValidformUtils = new ValidformUtilsClass();



