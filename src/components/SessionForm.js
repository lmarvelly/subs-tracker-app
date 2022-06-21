import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import SessionFormItem from './SessionFormItem';

export class SessionForm extends Component
{
	constructor( props )
	{
		super(props);
		this.state = 
		{
			createdAt: this.props.createdAt ? moment( this.props.createdAt ) : moment(),
			calenderFocused: false,
			session: []
		}
	};

	addItem = ( item ) =>
	{
		if (this.state.session.length === 0) 
		{
			this.setState({ session: [item] });
		}
		else
		{
			const index = this.state.session.findIndex( (currentItem) =>
			{
				return item.playerUuid === currentItem.playerUuid;
			});
			if(index >= 0)
			{
				const session = this.state.session;
				session[index] = item;
				this.setState({ session })
			}
			else
			{
				this.setState({ session: [ ...this.state.session, item ] })
			}
		}
	}

	removeItem = ( playerUuid ) =>
	{
		const sessionList = this.state.session;
		const index = this.state.session.findIndex( (currentItem) =>
		{
			return playerUuid === currentItem.playerUuid;
		});
		sessionList.splice( index, 1 );
		this.setState({ session: [...sessionList] });
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

	render()
	{
		if( this.props.members && this.props.seasons )
		{
			return (
				<form className='form__session'>
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