var http = require("http");
var url = require("url");
var util = require("util");
//var router = require("router");
function start(route,handle) {
    function onRequest(request , response){
        var pathname = url.parse(request.url).pathname;
        var postData = "";
        //request.setEncoding("utf8");
        //request.addListener("data",function(postDataChunk){
        //    postData +=postDataChunk;
        //});
        //request.addListener("end",function(){
        route(handle,pathname,request,response,postData);
        //});
        //response.writeHead(200,{"Content-Type" : "text/plain"});
        //response.write(a);
        //response.end();
    }
    http.createServer(onRequest).listen(8888);
}
exports.start = start;
