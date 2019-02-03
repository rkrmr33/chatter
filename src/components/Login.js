import React from 'react';
import propTypes from 'prop-types';
import * as utils from '../util';

class Login extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			errors: {username: '', password: '', result: ''}
		};
	}

	validate = (e) => {
		if(e) e.preventDefault();
		
		const formElement = document.getElementById('loginForm');
		const username = document.getElementsByName('username')[0];
		const password = document.getElementsByName('password')[0];
		const errors = this.state.errors;

		errors.result = '';

		if(username.value === '') {
			username.setAttribute('class', 'required field error');
			errors.username = 'Please enter a valid username';
		}
		else {
			username.setAttribute('class', 'required field');
			errors.username = '';
		}
		if(password.value === '') {
			password.setAttribute('class', 'required field error');
			errors.password = 'Please enter a valid password';
		}
		else {
			password.setAttribute('class', 'required field');
			errors.password = '';
		}
	
		
		this.setState({errors});
		
		let valid = true;
		Object.values(this.state.errors).forEach(val => {
			val !== '' && (valid = false)
		});
		
		// if all is valid attempt login
		if(valid) {
			formElement.setAttribute('class', 'ui loading form');
			this.props.login({username: username.value, password: password.value})
				.then(result => {
					if(result === 'wrong combination') {
						errors.result = 'Login unsuccessful, wrong combination';
						this.setState({errors}, () => formElement.setAttribute('class', 'ui form error'));
					}
					else if(result === 'logged in') {
						formElement.setAttribute('class', 'ui form');
					}
				});
		}
		else {
			document.getElementById('loginForm').setAttribute('class', 'ui form error');
		}
	};
	
	render() {
		return (		
			<div className="ui four wide column" id="registrationDiv">
				<h3 className="ui dividing header">Log in to your <b className="chatter-color">Chatter</b> account!</h3>
				<form onSubmit={this.validate}>
					<div id="loginForm" className='ui form'>
						<div className="required field">
							<label>Username</label>
							<input type="text" placeholder="Username" name="username" autoFocus="on" autoComplete="username"/>
						</div>
						<div className="required field">
							<label>Password</label>
							<input type="password" placeholder="Password" name="password" autoComplete="off" />
						</div>
						<div id="submit-register" className="ui submit button" onClick={this.validate}>Log In</div>
						<div className="ui error message">
							<div className="header">Please fix the errors below:</div>
							<ul className="list">
								{ this.state.errors.username === '' ? '' : <li>Username: {this.state.errors.username}</li> }
								{ this.state.errors.password === '' ? '' : <li>Password: {this.state.errors.password}</li> }
								{ this.state.errors.result === '' ? '' : <li>{this.state.errors.result}</li> }
							</ul>
						</div>
					</div>
					<button type="submit" style={{display: 'none'}}></button>
				</form>
				<div className="ui warning message">
					<i className="icon help"></i>
					Don't have a Chatter account yet? <a id="link" onClick={this.props.goToRegistration}>Sign Up</a> now!
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	login: propTypes.func.isRequired,
	goToRegistration: propTypes.func.isRequired
};

export default Login;