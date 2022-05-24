import React, { Component } from 'react';

export default class EmailLoginForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			email: '',
			password: '',
			displayType: 'CHOICE_BUTTONS',
			error: props.error ? props.error : ''
		}
	}

	displayEmailLogin = () =>
	{
		this.setState({ displayType: 'EMAIL_LOGIN' })
	}

	displayEmailSignUp = () =>
	{
		this.setState({ displayType: 'EMAIL_SIGN_UP' });
	}

	onEmailChange = ( e ) =>
	{
		this.setState({ email: e.target.value });
	}

	onPasswordChange = ( e ) =>
	{
		this.setState({ password: e.target.value });
	}

	// TODO: Form Validation
	onSubmit = ( e ) =>
	{
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		if ( this.state.displayType === 'EMAIL_LOGIN' ) 
		{
			this.props.emailLogin( email, password );
		}
		if (this.state.displayType === 'EMAIL_SIGN_UP' ) 
		{
			this.props.createUserWithEmail( email, password );
			this.setState({displayType: 'EMAIL_LOGIN'});
		}
	}

	render()
	{
		const choiceButtons = (
			<div>
				<button
					className='button'
					onClick={this.displayEmailLogin}
				>
					Login with email
				</button>
				<button
					className='button--email-signup'
					onClick={this.displayEmailSignUp}
				>
					Sign up with email
				</button>
				<button
					className='button--back'
				>
					back
				</button>
			</div>
		);

		const error = '__error';
		const emailErrorName = this.state.email ? '' : error;
		const passwordErrorName = this.state.password ? '' : error;

		const loginSignUpForm = (
			<form className='form' onSubmit={ this.onSubmit }>
				{ this.props.error && <p className='form__error'>{this.props.error}</p> }
				{ this.state.error && emailErrorName && <p className='form__error'>Please enter an email</p> }
				<input 
					className={`text-input`}
					placeholder='email@example.com'
					type="text"
					value={this.state.email}
					onChange={this.onEmailChange}
				/>
				{ this.state.error && passwordErrorName && <p className='form__error'>Please enter a password</p> }
				<input
					className={`text-input`}
					placeholder='Password'
					type="password"
					value={this.state.password}
					onChange={this.onPasswordChange}
				/>
				<button className='button'>{ (this.state.displayType === 'EMAIL_SIGN_UP') ? 'Sign Up' : 'Login'}</button>
			</form>
		);

		return (
			<div>
				{ (this.state.displayType === 'CHOICE_BUTTONS') && choiceButtons }
				{ (this.state.displayType === 'EMAIL_SIGN_UP' || this.state.displayType === 'EMAIL_LOGIN') && loginSignUpForm }
			</div>
		);
	}
}
