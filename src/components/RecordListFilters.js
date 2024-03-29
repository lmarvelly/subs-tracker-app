import React, { Component } from 'react'
import { connect } from 'react-redux'; // To connect to the store
import { DateRangePicker } from 'react-dates';

import getVisibleSeasons from '../selectors/seasons';

import { startSetRecords } from '../actions/records';
import { startSetSessions } from '../actions/sessions';

import {
	resetRecordFilters,
	setRecordTypeFilter,
	setSessionNameTextFilter,
	setMemberFilterText,
	setStartDate,
	setEndDate,
	setSeasonFilter,
	sortByDateAscending,
	sortByDateDescending
} from '../actions/recordFilters';

/**
 * Both inputs are Controlled Components (Input where the input is
 * controlled by JS)
 * 
 * @param {*} props the filters prop is passed down
 * 
 * @param {function} onChange is an On Change handler propery that 
 * takes in a function
 * 
 * Need to export the Class so we can import the named import to 
 * test it
 * 
 * @returns 
 */
export class RecordListFilters extends Component 
{
	constructor( props )
	{
		super( props );
	}

	state =
	{
		calenderFocused: null,
	}

	componentDidMount()
	{
		const seasonFilter = this.props.recordFilters.seasonFilter;
		this.props.resetRecordFilters();
		const defaultSeasonFilter = this.props.seasons.length > 0 ? this.props.seasons[0].seasonUuid : ''
		!!seasonFilter ? this.props.setSeasonFilter(seasonFilter) : this.props.setSeasonFilter(defaultSeasonFilter);
	}

	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};

	onFocusChange = (calenderFocused) => {
		this.setState(() => ({ calenderFocused }));
	}

	onMemberTextChange = (e) => {
		if ( e.target.value.length <= 70 )
		{
			this.props.setMemberFilterText(e.target.value);
		}
	}

	onDecriptionChange = (e) => {
		if ( e.target.value.length <= 30 )
		{
			this.props.setSessionNameTextFilter(e.target.value);
		}
	}

	onSeasonChange = (e) => {
		this.props.setSeasonFilter(e.target.value);
		this.props.startSetRecords(e.target.value);
		this.props.startSetSessions(e.target.value);
	}

	onSortChange = (e) => {
		switch (e.target.value) {
			case 'dateAscending':
				this.props.sortByDateAscending();
				break;

			case 'dateDescending':
				this.props.sortByDateDescending();
				break;

			default:
				break;
		}
	}

	onRecordTypeChange = ( e ) => {
		this.props.setRecordTypeFilter(e.target.value);
	}

	onResetClick = () => {
		this.props.resetRecordFilters();
	}

	render() {
		return (
			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select
							className='select'
							value={this.props.recordFilters.recordTypeFilter}
							onChange={this.onRecordTypeChange}
						>
							<option value="ALL">All</option>
							<option value="DEBT">Individual Debts</option>
							<option value="PAYMENT">Payments</option>
							<option value="SESSION" >Sessions</option>
						</select>
					</div>
					<div className='input-group__item'>
						<input
							className='text-input'
							list='memberFilter'
							type="text"
							placeholder='Filter by member'
							onChange={this.onMemberTextChange}
							value={this.props.recordFilters.memberTextFilter}
						/>
						<datalist id='memberFilter'>
							{
								this.props.members.map((member) => {
									return (
										<option key={member.playerUuid}>{`${member.firstName} ${member.middleNames} ${member.surname}`}</option>
									)
								})
							}
						</datalist>
					</div>
					<div className='input-group__item'>
						<input
							className='text-input'
							type="text"
							placeholder='Filter Record Names'
							value={this.props.recordFilters.sessionNameTextFilter} // This is needed to make it a controlled component
							onChange={this.onDecriptionChange}
						/>
					</div>
					<div className='input-group__item'>
						<select
							className='select'
							value={this.props.recordFilters.seasonFilter}
							onChange=
							{this.onSeasonChange}
						>
							{
								this.props.seasons.length > 0
								?
								this.props.seasons.map((season) => {
									return (
										<option
											key={season.seasonUuid}
											value={season.seasonUuid}
										>
											{season.seasonName}
										</option>
									)
								})
								:
								<option>No Seasons</option>
							}
						</select>
					</div>
					<div className='input-group__item'>
						<select
							className='select'
							value={this.props.recordFilters.sortBy} // This is needed to make it a controlled component
							onChange={this.onSortChange}
						>
							<option value="dateAscending">Date Ascending</option>
							<option value="dateDescending">Date Descending</option>
						</select>
					</div>
					<div className='input-group__item'>
						<DateRangePicker
							startDate={this.props.recordFilters.startDate}
							endDate={this.props.recordFilters.endDate}
							displayFormat={'DD/MM/YYYY'}
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calenderFocused}
							onFocusChange={this.onFocusChange}
							showClearDates={true}
							numberOfMonths={1}
							isOutsideRange={() => false}
						/>
					</div>
					<div className='input-group__item'>
						<button 
							className='button'
							onClick={this.onResetClick}
						>
							Reset Filters
						</button>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * @param {*} state 
 * @returns The filters attribute is passed down to the
 * RecordListFilters component
 */
const mapStateToProps = (state) => {
	const defaultSeasonFilters = { text: '', sortBy: 'ascending'}

	return {
		recordFilters: state.recordFilters,
		members: state.members,
		seasons: getVisibleSeasons( state.seasons, defaultSeasonFilters )
	};
};

/**
 * @param {*} dispatch 
 * We use the shorthand here which used the curly braces to 
 * implicitly return each object. Each object has a dispatch call
 * with an action object passed into it.
 * 
 * @returns dispatch functions
 */
const mapDispatchToProps = (dispatch) =>
({
	resetRecordFilters: () => dispatch(resetRecordFilters()),
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
	setMemberFilterText: (text) => dispatch(setMemberFilterText(text)),
	setRecordTypeFilter: (recordType) => dispatch(setRecordTypeFilter(recordType)),
	setSessionNameTextFilter: (text) => dispatch(setSessionNameTextFilter(text)),
	setSeasonFilter: (seasonUuid) => dispatch(setSeasonFilter(seasonUuid)),
	sortByDateAscending: () => dispatch(sortByDateAscending()),
	sortByDateDescending: () => dispatch(sortByDateDescending()),
	startSetRecords: ( seasonUuid ) => dispatch(startSetRecords(seasonUuid)),
	startSetSessions: ( seasonUuid ) => dispatch( startSetSessions( seasonUuid ) )
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordListFilters);