import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
			const seasonName = season.seasonName;
			return (
				<span>from <span className='bold-font'>{seasonName}</span></span>
			);
		}
		else 
		{
			const length = seasons.length;
			return (<span>from <span className='bold-font'>{length} seasons</span></span>);
		}
	};

	return(
		<div className='page-header'>
			<div className='content-container'>
				<h1 className='page-header__title'>
					Viewing <span className='bold-font'>{recordLength} {recordWord}</span> {seasonWording()}
				</h1>
				<h1 className='page-header__title'>
					Total income: <span className='bold-font'>£{numeral(recordTotals.totalIncome / 100).format('0,0.00')}</span>
				</h1>
				<h1 className='page-header__title'>
					Total debt: <span className='bold-font'>£{numeral(recordTotals.totalDebt / 100).format('0,0.00')}</span>
				</h1>
				<div className='page-header__actions'>
					<Link className='button' to='/add-record'>Add Record</Link>
				</div>
			</div>
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