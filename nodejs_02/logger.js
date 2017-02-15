/**
 * Created by Administrator on 2016/11/30.
 * 日志打印工具
 */
var winston = require('winston');
var util = require('util');
var logger = exports.logger = new winston.Logger({
    transports : [
        new winston.transports.Console(),
        new winston.transports.File({filename : './logs/nodejs_02.log'})
    ]
});