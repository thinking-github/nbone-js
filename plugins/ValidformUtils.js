/**
 * ValidformUtils
 * @author thinking
 * @see  Validform.js
 * @date 2015-12-12
 * 
 */
var ValidformUtilsClass = function(){
	var me  = this;
	
	me.settings = {
			tiptype:function(msg){
				//layer.alert(msg);
				if(msg){
					layer.msg(msg);
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
		//Validform function
		var settings = $.extend({},this.settings,this.newSettings);
		//还原
		this.newSettings = {};
		var form = jqform.Validform(settings);
		var bool = form.check(bool,selector);
		
		return bool;
	}
	/**
	 * @param tiptype Validform 规定的数值或者自定义回调函数
	 */
	me.tiptype = function (tiptype){
		
		me.newSettings.tiptype = tiptype;
		
		return this;
	}
	
	
	/**
	 * jquery 获取容器中的input元素值序列化
	 * @author thinking
	 * @param jq jquery对象
	 */
	me.parseSerialize = function (jq){
		if(jq[0].tagName.toUpperCase()=="FORM"){
			return  jq.serialize();
			
		}else{
			var  form = $('<form id="tempForm" style="display: none;"></form>');
			form.html(jq.clone());
			return  form.serialize();
		}
		
	}
	/**
	 * jquery 获取容器中的input元素值序列化成数组
	 * @author thinking
	 * @param jq jquery对象
	 */
	me.parseSerializeArray = function (jq){
		if(jq[0].tagName.toUpperCase()=="FORM"){
			return  jq.serializeArray();
			
		}else{
			var  form = $('<form id="tempForm" style="display: none;"></form>');
			form.html(jq.clone());
			return  form.serializeArray();
		}
		
	}
	
	
}
var ValidformUtils = new ValidformUtilsClass();



