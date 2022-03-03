import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectRecords from '../selectors/records';
import recordTotals from '../selectors/record-totals';

// Example for defensive programming: Setting props coming from mapStateToProps to default values
export const RecordSummary = ({ recordLength = 0, recordTotals = { totalIncome: 0, totaldebt: 0 }, seasons = [], seasonFilter = '' }) =>
{
	const recordWord = recordLength === 1 ? 'record' : 'records';

	const seasonWording = () =>
	{
		let season = seasons.find( ( season ) => season.seasonUuid === seasonFilter );

		if( seasonFilter || seasons.length === 1 )
		{
			if(!season)
			{
				season = seasons[0];
			}
			return `from ${season.seasonName}`;
		}
		else 
		{
			return `from ${seasons.length} seasons`;
		}
	};

	return(
		<div>
			<h1>{`Viewing: ${recordLength} ${recordWord} ${seasonWording()}`}</h1>
			<h1>{`Total income: £${numeral(recordTotals.totalIncome / 100).format('0,0.00')}`}</h1>
			<h1>{`Total debt: £${numeral(recordTotals.totalDebt / 100).format('0,0.00')}`}</h1>
		</div>
	);
}

const mapStateToProps = ( state ) =>
{
	const paymentRecord = selectRecords(state.paymentRecord, state.members, state.recordFilters);

	return{
		recordLength: paymentRecord.length,
		recordTotals: recordTotals(paymentRecord),
		seasons: state.seasons,
		seasonFilter: state.recordFilters.seasonFilter ? state.recordFilters.seasonFilter : ''
	}
}

export default connect( mapStateToProps )( RecordSummary )