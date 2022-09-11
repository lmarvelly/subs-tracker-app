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
			amount: props.session ? (props.session.amount / 100 ) : '',
			createdAt: this.props.createdAt ? moment( this.props.createdAt ) : moment(),
			note: props.session ? props.session.note : '',
			playerList: props.session ? props.session.playerList : [],
			seasonUuid: props.session ? props.session.seasonUuid : '',
			sessionName: props.session ? props.session.sessionName : '',

			// form properties
			calenderFocused: false,

			// error messages
			error: '',
			amountError: ''
		}
	};

	addPlayer = ( item ) =>
	{
		if (this.state.playerList.length === 0) 
		{
			this.setState({ playerList: [item] });
		}
		else
		{
			const index = this.state.playerList.findIndex( (currentPlayer) =>
			{
				return item.playerUuid === currentPlayer.playerUuid;
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

	updatePlayer = ( item ) =>
	{
		const playerList = this.state.playerList;
		const index = this.state.playerList.findIndex( (session) =>
		{
			return item.playerUuid === session.playerUuid;
		});
		playerList[index] = item;
		this.setState({ playerList })
	}

	removePlayer = ( playerUuid ) =>
	{
		const sessionList = this.state.playerList;
		const index = this.state.playerList.findIndex( (currentPlayer) =>
		{
			return playerUuid === currentPlayer.playerUuid;
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

		if (!sessionNameExists && (this.state.sessionName.length > 0)) 
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
			session.playerList.forEach((player) =>
			{
				if (isNaN(player.discount))
				{
					const index = session.playerList.findIndex( (currentPlayer) =>
					{
						return player.playerUuid === currentPlayer.playerUuid;
					});

					session.playerList[index] = {discount: 0, playerUuid: player.playerUuid}
				}
			});

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
						<div className='form__session-col-attend'>Attended</div>
					</div>
					{
						this.props.members.map(( member ) =>
						{
							let attending = false;
							let discount = '';

							this.state.playerList.map((player) =>
							{
								if( member.playerUuid === player.playerUuid )
								{
									attending = true;
									discount = player.discount;
								}
							});

							return (
								<SessionFormItem 
									key={member.playerUuid}
									attending={attending}
									discount={discount}
									firstName={member.firstName}
									surname={member.surname}
									playerUuid={member.playerUuid}
									addPlayer={this.addPlayer}
									updatePlayer={this.updatePlayer}
									removePlayer={this.removePlayer}
								/>
							);
						})
					}
							
					{(this.state.error && isFalsy ) && <p className='form__error'>{this.state.error}</p>}
					
					<button className='button'>
					{
						this.props.session ? 'Edit Session' : 'Add Session'
					}
					</button>
					
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