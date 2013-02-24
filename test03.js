/* --------------------------------------------

test02.js

Node and Lilypad TEST NO. 02
2/ 23 / 12
 
Getting the strech sensor to work with johnny-five!
 	
----------------------------------------------- */

var five = require('johnny-five'),
	connect = require('connect');
	

/* set up the lilypad
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