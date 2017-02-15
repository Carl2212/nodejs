/**
 * Created by Administrator on 2016/11/30.
 * 项目入口
 */
var config = require('./config'),
    appserver = require('./appserver.js'),
    log = require('./logger.js'),
    tsweb = appserver.app,
    fs = require('fs');

process.on("uncaughtException",function(err){
    log.logger.error('--['+(new Date).toUTCString() + '] 未处理错误事件 ： '+(err.stack || err));
});
process.on('exit',function(){
    log.logger.info('SYSTEM--['+(new Date).toUTCString() + ']  ： 系统退出，goodbye');

});
process.on('SIGINT',function(){
    log.logger.info('SYSTEM--['+(new Date).toUTCString() + ']  ： system is killed, and now exit !');
    process.exit();
});
//设置跨域访问
//tsweb.all('*', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//    res.header("X-Powered-By",' 3.2.1')
//    res.header("Content-Type", "application/json;charset=utf-8");
//    next();
//});

tsweb.listen(config.serverPort);