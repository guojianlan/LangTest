/**
 * Created by guojian on 15/6/29.
 */
function calendar(opt){
    this.opt = opt||{};
    var now = this.now = new Date();
    this.opt.startYear = this.opt.startYear ? this.opt.startYear:parseInt(now.getFullYear())-3;
    this.opt.endYear = this.opt.endYear ? this.opt.endYear:parseInt(now.getFullYear())+1;
    this.opt.endFn =  this.opt.endFn?this.opt.endFn:null;
    this.opt.title =  this.opt.title?this.opt.title:'请选择';

}
var p = calendar.prototype;
p.createHTML = function(){
    var self = this;
    self.initNum();
    var htmlstr=['<div class="dateplug"><div class="datebg"></div><div class="datamain slideInUp animated">',
                '<section><div class="dateTitle">'+self.opt.title+'</div><div class="datamark"></div><div class="datescroll">',
                '<div id="yearwarper"><ul>'+self.createYear()+'</ul></div><div id="monthwrapper"> <ul>'+self.createMonth()+'</ul></div>',
                '<div id="daywrapper"><ul id="dayappen">'+self.createDay(self.initY,self.initM)+'</ul></div><div id="hourwrapper"><ul>'+self.createHour()+'</ul></div><div id="minutewrapper"><ul>',
                self.createMinute()+'</ul></div></div> </section><footer class="dateFooter"><div class="queding">确定</div></footer></div></div>'].join('');
    self.appendHTMl('body',htmlstr);
    self.dayobj = document.getElementById('dayappen');
    self.initScroll();
    self.yearScroll.scrollTo(0, -(this.initY*40), 200);
    self.MonthScroll.scrollTo(0, -(this.initM*40)+40, 200);
    self.DayScroll.scrollTo(0, -(this.initD*40)+40, 200);
    self.HourScroll.scrollTo(0, -(this.initH*40), 200);
    self.MinuteScroll.scrollTo(0, -(this.initMM*40), 200);
    self.bindEvent();
}
p.initNum = function(){
    var self = this;
    self.initY = self.Year?self.Year-this.opt.startYear:this.opt.chooseYear?this.opt.chooseYear-this.opt.startYear:parseInt((this.now.getFullYear())) -  this.opt.startYear;
    self.initM = self.Month?self.Month:this.opt.chooseMonth?this.opt.chooseMonth:((this.now.getMonth())) +1;
    self.initD = self.Day?self.Day:this.opt.chooseDay?this.opt.chooseDay:this.now.getDate();
    self.initH = self.Hour?self.Hour:this.opt.chooseHour?this.opt.chooseHour:this.now.getHours();
    self.initMM = self.Minute?self.Minute:this.opt.chooseMinute?this.opt.chooseMinute:this.now.getMinutes();
}
p.appendHTMl = function(ele,str){
    var abody = document.querySelector(ele);
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
p.createHour=function(){
    var str = ['<li>&nbsp</li>'];
    for(var i=0;i<=23;i++){
        if(i<10){
            str.push('<li>0'+i+'时</li>');
        }else{
            str.push('<li>'+i+'时</li>');
        }
    }
    str.push('<li>&nbsp</li>');
    return str.join('');
}
p.createMinute=function(){
    var str = ['<li>&nbsp</li>'];
    for(var i=0;i<=59;i++){
        if(i<10){
            str.push('<li>0'+i+'分</li>');
        }else{
            str.push('<li>'+i+'分</li>');
        }
    }
    str.push('<li>&nbsp</li>');
    return str.join('');
}
p.maxDay =function(year,month){
     var jan31 = [1,3,5,7,8,10,12];
     var xunhuan = 31;
     if(!~jan31.indexOf(month) && month!=2){
        xunhuan=30;
     }
     if(month==2){
        if(this.checkYear(year)){
            xunhuan=29;
        }else{
            xunhuan=28;
        }
     }
     return xunhuan;
}
p.createDay=function(year,month){
    var str = ['<li>&nbsp</li>'];
    var xunhuan = this.maxDay(year,month);
    for(var i=1;i<=xunhuan;i++){
        str.push('<li>'+i+"日"+'</li>');
    }
    str.push('<li>&nbsp</li>');
    return str.join('');
}
p.deleteHTMl = function(){
    var self = this;
    self.yearScroll.destroy();
    self.MonthScroll.destroy();
    self.DayScroll.destroy();
    self.HourScroll.destroy();
    self.MinuteScroll.destroy();
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
    self.yearScroll = new iScroll('yearwarper', {
        snap: "li",
        vScrollbar:false,
        momentum: false,
        scrollY:true,
        bounce:false,
        onScrollEnd:function(){
            var y = -this.y>>0;
            var year = self.opt.startYear+y/40;
            self.Year = year;
            self.createDayUL();
        }
    });
   self.MonthScroll = new iScroll('monthwrapper', {
        snap: "li",
        vScrollbar:false,
        momentum: false,
        scrollY:true,
        bounce:false,
        onScrollEnd:function(){
             var y = -this.y>>0;
            var month = y/40+1;
            self.Month = month;
            self.createDayUL();
        }
    });
    self.DayScroll = new iScroll('daywrapper', {
        snap: "li",
        vScrollbar:false,
        momentum: false,
        scrollY:true,
        bounce:false,
        onScrollEnd:function(){
            var y = -this.y>>0;
            var day = Math.round(y/40+1);
            self.Day = day;
        }
    });
    self.HourScroll = new iScroll('hourwrapper', {
        snap: "li",
        vScrollbar:false,
        momentum: false,
        scrollY:true,
        bounce:false,
        onScrollEnd:function(){
            var y = -this.y>>0;
            var hour = y/40;
            self.Hour = hour; 
        }
    });
    self.MinuteScroll = new iScroll('minutewrapper', {
        snap: "li",
        vScrollbar:false,
        momentum: false,
        scrollY:true,
        bounce:false,
        onScrollEnd:function(){
            var y = -this.y>>0;
            var minute = y/40;
            self.Minute = minute;
        }
    });
}
p.bindEvent=function(){
    var self = this;
    self.on('.datebg','click',function(){
        self.deleteHTMl();
    });
     self.on('.queding','click',function(){
        self.deleteHTMl();
        if(self.opt.endFn){
            self.opt.endFn.apply(self);
        }
    });
}
p.createDayUL =function(){
    this.dayobj.innerHTML=this.createDay(this.Year,this.Month);
   this.DayScroll.refresh();
   
}
p.checkYear = function(year){
    //返回1是闰年，返回0不是闰年，闰年是被4整除并且不被100整除，或者被400整除
    return ((year%4==0 && year%100 !=0) ||(year%400==0))?true:false;
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
        scrollY: true,
        momentum: false,
        probeType: 3,
        bindToWrapper:true
    });
    return newScroll;
}
p.on = function(elestr,type,fn){
    var ele = document.querySelector(elestr);
    ele.addEventListener(type,fn,false);
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
