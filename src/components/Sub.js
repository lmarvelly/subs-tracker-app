import React, { Component } from 'react';
import { getName } from '../functions/storageFunctions';

class Sub extends Component
{
	constructor( props )
	{
		super( props );
		this.state =
		{
			name: getName( this.props.uuid )
		}
	}

	render()
	{
		const { playerUuid, createdAt, paymentType, amount } = this.props;
		const name = getName( playerUuid );
		return(
			<div className='Sub'>
				<div>
					<h3>{ name }</h3>
					<span>{ createdAt }</span>
				{ `${this.props.playerUuid} £${this.props.amount}` }
				</div>
				<div>
					<span>{ paymentType }</span>
					<span>{ amount }</span>
				</div>
			</div>
		);
	}
}

export default Sub;