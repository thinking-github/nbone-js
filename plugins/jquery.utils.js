//-------------------------------------------------------------------
/**
 * jQuery Plugin  Utils
 * @author thinking
 */
(function($) {
	
	var jQuery = $;
	
	$.postJSON = function(url,data,callback){
		
		return $.post(url,data,callback,"json");
	}
	$.postJson = $.postJSON;
	
	
	$.postXML = function(url,data,callback){
		
		return $.post(url,data,callback,"xml");
	}
	$.postXml = $.postXML;
	
	
	
	var jsonOptions = {
			contentType: "application/json",
            dataType: "json",
	};
	/**
	 * 封装ajax请求的总控制器
	 * @see jquery.js
	 * @param url    请求路径
	 * @param method 不区分大小写
	 * @param data   请求数据
	 * @param callback 
	 * @param options ajax settings
	 */
	jQuery.send = function( url,method, data, callback, options) {
        
		if(method == null){
        	 method = "GET";
        }
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			options = options || callback;
			callback = data;
			data = undefined;
		}
		//XXX:thinking
		if(!options){
			options = {};
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend({},options,{
			url: url,
			type: method,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
	
	
	
	/**
	 * delete 是 js 关键字 故使用DELETE
	 * add http put patch delete method 
	 * @see jQuery.js
	 */
	jQuery.each( [ "put","patch", "DELETE" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			jQuery.send(url, method, data, callback, type);
		
		};
	} );
	
	jQuery.httpDelete = function( url, data, callback, type){
		jQuery.send(url, "DELETE", data, callback, type);
	}
	
	

})(jQuery);

/**
 * form  serialize
 * <p> {id:001,name:thinking,interest:["interest2","interest2","interest3"]}
 * @author thinking
 */
(function($) {
	$.fn.serializeJSON = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		//var str = this.serialize();
		$(array).each(
				function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [
									serializeObj[this.name], this.value ];
						}
					} else {
						serializeObj[this.name] = this.value;
					}
				});
		return serializeObj;
	};
	
	
	/**
	 * 解析form组件，当不是form时包装成form
	 */
	$.parseForm = function(jq){
		if(jq[0].tagName.toUpperCase()=="FORM"){
			return  jq;
			
		}else{
			var  form = $('<form id="tempForm" style="display: none;"></form>');
			form.html(jq.clone());
			return  form;
		}
	}
	
	/**
	 * jquery 获取容器中的input元素值序列化
	 * @author thinking
	 * @param jq jquery对象
	 */
	$.parseSerialize = function (jq){
		var form = $.parseForm(jq);
		return  form.serialize();
	}
	/**
	 * jquery 获取容器中的input元素值序列化成数组
	 * @author thinking
	 * @param jq jquery对象
	 */
	$.parseSerializeArray = function (jq){
		var form = $.parseForm(jq);
		return  form.serializeArray();
		
	}

	/**
	 * 
	 * 序列化成JsonList(常常用于table中tr多行的数据转化成 form list)
	 */
	$.serializeJSONList = function(jq,ischecked){
		var items = jq.find(".nbone-item");
		var result = [];
		items.each(function(){
			var form = $.parseForm($(this));
			var obj = form.serializeJSON();
			result.push(obj);
		});
		
		return result ;
	}
	
})(jQuery);