import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';

export class AddSessionPage extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			members: this.props.members ? this.props.members : [],
			seasons: this.props.seasons ? this.props.seasons : []
		}
	};

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
						<div className='page-header__content-column'>
							<div>
								<h1 className='page-header__title'>Add Session Page</h1>
								<span>Create multiple records for a single session</span>
							</div>
						</div>
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