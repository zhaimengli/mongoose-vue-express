("use strict");
import axios from "axios";
const http = {
    /**
      *  [去后台获取数据封装,post方式]
         params={
        url:"",
        reqparams:"", //obj对象
        onSuccess:"",
       onDataError:""
      * }
      */
    getData(params) {
        const time = new Date().getTime();
        axios.get(params.url, {
                params: params.reqparams,
                time:time
            })
            .then(function(response) {
              
                 const resultObj = response.data;
                if (0 != resultObj.result) {
                    if (typeof params.onDataError == "function") {
                        params.onDataError(resultObj.error);
                    } else {
                        alert(resultObj.error);
                    }
                } else {
                    if (typeof params.onSuccess == "function") {
                        params.onSuccess(resultObj.resultString);
                    }
                }
            });
    },

    /**
      *  [去后台获取数据封装,post方式]
         params={
      *   url:"",
      *   reqparams:"", //obj对象
      *   onSuccess:"",
      *   onDataError:""
      * }
      */
    getJson(params) {
        axios.get(params.url)
            .then(function(response) {
                const resultObj = response.data;
                params.onSuccess(resultObj);

            });
    },

    /**
     * [去后台获取数据封装,post方式]
     * params={
     *   url:"",
     *   reqparams:"", //obj对象
     *   onSuccess:"",
     *   onDataError:""
     * }
     */
    postData(params) {
        const time = new Date().getTime();
        axios.post(params.url+"?"+time, params.reqparams)
            .then(function(response) {
                console.log(response)
                const resultObj = response.data;
                if (0 != resultObj.result) {
                    if (typeof params.onDataError == "function") {
                        alert(resultObj.error);
                        params.onDataError(resultObj.error);
                    } else {
                        alert(resultObj.error);
                    }
                } else {
                    if (typeof params.onSuccess == "function") {
                        params.onSuccess(resultObj.resultString);
                    }
                }
            });
    },
    
    /**
     * 保存本地信息(保存到localStorage和cookie中)
     */
    setLocalStorage(name,value){
        localStorage.setItem(name,value);
        Cookies.set(name, value);
    },
    
    /**
     * 获取本地信息(先获取localStorage中数据，如果没有，就取cookie中)
     * return 返回相关值
     */
    getLocalStorage(name){
     let value=localStorage.getItem(name);
     if(value==null){
       value=Cookies.get(name)
       localStorage.setItem(name,value)
     }else{
        Cookies.set(name, value);  
     }
      return value;
    }
}

export default http;