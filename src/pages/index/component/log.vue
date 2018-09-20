<template>
<div>
    
    <el-form style="margin-top:10px;">
        <el-date-picker v-model="start_date" type="datetime" placeholder="选择开始时间" default-time="12:00:00">
        </el-date-picker>
        <el-date-picker v-model="end_date" type="datetime" placeholder="选择开始时间" default-time="12:00:00">
        </el-date-picker>
        <el-input v-model="content" placeholder="请输入需要查询的日志内容"  style="width:220px"/>
        <el-select v-model="loglevel">
          <el-option v-for="item in levelItems" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <input type="button" value="新增" @click="saveLog" />
        <input type="button" value="查询" @click="getLogList" />
    </el-form>
    <el-table :data="items">
        <el-table-column prop="content" label="日志内容"></el-table-column>
        <el-table-column prop="loglevel_name" label="日志级别"></el-table-column>
        <el-table-column prop="writername" label="操作人"></el-table-column>
        <el-table-column prop="logtime" label="时间"></el-table-column>
    </el-table>

    <div class="block">
        <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
const fs=require("fs")
export default {
  data() {
    return {
      items: [],
      pagenumber: "",
      total: 10,
      count: "",
      pagesize: 10,
      content: "",
      start_date: "",
      end_date: "",
      loglevel:3
     
    };
  },
  mounted() {
    this.getLogList();
    this.getLogLevelItem();
   // this.test();
  },
  methods: {
    test(){
      console.log(fs)
      
      fs.readFile("./test.json","utf-8",function(err,data){
        debugger
        if(err) throw err;
        console.log(data,1)

      })

      var readFile=require("fs-readfile-promise");                                        n
    },
    /**
     * 第几页
     */
    handleCurrentChange(val) {
      this.pagenumber = val;
      this.getLogList();
    },
    /**
     * 获取日志页面
     */
    getLogList() {
      var that = this;
 
      var params = {
        url: "/log/list",
        reqparams: {
          start_date: this.start_date,
          end_date: this.end_date,
          content: this.content,
          pagesize: this.pagesize,
          pagenumber: this.pagenumber,
          loglevel:this.loglevel=="-1"?"":parseInt(this.loglevel)
        },
        onSuccess(data) {
          that.items = data.result;
          that.total = data.count;
        }
      };
      this.$http.getData(params);
    },
    
   /**
    * 保存日志
    */
    saveLog() {
      var that = this;
     var items=[{
          logtype: 2,
          logtype_name: "操作日志",
          loglevel: 3, //loglevel 日志级别
          tag: "标签", //标签
          content: "翟梦验收了台账（12q12）", //日志内
          writername: "张建立",
          id: "",
          logtime:new Date
     },{
          logtype: 2,
          logtype_name: "操作日志",
          loglevel: 3, //loglevel 日志级别
          tag: "标签", //标签
          content: "宅立验收了台账（12q12）", //日志内
          writername: "张建立",
          id: "",
          logtime:new Date
     }];
      var params = {
        url: "/log/save",
        reqparams:{
         items:JSON.stringify(items)
        },
        onSuccess(data) {
          that.getLogList();
        }
      };
      this.$http.postData(params);
     },

    getLogLevelItem(){
        const logLevel = [{
            text: "请选择",
            value:-1
        },{
            text: "调试",
            value: 0
        }, {
            text: "信息",
            value: 1
        }, {
            text: "异常",
            value: 2
        }, {
            text: "警告", //表明会出现潜在错误的情形。
            value: 3
        }, {
            text: "错误", //指出虽然发生错误事件，但仍然不影响系统的继续运行
            value: 4
        }, {
            text: "严重错误",//出每个严重的错误事件将会导致应用程序的退出。
            value: 5
        }]
       this.levelItems=logLevel;
       this.loglevel=3;
    }
  }
};
</script>
