import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import { startEditSession } from '../actions/sessions';
import { startAddSessionName } from '../actions/sessionNames';
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
export class EditSessionPage extends Component
{
	constructor( props )
	{
		super( props );

		this.props.sortMembersAlphabetAsc();
		this.props.sortSeasonsAlphabetDesc();

		this.state =
		{
			error: this.props.session ? false : true
		}
	}

	// Adding alert() CAUSES ERRORS in testing
	componentWillReceiveProps()
	{
		if(this.state.error)
		{
			alert('Whoops something went wrong');
			this.props.history.push('/'); // return to dashboard
		}
	}

	onSubmit = () =>
	{

	}

	onRemove = () =>
	{

	}

	render()
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<div className='header-desktop-padding'>
							<h1 className='page-header__title'>Edit Session Page</h1>
						</div>
					</div>
				</div>

				<div className='content-container'>
					<div className='content-desktop-padding'>
						<SessionForm
							addSessionName={this.props.addSessionName}
							session={ this.props.session }
							members={ this.props.members } // TODO change to member rather than all the members
							seasons={ this.props.seasons }
							sessionNames={ this.props.sessionNames }
							onSubmit={ this.onSubmit }
						/>
						<button 
							className='button--secondary' 
							onClick={ this.onRemove }
						>
							Remove Session
						</button>
					</div>
				</div>
			</div>
		)
	}
}

// Give the component the current session object. We can take the props from the HOC and add to them
// This goes out of sync atm if you refresh the page. Not sure why yet
const mapStateToProps = ( state, props ) =>
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'descending' };
	return {
		members: getVisibleMembers(state.members, defaultMemberFilterState),
		session: state.sessions.find( ( session ) => session.id === props.match.params.id),
		seasons: getVisibleSeasons(state.seasons, defaultSeasonFilterState),
		sessionNames: state.sessionNames
	}
};

const mapDispatchToProps = ( dispatch, props ) => (
{
	addSessionName: ( sessionName ) => dispatch(startAddSessionName(sessionName) ),
	startEditSession: ( session ) => dispatch( startEditSession( session.id, session ) ),
	sortMembersAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
	sortSeasonsAlphabetDesc: () => dispatch( sortDesc() )
});

// The HOC passes the props through
export default connect( mapStateToProps, mapDispatchToProps )( EditSessionPage );