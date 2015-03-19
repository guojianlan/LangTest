(function(global) {
	var lang = function() {};
	var p = lang.prototype;
	p.init = function() {
		console.log('开始');
	};
	//判断字符串是否包含
	p.contains = function(target, str, separator) {
		return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
	};
	//判断目标字符串是否位于源字符串的开头，最后一个参数是是否忽略大小写
	p.startWidth = function(target, str, ignorecase) {
		var start_str = target.substr(0,str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
	};
	p.endWidth = function(target, str, ignorecase) {
		var start_str = target.substring(target.length-str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
	};
	new lang().init();
})(window);