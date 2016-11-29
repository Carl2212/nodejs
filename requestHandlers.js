/**
 * Created by Administrator on 2016/11/25.
 */
var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");
var util = require("util");
function start(request,response) {
    console.log("Request handler 'start' was called" );
    exec("find /",function(error,stdout,stderr){
        response.writeHead(200,{"Content-Type" : "text/plain"});
        response.write(stdout);
        response.end();
    })
}
function bodyrequire(request,response , postData) {
    console.log("Request handler 'body' was called" );
    var body = '<html><head><meta http-equiv="content-type" content="text/html;" charset="utf-8"></head>'+
                '<body>Hello world ~~<br>'+
                '<form action="/upload" method="post"><textarea name="text" rows="20" cols="60"></textarea>'+
                '<input type="checkbox" name="chbx" value="111">111<br><input type="checkbox" name="chbx" value="222">222'+
                '<input type="submit" value="submie">'+
                '</form>'+
                '</body>'+
                '</html>'
    response.writeHead(200,{"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}
function uploadrequire(request,response , postData) {
    console.log("Request handler 'body' was called" );
    var body = '<html><head><meta http-equiv="content-type" content="text/html;" charset="utf-8"></head>'+
        '<body>Hello world ~~<br>'+
        '<form action="/upload" enctype="multipart/form-data" method="post"><textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="checkbox" name="chbx" value="111">111<br><input type="checkbox" name="chbx" value="222">222'+
        '<input type="submit" value="submie">'+
        '</form>'+
        '</body>'+
        '</html>'
    response.writeHead(200,{"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}
function upload(request,response, postData) {
    console.log("Request handle 'upload' was called");
    //response.writeHead(200,{"Content-Type" : "text/plain"});
    //response.write("hello upload,you send the text : "+querystring.parse(postData).text+'you choose is :'+querystring.parse(postData).chbx);
    //response.end();
    var form = new formidable.IncomingForm();
    form.uploadDir='tmp';
    form.parse(request , function(err , fields , files){
        console.log(util.inspect({fields : fields , files : files}));
        fs.renameSync(files.upload.path, "./tmp/test.png");
        response.writeHead(200 , {'content-type' : 'text/html'});
        response.write("hello upload,you send the text : "+fields.text+'you choose is :'+fields.chbx);
        response.write('received upload :\n\n');
        response.write('<img src="/show">');
        response.end();//
    });
}
function show(request,response, postData) {
    console.log("Request handle 'show' was called");
    fs.readFile("./tmp/test.png","binary",function(error , file){
        if(error) {
            response.writeHead(500,{"Content-Type" : "text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type" : "image/png"});
            response.write(file,"binary");
            response.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.bodyrequire = bodyrequire;
exports.uploadrequire = uploadrequire;
