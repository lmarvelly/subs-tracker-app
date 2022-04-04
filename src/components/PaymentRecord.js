import React from 'react';
import { connect } from 'react-redux';

import { startEditRecord } from '../actions/records';
import selectRecords from '../selectors/records';
import RecordListItem from './RecordListItem';

// Write onSubmit function to be passed down to RecordListItem

export const PaymentRecord = (props) => 
{
	const onSubmit = ( record ) =>
	{
		props.startEditRecord( record );
	};

	return (
		<div>
			<h1>Payment Record</h1>
			{
				props.paymentRecord.length === 0 ? ( <p>No Payments</p> )
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
	startEditRecord: ( record ) => dispatch( startEditRecord( record.id, record.recordType, record ) )
});

/**
 * @function connect() This is a HOC (A higher Order Component)
 * connects to the state of the app. The function references
 * inside, mapStateToProps() determines what info we want this 
 * component to access.
 */
export default connect( mapStateToProps, mapDispatchToProps )( PaymentRecord );