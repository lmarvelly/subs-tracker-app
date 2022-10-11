import React, { useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import MemberRecordListItem from './MemberRecordListItem';

import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import getVisibleRecords from '../selectors/records';

import { getMemberTotals } from '../functions/recordTotals';
import { resetMemberFilters } from '../actions/memberFilters';
import { resetSeasonFilters } from '../actions/seasonFilters';

import {
	removeDateFilters,
	resetRecordFilters,
	resetSeasonFilter,
	setMemberUuidFilter,
	setSeasonFilter,
	sortByDateAscending,
	sortByDateDescending
} from '../actions/recordFilters';

import selectRecords from '../selectors/records';
import recordTotals from '../functions/recordTotals';

const MembersSummaryPage = ( props ) =>
{
	// TODO: 
		// Add date filters
		// Add page to navbar
		// Total Session Names
		// Total attendents of each Session name
		// Test cases for MemberSummaryPage
		// Test cases for MemberRecordListItem's
		// Link Records to Edit Record
		// Add Seasons to Record List

	const [memberUuid, setMemberUuid] = useState(props.members[0].playerUuid);
	const [seasonUuid, setSeasonUuid] = useState('');
	const [memberTotals, setMemberTotals] = useState(getMemberTotals(props.recordTotals, props.members[0].playerUuid));

	useEffect(() =>
	{
		props.resetRecordFilters();
		props.removeDateFilters(); // This has to be after reset Record Filters
		props.resetMemberFilters();
		props.resetSeasonFilters();
		props.setMemberUuidFilter(memberUuid);
		setMemberTotals(getMemberTotals(props.recordTotals, props.members[0].playerUuid));
		console.log(memberTotals);
	}, []);

	const getSeasonAndSessionTotals = () =>
	{
		const sessionsAndSeasons = [];

		props.sessionSeasons.forEach(season =>
		{
			sessionsAndSeasons.push(
			{ 
				seasonUuid: season,
				sessions: []
			});
		});

		props.sessions.forEach(record => 
		{
			
			const index = props.sessionSeasons.findIndex( currentSeason =>
			{
				return currentSeason === record.seasonUuid;
			});

			// let exists = false;
			// sessionsAndSeasons[index].sessions.forEach( session =>
			// {
			// 	if(session.sessionName === record.sessionName)
			// 	{
			// 		exists = true;
			// 		session.count += 1;
			// 	}
			// });

			// if(!exists)
			// {
			// 	sessionsAndSeasons[index].sessions.push({sessionName: record.sessionName, count: 1});
			// }
		});

		// console.log(sessionsAndSeasons);
	}

	// const getMemberTotals = ((memberUuid) =>
	// {
	// 	console.log('RECORD TOTALS', props.recordTotals);
	// 	const index = props.recordTotals.findIndex( player => player.playerId === memberUuid );

	// 	return props.recordTotals[index];
	// });

	const onMemberChange = ((e) =>
	{
		setMemberUuid(e.target.value);
		props.setMemberUuidFilter(e.target.value);
		// const index = recordTotals.findIndex( player => player.playerId === record.playerUuid );

		setMemberTotals(getMemberTotals( props.recordTotals, e.target.value ));
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

	getSeasonAndSessionTotals();

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
					Total Paid: <span className='bold-font'>£{numeral(memberTotals.totalPaid / 100).format('0,0.00')}</span>
				</h1>
				<h1 className='page-header__title'>
					Total Outstanding Debt: <span className='bold-font'>£{numeral((memberTotals.totalPaid - memberTotals.totalDebt) / 100).format('0,0.00')}</span>
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
				<div className='list-body'>
				{
					props.records.length === 0 ? (
						<div className='list-item list-item--message'>
							<span>No Records</span>
						</div>
					)
					:
					props.records.map((record) => 
					{
						return <MemberRecordListItem
							key={record.id}
							amount={record.amount}
							date={record.createdAt}
							recordType={record.recordType}
							sessionName={record.sessionName}
						/>
					})
				}
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = ( dispatch, props ) => (
{
	removeDateFilters: () => dispatch( removeDateFilters() ),
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

	const playerSessions = []
	paymentRecord.forEach(record =>
	{
		if(record.recordType === 'SESSION')
		{
			playerSessions.push(record);
		}
	});


	const sessionSeasons = [];

	state.sessions.forEach(record => {
		if(!sessionSeasons.includes(record.seasonUuid))
		{
			sessionSeasons.push(record.seasonUuid);
		}
	});

	return {
		members: getVisibleMembers( state.members, state.memberFilters ),
		records: paymentRecord,
		recordTotals: recordTotals(paymentRecord),
		seasons: getVisibleSeasons( state.seasons, state.seasonFilters ),
		sessions: state.sessions,
		sessionSeasons: sessionSeasons,
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( MembersSummaryPage );