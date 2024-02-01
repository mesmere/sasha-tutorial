const http = require('node:http');

const server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
	res.end("Hello world!");
});

server.listen(8088);
