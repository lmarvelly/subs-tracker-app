import React, { Component } from 'react'

class Member extends Component
{
	constructor( props )
	{
		super( props );

		this.handleRemove = this.handleRemove.bind( this );
	}

	handleRemove()
	{
		console.log('Cleeeeeeek');
	}

	render()
	{
		return(
			<div className='Member'>
				<span>{ this.props.name }</span>
				<button onClick={ this.handleRemove }>remove</button>
			</div>
		);
	}
}

export default Member;