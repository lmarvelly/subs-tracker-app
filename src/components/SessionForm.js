import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import SessionFormItem from './SessionFormItem';

export default class SessionForm extends Component
{
	constructor( props )
	{
		super(props);
		this.state = 
		{
			// Session properties
			amount: '',
			createdAt: this.props.createdAt ? moment( this.props.createdAt ) : moment(),
			note: '',
			playerList: [],
			seasonUuid: '',
			sessionName: '',

			// form properties
			calenderFocused: false,

			// error messages
			error: '',
			amountError: ''
		}
	};

	addItem = ( item ) =>
	{
		if (this.state.playerList.length === 0) 
		{
			this.setState({ playerList: [item] });
		}
		else
		{
			const index = this.state.playerList.findIndex( (currentItem) =>
			{
				return item.playerUuid === currentItem.playerUuid;
			});
			if(index >= 0)
			{
				const playerList = this.state.playerList;
				playerList[index] = item;
				this.setState({ playerList })
			}
			else
			{
				this.setState({ playerList: [ ...this.state.playerList, item ] })
			}
		}
	}

	removeItem = ( playerUuid ) =>
	{
		const sessionList = this.state.playerList;
		const index = this.state.playerList.findIndex( (currentItem) =>
		{
			return playerUuid === currentItem.playerUuid;
		});
		sessionList.splice( index, 1 );
		this.setState({ playerList: [...sessionList] });
	}

	onSeasonNameChange = ( e ) =>
	{
		const seasonUuid = e.target.value;
		this.setState( () => ({ seasonUuid }) );
	}
	onSessionNameChange = ( e ) => 
	{
		const sessionName = e.target.value;
		if ( sessionName.length <= 30 ) 
		{
			this.setState( () => ({ sessionName }) );
		}
	};
	onAmountChange = ( e ) => 
	{
		const amount = e.target.value;
		if (amount)
		{
			this.setState({showAmountErrorMessage: false})
		}

		// TODO: Figure out how to delete everything?
		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if ( amount == 0 ) 
			{
				this.setState(() => ({amount, amountError: 'Amount cannot be zero'}));
			}
			if (amount > 10000)
			{
				this.setState(() => ({amountError: 'Amount cannot be more than 10 thousand'}));
			}
			if ( !amount || ((amount > 0) && (amount <= 10000)) )
			{
				this.setState({amount, amountError: '' });
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
	isFormFalsy = () =>
	{
		const isFalsy = (
			!this.state.sessionName || 
			!this.state.amount || 
			!this.state.seasonUuid ||
			!(this.state.playerList.length > 0)
		);

		return isFalsy;
	}

	onSubmit = (e) =>
	{
		e.preventDefault();

		const session =
		{
			amount: parseFloat(this.state.amount, 10) * 100,
			createdAt: this.state.createdAt.valueOf(),
			sessionName: this.state.sessionName,
			note: this.state.note,
			seasonUuid: this.state.seasonUuid,
			playerList: this.state.playerList
		};

		let sessionNameExists = false;

		// If sessionNames doesn't exist forEach loop wont run to avoid errors
		this.props.sessionNames && this.props.sessionNames.forEach((session) =>
		{
			if (session.sessionName === this.state.sessionName) 
			{
				sessionNameExists = true;
			}
		})

		if (!sessionNameExists) 
		{
			confirm(`Do you want to add '${this.state.sessionName}' to your default session names?`)
			{
				this.props.addSessionName({sessionName: this.state.sessionName});
			}
		}

		if ( this.isFormFalsy() )
		{
			this.setState( () => ({ error: 'Please check details' }) );
			if(!this.state.amount)
			{
				this.setState({showAmountErrorMessage: true});
			}
		}
		else
		{
			this.setState( () => ({ error: '' }) );
			this.props.onSubmit( session );
		}
	}

	render()
	{
		const amountError = !this.state.amount;

		const error = '__error';
		const seasonErrorClassName = this.state.seasonUuid ? '' : error;
		const sessionNameErrorClassName = this.state.sessionName ? '' : error;
		const amountErrorClassName = this.state.amount ? '' : error;
		const playerListErrorClassName = (this.state.playerList.length > 0) ? '' : error;
		const isFalsy = this.isFormFalsy();

		if( this.props.members && this.props.seasons )
		{
			return (
				<form className='form__session' onSubmit={ this.onSubmit }>
					<div className='form__session-content'>
						{this.state.error && seasonErrorClassName && <p className='form__error'>Please select a Season</p>}
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
						{this.state.error && sessionNameErrorClassName && <p className='form__error'>Please provide a sessionName</p>}
						
						<input 
							id='sessionName'
							className={`text-input${sessionNameErrorClassName}`}
							type="text"
							placeholder="Session name i.e. training"
							value={ this.state.sessionName }
							onChange={ this.onSessionNameChange }
							list='sessionNamesList'
						/>
						{	
							this.props.sessionNames && <datalist id='sessionNamesList'>
							{
								this.props.sessionNames.map((sessionName) =>
								{
									console.log(sessionName);
									return (
										<option key={sessionName.sessionUuid}>{sessionName.sessionName}</option>
									);
								})
							}
							</datalist>
						}

						{ this.state.amountError && <p className='form__error'>{this.state.amountError}</p>}
						{ this.state.showAmountErrorMessage && <p className='form__error'>Please enter an Amount</p>}
						<input
							id='amountToPay'
							className={`text-input${amountErrorClassName}`}
							placeholder='Amount for each player'
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
					</div>

					{ this.state.error && playerListErrorClassName && <p className='form__error'>Please add members</p>}
					<div className='list-header row'>
						<div className='form__session-col-name'>Name</div>
						<div className='form__session-col-checkbox-1'>Attended</div>
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
					{(this.state.error && isFalsy ) && <p className='form__error'>{this.state.error}</p>}
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