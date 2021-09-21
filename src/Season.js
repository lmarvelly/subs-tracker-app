import React, { Component } from 'react';
import Member from './Member';

class Season extends Component
{
	constructor( props )
	{
		super(props);

		this.state =
		{
			subsList: [],
			membersList: []
		};

		this.getSavedSubs = this.getSavedSubs.bind();
		this.getSavedMembers = this.getSavedMembers.bind();
	}

	componentDidMount = () =>
	{
		this.setState(
		{
			subsList: this.getSavedSubs(),
			membersList: this.getSavedMembers()
		});
	}

	getSavedMembers = () =>
	{
		const membersListJSON = localStorage.getItem( 'mockMembers' );

		return membersListJSON ? JSON.parse( membersListJSON ) : [];
	}

	getSavedSubs = () =>
	{
		const subsListJSON = localStorage.getItem( 'mockSubs' );
	
		return subsListJSON ? JSON.parse( subsListJSON ) : [];
	}

	render()
	{
		return(
			<div className='Season'>
				<Member name='Luke Marvelly' />
			</div>
		);
	}
}

export default Season;