/* --------------------------------------------

test05.js

Node and Lilypad TEST NO. 05
2/ 24 / 12
 
Visualizing Sensor Data in the Browser
 	
----------------------------------------------- */

var http = require('http'),
	five = require('johnny-five'),
	connect = require('connect'),
	io = require('socket.io');

var freq = 120;
	
/* set up the HTTP Server
----------------------------------------------- */
var app = http.createServer(
  connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.query())
  .use(function(req, res,next){
    console.log(req.query);
    next();
  })
  .use(connect.static('public'))
);

var sio = io.listen(app); 
app.listen(4000);

/* Monitor Socket Communication
----------------------------------------------- */

sio.on('connection', function(socket) {
	socket.emit('info', {'output': 'Connected. Listening for Sensor Data.. freq '+freq,'freq':freq});

});

/* Set Up the Lilypad
----------------------------------------------- */
var board = new five.Board();

board.on("ready",function(){
	
	// Create strech sensor
	cord = new five.Sensor({
		pin:'A0',
		freq:freq
	});
	
	board.repl.inject({
	cord: cord
	});

	cord.on('read', function(err, val){
		console.log(val);
		sio.sockets.emit('sensor',{output:val});
	});

}); // END board -> Ready 
