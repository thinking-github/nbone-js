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
		var str = this.serialize();
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
})(jQuery);