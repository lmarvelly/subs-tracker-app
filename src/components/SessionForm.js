import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import SessionFormItem from './SessionFormItem';
import { addSession } from '../actions/records';

export class SessionForm extends Component
{
	constructor( props )
	{
		super(props);
		this.state = 
		{
			amount: '', // TODO: wire this up
			createdAt: this.props.createdAt ? moment( this.props.createdAt ) : moment(),
			calenderFocused: false,
			description: '', // TODO: wire this up
			error: '',
			note: '', // TODO: wire this up
			seasonUuid: '', // TODO: wire this up
			sessionArray: []
		}
	};

	addItem = ( item ) =>
	{
		if (this.state.sessionArray.length === 0) 
		{
			this.setState({ sessionArray: [item] });
		}
		else
		{
			const index = this.state.sessionArray.findIndex( (currentItem) =>
			{
				return item.playerUuid === currentItem.playerUuid;
			});
			if(index >= 0)
			{
				const sessionArray = this.state.sessionArray;
				sessionArray[index] = item;
				this.setState({ sessionArray })
			}
			else
			{
				this.setState({ sessionArray: [ ...this.state.sessionArray, item ] })
			}
		}
	}

	removeItem = ( playerUuid ) =>
	{
		const sessionList = this.state.sessionArray;
		const index = this.state.sessionArray.findIndex( (currentItem) =>
		{
			return playerUuid === currentItem.playerUuid;
		});
		sessionList.splice( index, 1 );
		this.setState({ sessionArray: [...sessionList] });
	}

	onSeasonNameChange = ( e ) =>
	{
		const seasonUuid = e.target.value;
		this.setState( () => ({ seasonUuid }) );
	}
	onDescriptionChange = ( e ) => 
	{
		const description = e.target.value;
		if ( description.length <= 30 ) 
		{
			this.setState( () => ({ description }) );
		}
	};
	onAmountChange = ( e ) => 
	{
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			// Don't want message showing for 'Amount paid'
			if ( amount == 0 ) 
			{
				this.setState(() => ({amountError: 'Amount cannot be zero'}));
			}
			if (amount > 10000)
			{
				this.setState(() => ({amountError: 'Amount cannot be more than 10 thousand'}));
			}
			if ( (amount > 0) && (amount <= 10000) )
			{
				this.setState({amount})
			}
		}
	};
	onDateChange = ( createdAt ) => 
	{
		if(createdAt) // prevents the user from deleting the date.
		{
			this.setState( () => ({ createdAt }) );
		}
	};
	onNoteChange = ( e ) =>
	{
		const note = e.target.value;
		if ( note.length <= 50 ) 
		{
			this.setState( () => ({ note }) );
		}
	};
	onFocusChange = ( { focused } ) => 
	{
		this.setState( () => ({ calenderFocused: focused }) );
	};

	onSubmit = (e) =>
	{
		e.preventDefault();

		const session =
		{
			amount: this.state.amount,
			createdAt: this.state.createdAt,
			description: this.state.description,
			note: this.state.note,
			seasonUuid: this.state.seasonUuid,
			sessionArray: this.state.sessionArray
		};

		addSession(session);
	}

	// TODO: Add error messages
	render()
	{
		const error = '__error';
		const seasonErrorClassName = this.state.seasonUuid ? '' : error;
		const descriptionErrorClassName = this.state.description ? '' : error;
		const amountErrorClassName = this.state.amount ? '' : error;

		if( this.props.members && this.props.seasons )
		{
			return (
				<form className='form__session' onSubmit={ this.onSubmit }>
					<div className='form__session-header'>
						<select
							id='seasonName'
							className={`select${seasonErrorClassName}`}
							onChange={ this.onSeasonNameChange }
							value={ this.state.seasonUuid }
						>
							<option hidden>Select a Season</option>
							{
								this.props.seasons.map( (season) =>
								{
									return(
										<option
											key={season.seasonUuid}
											value={season.seasonUuid}
										>
											{`${season.seasonName}`}
										</option>
									)
								})
							}
						</select>
						<input 
							id='description'
							className={`text-input${descriptionErrorClassName}`}
							type="text"
							placeholder="Session description i.e. training"
							value={ this.state.description }
							onChange={ this.onDescriptionChange }
						/>
						<input
							id='amountToPay'
							className={`text-input${amountErrorClassName}`}
							placeholder='Amount each'
							type="text"
							value={ this.state.amount }
							onChange={ this.onAmountChange }
						/>
						<SingleDatePicker
							date={ this.state.createdAt }
							onDateChange={ this.onDateChange }
							focused={ this.state.calenderFocused }
							onFocusChange={ this.onFocusChange }
							numberOfMonths={ 1 }
							isOutsideRange={ () => false }
							displayFormat="DD/MM/YYYY"
						/>
						<textarea
							className='textarea'
							placeholder="Add a note (optional)"
							onChange={ this.onNoteChange }
							value={this.state.note}
						>
						</textarea>
						
						<div className='row'>
							<div className='form__session-col-name'>Name</div>
							<div className='form__session-col-checkbox'>Attended</div>
							<div className='form__session-col-checkbox'>Paid</div>
						</div>
					</div>

					{
						this.props.members.map(( member ) =>
						{
							return (
								<SessionFormItem 
									key={member.playerUuid}
									firstName={member.firstName}
									surname={member.surname}
									playerUuid={member.playerUuid}
									addItem={this.addItem}
									removeItem={this.removeItem}
								/>
							);
						})
					}
					<button className='button'>Add Session</button>
				</form>
			);
		}
		else if ( !this.props.members && !this.props.seasons ) 
		{
			// TODO
			console.log('Whoops there are no members or seasons');
			return(<div></div>);
		}
		else if ( !this.props.members ) 
		{
			// TODO
			console.log('Whoops there are no members');
			return(<div></div>);
		}
		else if ( !this.props.seasons ) 
		{
			// TODO
			console.log('Whoops there are no seasons');
			return(<div></div>);
		}
		else
		{
			// TODO
			console.log('Whoops something went wrong');
			return(<div></div>);
		}
	}
}

export default SessionForm;