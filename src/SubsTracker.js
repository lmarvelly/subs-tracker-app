import React, { Component } from 'react';

import Member from './components/Member';
import NewMemberForm from './forms/NewMemberForm';
import Season from './components/Season';

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

		this.updateMembers = this.updateMembers.bind( this );
		this.handleRemove = this.handleRemove.bind( this );
	}

	componentDidMount = () =>
	{
		this.setState(
		{
			// subsList: getSavedSubs(),
			membersList: getSavedMembers()
		});
	}

	componentDidUpdate = ( prevProps, prevState ) =>
	{
		
	}

	handleRemove( id, memberList )
	{
		removeMember( id, memberList );
		this.updateMembers();
	}

	updateMembers()
	{
		this.setState({ memberList: getSavedMembers() });
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
				updateMembers={ this.updateMembers }
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
				<h1>Members</h1>
				{
					members
				}
				<br />
				<h1>Subs</h1>
				<Season 
					name={2021} // Get name
					// subsList={ subsList } 
					membersList={ membersList } 
				/>
			</div>
		);
	}
}

export default SubsTracker;