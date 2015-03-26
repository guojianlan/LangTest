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
		var start_str = target.substr(0, str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
	};
	p.endWidth = function(target, str, ignorecase) {
		var start_str = target.substring(target.length - str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
	};
	p.repeatOne = function(target, n) {
		return Array.prototype.join.call({
			length: n + 1
		}, target);
	};
	p.repeat = function(target, n) {
		//二分法
		var s = target,
			total = '';
		while (n > 0) {
			if (n % 2 === 1) {
				total += s;
			}
			if (n === 1) {
				break;
			}
			s += s;
			n = n >> 1;
		}
		return total;
	};
	//默认所有的都为1，当遇到汉字时，字符大于255，所有leng+1;
	p.byteLen = function(str){
		var bytelength = str.length,
			i=0;
		for(;i<bytelength;i++){
			if(str.charCodeAt(i) > 255){
				bytelength++;
			}
		}
		return bytelength;
	};
	//是用汉字正则
	p.bytelen1 = function(str,fix){
		fix = fix ? fix : 2;
		var target = new Array(fix+1).join('-');
		return str.replace(/[^\x00-\xff]/g,target).length;
	};
	//字符串截取，超过限定长度补充。。。
	p.truncate = function(target,length,truncation){
		length = length || 30;
		truncation = truncation === void(0) ? '...' : truncation;
		return target.length>length?target.slice(0,length-truncation.length)+truncation : String(target);
	};
	//转为驼峰
	p.camelize = function(target){
		if(target.indexOf('_') < 0 && target.indexOf('-')<0){
			return target;
		}
		return target.replace(/[-_][^-_]/g,function(match){
			return match.chatAt(1).toUpperCase();
		});
	};
	new lang().init();
	
})(window);