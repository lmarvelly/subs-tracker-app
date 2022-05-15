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

			displayChoice: true,
			displayInputs: false,

			displayEmailLogin: false,
			displayEmailSignUp: false
		}
	}

	displayEmailLogin = () =>
	{
		this.setState({ displayEmailLogin: true, displayChoice: false });
	}

	onEmailChange = ( e ) =>
	{
		this.setState({ email: e.target.value });
	}

	onPasswordChange = ( e ) =>
	{
		this.setState({ password: e.target.value });
	}

	// TODO
	emailLoginForm = () =>
	{
		<form></form>
	}

	// TODO
	emailSignUpForm = () =>
	{
		<form></form>
	}

	render()
	{
		const loginButtons = (
			<div>
				<button
					className='button'
					onClick={this.displayEmailLogin}
				>
					Login with email
				</button>
				<button
					className='button--email-signup'
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

		const loginInputs = (
			<form className='form'>
				<p className='form__error'>Please enter an email</p>
				<input 
					className={`text-input`}
					placeholder='email@example.com'
					type="text"
					value={this.state.email}
					onChange={this.onEmailChange}
				/>
				<p className='form__error'>Please enter a password</p>
				<input
					className={`text-input`}
					placeholder='Password'
					type="password"
					value={this.state.password}
					onChange={this.onPasswordChange}
				/>
				<button className='button'>Login</button>
			</form>
		);

		return (
			<div>
				{ this.state.displayChoice && loginButtons }
				{ this.state.displayEmailLogin && loginInputs }
			</div>
		);
	}
}
