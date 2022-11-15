import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import MemberRecordListItem from './MemberRecordListItem';
import MemberSeasonAttendenceListItem from './MemberSeasonAttendenceListItem';
import MemberSummaryFilters from './MemberSummaryFilters';

import getVisibleRecords from '../selectors/records';

import { getMemberTotals } from '../functions/recordTotals';

import {
	sortByDateAscending,
	sortByDateDescending
} from '../actions/recordFilters';

export class MemberSummaryPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	render()
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<div className='page-header__content'>
							<h1 className='page-header__title'>Member Summary Page</h1>
						</div>
					</div>
				</div>

				<MemberSummaryFilters />

				<div className='content-container'>
					<div className='list-header'>
						<div className='show-for-mobile'>Records</div>
						<div className='show-for-desktop'>Record</div>
						<div className='show-for-desktop'>Amount</div>
					</div>
					<div className='list-body'>
					{
						this.props.records.length === 0 ? (
							<div className='list-item list-item--message'>
								<span>No Records</span>
							</div>
						)
						:
						this.props.records.map((record) => 
						{
							const index = record.playerList ? record.playerList.findIndex(player => player.playerUuid === this.props.memberFilter) : undefined;
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
}

const mapStateToProps = ( state ) =>
{
	// Merge all records together
	let allRecords = [];
	if(state.paymentRecord)
	{
		allRecords = allRecords.concat(state.paymentRecord);
	}
	if (state.sessions) 
	{
		allRecords = allRecords.concat(state.sessions);	
	}

	// Filter Records
	const paymentRecord = getVisibleRecords(allRecords, state.members, state.recordFilters);

	return {
		memberFilter: state.recordFilters.playerUuidFilter,
		records: getVisibleRecords( paymentRecord, state.members, state.recordFilters ),
		recordTotals: getMemberTotals(paymentRecord, state.recordFilters.playerUuidFilter),
		sessions: state.sessions
	}
}

export default connect( mapStateToProps )( MemberSummaryPage );