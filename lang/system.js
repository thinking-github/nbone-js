/**
 * 统计对象的属性个数
 * @author thinking
 */
Object.prototype.count = (Object.prototype.hasOwnProperty('__count__')) ? 
	  function () {
	    return this.__count__;
	  } : function () {
	    var count = 0;
	    for (var i in this)
	    	if (this.hasOwnProperty(i)) {
	    		count ++;
	    	}
	    return count;
	  };
	  
	  
/**
 * @author thinking
 */
String.prototype.demo = function(){
	alert("demo");
}
