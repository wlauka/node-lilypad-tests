/* --------------------------------------------

test04.js

Node and Lilypad TEST NO. 04
2/ 24 / 12
 
Logging sensor data to a file with Winston
 	
----------------------------------------------- */

var five = require('johnny-five'),
	winston = require('winston'),
	connect = require('connect');
	

/* set up the lilypad & logging
----------------------------------------------- */
var board = new five.Board();
winston.add(winston.transports.File,{filename:'readings.json'});

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
		winston.log('info','Sensor Reading',{milliseconds:new Date().getTime(),reading:val});
	});

}); // END board -> Ready

/* set up the HTTP Server
----------------------------------------------- */
var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.query())
  .use(function(req, res,next){
    console.log(req.query);
    next();
  })
   .use(connect.static('public'))
 .listen(4000);