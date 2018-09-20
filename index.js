let express=require("express")
var app=express();
var path=require("path");
var ejs=require("ejs")
var bodyParser=require("body-parser")
var cookieParser=require("cookie-parser")

var index=require("./web-inf/apps/index")
var MongoConnet=require("./web-inf/config/mongo")
var cors=require("cors")
app.set("views",__dirname+"/dist")
app.engine("html",ejs.__express) //将给定的模板类型设置为引擎模板
app.set("view engine","html") //设置渲染模板
app.use(express.static(path.join(__dirname,"dist")))//服务器管理静态资源
app.use(cors()); //跨域插件
// 这个bodyParser()也是express提供的一个中间件，支持urlencoded，multipart,json三种表单格式
app.use(bodyParser.json()) //可以解析json
app.use(bodyParser.urlencoded({extended:false}))

app.use(cookieParser())

app.use(index) 
new MongoConnet().connect(); //连接数据库
app.listen("8100",function(){
    console.log("项目运行在8100端口")
})

