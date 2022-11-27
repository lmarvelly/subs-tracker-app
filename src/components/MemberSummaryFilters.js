import React, { Component } from 'react'
import { connect } from 'react-redux'; // To connect to the store
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';

import { startSetRecords } from '../actions/records';
import { startSetSessions } from '../actions/sessions';

import {
	removeDateFilters,
	resetRecordFilters,
	resetSeasonFilter,
	setMemberUuidFilter,
	setSeasonFilter,
	sortByDateAscending,
	sortByDateDescending
} from '../actions/recordFilters';

export class MemberSummaryFilters extends Component 
{
	constructor( props )
	{
		super( props );
	}

	state = 
	{
		memberFilter: this.props.members[0].playerUuid
	}

	componentDidMount()
	{
		const seasonFilter = this.props.recordFilters.seasonFilter;
		this.props.resetRecordFilters();
		this.props.setMemberUuidFilter(this.props.members[0].playerUuid);
		this.props.setSeasonFilter( seasonFilter );
		this.props.startSetRecords( seasonFilter );
		this.props.startSetSessions( seasonFilter );
	}

	onMemberChange = (e) =>
	{
		const memberFilter = e.target.value;
		this.props.setMemberUuidFilter( memberFilter );
		this.setState(() => ({ memberFilter }));
	}

	onSeasonChange = (e) =>
	{
		this.props.setSeasonFilter( e.target.value );
		this.props.startSetRecords( e.target.value );
		this.props.startSetSessions( e.target.value );
	}

	render()
	{
		return (
			<div>
				<div className='content-container'>
					<div className='input-group'>
						<div className='input-group__item'>
							<select
								id='memberName'
								className='select'
								onChange={ this.onMemberChange }
								value={ this.state.memberFilter }
							>
								{
									this.props.members.map((member) =>
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
								onChange={ this.onSeasonChange }
								value={ this.props.recordFilters.seasonFilter }
							>
								{
									this.props.seasons.map( (season) =>
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
				</div>
			</div>
		);
	}
}

/**
 * @param {*} state 
 * @returns The filters attribute is passed down to the
 * MemberSummaryFilters component
 */
 const mapStateToProps = (state) => {
	const defaultMemberFilters = { text: '', sortBy: 'alphabetAsc' };

	const defaultSeasonFilters = { text: '', sortBy: 'ascending'};

	return {
		recordFilters: state.recordFilters,
		members: getVisibleMembers( state.members, defaultMemberFilters ),
		seasons: getVisibleSeasons( state.seasons, defaultSeasonFilters )
	};
};

const mapDispatchToProps = (dispatch) => (
{
	removeDateFilters: () => dispatch( removeDateFilters() ),
	resetMemberFilters: () => dispatch( resetMemberFilters() ),
	resetSeasonFilters: () => dispatch( resetSeasonFilters() ), // Season filter
	resetSeasonFilter: () => dispatch( resetSeasonFilter() ), // Season record filter
	resetRecordFilters: () => dispatch( resetRecordFilters() ),
	setMemberUuidFilter: (playerUuid) => dispatch(setMemberUuidFilter(playerUuid)),
	setSeasonFilter: ( seasonUuid ) => dispatch(setSeasonFilter(seasonUuid)),
	startSetRecords: ( seasonUuid ) => dispatch(startSetRecords(seasonUuid)),
	startSetSessions: ( seasonUuid ) => dispatch(startSetSessions(seasonUuid))
});

export default connect( mapStateToProps, mapDispatchToProps )( MemberSummaryFilters );