import React, { useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import getVisibleRecords from '../selectors/records';

import { resetMemberFilters } from '../actions/memberFilters';
import { resetSeasonFilters } from '../actions/seasonFilters';

import {
	resetRecordFilters,
	resetSeasonFilter,
	setMemberUuidFilter,
	setSeasonFilter,
	sortByDateAscending,
	sortByDateDescending
} from '../actions/recordFilters';

import selectRecords from '../selectors/records';
import recordTotals from '../selectors/record-totals';

const MembersSummaryPage = ( props ) =>
{
	// TODO: 
		// Add date filters
		// Add page to navbar
		// Total attendents of each Session name
		// Create New Record List Item for this page
		// List all records for Selected Member (Remove data filters on load)

	const [memberUuid, setMemberUuid] = useState(props.members[0].playerUuid);
	const [seasonUuid, setSeasonUuid] = useState('');

	useEffect(() =>
	{
		props.resetRecordFilters();
		props.resetMemberFilters();
		props.resetSeasonFilters();
		props.setMemberUuidFilter(memberUuid);
	}, []);

	const onMemberChange = ((e) =>
	{
		setMemberUuid(e.target.value);
		props.setMemberUuidFilter(e.target.value);
	});

	const onSeasonChange = ((e) =>
	{
		setSeasonUuid(e.target.value);
		if( e.target.value === 'ALL' )
		{
			props.resetSeasonFilter();
		}
		else
		{
			props.setSeasonFilter(e.target.value);
		}
	});

	return (
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content'>
						<h1 className='page-header__title'>Member Summary Page</h1>
					</div>
				</div>
			</div>

			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select
							id='memberName'
							className='select'
							onChange={ onMemberChange }
							value={ memberUuid }
						>
							{
								props.members.map((member) =>
								{
									if (member.nickname) 
									{
										return (
											<option
												key={member.playerUuid}
												value={member.playerUuid}
											>
												{`${member.firstName} ${member.nickname} ${member.surname}`}
											</option>
										)
									}
									else if (member.middleNames) 
									{
										return (
											<option
												key={member.playerUuid}
												value={member.playerUuid}
											>
												{`${member.firstName} ${member.nickname} ${member.surname}`}
											</option>
										)
									}
									return (
										<option
											key={member.playerUuid}
											value={member.playerUuid}
										>
											{`${member.firstName} ${member.surname}`}
										</option>
									)
								})
							}
						</select>
					</div>
					<div className='input-group__item'>
						<select
							id='seasonName'
							className={`select`}
							onChange={ onSeasonChange }
							value={ seasonUuid }
						>
							<option
								value='ALL'
							>
								Show All
							</option>
							{
								props.seasons.map( (season) =>
								{
									return (
										<option
											key={season.seasonUuid}
											value={season.seasonUuid}
										>
											{`${season.seasonName}`}
										</option>
									)
								})
							}
						</select>
						
					</div>
				</div>

				<h1 className='page-header__title'>
					Total Paid: <span className='bold-font'>£{numeral(props.recordTotals.totalIncome / 100).format('0,0.00')}</span>
				</h1>
				<h1 className='page-header__title'>
					Total Outstanding Debt: <span className='bold-font'>£{numeral(props.recordTotals.totalDebt / 100).format('0,0.00')}</span>
				</h1>

				<h2>Season 1</h2>
				<h1 className='page-header__subtitle'>
					Total attendance:
				</h1>
				<h2 className='page-header__subtitle'>
					Training: <span className='bold-font'>48</span>
				</h2>
				<h2 className='page-header__subtitle'>
					GFSN games: <span className='bold-font'>8</span>
				</h2>
				<h2 className='page-header__subtitle'>
					kickabout: <span className='bold-font'>5</span>
				</h2>
				

				<div className='list-header'>
					<div className='show-for-mobile'>Records</div>
					<div className='show-for-desktop'>Record</div>
					<div className='show-for-desktop'>Amount</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						GFSN Match <span className='bold-font'>Debt: £5.00</span>
					</div>
					<div className='list-item__row'>
						24/6/22 <span className='bold-font'>Paid: £0.00</span>
					</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						Training <span className='bold-font'>Paid: £4.00</span>
					</div>
					<div className='list-item__row'>
						20/6/22
					</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						Kickabout<span className='bold-font'>Paid: £5.00</span>
					</div>
					<div className='list-item__row'>
						17/6/22
					</div>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = ( dispatch, props ) => (
{
	resetMemberFilters: () => dispatch( resetMemberFilters() ),
	resetSeasonFilters: () => dispatch( resetSeasonFilters() ), // Season filter
	resetSeasonFilter: () => dispatch( resetSeasonFilter() ), // Season record filter
	resetRecordFilters: () => dispatch( resetRecordFilters() ),
	setMemberUuidFilter: (playerUuid) => dispatch(setMemberUuidFilter(playerUuid)),
	setSeasonFilter: (seasonUuid) => dispatch(setSeasonFilter(seasonUuid))
});

const mapStateToProps = ( state ) =>
{
	let allRecords = [];
	if(state.paymentRecord)
	{
		allRecords = allRecords.concat(state.paymentRecord);
	}
	if (state.sessions) 
	{
		allRecords = allRecords.concat(state.sessions);	
	}

	const paymentRecord = selectRecords(allRecords, state.members, state.recordFilters);

	return {
		members: getVisibleMembers( state.members, state.memberFilters ),
		records: paymentRecord,
		recordTotals: recordTotals(paymentRecord),
		seasons: getVisibleSeasons( state.seasons, state.seasonFilters )
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( MembersSummaryPage );