import React, { Component } from 'react';
import Member from './Member';
import { getSavedMembers, getSavedSubs } from './functions/storageFunctions'

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
	}

	componentDidMount = () =>
	{
		this.setState(
		{
			subsList: getSavedSubs(),
			membersList: getSavedMembers()
		});
	}

	componentDidUpdate = () =>
	{

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