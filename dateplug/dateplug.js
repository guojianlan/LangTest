/**
 * Created by guojian on 15/6/29.
 */
function dateNew(opt){
    this.opt = opt||{};
    var now = this.now = new Date();
    this.opt.startYear = this.opt.startYear ? this.opt.startYear:parseInt(now.getFullYear())-3;
    this.opt.endYear = this.opt.endYear ? this.opt.endYear:parseInt(now.getFullYear())+1;
    this.opt.endFn =  this.opt.endFn?this.opt.endFn:null;
    this.opt.title =  this.opt.title?this.opt.title:'请选择';
}
var p = dateNew.prototype;
p.createHTML = function(){
    var self = this;
    var htmlstr=['<div class="dateplug"><div class="datebg"></div><div class="datamain slideInUp animated">',
                '<section><div class="dateTitle">'+self.opt.title+'</div><div class="datamark"></div><div class="datescroll">',
                '<div id="yearwarper"><ul>'+self.createYear()+'</ul></div><div id="monthwrapper"> <ul>'+self.createMonth()+'</ul></div>',
                '<div class="zhi">至</div><div id="yearwarper2"><ul>'+self.createYear()+'</ul></div><div id="monthwrapper2"><ul>',
                self.createMonth()+'</ul></div></div> </section><footer class="dateFooter"><div class="queding">确定</div></footer></div></div>'].join('');
    //$('body').append(htmlstr);
    self.appendHTMl(htmlstr);
    self.initScroll();

    self.initY = self.Year?self.Year-this.opt.startYear:this.opt.chooseYear?this.opt.chooseYear-this.opt.startYear:parseInt((this.now.getFullYear())) -  this.opt.startYear;
    self.initM = self.Month?self.Month:this.opt.chooseMonth?this.opt.chooseMonth:((this.now.getMonth())) +1;
    var Year2 = self.Year2?self.Year2-this.opt.startYear:this.opt.chooseYear2?this.opt.chooseYear2-this.opt.startYear:this.initY;
    var Month2 = self.Month2?self.Month2:this.opt.chooseMonth2?this.opt.chooseMonth2:this.initM;
    self.yearScroll.refresh();
    self.MonthScroll.refresh();
    self.yearScroll.refresh();
    self.MonthScroll2.refresh();
    self.yearScroll.scrollBy(0, -(this.initY*40), 200);
    self.MonthScroll.scrollBy(0, -(this.initM*40)+40, 200);
    self.yearScroll2.scrollBy(0, -(Year2*40), 200);
    self.MonthScroll2.scrollBy(0, -(Month2*40)+40, 200);
    self.bindEvent();
}
p.appendHTMl = function(str){
    var abody = document.querySelector('body');
    var adiv = document.createElement('div');
    adiv.innerHTML = str;
    var fragment = document.createDocumentFragment();
    var nodes = adiv.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        fragment.appendChild(nodes[i].cloneNode(true));
    };
    abody.appendChild(fragment);
    nodes = null;
    fragment = null;
}
p.on = function(elestr,type,fn){
    var ele = document.querySelector(elestr);
    ele.addEventListener(type,fn,false);
}
p.deleteHTMl = function(){
    var self = this;
    self.yearScroll.destroy();
    self.MonthScroll.destroy();
    self.yearScroll2.destroy()
    self.MonthScroll2.destroy()
    //$('.dateplug').remove();
    document.querySelector('body').removeChild(document.querySelector('.dateplug'));
}
p.createYear =function(){
    var str = ['<li>&nbsp</li>'];
    for(var i=this.opt.startYear;i<=this.opt.endYear;i++){
        str.push('<li>'+i+"年"+'</li>');
    }
    str.push('<li>&nbsp</li>');
    return str.join('');

}
p.initScroll = function(){
    var self = this;
    self.yearScroll = self.createiscroll('#yearwarper');
    self.MonthScroll = self.createiscroll('#monthwrapper');
    self.yearScroll2 = self.createiscroll('#yearwarper2');
    self.MonthScroll2 = self.createiscroll('#monthwrapper2');
}
p.proxy = function(fn,context) {
    var tmp, args, proxy;
        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }
        if ( typeof fn != 'function') {
            return undefined;
        }
        args = [].slice.call( arguments, 2 );

        proxy = function() {
            return fn.apply( context || this, args.concat( [].slice.call( arguments ) ) );
        };
        return proxy;
};
p.bindEvent=function(){
    var self = this;
    self.yearScroll.on('scrollEnd', self.proxy(self.changeYear,self.yearScroll,self,1));
    self.MonthScroll.on('scrollEnd', self.proxy(self.changeMonth,self.MonthScroll,self,1));
    self.yearScroll2.on('scrollEnd', self.proxy(self.changeYear,self.yearScroll2,self,2));
    self.MonthScroll2.on('scrollEnd', self.proxy(self.changeMonth,self.MonthScroll2,self,2));
   
    //$('.datebg').on('click',function(){
        //self.deleteHTMl();
    //});
    self.on('.datebg','click',function(){
        self.deleteHTMl();
    });
     self.on('.queding','click',function(){
        self.deleteHTMl();
        if(self.opt.endFn){
            self.opt.endFn.apply(self);
        }
    });
    //$('.queding').on('click',function(){
    //    self.deleteHTMl();
    //        if(self.opt.endFn){
    //            self.opt.endFn.apply(self);
    //        }
    //});
}

p.changeYear=function(obj,num){
    var y = -this.y>>0;
    var year = obj.opt.startYear+y/40;
    if(num===2){
        obj.Year2 = year;
        return;
    }
    obj.Year = year;
}
p.changeMonth=function(obj,num){
    var y = -this.y>>0;
    var month = y/40+1;

    if(num===2){
        obj.Month2 = month;
        return;
    }
    obj.Month = month;
}
p.createMonth=function(){
    var str = ['<li>&nbsp</li>'];
    for(var i=1;i<=12;i++){
        str.push('<li>'+i+"月"+'</li>');
    }
    str.push('<li>&nbsp</li>');
    return str.join('');
}
p.createiscroll = function(id){
    var newScroll = new IScroll(id, {
        snap: "li",
        vScrollbar:false,
        
        momentum: false,
        scrollY:true,
        bounce:false,

      
    });
    return newScroll;
}
