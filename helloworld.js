var http = require("http");
http.createServer(function(req,res){
	res.writeHead(200,{'content-type':'text/plain'});
	res.end("Hello from a Node World!\n");
}).listen(4000);
console.log("Server Running on 4000");