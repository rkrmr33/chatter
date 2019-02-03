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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nameRegex = RegExp('^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$');
var usernameRegex = RegExp('[a-zA-Z][a-zA-Z0-9_]{5,31}');
var emailRegex = RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
var passwordRegex = RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Za-z])([a-zA-Z0-9\%\!\#\^\&\@_]){8,30}$');

var Registration = function (_React$Component) {
	_inherits(Registration, _React$Component);

	function Registration(props) {
		_classCallCheck(this, Registration);

		var _this = _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).call(this, props));

		_this.validate = function (_ref) {
			var formErrors = _ref.formErrors,
			    rest = _objectWithoutProperties(_ref, ['formErrors']);

			var valid = true;

			Object.values(formErrors).forEach(function (val) {
				val.length > 0 && (valid = false); // if the error val len is more the 0 than the second operation will execute.
			});

			Object.keys(rest).forEach(function (key) {
				if (rest[key] === '' && formErrors[key] === '') {
					valid = false;
					formErrors[key] = 'is required';
					_this.setState({ formErrors: formErrors });
				}
			});

			return valid;
		};

		_this.handleSubmit = function (e) {
			e.preventDefault();

			if (_this.validate(_this.state)) {
				var formElement = document.getElementById('registerForm');
				formElement.setAttribute('class', 'ui loading form');
				var user = {
					firstName: _this.state.firstName,
					lastName: _this.state.lastName,
					email: _this.state.email,
					username: _this.state.username,
					password: _this.state.password1
				};
				utils.createAccount(user).then(function (result) {
					if (result.status === 'account created') {
						formElement.setAttribute('class', 'ui form success');
						_this.props.login(result.user);
					} else {
						formElement.setAttribute('class', 'ui form warning');
					}
				});
			} else {
				var _formElement = document.getElementById('registerForm');
				_formElement.setAttribute('class', 'ui form error');
			}
		};

		_this.checkUsername = function (e) {
			_this.handleChange(e);

			var formErrors = _this.state.formErrors;
			if (formErrors.username === '') {
				utils.checkUsername(e.target.value).then(function (result) {
					formErrors.username = result ? '' : 'This username is taken. Please choose another one.';
					_this.setState({ formErrors: formErrors });
				});
			}
		};

		_this.handleChange = function (e) {
			e.preventDefault();

			var _e$target = e.target,
			    name = _e$target.name,
			    value = _e$target.value;

			var formErrors = _this.state.formErrors;

			switch (name) {
			case 'firstName':
				formErrors.firstName = nameRegex.test(value) ? '' : 'cannot contain numbers, spaces or special characters!';
				if (formErrors.firstName === '') formErrors.firstName = value.length > 1 ? '' : 'minimum 2 characters required!';
				break;

			case 'lastName':
				formErrors.lastName = nameRegex.test(value) ? '' : 'cannot contain numbers, spaces or special characters!';
				if (formErrors.lastName === '') formErrors.lastName = value.length > 1 ? '' : 'minimum 2 characters required!';
				break;

			case 'email':
				formErrors.email = emailRegex.test(value) ? '' : 'invalid email address!';
				break;

			case 'username':
				formErrors.username = value.length > 5 ? '' : 'needs to be at least 6 characters long!';
				if (formErrors.username === '') formErrors.username = usernameRegex.test(value) ? '' : 'can contain only letters, numbers and the \'_\' character!';
				break;

			case 'password1':
				formErrors.password1 = value.length > 7 ? '' : 'needs to be at least 8 characters long!';
				if (formErrors.password1 === '') formErrors.password1 = passwordRegex.test(value) ? '' : 'needs to contain a combination of at least 8 letters and numbers.';
				break;

			case 'password2':
				formErrors.password2 = value === _this.state.password1 ? '' : 'does not match the password';
				if (formErrors.password2 === '') formErrors.password2 = value.length > 0 ? '' : 'please enter confirmation password';
				break;
			}

			var valid = true;
			Object.values(formErrors).forEach(function (val) {
				val !== '' && (valid = false);
			});
			if (valid) {
				var formElement = document.getElementById('registerForm');
				formElement.setAttribute('class', 'ui form');
			}

			_this.setState(_defineProperty({ formErrors: formErrors }, name, value));
		};

		_this.state = {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password1: '',
			password2: '',
			formErrors: {
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password1: '',
				password2: ''
			}
		};
		return _this;
	}

	_createClass(Registration, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'ui seven wide column', id: 'registrationDiv' },
				_react2.default.createElement(
					'form',
					{ onSubmit: this.handleSubmit },
					_react2.default.createElement(
						'div',
						{ className: 'ui form', id: 'registerForm' },
						_react2.default.createElement(
							'h3',
							{ className: 'ui dividing header chatter-color' },
							'Create a new ',
							_react2.default.createElement(
								'b',
								{ className: 'chatter-color' },
								'Chatter'
							),
							' account'
						),
						_react2.default.createElement(
							'div',
							{ className: 'required field' },
							_react2.default.createElement(
								'label',
								null,
								'Name'
							),
							_react2.default.createElement(
								'div',
								{ className: 'two fields' },
								_react2.default.createElement(
									'div',
									{ className: this.state.formErrors.firstName === '' ? 'field' : 'field error' },
									_react2.default.createElement('input', { type: 'text', placeholder: 'first name', name: 'firstName', onChange: this.handleChange })
								),
								_react2.default.createElement(
									'div',
									{ className: this.state.formErrors.lastName === '' ? 'field' : 'field error' },
									_react2.default.createElement('input', { type: 'text', placeholder: 'last name', name: 'lastName', onChange: this.handleChange })
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'two fields' },
							_react2.default.createElement(
								'div',
								{ className: this.state.formErrors.email === '' ? 'required field' : 'required field error' },
								_react2.default.createElement(
									'label',
									null,
									'Email'
								),
								_react2.default.createElement('input', { type: 'email', placeholder: 'joe@schmoe.com', name: 'email', onChange: this.handleChange })
							),
							_react2.default.createElement(
								'div',
								{ className: this.state.formErrors.username === '' ? 'required field' : 'required field error' },
								_react2.default.createElement(
									'label',
									null,
									'Username'
								),
								_react2.default.createElement('input', { type: 'text', placeholder: 'username', name: 'username', onChange: this.checkUsername })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'required field' },
							_react2.default.createElement(
								'label',
								null,
								'Password'
							),
							_react2.default.createElement(
								'div',
								{ className: 'two fields' },
								_react2.default.createElement(
									'div',
									{ className: this.state.formErrors.password1 === '' ? 'field' : 'field error' },
									_react2.default.createElement('input', { type: 'password', placeholder: 'password', name: 'password1', onChange: this.handleChange })
								),
								_react2.default.createElement(
									'div',
									{ className: this.state.formErrors.password2 === '' ? 'field' : 'field error' },
									_react2.default.createElement('input', { type: 'password', placeholder: 'confirm password', name: 'password2', onChange: this.handleChange })
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ id: 'submit-register', className: 'ui submit button', onClick: this.handleSubmit },
							'Create Account'
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
								this.state.formErrors.firstName === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'First Name: ',
									this.state.formErrors.firstName
								),
								this.state.formErrors.lastName === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Last Name: ',
									this.state.formErrors.lastName
								),
								this.state.formErrors.email === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Email: ',
									this.state.formErrors.email
								),
								this.state.formErrors.username === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Username: ',
									this.state.formErrors.username
								),
								this.state.formErrors.password1 === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Password: ',
									this.state.formErrors.password1
								),
								this.state.formErrors.password2 === '' ? '' : _react2.default.createElement(
									'li',
									null,
									'Confirmation password: ',
									this.state.formErrors.password2
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'ui warning message' },
							_react2.default.createElement(
								'div',
								{ className: 'header' },
								'Your account was not created due to a server error. Please reload this page and try again.'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'ui success message' },
							_react2.default.createElement(
								'div',
								{ className: 'header' },
								'Sign up complete!'
							),
							_react2.default.createElement(
								'p',
								null,
								'Welcome to ',
								_react2.default.createElement(
									'b',
									{ className: 'chatter-color' },
									'Chatter'
								),
								'! Now go ahead and chat!'
							)
						)
					),
					_react2.default.createElement('button', { type: 'submit', style: { display: 'none' } })
				),
				_react2.default.createElement(
					'div',
					{ className: 'ui warning message' },
					_react2.default.createElement('i', { className: 'icon help' }),
					'Already signed up? ',
					_react2.default.createElement(
						'a',
						{ id: 'link', onClick: this.props.goToLogin },
						'Log in here'
					),
					' instead.'
				)
			);
		}
	}]);

	return Registration;
}(_react2.default.Component);

Registration.propTypes = {
	login: _propTypes2.default.func.isRequired,
	goToLogin: _propTypes2.default.func.isRequired
};

exports.default = Registration;