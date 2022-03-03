import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectRecords from '../selectors/records';
import recordTotals from '../selectors/record-totals';

export const RecordSummary = ({ recordLength = 0, recordTotals = { totalIncome: 0, totaldebt: 0 } }) =>
{
	const recordWord = recordLength === 1 ? 'record' : 'records';
	return(
		<div>
			<h1>{`Viewing: ${recordLength} ${recordWord}`}</h1>
			<h1>{`Total income: £${numeral(recordTotals.totalIncome / 100).format('0,0.00')}`}</h1>
			<h1>{`Total debt: £${numeral(recordTotals.totalDebt / 100).format('0,0.00')}`}</h1>
		</div>
	);
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