/**
 * 日志级别相关函数
 */
class LogLevel {
    constructor() {

    }
    
    /**
     * 增加数据对象的中文描述
     * @param {*} items 
     */
    addLogLevelDesc(items){
      for(let i=0;i<items.length;i++){
        let item=items[i];
        item.loglevel_name=this.getLogLevelDesc(item.loglevel);
      }
    }

    /**
     * 获取日志级别中文描述
     */
    getLogLevelDesc(level) {
        
        let desc;
        switch (level) {
            case 0:
                desc = "调试"
                break;
            case 1:
                desc = "信息"
                break;
            case 2:
                desc = "异常";
                break;
            case 3:
                desc = "警告"
                break;
            case 4:
                desc = "错误"
                break;
            case 5:
                desc = "严重错误"
                break;
        }
        return desc;
    }

    /**
     * 获取日志级别列表
     */
    getLogLevelList() {
        /*日志级别*/
        const logLevel = [{
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
        return logLevel;

    }

}

module.exports=LogLevel;