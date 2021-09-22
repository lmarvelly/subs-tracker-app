import React, { Component } from 'react';

import NewMemberForm from './forms/NewMemberForm';
import Season from './Season';

import { getSavedMembers, getSavedSubs } from './functions/storageFunctions'

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

	render()
	{
		const { subsList, membersList } = this.state;
		return (
			<div className="App">
				<NewMemberForm membersList={ membersList } />
				<br />
				<Season subsList={ subsList } membersList={ membersList } />
			</div>
		);
	}
}

export default SubsTracker;