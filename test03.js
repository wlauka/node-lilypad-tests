/* --------------------------------------------

test03.js

Node and Lilypad TEST NO. 03
2/ 23 / 12
 
Printing Sensor Data to the Screen
 	
----------------------------------------------- */

var http = require('http'),
	five = require('johnny-five'),
	connect = require('connect'),
	io = require('socket.io');
	
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
	socket.emit('sensor', {output: '<span class="green">Connected</span>. Listening for Sensor Data...'});

});

/* Set Up the Lilypad
----------------------------------------------- */
var board = new five.Board();

board.on("ready",function(){
	
	// Create strech sensor
	cord = new five.Sensor({
		pin:'A0',
		freq:'250'
	});
	
	board.repl.inject({
	cord: cord
	});

	cord.on('read', function(err, val){
		console.log(val);
		var out = val;
		if(val < 930) out = '<span class="icon-ok">'+val+'</span>';
		sio.sockets.emit('sensor',{output:out});
	});

}); // END board -> Ready 
