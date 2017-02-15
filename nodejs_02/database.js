/**
 * Created by Administrator on 2016/11/30.
 * 数据库连接文件
 */
var util = require('util'),
    config = require('./config'),
    //mysql = require('mysql'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
mongoose.connect(config.mongodb);