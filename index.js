const express = require('express');

const server = express();

server.get('/', (req, res) => {
	res.send('hello world');
	res.end();
});

server.listen(3000, ()=> { console.log('listening on port 8080'); });
