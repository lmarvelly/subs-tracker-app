import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RecordForm from './RecordForm';
import { setSeasonFilter } from '../actions/recordFilters';
import { startAddRecord } from '../actions/records';
import { startAddSessionName } from '../actions/sessionNames';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';


export const AddRecordPage = ( props ) =>
{
	useEffect(() =>
	{
		const members = props.members ? props.members : [];
		const seasons = props.seasons ? props.seasons : [];

		doSeasonsAndMembersExist( seasons, members )
	}, []);

	const doSeasonsAndMembersExist = ( seasons, members ) =>
	{
		const doMembersExist = members.length > 0;
		const doSeasonsExist = seasons.length > 0;

		if (!doMembersExist || !doSeasonsExist) {
			const message = () => {
				if (!doMembersExist && !doSeasonsExist) {
					return 'There are no existing Seasons or Members. Please create both before creating any records.';
				}
				else if (!doMembersExist) {
					return 'There are no existing Members. Please create a member before creating any records.';
				}
				else if (!doSeasonsExist) {
					return 'There are no existing Seasons. Please create one before creating any records.';
				}
			}
			alert(message());
			
			props.history.push('/dashboard'); // return to dashboard
		}
	}

	const onSubmit = ( record ) => {
		// using props.onSubmit this instead of "this.props.dispatch( startAddRecord( record ) )";
		props.startAddRecord(record);
		props.setSeasonFilter( record.seasonUuid ); // Added this so Dashboard shows the season of the submitted Record

		if (!confirm('Record added! Would you like to create another?')) 
		{
			props.history.push('/dashboard'); // return to dashboard
		}
	};

	return (
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<h1 className='page-header__title'>Add Record Page</h1>
				</div>
			</div>

			<div className='content-container'>
				<RecordForm
					addSessionName={props.addSessionName}
					members={props.members}
					seasons={props.seasons}
					sessionNames={props.sessionNames}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => 
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'ascending' };
	return {
		recordFilters: state.recordFilters,
		members: getVisibleMembers( state.members, defaultMemberFilterState ),
		seasons: getVisibleSeasons( state.seasons, defaultSeasonFilterState ),
		sessionNames: state.sessionNames
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
	addSessionName: ( sessionName ) => dispatch(startAddSessionName( sessionName ) ),
	setSeasonFilter: ( seasonUuid ) => dispatch(setSeasonFilter( seasonUuid )),
	startAddRecord: ( record ) => dispatch(startAddRecord( record ))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecordPage);