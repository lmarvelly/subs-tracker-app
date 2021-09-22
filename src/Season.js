import React, { Component } from 'react';
import Member from './components/Member';
import Sub from './components/Sub';

class Season extends Component
{
	constructor( props )
	{
		super(props);
	}
	
	render()
	{
		const { membersList, subsList } = this.props;

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