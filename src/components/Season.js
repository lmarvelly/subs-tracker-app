import React, { Component } from 'react';
import Sub from '../components/Sub';
import { getSavedSubs } from '../functions/storageFunctions';

class Season extends Component
{
	constructor( props )
	{
		super(props);
	}

	const 
	
	render()
	{
		const { name } = this.props;
		const subsList = getSavedSubs( name )

		console.log( subsList );

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