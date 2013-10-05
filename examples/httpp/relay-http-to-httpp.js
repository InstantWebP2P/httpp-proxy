/*
  proxy-https-to-http.js: Basic example of proxying over HTTPS to a target HTTP server

  Copyright (c) 2010 Charlie Robbins, Mikeal Rogers, Fedor Indutny, & Marak Squires.

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var httpp = require('httpp'),
    http = require('http'),
    util = require('util'),
    colors = require('colors'),
    httpProxy = require('../../lib/node-http-proxy');
    
//
// Create the target HTTPP server 
//
httpp.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello httpp over http\n');
  res.end();
}).listen(8000);

//
// Create the proxy HTTP->HTTPP server listening on port 8080
//
httpProxy.createServer({
  target: {
    httpp: true,
	host: 'localhost',
	port: 8000
  },
  httpp: false
}).listen(8080);

util.puts('http->httpp proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8080'.yellow);
