// Node and Lilypad TEST NO. 02
// 2/ 16 / 12
//
// Toggling LEDs in the browsers

var five = require("johnny-five"),
	http = require("http"),
	fs = require("fs"),
	BASEDIR = 'public';


// set up the lilypad
var board = new five.Board(), led;

board.on("ready", function() {
	
	// Create a standard `led` hardware instance
	led = new five.Led({
	pin: 9
	});
	
	// REPL access
	board.repl.inject({
	  led: led
	});
});

// set up http server
http.createServer(function(req,res){
	if(req.url.match(/^\/lilypad\//)){ 
		var urlParts = req.url.split("/");
		var action = urlParts[urlParts.length-1];
		
		res.writeHead(200,{'content-type':'text/plain'});
		if(action === "on"){
			led.on();
			res.write('Turn Lilypad LED ON');
			console.log('Turn Lilypad LED ON');
		}else if(action === "off"){
			led.off();
			res.write('Turn Lilypad LED OFF');
			console.log('Turn Lilypad LED OFF');
		}
		res.end();
	} else { // index page
	var pathname = BASEDIR + req.url;
		fs.exists(pathname,function(exists){
			if(!exists){
				res.writeHead(404);
				res.write('Bad Request 404\n');
				res.end();
			} else {
				res.setHeader('Content-Type','text/html');
				var file = fs.createReadStream(pathname);
				file.on("open",function(){
					file.pipe(res);
				});
				file.on("error",function(err){
					console.log(err);
				});
			}
		});
	}
}).listen(8080);


