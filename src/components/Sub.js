import React, { Component } from 'react'

class Sub extends Component
{
	constructor( props )
	{
		super( props );
	}

	render()
	{
		return(
			<div className='Sub'>
				<div>{ `${this.props.playerUuid} ${this.props.amount}` }</div>
			</div>
		);
	}
}

export default Sub;