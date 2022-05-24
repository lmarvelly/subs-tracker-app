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
			formError: props.error ? props.error : ''
		}
	}

	handleBackToSignInButtons = () =>
	{
		this.props.showSignInButtons();
	}

	handleBackToEmailChoiceButtons = () =>
	{
		this.setState(
		{
			displayType: 'CHOICE_BUTTONS',
			email: '',
			formError: '',
			password: ''
		});
		this.props.clearError();
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

	isEmailValid = () =>
	{
		const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		
		if(this.state.email.match(emailPattern))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	// TODO: Form Validation
	onSubmit = ( e ) =>
	{
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		console.log('not email', !email);
		console.log('not password', !password);
		console.log('not is email valid', !this.isEmailValid());

		if ( !email || !password ) 
		{
			this.setState(() => ({ formError: 'Please check details' }));
		}
		else if ( !this.isEmailValid() ) 
		{
			this.setState(() => ({ formError: 'Please check email' }));
		}
		else
		{
			console.log('Logging in...');
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
					onClick={this.handleBackToSignInButtons}
				>
					back
				</button>
			</div>
		);

		const error = '__error';
		const emailErrorName = this.isEmailValid() ? '' : error;
		const passwordErrorName = this.state.password ? '' : error;

		const errorMessage = this.props.error ? this.props.error : this.state.formError;

		const loginSignUpForm = (
			<div>
				<form className='form' onSubmit={ this.onSubmit }>
					{ emailErrorName && <p className='form__error'>Please enter your email</p> }
					<input 
						className={`text-input`}
						placeholder='email@example.com'
						type="text"
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					{ this.state.formError && passwordErrorName && <p className='form__error'>Please enter a password</p> }
					<input
						className={`text-input`}
						placeholder='Password'
						type="password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
					{ errorMessage && <p className='form__error'>{errorMessage}</p> }
					<button className='button'>{ (this.state.displayType === 'EMAIL_SIGN_UP') ? 'Sign Up' : 'Login'}</button>
				</form>
				<button
					className='button--back'
					onClick={this.handleBackToEmailChoiceButtons}
				>
					back
				</button>
			</div>
		);

		return (
			<div>
				{ (this.state.displayType === 'CHOICE_BUTTONS') && choiceButtons }
				{ (this.state.displayType === 'EMAIL_SIGN_UP' || this.state.displayType === 'EMAIL_LOGIN') && loginSignUpForm }
			</div>
		);
	}
}
