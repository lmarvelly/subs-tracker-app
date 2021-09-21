import React, { Component } from 'react';
import Member from './Member';

class Season extends Component
{
	constructor( props )
	{
		super(props);

		this.state =
		{

		};
	}

	render()
	{
		return(
			<div>
				<Member name='Luke Marvelly' />
			</div>
		);
	}
}

export default Season;