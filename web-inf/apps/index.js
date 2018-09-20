var express = require('express');
var router = express.Router();
var log=require("./log") //日志模块

router.use("/log",log)
module.exports = router;