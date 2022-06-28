import React, { Component } from 'react';
import { connect } from 'react-redux';

import SessionForm from './SessionForm';
import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import { startAddRecord } from '../actions/records';

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
		console.log('SESSION:', session);
		// const record =
		// {
		// 	recordType: session.sessionArray[0].type,
		// 	playerUuid: session.sessionArray[0].playerUuid,
		// 	seasonUuid: session.seasonUuid,
		// 	description: session.description,
		// 	note: session.note,  
		// 	createdAt: session.createdAt,
		// 	amountOwed: "",
		// 	amountPaid: "",
		// 	amount: ""
		// };
		// if (record.recordType === 'PAYMENT')
		// {
		// 	record.amount = session.amount;
		// }
		// if(record.recordType === 'DEBT')
		// {

		// 	record.amountOwed = session.amount;
		// 	record.amountPaid = 0;
		// }
	
		// console.log(record);

		// TODO: Figure out why these aren't working
		// this.props.startAddRecord(record);
		// this.props.history.push('/'); // return to dashboard

		session.sessionArray.forEach((sessionItem) =>
		{
			// TODO: Finish this
			const record =
			{
				recordType: sessionItem.type,
				playerUuid: sessionItem.playerUuid,
				seasonUuid: session.seasonUuid,
				description: session.description,
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

			console.log(record);

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
								<span>Create multiple records for a single session</span>
							</div>
						</div>
					</div>
				</div>
				<div className='content-container'>
					<SessionForm
						members={ this.props.members }
						seasons={ this.props.seasons }
						onSubmit={ this.onSubmit }
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

export default connect(mapStateToProps, mapDispatchToProps)( AddSessionPage ) ;