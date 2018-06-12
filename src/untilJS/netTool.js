export default{
    install(Vue,options)
    {
         Vue.prototype.getData =  function (url,data,success,error1) {
        
            this.$http.post("http://localhost:8080/housingrental/"+url,data,{
                emulateJSON : true
            }).then(res=>{  
                success(res);
            }).catch(error=>{
                if(typeof(error1)=='function')
                    error1(error)
            });
       
        }
        Vue.prototype.setItem=(key,value)=>{
            localStorage.setItem(key, value);
        }
        Vue.prototype.createdID=()=>{
            return Number(new Date())
        }
        Vue.prototype.$host="http://localhost:8080/"
        Vue.prototype.$format = function(Date,format)
        {
         var o = {
         "M+" : Date.getMonth()+1, //month
         "d+" : Date.getDate(),    //day
         "h+" : Date.getHours(),   //hour
         "m+" : Date.getMinutes(), //minute
         "s+" : Date.getSeconds(), //second
         "q+" : Math.floor((Date.getMonth()+3)/3),  //quarter
         "S" : Date.getMilliseconds() //millisecond
         }
         if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
         (Date.getFullYear()+"").substr(4 - RegExp.$1.length));
         for(var k in o)if(new RegExp("("+ k +")").test(format))
         format = format.replace(RegExp.$1,
         RegExp.$1.length==1 ? o[k] :
         ("00"+ o[k]).substr((""+ o[k]).length));
         return format;
        }
    }
  }