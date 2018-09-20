

/**
 * 日志系统控制界面
 */
var express = require('express');
var router = express.Router();
var Logmodel = require("../modules/log");
var ResultIns = require("../common/resultins")
var pagequery = require("../common/pagequery")
var LogLevel=require("./loglevel")



//定义log
router.get('/', function (req, res) {
    res.render('index');
});
  

/**
 * 新增日志(/log/save)
 * 
 * 使用model增加一条数据
 */
router.post("/save", (req, res) => {
   var logData =JSON.parse(req.body.items);
    Logmodel.create(logData,(err, data) => {
        var result = new ResultIns().create(err, data);
        res.send(result);
    })
})

/**
 * 获取日志列表 /log/list
 */
router.get("/list", (req, res) => {
    var query = req.query;
    var page = query.pagenumber || 1;
    var content = new RegExp(query.content);
    var timeQuery;
    var pageQueryParams = {
        content: { $regex: content }
    };
    if(query.loglevel!=""&&query.loglevel!="undefined"){
       pageQueryParams.loglevel=query.loglevel;
    }
    if(query.start_date!=""&&query.start_date!="undefined"){
        if(query.end_date!=""&&query.end_date!="undefined"){
            pageQueryParams.logtime={$gte:new Date(query.start_date),$lte:new Date(query.end_date)}
        }else{
            pageQueryParams.logtime={$gte:new Date(query.start_date)}
        }
       
    }
    Logmodel.find({}, (error, data) => {
        pagequery.pageQuery(page, parseInt(query.pagesize), Logmodel, "", pageQueryParams, {
            logTime: "asc"
        }, function (err, data) {
            if(err==null){
                new LogLevel().addLogLevelDesc(data.result);    
            }
            var result = new ResultIns().create(err, data);
            res.send(result);
        })

    })
})
 

module.exports = router;