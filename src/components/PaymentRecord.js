import React from 'react';
import { connect } from 'react-redux';

import selectRecords from '../selectors/records';
import RecordListItem from './RecordListItem';

export const PaymentRecord = (props) => (
	<div>
		<h1>Payment Record</h1>
		{
			props.paymentRecord.length === 0 ? ( <p>No Payments</p> )
			:
			props.paymentRecord.map(( record ) =>
			{
				const member = props.members.find( (member) => record.playerUuid === member.playerUuid )
				const season = props.seasons.find( (season) => record.seasonUuid === season.seasonUuid )

				return (
					<RecordListItem 
						key={record.id} 
						name={`${member.firstName} ${member.surname}`} 
						seasonName={season.seasonName}
						{...record} 
					/>
				)
			})
		}
	</div>
);

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
		paymentRecord: selectRecords(state.paymentRecord, state.recordFilters),
		seasons: state.seasons
	}
};

/**
 * @function connect() This is a HOC (A higher Order Component)
 * connects to the state of the app. The function references
 * inside, mapStateToProps() determines what info we want this 
 * component to access.
 */
export default connect( mapStateToProps )( PaymentRecord );