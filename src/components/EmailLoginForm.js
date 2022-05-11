import React, { Component } from 'react';

export default class EmailLoginForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			email: undefined,
			password: undefined,

			displayChoice: true,
			displayInputs: false,
			// displayEmailLogin: false,
			// displayEmailSignUp: false
		}
	}

	render()
	{
		const loginButtons = (
			<div>
				<button
					className='button'
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

		const inputs = (
			<div>
				<input 
					className={`text-input`}
					placeholder='email@example.com'
					type="text" 
				/>
				<input
					className={`text-input`}
					placeholder='Password'
					type="password"
				/>
			</div>
		);

		return (
			<div>
				{ this.state.displayChoice && loginButtons }
			</div>
		);
	}
}
