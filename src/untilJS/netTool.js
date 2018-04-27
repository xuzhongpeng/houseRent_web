export default{
    install(Vue,options)
    {
         Vue.prototype.getData =  function (url,data,success,error1) {
          console.log(`******${url} `)
        
            console.log(`******${this.$http} `)
            this.$http.post("http://127.0.0.1:8080/housingrental/"+url,data,{
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
    }
  }