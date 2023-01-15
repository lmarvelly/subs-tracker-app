import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import { setSeasonFilter } from '../actions/recordFilters';
import { startAddSession } from '../actions/sessions';
import { startAddSessionName } from '../actions/sessionNames';

export const AddSessionPage = ( props ) =>
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

	const onSubmit = ( session ) =>
	{
		props.startAddSession( session );
		props.setSeasonFilter( session.seasonUuid );

		if(!confirm('Session added! Would you like to create another?'))
		{
			props.history.push('/dashboard');
		}
	};

	return(
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content-column'>
						<div>
							<h1 className='page-header__title'>Add Session Page</h1>
							<span>Add a new Group Session</span>
						</div>
					</div>
				</div>
			</div>
			<div className='content-container'>
				<SessionForm
					members={ props.members }
					seasons={ props.seasons }
					sessionNames={ props.sessionNames }
					onSubmit={ onSubmit }
					addSessionName={ props.addSessionName }
				/>
			</div>
		</div>
	);
}

const mapStateToProps = ( state, props ) =>
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'ascending' };
	return {
		members: getVisibleMembers(state.members, defaultMemberFilterState),
		seasons: getVisibleSeasons(state.seasons, defaultSeasonFilterState),
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
		addSessionName: ( sessionName ) => dispatch(startAddSessionName(sessionName) ),
		startAddSession: (session) => dispatch( startAddSession(session) ),
		sortMembersAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
		sortSeasonsAlphabetDesc: () => dispatch( sortDesc() ),
		setSeasonFilter: ( seasonUuid ) => dispatch(setSeasonFilter(seasonUuid))
	});

export default connect(mapStateToProps, mapDispatchToProps)( AddSessionPage ) ;