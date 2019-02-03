'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

var utils = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.validate = function (e) {
			if (e) e.preventDefault();

			var formElement = document.getElementById('loginForm');
			var username = document.getElementsByName('username')[0];
			var password = document.getElementsByName('password')[0];
			var errors = _this.state.errors;

			errors.result = '';

			if (username.value === '') {
				username.setAttribute('class', 'required field error');
				errors.username = 'Please enter a valid username';
			} else {
				username.setAttribute('class', 'required field');
				errors.username = '';
			}
			if (password.value === '') {
				password.setAttribute('class', 'required field error');
				errors.password = 'Please enter a valid password';
			} else {
				password.setAttribute('class', 'required field');
				errors.password = '';
			}

			_this.setState({ errors: errors });

			var valid = true;
			Object.values(_this.state.errors).forEach(function (val) {
				val !== '' && (valid = false);
			});

			// if all is valid attempt login
			if (valid) {
				formElement.setAttribute('class', 'ui loading form');
				_this.props.login({ username: username.value, password: password.value }).then(function (result) {
					if (result === 'wrong combination') {
						errors.result = 'Login unsuccessful, wrong combination';
						_this.setState({ errors: errors }, function () {
							return formElement.setAttribute('class', 'ui form error');
						});
					} else if (result === 'logged in') {
						formElement.setAttribute('class', 'ui form');
					}
				});
			} else {
				document.getElementById('loginForm').setAttribute('class', 'ui form error');
			}
		};

		_this.state = {
			errors: { username: '', password: '', result: '' }
		};
		return _this;
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'ui four wide column', id: 'registrationDiv' },
				_react2.default.createElement(
					'h3',
					{ className: 'ui dividing header' },
					'Log in to your ',
					_react2.default.createElement(
						'b',
						{ className: 'chatter-color' },
						'Chatter'
					),
					' account!'
				),
				_react2.default.createElement(
					'form',
					{ onSubmit: this.validate },
					_react2.default.createElement(
						'div',
						{ id: 'loginForm', className: 'ui form' },
						_react2.default.createElement(
							'div',
							{ className: 'required field' },
							_react2.default.createElement(
								'label',
								null,
								'Username'
							),
							_react2.default.createElement('input', { type: 'text', placeholder: 'Username', name: 'username', autoFocus: 'on', autoComplete: 'username' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'required field' },
							_react2.default.createElement(
								'label',
								null,
								'Password'
							),
							_react2.default.createElement('input', { type: 'password', placeholder: 'Password', name: 'password', autoComplete: 'off' })
						),
						_react2.default.createElement(
							'div',
							{ id: 'submit-register', className: 'ui submit button', onClick: this.validate },
							'Log In'
						),
						_react2.default.createElement(
							'div',
							{ className: 'ui error message' },
							_react2.default.createElement(
								'div',
								{ className: 'header' },
								'Please fix the errors below:'
							),
							_react2.default.createElement(
								'ul',
								{ className: 'list' },
								this.state.errors.username === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Username: ',
									this.state.errors.username
								),
								this.state.errors.password === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Password: ',
									this.state.errors.password
								),
								this.state.errors.result === '' ? '' : _react2.default.createElement(
									'li',
									null,
									this.state.errors.result
								)
							)
						)
					),
					_react2.default.createElement('button', { type: 'submit', style: { display: 'none' } })
				),
				_react2.default.createElement(
					'div',
					{ className: 'ui warning message' },
					_react2.default.createElement('i', { className: 'icon help' }),
					'Don\'t have a Chatter account yet? ',
					_react2.default.createElement(
						'a',
						{ id: 'link', onClick: this.props.goToRegistration },
						'Sign Up'
					),
					' now!'
				)
			);
		}
	}]);

	return Login;
}(_react2.default.Component);

Login.propTypes = {
	login: _propTypes2.default.func.isRequired,
	goToRegistration: _propTypes2.default.func.isRequired
};

exports.default = Login;