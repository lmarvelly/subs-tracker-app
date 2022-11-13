import React, { Component } from 'react'
import { connect } from 'react-redux'; // To connect to the store
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

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
		memberFilter: this.props.members[0].playerUuid,
		seasonFilter: this.props.seasons[0].seasonUuid
	}

	componentDidMount()
	{
		this.props.resetRecordFilters();
		this.props.setMemberUuidFilter(this.props.members[0].playerUuid);
		this.props.setSeasonFilter(this.props.seasons[0].seasonUuid);
	}

	onMemberChange = (e) =>
	{
		const memberFilter = e.target.value;
		this.props.setMemberUuidFilter( memberFilter );
		this.setState(() => ({ memberFilter }));
	}

	onSeasonChange = (e) =>
	{
		const seasonFilter = e.target.value;
		this.props.setSeasonFilter( seasonFilter );
		this.setState(() => ({ seasonFilter }));
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
								value={ this.state.seasonFilter }
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
	return {
		recordFilters: state.recordFilters,
		members: state.members,
		seasons: state.seasons
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
	setSeasonFilter: (seasonUuid) => dispatch(setSeasonFilter(seasonUuid))
});

export default connect( mapStateToProps, mapDispatchToProps )( MemberSummaryFilters );