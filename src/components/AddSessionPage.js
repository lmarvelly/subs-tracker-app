import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import { startAddRecord } from '../actions/records';
import { startAddSessionName } from '../actions/sessionNames';

export class AddSessionPage extends Component
{
	constructor( props )
	{
		super( props );

		// TODO: Sort Season Ascending order
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

	onSubmit = ( session ) => 
	{
		session.sessionArray.forEach((sessionItem) =>
		{
			// TODO: Finish this
			const record =
			{
				recordType: sessionItem.type,
				playerUuid: sessionItem.playerUuid,
				seasonUuid: session.seasonUuid,
				sessionName: session.sessionName,
				note: session.note,  
				createdAt: session.createdAt,
				amountOwed: "",
				amountPaid: "",
				amount: ""
			};
			if (record.recordType === 'PAYMENT')
			{
				record.amount = session.amount;
			}
			if(record.recordType === 'DEBT')
			{

				record.amountOwed = session.amount;
				record.amountPaid = 0;
			}

			// TODO: Figure out why these aren't working
			this.props.startAddRecord(record);
			this.props.history.push('/'); // return to dashboard
		});
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
								<span>Add a new Group Session</span>
							</div>
						</div>
					</div>
				</div>
				<div className='content-container'>
					<SessionForm
						members={ this.props.members }
						seasons={ this.props.seasons }
						sessionNames={ this.props.sessionNames }
						onSubmit={ this.onSubmit }
						addSessionName={ this.props.addSessionName }
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
		startAddRecord: (record) => dispatch(startAddRecord(record)),
		sortMembersAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
		sortSeasonsAlphabetDesc: () => dispatch( sortDesc() )
	});

export default connect(mapStateToProps, mapDispatchToProps)( AddSessionPage ) ;