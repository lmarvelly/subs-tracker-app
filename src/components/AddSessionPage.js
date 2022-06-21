import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';

export class AddSessionPage extends Component
{
	constructor( props )
	{
		super( props )
	}

	render()
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<h1 className='page-header__title'>Add Session Page</h1>
					</div>
				</div>
				<div className='content-container'>
					<SessionForm
						members={ this.props.members }
						seasons={ this.props.seasons }
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state, props ) =>
{
	// Use default filters to make sure no Members or Seasons are filtered out
	const defaultMemberFilterState = { text: '', sortBy: 'alphabetAsc' };
	const defaultSeasonFilterState = { text: '', sortBy: 'descending' };
	return {
		members: getVisibleMembers(state.members, defaultMemberFilterState),
		seasons: getVisibleSeasons(state.seasons, defaultSeasonFilterState) 
	}
}

export default connect(mapStateToProps)( AddSessionPage ) ;