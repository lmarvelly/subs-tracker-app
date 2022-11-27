import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { startEditRecord, startSetRecords } from '../actions/records';
import { startSetSessions } from '../actions/sessions';

import selectRecords from '../selectors/records';
import RecordListItem from './RecordListItem';

export const PaymentRecord = (props) => 
{
	const [amountToLoad, setAmountToLoad] = useState(50);
	const [recordsToLoad, setRecordsToLoad] = useState([]);

	useEffect(() =>
	{
		const seasonFilter = props.recordFilters.seasonFilter;
		props.startSetRecords(seasonFilter);
		props.startSetSessions(seasonFilter);

		setRecordsToLoad( props.allRecords.slice(0, amountToLoad) );
	}, []);

	useEffect(() =>
	{
		setRecordsToLoad( props.allRecords.slice(0, amountToLoad) );
	}, [props.allRecords]);

	useEffect(() =>
	{
		setRecordsToLoad( props.allRecords.slice(0, amountToLoad) );
		
	}, [amountToLoad]);

	const handleLoadMore = () =>
	{
		setAmountToLoad( amountToLoad + 50 );
	}

	const getPlayerName = ( playerUuid ) =>
	{
		const member = props.members.find( (member) => playerUuid === member.playerUuid );

		return member.nickname ? `${member.firstName} '${member.nickname}' ${member.surname}` : `${member.firstName} ${member.surname}`
	}

	const getPlayerNamesList = ( playerList ) =>
	{
		const playerNamesList = [];
		playerList.forEach((player) =>
		{
			const name = getPlayerName(player.playerUuid);

			playerNamesList.push(
			{
				id: player.playerUuid,
				name
			});
		});

		return playerNamesList;
	}

	return (
		<div className='content-container'>
			<div className='list-header'>
				<div className='show-for-mobile'>Records</div>
				<div className='show-for-desktop'>Record</div>
				<div className='show-for-desktop'>Amount</div>
			</div>
			<div className='list-body'>
				{
					recordsToLoad.length === 0 ? (
						<div className='list-item list-item--message'>
							<span>No Records</span>
						</div> 
					)
					:
					recordsToLoad.map(( record ) =>
					{
						const season = props.seasons.find( (season) => record.seasonUuid === season.seasonUuid );

						if (record.recordType === 'PAYMENT' || record.recordType === 'DEBT') 
						{
							const memberName = getPlayerName(record.playerUuid);

							return (
								<RecordListItem 
									key={record.id} 
									name={memberName} 
									playerNameList={[]}
									record={record}
									recordType={record.recordType}
									seasonName={season.seasonName}
									{...record}
								/>
							)
						}
						else
						{
							const playerNameList = getPlayerNamesList(record.playerList);

							return (
								<RecordListItem 
									key={record.id}
									playerNameList={playerNameList}
									recordType={record.recordType}
									seasonName={season.seasonName}
									{...record}
								/>
							)
						}
					})
				}
				{
					( props.allRecords > recordsToLoad) 
					&& 
					<div className='margin-top-medium'>
						<button 
							className='button-small--load-more' 
							onClick={handleLoadMore}
						>
							Load 50 more
						</button>
					</div>
				}
			</div>
		</div>
	);
};

/**
 * A simple HOC function that takes in a component as an 
 * argument and returns a component. 
 * 
 * @param {*} state 
 * @returns State is passed down to the props
 */
const mapStateToProps = (state) =>
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

	return{
		members: state.members,
		seasons: state.seasons,
		sessions: state.sessions,
		allRecords: selectRecords(allRecords, state.members, state.recordFilters),
		recordFilters: state.recordFilters
	}
};

const mapDispatchToProps = ( dispatch, props ) => (
{
	startSetRecords: ( seasonUuid ) => dispatch( startSetRecords( seasonUuid ) ), 
	startSetSessions: ( seasonUuid ) => dispatch( startSetSessions( seasonUuid ) ),
	startEditRecord: ( record ) => dispatch( startEditRecord( record.id, record.recordType, record ) )
});

/**
 * @function connect() This is a HOC (A higher Order Component)
 * connects to the state of the app. The function references
 * inside, mapStateToProps() determines what info we want this 
 * component to access.
 */
export default connect( mapStateToProps, mapDispatchToProps )( PaymentRecord );