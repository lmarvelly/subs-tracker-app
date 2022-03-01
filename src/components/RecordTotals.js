import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectRecords from '../selectors/records';

export class RecordTotal extends Component
{
	constructor( props )
	{
		super( props );
	}

	getTotalIncome = () =>
	{
		let totalIncome = 0;
		this.props.paymentRecord.map( (record) =>
		{
			if ( typeof record.amount === 'number' ) // if amount is a number
			{
				totalIncome += record.amount;
			}
			else if ( typeof record.amountPaid === 'number' ) // if amount is a number
			{
				totalIncome += record.amountPaid;
			}
		});
		
		return totalIncome;
	};

	render()
	{
		return(
			<div>
				<h1>{`Total income: £${numeral(this.getTotalIncome() / 100).format('0,0.00')}`}</h1>
			</div>
		);
	}
}

const mapStateToProps = ( state ) =>
{
	return{
		paymentRecord: selectRecords(state.paymentRecord, state.members, state.recordFilters),
	}
}

export default connect( mapStateToProps )( RecordTotal )