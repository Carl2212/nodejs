/**
 * Created by Administrator on 2016/11/25.
 */
function route(handle,pathname,request,response,postData) {
    if(typeof handle[pathname] === 'function'){
        return handle[pathname](request,response,postData);
    } else{
        console.log("No request handler found for" + pathname);
        response.writeHead(200,{"Content-Type" : "text/plain"});
        response.write("404 not found");
        response.end();
    }
}
exports.route = route;