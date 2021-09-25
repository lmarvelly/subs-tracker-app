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

		this.handleEdit = this.handleEdit.bind( this );
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
		
	}

	handleRemove( id, memberList )
	{
		removeMember( id, memberList );
		this.setState({ membersList: getSavedMembers() });
	}

	handleEdit( id, memberList )
	{
		console.log( 'Handle Edit' );
		// editMember(  )
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
				handleEdit={ this.handleEdit }
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