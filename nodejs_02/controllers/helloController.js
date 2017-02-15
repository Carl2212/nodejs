/**
 * Created by Administrator on 2016/12/1.
 */
var config = require('../config'),
    log = require('../logger.js'),
    db = require('../database.js');
var userModel = require('../models/userModel.js');

module.exports = {
    mapping : {
        "Hello" : {
            "url" : "/test",
            "method" : "get",
            "description" : "简单的hello world 例子",
            "auth" :false
        },
        "TestUser" : {
            "url" : "/testUser",
            "method" : "get",
            "description" : "操作User表",
            "auth" : false
        },
        "TestBigData" : {
            "url" : "/testbigdata",
            "method" : "get",
            "description" : "操作User表",
            "auth" : false
        },
        "TestHttp" : {
            "url" : "/testHttp",
            "method" : "get",
            "description" : "操作User表",
            "auth" : false
        }
    },

    Hello : function(req,res) {
        console.log("hello world!!");
        res.render('./test.html',{
            title : config.title,
            text : "Hello world"
        });
    },
    TestHttp :function(req,res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.type('text/javascript');
        res.json({code : 1 , msg : '成功请求'});
    },
    TestBigData : function(req,res){
      res.render('./testBigData');
    },
    TestUser : function(req, res) {
        console.log('TestUser!!');
        res.header("Access-Control-Allow-Origin", "*");
        var loginName = "admin";
        userModel.User.findOne({loginName : loginName},function(err,results){
            var text = "";
            if(results) {
                console.log("find admin!!");
                log.logger.info("find admin success");
                text = "find admin success";
            }else{
                console.log("not found!");
                text = "not found";
            };
            var data = userModel.UserDao.waiting();
            res.json({code : 1 , msg : '成功请求'+data});
            //res.render('./test.html',{title : '111',text : text});
        });

    },

}