/**
 * 返回的数据结构
 */
class ResultIns {
    /**
     * 根据后台返回的参数，生成返回前端数据格式
     * @param {*} err 
     * @param {*} data 
     */
    create(err,data){
        var result={
            result:0,
            resultString:"",
            error:""
        }
        if(err){
           result.result=-1;
           result.error=err 
        }else{
            result.resultString=data
        }
        return result;
    }
}
module.exports=ResultIns;