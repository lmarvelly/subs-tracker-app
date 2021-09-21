import React, { Component } from 'react'

class Member extends Component
{
	constructor( props )
	{
		super( props );
	}
	
	render()
	{
		return(
			<div>
				<span>{ this.props.name }</span>
			</div>
		);
	}
}

export default Member;