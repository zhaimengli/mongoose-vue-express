/**
 * 日志schema定义（表结构）
 */
let  mongoose=require("mongoose"),
Schema=mongoose.Schema;

var logSchema=new Schema({ 
    //id:Schema.Types.ObjectId,
    logtype :{type:Number}, 
    logtype_name :{type:String} , 
    loglevel :{type:Number,index:true},  //loglevel 日志级别
    loglevel_name : {type:String}, //日志级别中文描述
    tag : {type:String},  //标签
    content : {type:String,index:true},  //日志内
    unitid :{type:String} ,  //所在单位
    unitname : {type:String},  
    writerid : {type:String}, //操作人
    writername :{type:String,index:true}, 
    logtime :{type:Date,index:true}, 
    dbcreate_time :{type:Date,default:Date.now}
})
var logmodel=mongoose.model("log",logSchema);

module.exports=logmodel;





