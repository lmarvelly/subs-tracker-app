import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecordForm from './RecordForm';
import { startEditRecord, startRemoveRecord } from '../actions/records';
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
export class EditRecordPage extends Component
{
	constructor( props )
	{
		super( props );

		this.props.sortMembersAlphabetAsc();
		this.props.sortSeasonsAlphabetDesc();

		this.state =
		{
			error: this.props.record ? false : true
		}
	}

	// Adding alert() CAUSES ERRORS
	componentWillReceiveProps()
	{
		if(this.state.error)
		{
			// alert('Whoops something went wrong');
			this.props.history.push('/'); // return to dashboard
		}
	}

	onSubmit = ( record ) => 
	{
		this.props.startEditRecord( record );

		this.props.history.push('/'); // return to dashboard
	}

	onRemove = () =>
	{
		confirm('Are you sure you want to remove record?') &&
		this.props.startRemoveRecord( { id: this.props.record.id } );
		this.props.history.push('/'); // return to dashboard
	}

	render()
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<div className='header-desktop-padding'>
							<h1 className='page-header__title'>Edit Record Page</h1>
						</div>
					</div>
				</div>

				<div className='content-container'>
					<div className='content-desktop-padding'>
						<RecordForm
							record={ this.props.record }
							members={ this.props.members } // TODO change to member rather than all the members
							seasons={ this.props.seasons }
							onSubmit={ this.onSubmit }
						/>
						<button 
							className='button--secondary' 
							onClick={ this.onRemove }
						>
							Remove Record
						</button>
					</div>
				</div>
			</div>
		)
	}
}

// Give the component the current record object. We can take the props from the HOC and add to them
// This goes out of sync atm if you refresh the page. Not sure why yet
const mapStateToProps = ( state, props ) =>
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'descending' };
	return {
		members: getVisibleMembers(state.members, defaultMemberFilterState),
		record: state.paymentRecord.find( ( record ) => record.id === props.match.params.id),
		seasons: getVisibleSeasons(state.seasons, defaultSeasonFilterState)
	}
};

const mapDispatchToProps = ( dispatch, props ) => (
{
	startEditRecord: ( record ) => dispatch( startEditRecord( record.id, record.recordType, record ) ),
	startRemoveRecord: ( data ) => dispatch( startRemoveRecord( data ) ),
	sortMembersAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
	sortSeasonsAlphabetDesc: () => dispatch( sortDesc() )
});

// The HOC passes the props through
export default connect( mapStateToProps, mapDispatchToProps )( EditRecordPage );