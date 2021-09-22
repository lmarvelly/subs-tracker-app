import React, { Component } from 'react';
import Member from './components/Member';
import Sub from './components/Sub';
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
		const { membersList, subsList } = this.state;

		const members = ( membersList.map( member => (
			<Member 
				key={ member.uuid }
				name={member.name} 
			/>
		)));

		const subs = ( subsList.map( sub => (
			<Sub 
				key={ sub.uuid }
				playerUuid={ sub.playerUuid }
				createdAt={ sub.createdAt }
				paymentType={ sub.paymentType }
				amount={ sub.amount }
			/>
		)));

		return <div className='Season'>
			<div>
				{ members }
			</div>
			<br />
			<div>
				{ subs }
			</div>
		</div>
		
	}
}

export default Season;