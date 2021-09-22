import React, { Component } from 'react';

import NewMemberForm from './forms/NewMemberForm';
import Season from './Season';

// Import helper functions
import { getSavedMembers, getSavedSubs, saveMembers } from './functions/storageFunctions';

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
		console.log('SubsTracker rendered');
		return (
			<div className="App">
				<NewMemberForm membersList={ membersList } saveMembers={ saveMembers } />
				<br />
				<Season subsList={ subsList } membersList={ membersList } />
			</div>
		);
	}
}

export default SubsTracker;