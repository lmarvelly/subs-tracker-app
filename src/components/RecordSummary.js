import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectRecords from '../selectors/records';

/**
 * 
 * ##### TODO: This needs to be refactored to use 
 * ##### record-totals selector
 * 
 */
export class RecordTotal extends Component
{
	constructor( props )
	{
		super( props );
	}

	getTotalIncome = () =>
	{
		let totalIncome = 0;
		let totalDebt = 0;
		this.props.paymentRecord.map( (record) =>
		{
			if ( typeof record.amount === 'number' ) // if amount is a number
			{
				totalIncome += record.amount;
			}
			if ( typeof record.amountPaid === 'number' ) // if amount is a number
			{
				totalIncome += record.amountPaid;
			}
			if ( typeof record.amountOwed === 'number' )
			{
				totalDebt += record.amountOwed;
			}
		});
		
		return { totalIncome, totalDebt };
	};

	render()
	{
		return(
			<div>
				<h1>{`Total income: £${numeral(this.getTotalIncome().totalIncome / 100).format('0,0.00')}`}</h1>
				<h1>{`Total debt: £${numeral(this.getTotalIncome().totalDebt / 100).format('0,0.00')}`}</h1>
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