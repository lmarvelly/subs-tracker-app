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

	componentDidUpdate = () =>
	{
		console.log("After Update");
		console.log("membersList:");
		console.log(this.state.membersList[0])
	}

	getSavedMembers = () =>
	{
		const membersListJSON = localStorage.getItem( 'mockMembers' );

		console.log(`Get membersList JSON: ${membersListJSON}`);

		return membersListJSON ? JSON.parse( membersListJSON ) : [];
	}

	getSavedSubs = () =>
	{
		const subsListJSON = localStorage.getItem( 'mockSubs' );
	
		return subsListJSON ? JSON.parse( subsListJSON ) : [];
	}

	render()
	{
		const { membersList } = this.state;
		const members = ( membersList.map( member => (
			<Member 
				key={ member.uuid }
				name={member.name} 
			/>
		)));

		return <div className='Season'>
			{
				members
			}
		</div>
		
	}
}

export default Season;