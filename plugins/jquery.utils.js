//-------------------------------------------------------------------
/**
 * jQuery Plugin  Utils
 * @author thinking
 */
(function($) {
	
	$.postJSON = function(url,data,callback){
		
		return $.post(url,data,callback,"json");
	}
	$.postJson = $.postJSON;
	
	
	
	
	$.postXML = function(url,data,callback){
		
		return $.post(url,data,callback,"xml");
	}
	$.postXml = $.postXML;

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