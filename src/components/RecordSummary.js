import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectRecords from '../selectors/records';
import recordTotals from '../selectors/record-totals';

export class RecordSummary extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			recordLength: 0,
			recordTotals: { totalIncome: 0, totalDebt: 0 }
		}
	}

	componentDidMount()
	{
		this.setState(() => 
		({
			recordLength: this.props.recordLength ? this.props.recordLength : 0,
			recordTotals: 
				this.props.recordTotals 
				? 
				this.props.recordTotals
				:
				{ totalIncome: 0, totalDebt: 0 }
		}));
	}

	render()
	{
		return(
			<div>
				<h1>{`Total records: ${this.state.recordLength}`}</h1>
				<h1>{`Total income: £${numeral(this.state.recordTotals.totalIncome / 100).format('0,0.00')}`}</h1>
				<h1>{`Total debt: £${numeral(this.state.recordTotals.totalDebt / 100).format('0,0.00')}`}</h1>
			</div>
		);
	}
}

const mapStateToProps = ( state ) =>
{
	const paymentRecord = selectRecords(state.paymentRecord, state.members, state.recordFilters)
	return{
		recordLength: paymentRecord.length,
		recordTotals: recordTotals(paymentRecord)
	}
}

export default connect( mapStateToProps )( RecordSummary )