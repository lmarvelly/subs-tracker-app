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

		this.handleRemove = this.handleRemove.bind( this );
	}

	componentDidMount = () =>
	{
		this.setState(
		{
			subsList: getSavedSubs(),
			membersList: getSavedMembers()
		});
	}

	componentDidUpdate = ( prevProps, prevState ) =>
	{
		console.log('Updating');
		if( prevState.membersList.length !== this.state.membersList )
		{
			console.log('Members list length has changed');
		}
	}

	handleRemove( id, memberList )
	{
		removeMember( id, memberList );
	}

	render()
	{
		const { subsList, membersList } = this.state;

		const members = ( membersList.map( member => (
			<Member 
				id={ member.uuid }
				key={ member.uuid }
				membersList={ membersList }
				name={ member.name }
				handleRemove={ this.handleRemove }
			/>
		)));

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