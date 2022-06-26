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

	onDateChange = ( createdAt ) => 
	{
		if(createdAt) // prevents the user from deleting the date.
		{
			this.setState( () => ({ createdAt }) );
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

	render()
	{
		if( this.props.members && this.props.seasons )
		{
			return (
				<form className='form__session' onSubmit={ this.onSubmit }>
					<div className='form__session-header'>
						<SingleDatePicker
							date={ this.state.createdAt }
							onDateChange={ this.onDateChange }
							focused={ this.state.calenderFocused }
							onFocusChange={ this.onFocusChange }
							numberOfMonths={ 1 }
							isOutsideRange={ () => false }
							displayFormat="DD/MM/YYYY"
						/>
						<select className='select'>
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
							placeholder='Session name. i.e. training' 
							className='text-input' 
							type="text" 
						/>
						<input 
							placeholder='Amount each'
							className='text-input'
							type="text"
						/>
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