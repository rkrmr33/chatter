import React from 'react';
import propTypes from 'prop-types';

const isLoggedIn = (user, goToLogin, goToRegistration, logout) => {
	if(user) {
		return (
			<div className="right menu">
				<a className="ui item" onClick={logout}>Log out</a>
				<a className="ui item">
					<div id="userLabel" className="ui horizontal label" style={{backgroundColor: `#${user.specialColor}`, color: 'white'}}>{user.username}</div>
				</a>
			</div>
		);
	}
	return (
		<div className="right menu">
			<a className="ui item" onClick={goToRegistration}>Sign up</a>
			<a className="ui item" onClick={goToLogin}>Log in</a>
		</div>
	);
};

const Header = ({user, goToChatter, goToRegistration, goToLogin, logout}) => (
	<div id="header-div" className="sixteen wide column">
		<div id="header-menu" className="ui secondary pointing menu">
			<a className="active item" onClick={goToChatter}>
				<span>
					<img id="header-icon" src="/assets/chatter-icon.ico"></img>
				Chatter
				</span>
			</a>
			<a className="item">
				Chats
			</a>
			{ isLoggedIn(user, goToLogin, goToRegistration, logout) }
		</div>
	</div>);

Header.propTypes = {
	user: propTypes.object,
	goToChatter: propTypes.func.isRequired,
	goToRegistration: propTypes.func.isRequired,
	goToLogin: propTypes.func.isRequired,
	logout: propTypes.func.isRequired
};

export default Header;