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
				</div>
				<div>
					<span>{ paymentType }</span>
					<br />
					<span>{ `£${amount}` }</span>
				</div>
			</div>
		);
	}
}

export default Sub;