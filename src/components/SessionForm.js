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

	onAttend = ( e ) =>
	{
		if (e.target.checked) 
		{
			console.log(e.target.value);
		}
		if (!e.target.checked) 
		{
			console.log('false');
		}
	}

	// TODO: Need to return playerUuid when checkbox is clicked
	// REMOVE: HR and replace it with line on bottom of div
	// Have paid box disabled unless attended box is checked
	render()
	{
		if( this.state.members && this.state.seasons )
		{
			return (
				<form className='form__session'>
					<div className='form__session-header'>
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
						<hr className='margin-bottom-medium' />
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
									onAttend={this.onAttend}
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