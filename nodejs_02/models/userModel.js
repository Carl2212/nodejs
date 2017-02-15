/**
 * Created by Administrator on 2016/12/1.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    crypto = require('crypto');

function variable() {
    var a = 0;
    return function(num){
        console.log(num);
        if(num) {
            a = num;
        }
        return a;
    }
}
var saveN = variable();



var UserSchema = new Schema({
    loginName : {type:String,required : true,index:true},
    realName : String,
    password : String,
    phone : String,
    email : String,
});
mongoose.model("User",UserSchema);
var User = exports.User = mongoose.model('User');
var UserDao = exports.UserDao = {
    delAllData : function(cb) {
        User.remove({},function(err){
            cb(err);
        });
    },
    addDefaultData : function(cb) {
        var m = new User();
        m.loginName = 'admin';
        m.realName="系统管理员";
        m.password = crypto.createHash('md5').update('admin').digest('base64');
        m.phone = '10086';
        m.email = 'test@163.com';
        m.save();
    },
    waiting : function() {
        var t = new Date();
        var num = t.getMilliseconds();
        setTimeout(function(){
            saveN(num);
        },3000);
        console.log(typeof saveN);
        console.log(saveN());
        return saveN();
    },
};
User.find(function(err , user){
    if(err) {
        console.log('无法查询用户数据'+err);
    }else{
        if(user.length == 0) {
            UserDao.addDefaultData();
        }
    }
});
