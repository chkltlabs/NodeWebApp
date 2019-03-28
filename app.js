//We need a simple way to look at a users badge count and JS points from a web browser
//Solution: Use node.js to perform the profile lookups and serve our templates via http

let router = require('./router.js');
//Create a web server

let http = require('http');
http.createServer(function (request, response) {
   router.home(request, response);
   router.user(request, response);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');




