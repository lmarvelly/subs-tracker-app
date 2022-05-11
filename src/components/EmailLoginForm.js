import React, { Component } from 'react';

export default class EmailLoginForm extends Component
{
	constructor( props )
	{
		super( props )
	}

	render()
	{
		return (
			<form>
				<input 
					placeholder='email@example.com'
					type="text" 
				/>
				<input
					placeholder='Password'
					type="password"
					
				/>
			</form>
		);
	}
}