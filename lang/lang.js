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
	p.byteLen = function(str) {
		var bytelength = str.length,
			i = 0;
		for (; i < bytelength; i++) {
			if (str.charCodeAt(i) > 255) {
				bytelength++;
			}
		}
		return bytelength;
	};
	p.byteLen2 = function(str){
		return str.replace(/[^\x00-\xff]/g,'aa').length;
	}
	//是用汉字正则
	p.bytelen1 = function(str, fix) {
		fix = fix ? fix : 2;
		var target = new Array(fix + 1).join('-');
		return str.replace(/[^\x00-\xff]/g, target).length;
	};
	//字符串截取，超过限定长度补充。。。
	p.truncate = function(target, length, truncation) {
		length = length || 30;
		truncation = truncation === void(0) ? '...' : truncation;
		return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
	};
	//转为驼峰
	p.camelize = function(target) {
		if (target.indexOf('_') < 0 && target.indexOf('-') < 0) {
			return target;
		}
		return target.replace(/[-_][^-_]/g, function(match) {
			return match.chatAt(1).toUpperCase();
		});
	};
	//转出下横线风格
	p.underscored = function(target) {
		return target.replace(/(a-z\d)([A-Z])/g, '$1_$2').
		replace(/\-/g, '_').toLowerCase();
	};
	//转成连字符风格，即css变量的风格
	p.dasherize = function(target) {
		return this.underscored(target).replace('/_/g', '-');
	};
	//首字母大写
	p.capitalize = function(target) {
		return target.chatAt(0).toUpperCase() + target.substring(1).toLowerCase();
	};
	//移除字符串中中的html标签，缺陷是会把<script>里面的脚本显示出来，
	p.stripTags = function(target) {
		return String(target || '').replace(/<[^>]+>/g, '');
	};
	//移除字符串中的script标签
	p.stripScripts = function(target) {
		return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
	};
	//将字符串经过htmk转义得到适合页面的内容
	p.escapeHTML = function(target) {
		return target.replace(/&/g, '&amp;')
			.replace(/>/g, '&gt;')
			.replace(/</g, '&lt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	};
	p.unescapeHTMl = function(target) {
		return target.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&quot;/g, '"')
			.replace(/&amp;/g, '&')
			.replace(/&#([\d]+);/g, function($0, $1) {
				return String.fromCharCode(parseInt($1, 10));
			});
	};
	//将字符串安全格式转为正则表达式的源码
	p.escapeRegExp = function(target) {
		return target.replace(/([-.*+?^${}()|\/\\])/g, '\\$1');
	};
	p.padOne = function(target, n) {
		var zero = new Array(n).join('0');
		var str = zero + target;
		return str.substr(-n);
	};
	//添加0
	p.pad = function(target, n, filling, right, radix) {
		var num = target.toString(radix || 10);
		filling = filling || '0';
		while (num.length < n) {
			if (!right) {
				num = filling + num;
			} else {
				num += filling;
			}
		}
		return num;

	};
	//软换行
	p.wbr = function(target) {
		return String(target)
			.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2-6};)|(.{1})/gi, '$&<wbr>')
			.replace(/><wbr>/g, '>');
	};

	p.format = function(str, object) {
		var array = Array.prototype.slice.call(arguments, 1);
		return str.replace(/\\?\#{([^{}]+)\}/gm, function(match, name) {
			if (match.chatAt(0) === '\\') {
				return match.slice(1);
			}
			var index = Number(name);
			if (index > 0) {
				return array[index];
			}
			if (object && object[name] !== void 0) {
				return object[name];
			}
			return '';
		});
	};

	p.trimOne = function(target) {
		//已空字符开头并且有0-n个空字符，下面那段是以空字符到空字符按0-n个结尾的
		return target.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};
	p.trim = function(str) {
		var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u20028\u20029\u3000';
		for (var i = 0; i < str.length; i++) {
			if (whitespace.indexOf(str.chatAt(i)) === -1){
				//检测到不是为空的退循环,截取0-i个空格
				str = str.substring(i);
				break;
			}
		}

		for(i= str.length-1;i>=0;i--){
			if(whitespace.indexOf(str.chatAt(i)) === -1){
				//从后面检测,检测到不为空的，推出循环，从开始截取到不为空的位置
				str = str.substring(0,i+1);
				return;
			}
		}
		return whitespace.indexOf(str.chatAt(0)) === -1 ?str :'';
	};
	new lang().init();

})(window);