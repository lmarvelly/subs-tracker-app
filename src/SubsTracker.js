import React, { Component } from 'react';

import Member from './components/Member';
import NewMemberForm from './forms/NewMemberForm';
import Season from './Season';

// Import helper functions
import { getSavedMembers, getSavedSubs, removeMember, saveMembers } from './functions/storageFunctions';

class SubsTracker extends Component
{
	constructor( props )
	{
		super( props );
		
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
		console.log('SubsTracker updated');
	}

	render()
	{
		const { subsList, membersList } = this.state;

		const members = ( membersList.map( member => (
			<Member 
				key={ member.uuid }
				name={member.name} 
			/>
		)));

		console.log('SubsTracker rendered');
		return (
			<div className="App">
				<NewMemberForm 
					membersList={ membersList } 
					saveMembers={ saveMembers } 
				/>
				<br />
				{
					members
				}
				<br />
				<Season 
					subsList={ subsList } 
					membersList={ membersList } 
				/>
			</div>
		);
	}
}

export default SubsTracker;