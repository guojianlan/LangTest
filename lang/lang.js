(function(global){
	function contains(target, str ,separator){
		return separator?(separator + target + separator).indexOf(separator + str + separator) > -1:target.indexOf(str) >-1;
	}
	console.log(contains('ss','1'));
})(window);