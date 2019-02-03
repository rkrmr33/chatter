import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import apiRouter from './api/api';
import conf from './config';
import serverRender, { routes } from './serverRender';

const server = express();

server.set('view engine', 'ejs');
server.use(bodyParser.json());
server.use(cors());

const allRoutes = routes.map(route => route.path);

server.get(allRoutes, (req, res) => {
	serverRender(req.originalUrl).then(({ initialMarkup, __INITIAL_DATA__ }) => {
		res.render('index', {
			initialMarkup,
			__INITIAL_DATA__ }
		);
	});
});

server.use(express.static(__dirname + '/public'));
server.use('/api', apiRouter);

server.listen(conf.PORT, conf.HOST, () => {
	console.log(`[+] server is listening on port ${conf.PORT}`);
});
