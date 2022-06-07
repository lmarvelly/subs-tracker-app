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

	resetState = () =>
	{
		this.setState(
		{
			displayType: 'CHOICE_BUTTONS',
			email: '',
			formError: '',
			password: ''
		});
	}

	handleBackToSignInButtons = () =>
	{
		this.props.showSignInButtons();
	}

	handleBackToEmailChoiceButtons = () =>
	{
		this.resetState();
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

	displayResetPassword = () =>
	{
		this.setState({ displayType: 'RESET_PASSWORD' });
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

	// TODO: Refactor submits into one using displayType to tell which options to use
	onLoginSignUpSubmit = ( e ) =>
	{
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		if ( !email || !password ) 
		{
			this.setState(() => ({ formError: 'Please check details' }));
		}
		else if ( !this.isEmailValid() ) 
		{
			this.setState(() => ({ formError: 'Please check your email' }));
		}
		else
		{
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

	onResetEmailSubmit = ( e ) =>
	{
		e.preventDefault();
		const email = this.state.email;

		// TODO: error message not showing
		if ( !email ) 
		{
			this.setState(() => ({ formError: 'Please check details' }));
		}
		else if ( !this.isEmailValid() ) 
		{
			this.setState(() => ({ formError: 'Please check email' }));
		}
		else
		{
			console.log('Reset Password');
			this.props.resetPassword( this.state.email );
			this.resetState();
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
					className='button--reset'
					onClick={this.displayResetPassword}
				>
					reset password
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
		const backButton = (
			<button
				className='button--back'
				onClick={this.handleBackToEmailChoiceButtons}
			>
				back
			</button>
		);

		const formErrorMessage = (emailErrorName && <p className='form__error'>Please enter a valid email</p>)
		const emailInput = (
			<input 
				className={`text-input`}
				placeholder='email@example.com'
				type="text"
				value={this.state.email}
				onChange={this.onEmailChange}
			/>);

		// TODO: Add validation if password is blank
		const loginSignUpForm = (
			<div>
				<form className='form' onSubmit={ this.onLoginSignUpSubmit }>
					{ formErrorMessage }
					{ emailInput }
					{ passwordErrorName && <p className='form__error'>Please enter a password</p> }
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
				{ backButton }
			</div>
		);

		const resetPasswordForm = (
			<div>
				<form className='form' onSubmit={this.onResetEmailSubmit}>
					{ formErrorMessage }
					{ emailInput }
					<button className='button'>Reset Password</button>
				</form>
				{ backButton }
			</div>
		);

		return (
			<div>
				{ (this.state.displayType === 'CHOICE_BUTTONS') && choiceButtons }
				{ (this.state.displayType === 'RESET_PASSWORD') && resetPasswordForm }
				{ (this.state.displayType === 'EMAIL_SIGN_UP' || this.state.displayType === 'EMAIL_LOGIN') && loginSignUpForm }
			</div>
		);
	}
}
