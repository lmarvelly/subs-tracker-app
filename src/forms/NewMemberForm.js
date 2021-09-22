import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

// import { saveMembers } from '../functions/storageFunctions';

class NewMemberForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			fullName: '',
			uuid: uuid(),
			membersList: []
		}

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentDidMount = () =>
	{
		this.setState(
		{
			membersList: this.props.membersList
		});
	}

	componentDidUpdate( prevProps, prevState )
	{
		if( prevState.membersList.length !== this.state.membersList.length )
		{
			this.props.saveMembers( this.state.membersList );
		}
	}

	/**
	 * When the state of the text box changes the state of the form
	 * changes.
	 * 
	 * @param {*} event text box event
	 */
	handleChange( event )
	{
		event.preventDefault();

		this.setState({ fullName: event.target.value })
	}

	/**
	 * 
	 * @param {*} event Submit event
	 */
	handleSubmit( event )
	{
		let { membersList } = this.props;
		let newMember = { name: this.state.fullName, uuid: this.state.uuid }

		this.setState(
		{ 
			membersList: [...membersList, newMember ] 
		});
	}

	render()
	{
		return(
			<div>
				<h1>Add New Member</h1>
				<form onSubmit={ this.handleSubmit }>
					<label htmlFor="fullName">Full Name</label>
					<input 
						id="fullName"
						type="text" 
						defaultValue={ this.state.fullName }
						onChange={ this.handleChange }
						placeholder='Full Name'
					/>
				</form>
			</div>
		);
	}
}

export default NewMemberForm;