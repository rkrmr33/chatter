'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _serverRender = require('./serverRender');

var _serverRender2 = _interopRequireDefault(_serverRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.set('view engine', 'ejs');
server.use(_bodyParser2.default.json());

var allRoutes = _serverRender.routes.map(function (route) {
	return route.path;
});

server.get(allRoutes, function (req, res) {
	(0, _serverRender2.default)(req.originalUrl).then(function (_ref) {
		var initialMarkup = _ref.initialMarkup,
			__INITIAL_DATA__ = _ref.__INITIAL_DATA__;

		res.render('index', {
			initialMarkup: initialMarkup,
			__INITIAL_DATA__: __INITIAL_DATA__ });
	});
});

server.use(_express2.default.static(__dirname + '/public'));
server.use('/api', _api2.default);

server.listen(_config2.default.PORT, _config2.default.HOST, function () {
	console.log('[+] server url is ' + _config2.default.serverUrl);
});