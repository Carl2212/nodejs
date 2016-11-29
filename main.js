var server = require("./serve");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/body"] = requestHandlers.bodyrequire;
handle["/uploadrequire"] = requestHandlers.uploadrequire;

server.start(router.route,handle);