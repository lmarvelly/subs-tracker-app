import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export class SessionForm extends Component
{
	constructor( props )
	{
		super(props);
		this.state = 
		{
			members: this.props.members ? this.props.members : '',
			seasons: this.props.seasons ? this.props.seasons : ''
		}
	};

	// TODO: Need to return playerUuid when checkbox is clicked

	render()
	{
		if( this.state.members && this.state.seasons )
		{
			return (
				<form>
					<div className='form__session-header'>
						<div className='form__session-col-name'>Name</div>
						<div className='form__session-col-checkbox'>Attended</div>
						<div className='form__session-col-checkbox'>Paid</div>
					</div>
					<hr />

					{
						this.state.members.map(( member ) =>
						{
							return (
								<div>
									<div className='form__session-item'>
										<div className='form__session-col-name'>
											<span>{`${member.firstName} ${member.surname}`}</span>
										</div>
										<div className='form__session-col-checkbox'>
											<input name='attended' type="checkbox" />
										</div>
										<div className='form__session-col-checkbox'>
											<input type="checkbox" />
										</div>
									</div>
									<hr />
								</div>
							);
						})
					}
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