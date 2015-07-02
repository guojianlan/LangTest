;(function(undefined){
	//清除左右空格
	if(String.prototype.trim===undefined){
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/g,'');
		}
	}
	//数组操作,操作数组前后，[1,2,3].reduce(function(xy,y){return x+y}) =>1+2+3=6
	if(Array.prototype.reduce === undefined){
		Array.prototype.reduce = function(fn){
			//首先判断是否是空数组
			if(this === void 0 || this === null) throw new TypeError();
			var t = Object(this), //Object([1,2,3])=>[1,2,3]
			len = t.length >>>0, //1.2>>>0 =>1 1.9>>>0 =>1
			k=0,
			accumulator;
			if(typeof fn !='function') throw new TypeError();
			if(len===0 && arguments.length === 1) throw new TypeError(); //[].reduce(function(){})
			if(arguments.length >= 2){
				accumulator = arguments[1]; //第二个参数做为开始值
			}else{
				do{
					if(k in t){
						accumulator=t[k++];
						break;
					}
					if(++k>=len) throw new TypeError()
				}while(true){
					while(k<len){
						if(k in len) accumulator = fn.call(undefined,accumulator,t[k],k,t);
						k++;
					}
					return accumulator;
				}
			}
		}
	}
})()


var Zepto = (function(){
	var undefined,key,$,classList,emptyArray=[],
	slice = [].slice,//[1,2,3].slice(1,3)返回[2,3]
	filter = [].filter,//[1,2,3].filter(function(ele){return ele==1})返回true的值
	document = window.document,
	elementDisplay={},
	classCache={},
	getComputedStyle = document.defaultView.getComputedStyle,//回去元素所有的css属性
	//不用写ps的css属性
	cssNumber={
		'column-count': 1,
		'columns': 1,
		'font-weight': 1,
		'line-height': 1,
		'opacity': 1,
		'z-index': 1,
		'zoom': 1
	},
	fragmentRE = /^\s*(\w+|!)[^>]*/,//html内容正则
	tagExpanderRE = /^<(?!area|img|input|br|hr|link|meta|parma|embed|cor)/


})()