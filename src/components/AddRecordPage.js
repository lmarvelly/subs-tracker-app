import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecordForm from './RecordForm';
import { startAddRecord } from '../actions/records';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import { sortAlphabetAsc } from '../actions/memberFilters';
import { sortDesc } from '../actions/seasonFilters';

/**
 * Use classes to avoid inline functions. This avoids rerendering
 * on every render.
 * We put an export in front of the class keyword so we can test
 * the unconnected version.
 */
export class AddRecordPage extends Component 
{
	constructor(props) 
	{
		super(props);

		this.props.sortMembersAlphabetAsc();
		this.props.sortSeasonsAlphabetDesc();

		this.state =
		{
			members: this.props.members ? this.props.members : [],
			seasons: this.props.seasons ? this.props.seasons : []
		}
	}

	onSubmit = (record) => {
		// using props.onSubmit this instead of "this.props.dispatch( startAddRecord( record ) )";
		this.props.startAddRecord(record);
		this.props.history.push('/'); // return to dashboard
	}

	componentWillReceiveProps() {
		const doMembersExist = this.props.members.length > 0;
		const doSeasonsExist = this.props.seasons.length > 0;

		if (!doMembersExist || !doSeasonsExist) {
			const message = () => {
				if (!doMembersExist && !doSeasonsExist) {
					return 'There are no existing Seasons or Members. Please create both before creating any records.';
				}
				else if (!doMembersExist) {
					return 'There are no existing Members. Please create a member before creating any records.';
				}
				else if (!doSeasonsExist) {
					return 'There are no existing Seasons/categories. Please create one before creating any records.';
				}
			}
			alert(message());
			this.props.history.push('/'); // return to dashboard
		}
	};

	render() 
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<h1 className='page-header__title'>Add Record Page</h1>
					</div>
				</div>

				<div className='content-container'>
					<RecordForm
						members={this.props.members}
						seasons={this.props.seasons}
						onSubmit={this.onSubmit}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => 
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'descending' };
	return {
		members: getVisibleMembers(state.members, defaultMemberFilterState),
		seasons: getVisibleSeasons(state.seasons, defaultSeasonFilterState) 
	}
}

/**
 * Simular to mapStateToProps except it gives us access to 
 * dispatch. Needs to be passed into connect()
 * 
 * This is a lot easier to test dispatch than testing dispatch 
 * inside of onSubmit prop which used to be inside the RecordForm 
 * component.
 * 
 * We use the shorthand here which used the curly braces to 
 * implicitly return an object
 */
const mapDispatchToProps = (dispatch) => (
	{
		startAddRecord: (record) => dispatch(startAddRecord(record)),
		sortMembersAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
		sortSeasonsAlphabetDesc: () => dispatch( sortDesc() )
	});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecordPage);