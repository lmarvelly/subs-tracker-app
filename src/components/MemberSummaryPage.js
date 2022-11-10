import React, { useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import MemberSeasonAttendenceListItem from './MemberSeasonAttendenceListItem';
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

import recordTotals from '../functions/recordTotals';

const MembersSummaryPage =(props) =>
{
	// TODO: 
		// Add date filters
		// Add page to navbar
		// Test cases for MemberSummaryPage
		// Test cases for MemberRecordListItem's
		// Link Records to Edit Record
		// Add Seasons to Record List

	const [memberUuid, setMemberUuid] = useState(props.members[0].playerUuid);
	const [seasonUuid, setSeasonUuid] = useState('');
	const [memberTotals, setMemberTotals] = useState(getMemberTotals(props.recordTotals, props.members[0].playerUuid));
	const [seasonsSessionTally, setSeasonsSessionTally] = useState([]);
	const [memberDebt, setMemberDebt] = useState(0);
	// const [records, setRecords] = useState([]);

	const recordFilters =
	{
		memberTextFilter: '',
		playerUuidFilter: memberUuid,
		recordTypeFilter: 'ALL',
		seasonFilter: '',
		sessionNameTextFilter: '',
		sortBy: 'dateAscending',
	
		startDate: null,
		endDate: null
	};

	useEffect(() =>
	{
		props.setMemberUuidFilter(memberUuid);

		setMemberTotals(getMemberTotals(props.recordTotals, props.members[0].playerUuid));
		
		if( memberTotals.totalDebt > memberTotals.totalPaid )
		{
			setMemberDebt( memberTotals.totalDebt - memberTotals.totalPaid );
		}

		setSeasonsSessionTally(getSeasonAndSessionTotals());
	}, []);

	const getSeasonAndSessionTotals = () =>
	{
		const tempSeasonsSessionTally = [];

		props.sessionSeasons.forEach(season =>
		{
			tempSeasonsSessionTally.push(
			{ 
				seasonUuid: season,
				sessions: []
			});
		});

		props.sessions.forEach(record => 
		{
			// Get index of Season so we know where to add tally to
			const index = props.sessionSeasons.findIndex( currentSeason =>
			{
				return currentSeason === record.seasonUuid;
			});
		

			let exists = false;
			tempSeasonsSessionTally[index].sessions.forEach( session =>
			{
				// Check if Session Name exists increment the count
				if(session.sessionName === record.sessionName)
				{
					exists = true;
					session.count += 1;
				}
			});

			/**
			 * If the session name didn't exist add a new session
			 * object to the tempSeasonsSessionTally array
			 */ 
			if(!exists)
			{
				let sessionUuid;
				props.sessions.forEach(session =>
				{
					if(record.sessionName === session.sessionName)
					{
						sessionUuid = session.id
					}
				});
				tempSeasonsSessionTally[index].sessions.push(
				{
					sessionUuid: sessionUuid,
					sessionName: record.sessionName, 
					count: 1
				});
			}
		});

		return tempSeasonsSessionTally;
	}

	const onMemberChange = ((e) =>
	{
		setMemberUuid(e.target.value);
		props.setMemberUuidFilter(e.target.value);
		
		// setRecords(getVisibleRecords(props.records, props.members, { ...recordFilters, playerUuidFilter: e.target.value}));
		// setRecords(state.paymentRecord);
		
		const localMemberTotals = getMemberTotals( props.recordTotals, e.target.value )
		setMemberTotals( localMemberTotals );
	
		if( localMemberTotals.totalDebt > localMemberTotals.totalPaid )
		{
			setMemberDebt( localMemberTotals.totalDebt - localMemberTotals.totalPaid );
		}
		else
		{
			setMemberDebt(0);
		}
	});


	const onSeasonChange = ((e) =>
	{
		setSeasonUuid(e.target.value);

		if( e.target.value === 'ALL' )
		{
			props.resetSeasonFilter();
			// setRecords(getVisibleRecords(props.records, props.members, { ...recordFilters, seasonFilter: ''}));
		}
		else
		{
			props.setSeasonFilter(e.target.value);

			// here
			// setRecords(getVisibleRecords(props.records, props.members, { ...recordFilters, seasonFilter: e.target.value}));
		}

		setSeasonsSessionTally(getSeasonAndSessionTotals())
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
					Total Paid: <span className='bold-font'>£{numeral(memberTotals.totalPaid / 100).format('0,0.00')}</span>
				</h1>
				<h1 className='page-header__title'>
					Total Outstanding Debt: <span className='bold-font'>£
					{
						numeral(memberDebt / 100).format('0,0.00')
					}
					</span>
				</h1>

				<div className='list-header'>Attendance</div>
				<div className='list-body'>
				{
					seasonsSessionTally.length === 0
					?
					<h2>No records</h2>
					:
					seasonsSessionTally.map(seasonTally =>
					{
						const index = props.seasons.findIndex(currentSeason => currentSeason.seasonUuid === seasonTally.seasonUuid);

						const seasonName = props.seasons[index].seasonName;

						return <MemberSeasonAttendenceListItem
							key={seasonTally.seasonUuid}
							seasonUuid={seasonUuid}
							seasonName={seasonName} 
							seasonSessionTotals={seasonTally.sessions}
						/>
					})
				}
				</div>

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
						const index = record.playerList ? record.playerList.findIndex(player => player.playerUuid === memberUuid) : undefined;
						const discount = (index !== undefined && index !== -1) ? record.playerList[index].discount : undefined;
						const amount = discount ? (record.amount * discount / 100) : record.amount

						return <MemberRecordListItem
							key={record.id}
							amount={amount}
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

const mapDispatchToProps = (dispatch) => (
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

	const defaultRecordFilters =
	{
		memberTextFilter: '',
		playerUuidFilter: '',
		recordTypeFilter: 'ALL',
		seasonFilter: '',
		sessionNameTextFilter: '',
		sortBy: 'dateAscending',
	
		startDate: null,
		endDate: null
	};

	// const paymentRecord = getVisibleRecords(allRecords, state.members, defaultRecordFilters);
	const paymentRecord = getVisibleRecords(allRecords, state.members, state.recordFilters);

	// const playerSessions = []
	// paymentRecord.forEach(record =>
	// {
	// 	if(record.recordType === 'SESSION')
	// 	{
	// 		playerSessions.push(record);
	// 	}
	// });


	/**
	 * Need each a list if the Session's Seasons to calculate 
	 * the Session totals.
	 */
	const sessionSeasons = [];

	state.sessions.forEach(record => {
		if(!sessionSeasons.includes(record.seasonUuid))
		{
			sessionSeasons.push(record.seasonUuid);
		}
	});

	const defaultMemberFilters = 
	{
		text: '',
		sortBy: 'alphabetAsc'
	};

	const defaultSeasonFilters = 
	{
		text: '',
		sortBy: 'descending'
	}

	return {
		members: getVisibleMembers( state.members, defaultMemberFilters ),
		records: paymentRecord,
		recordTotals: recordTotals(paymentRecord),
		seasons: getVisibleSeasons( state.seasons, defaultSeasonFilters ),
		sessions: state.sessions,
		sessionSeasons: sessionSeasons
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( MembersSummaryPage );