import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

class NewMemberForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			fullName: '',
			uuid: '',
			memberList: []
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

	/**
	 * When the state of the text box changes the state of the form
	 * changes.
	 * 
	 * @param {*} event text box event
	 */
	handleChange( event )
	{
		this.setState({ fullName: event.target.value })
	}

	/**
	 * 
	 * @param {*} event Submit event
	 */
	handleSubmit( event )
	{
		event.preventDefault();
		this.setState({uuid: uuid()});
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
					/>
				</form>
			</div>
		);
	}
}

export default NewMemberForm;