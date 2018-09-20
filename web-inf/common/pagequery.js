var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var async = require("async")
var ResultIns = require("../common/resultins")
var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    }
    async.parallel({
        count: function (done) {
            Model.countDocuments(queryParams).exec((err, data) => {
                done(err, data)
            })
        },
        records: function (done) {
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec((err, doc) => {
                done(err, doc)
             })


        }

    }, function (err, result) {
        if(err){
            callback(err)
        }else{
            var count = result.count;
            $page.pageCount = parseInt((count - 1) / pageSize)+1;
            if($page.pageCount==0){
                $page.pageCount=1;
            }
            $page.count=count;
            $page.pageSize=pageSize;
            $page.result = result.records;
          //  var result = new ResultIns().create(err, $page)
            callback(err,$page)
        }
      
    })
}
module.exports ={
    pageQuery:pageQuery
} 