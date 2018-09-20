/**
 * 数据库连接
 */
let  mongoose=require("mongoose")
var baseUrl="mongodb://192.168.0.147:27017/local"
class MongoConnet{
    /**
     * 数据库连接函数
     */
    connect(){
        mongoose.connect(baseUrl);
        var db=mongoose.connection;
        db.on("error",console.error.bind(console,"连接错误"))
        db.on("open",(callback)=>{
           console.log("数据库连接成功")
        })
    }
}
module.exports=MongoConnet;