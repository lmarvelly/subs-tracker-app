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
			session: [],
			members: this.props.members ? this.props.members : '',
			seasons: this.props.seasons ? this.props.seasons : ''
		}
	};

	onAddItem = ( item ) =>
	{
		console.log(item); // TODO: remove after testing

		// let exists = false;
		if (this.state.session.length === 0) 
		{
			this.setState({ session: [item] });
		}
		else
		{
			const index = this.state.session.findIndex( (currentItem) =>
			{
				return item.playerUuid === currentItem.playerUuid;
			})

			console.log('INDEX: ', index);
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

	render()
	{
		if( this.state.members && this.state.seasons )
		{
			return (
				<form className='form__session'>
					<div className='form__session-header'>
						<select name="" id="">
							<option value="">Select a Season</option>
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
						this.state.members.map(( member ) =>
						{
							return (
								<SessionFormItem 
									key={member.playerUuid}
									firstName={member.firstName}
									surname={member.surname}
									playerUuid={member.playerUuid}
									onAddItem={this.onAddItem}
								/>
							);
						})
					}
					<button className='button'>Add Session</button>
				</form>
			);
		}
		else if ( !this.state.members && !this.state.seasons ) 
		{
			// TODO
			console.log('Whoops there are no members or seasons');
			return(<div></div>);
		}
		else if ( !this.state.members ) 
		{
			// TODO
			console.log('Whoops there are no members');
			return(<div></div>);
		}
		else if ( !this.state.seasons ) 
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