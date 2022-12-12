import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import MemberRecordListItem from './MemberRecordListItem';
import MemberAttendence from './MemberAttendence';
import MemberSummaryFilters from './MemberSummaryFilters';

import getVisibleRecords from '../selectors/records';

import { getAttendenceTotals, getMemberTotals } from '../functions/recordTotals';

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
					<div className='list-header__title'>
						<h2 className='page-header__subtitle'>Season: <span className='bold-font'>{this.props.seasonFilter}</span></h2>
					</div>
					
					<div className='list-body'>
						<div className='list-item'>
							<h3 className='page-header__subtitle-2'>
								Total Paid: <span className='bold-font'>£{numeral(this.props.recordTotals.totalPaid / 100).format('0,0.00')}</span>
							</h3>
							<h3 className='page-header__subtitle-2'>
								Total Outstanding Debt: <span className='bold-font'>£
								{
									numeral(this.props.recordTotals.totalDebt / 100).format('0,0.00')
								}
								</span>
							</h3>
						</div>
					</div>
				</div>

				<div className='content-container'>
					<div className='list-header'>Attendance</div>
					<div className='list-body'>
						<MemberAttendence
							seasonName={this.props.seasonFilter}
							seasonSessionTotals={this.props.attendanceTotals}
						/>
					</div>
				</div>

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
							const amount = discount ? (record.amount * (100 - discount) / 100) : record.amount

							return <MemberRecordListItem
								key={record.id}

								id={record.id}
								amount={amount}
								date={record.createdAt}
								discount={discount}
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
	const records = getVisibleRecords(allRecords, state.members, state.recordFilters);

	const attendanceTotals = getAttendenceTotals(records);


	let seasonFilter; 
	
	state.seasons.forEach(season => 
	{
		if(season.seasonUuid === state.recordFilters.seasonFilter)
		{
			seasonFilter = season.seasonName;
		}
	});

	return {
		attendanceTotals,
		memberFilter: state.recordFilters.playerUuidFilter,
		records,
		recordTotals: getMemberTotals(records, state.recordFilters.playerUuidFilter),
		seasonFilter: seasonFilter ? seasonFilter : '',
		sessions: state.sessions
	}
}

export default connect( mapStateToProps )( MemberSummaryPage );