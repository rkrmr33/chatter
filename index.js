const express = require('express');

const server = express();

server.get('/', (req, res) => {
	res.send('hello world');
	res.end();
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> { console.log(`listening on port ${PORT}`); });
