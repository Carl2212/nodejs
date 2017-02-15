/**
 * Created by Administrator on 2016/12/1.
 * 路由解析文件
 */
var fs =require('fs');
var mappingString = "";

function add_to_mapping_string(method , url , description , auth) {
    mappingString += "<div style='width : 400px ; height : 20px ;padding : 5px ; background-color : #ccc ; color : #000; font-family : Arial ,Verdana , sans-serif'><b>"+
                    method + " " +url+"</b></div><div style='width : 400px ; padding : 5px ; background-color : #eee ; color : #000;font-family: Arial,Verdana , sans-serif'"+
                    description + "<br /><b>Auth :</b>"+auth +"</dic><br />";
}
function bootController(app , file) {
    var name = file.replace('.js','');
    var actions = require('../controllers/'+name);
    var mapping = actions['mapping'];
    console.log(mapping);
    Object.keys(actions).map(function(action){
        console.log('action',action);
        var fn = actions[action];
        if(typeof(fn) === "function") {
            var a = mapping[action];
            console.log(action);
            if(a) {
                add_to_mapping_string(a.method , a.url , a.description , a.auth);
                switch (a.method) {
                    case 'get' :
                        console.log("get "+ a.url);
                        app.get(a.url , fn);
                        break;
                    case 'post' :
                        console.log("post " + a.url);
                        app.post(a.url , fn);
                        break;
                    case 'put' :
                        console.log('put ' + a.url);
                        app.put(a.url , fn);
                        break;
                    case 'delete' :
                        console.log("delete " + a.url );
                        app.del(a.url , fn);
                        break;
                }
            }else{
                console.log("WARNING: no mapping for " + action + " defined");
            }
        }
    });
}
module.exports = {
    bootControllers : function(app) {
        console.log('readdir:'+__dirname+ '/../controllers');
        fs.readdir('controllers',function(err , files) {
            if(err) throw err;
            console.log(files);
            files.forEach(function(file){
                console.log("booting controller" + file);
                if(file !='.svn')
                    bootController(app , file);
                else
                    console.log("Not booting .svn controller!");
            });
            //可查看所有接口的url ： /show_available_interfaces
            app.get("/show_available_interfaces",function(req,res){
                res.send(mappingString);
            });
            app.get('*',function(req,res){
                console.log('404 handler...');
                console.log(req.url);
                res.send('Page Not Found !404');
            })
        })
    }
};
