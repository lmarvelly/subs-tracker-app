import React, { Component } from 'react';
import Sub from '../components/Sub';

class Season extends Component
{
	constructor( props )
	{
		super(props);
	}
	
	render()
	{
		const { subsList } = this.props;

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
			<br />
			<div>
				{ subs }
			</div>
		</div>
		
	}
}

export default Season;