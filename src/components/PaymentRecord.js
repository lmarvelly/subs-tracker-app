import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { startEditRecord } from '../actions/records';
import { resetRecordFilters } from '../actions/recordFilters';
import selectRecords from '../selectors/records';
import RecordListItem from './RecordListItem';

export const PaymentRecord = (props) => 
{
	// Reset filters when component in Rendered
	useEffect(() =>
	{
		props.resetRecordFilters();
	}, []);

	const onSubmit = ( record ) =>
	{
		props.startEditRecord( record );
	};

	return (
		<div className='content-container'>
			<div className='list-header'>
				<div className='show-for-mobile'>Records</div>
				<div className='show-for-desktop'>Record</div>
				<div className='show-for-desktop'>Amount</div>
			</div>
			<div className='list-body'>
				{
					props.paymentRecord.length === 0 ? (
						<div className='list-item list-item--message'>
							<span>No Payments</span>
						</div> 
					)
					:
					props.paymentRecord.map(( record ) =>
					{
						const member = props.members.find( (member) => record.playerUuid === member.playerUuid )
						const season = props.seasons.find( (season) => record.seasonUuid === season.seasonUuid )
						const name = member.nickname ? `${member.firstName} '${member.nickname}' ${member.surname}` : `${member.firstName} ${member.surname}`

						return (
							<RecordListItem 
								key={record.id} 
								name={name} 
								record={record}
								seasonName={season.seasonName}
								{...record} 
								onSubmit={onSubmit}
							/>
						)
					})
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
 * @returns The paymentRecord attribute is passed down to the
 * PaymentRecord component
 */
const mapStateToProps = (state) =>
{
	return{
		members: state.members,
		paymentRecord: selectRecords(state.paymentRecord, state.members, state.recordFilters),
		seasons: state.seasons
	}
};

const mapDispatchToProps = ( dispatch, props ) => (
{
	resetRecordFilters: () => dispatch( resetRecordFilters() ),
	startEditRecord: ( record ) => dispatch( startEditRecord( record.id, record.recordType, record ) )
});

/**
 * @function connect() This is a HOC (A higher Order Component)
 * connects to the state of the app. The function references
 * inside, mapStateToProps() determines what info we want this 
 * component to access.
 */
export default connect( mapStateToProps, mapDispatchToProps )( PaymentRecord );