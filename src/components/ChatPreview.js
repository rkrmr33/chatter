'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatPreview = function (_React$Component) {
	_inherits(ChatPreview, _React$Component);

	function ChatPreview() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ChatPreview);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatPreview.__proto__ || Object.getPrototypeOf(ChatPreview)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			_this.props.onChatClick(_this.props._id);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ChatPreview, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'item', onClick: this.handleClick },
				_react2.default.createElement('img', { className: 'ui avatar image chat-preview-icon', src: this.props.chatImage }),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'div',
						{ className: 'header' },
						_react2.default.createElement(
							'span',
							null,
							this.props.chatName
						)
					),
					this.props.chatDescription
				),
				_react2.default.createElement(
					'div',
					{ className: 'right floated content' },
					_react2.default.createElement(
						'span',
						{ className: 'usersCount' },
						this.props.users.length,
						' '
					),
					_react2.default.createElement('i', { className: 'user circle icon' })
				)
			);
		}
	}]);

	return ChatPreview;
}(_react2.default.Component);

ChatPreview.propTypes = {
	_id: _propTypes2.default.string,
	chatName: _propTypes2.default.string,
	chatDescription: _propTypes2.default.string,
	chatImage: _propTypes2.default.string,
	onChatClick: _propTypes2.default.func,
	users: _propTypes2.default.array
};

exports.default = ChatPreview;