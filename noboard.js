/* --------------------------------------------

noboard.js

Node and Lilypad TEST ( NO BOARD )
2/ 24 / 12
 
HTTP Server with no Lilypad Board
 	
----------------------------------------------- */

var connect = require('connect');
	

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