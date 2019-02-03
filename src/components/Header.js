'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isLoggedIn = function isLoggedIn(user, goToLogin, goToRegistration, logout) {
	if (user) {
		return _react2.default.createElement(
			'div',
			{ className: 'right menu' },
			_react2.default.createElement(
				'a',
				{ className: 'ui item', onClick: logout },
				'Log out'
			),
			_react2.default.createElement(
				'a',
				{ className: 'ui item' },
				_react2.default.createElement(
					'div',
					{ id: 'userLabel', className: 'ui horizontal label', style: { backgroundColor: '#' + user.specialColor, color: 'white' } },
					user.username
				)
			)
		);
	}
	return _react2.default.createElement(
		'div',
		{ className: 'right menu' },
		_react2.default.createElement(
			'a',
			{ className: 'ui item', onClick: goToRegistration },
			'Sign up'
		),
		_react2.default.createElement(
			'a',
			{ className: 'ui item', onClick: goToLogin },
			'Log in'
		)
	);
};

var Header = function Header(_ref) {
	var user = _ref.user,
	    goToChatter = _ref.goToChatter,
	    goToRegistration = _ref.goToRegistration,
	    goToLogin = _ref.goToLogin,
	    logout = _ref.logout;
	return _react2.default.createElement(
		'div',
		{ id: 'header-div', className: 'sixteen wide column' },
		_react2.default.createElement(
			'div',
			{ id: 'header-menu', className: 'ui secondary pointing menu' },
			_react2.default.createElement(
				'a',
				{ className: 'active item', onClick: goToChatter },
				_react2.default.createElement(
					'span',
					null,
					_react2.default.createElement('img', { id: 'header-icon', src: '/assets/chatter-icon.ico' }),
					'Chatter'
				)
			),
			_react2.default.createElement(
				'a',
				{ className: 'item' },
				'Chats'
			),
			isLoggedIn(user, goToLogin, goToRegistration, logout)
		)
	);
};

Header.propTypes = {
	user: _propTypes2.default.object,
	goToChatter: _propTypes2.default.func.isRequired,
	goToRegistration: _propTypes2.default.func.isRequired,
	goToLogin: _propTypes2.default.func.isRequired,
	logout: _propTypes2.default.func.isRequired
};

exports.default = Header;