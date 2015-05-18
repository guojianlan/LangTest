(function(){
	var ali = document.getElementsByTagName('li');
	for(var i=0;i<ali.length;i++){
		ali[i].onclick=(function(a){
			return function(){

			}
		})(i);
	}
	console.log($('li').get(8));
})();

