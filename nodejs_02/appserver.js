/**
 * Created by Administrator on 2016/11/30.
 * 系统初始化文件
 */
var express = require('express'),
    connect = require('connect'),
    controller = require('./util/controller'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    logger = require('morgan');

var app_version = "0.0.1";
var app = exports.app = express();

    //app.configure(function(){
    app.set('view engine' , 'html');
    app.engine('html',ejs.renderFile);
    app.set('view options' , {layout : false});
    //app.use(connect.favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    //app.use(express.session({key: 'sid',cookie: { secure: 'true', maxAge:86400000 }}))
    app.use(methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/views'));

    //使用controller.js的bootControllers方法进行路由匹配
    controller.bootControllers(app);

    console.log("node_song   mvc version " + app_version + " now running on port " + config.serverPort);
//});