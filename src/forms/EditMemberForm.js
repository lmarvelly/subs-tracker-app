import React, { Component } from 'react';
import { editMember } from '../functions/storageFunctions';

class EditMemberForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			fullName: ''
		}
	}

	handleChange = ( event ) =>
	{
		event.preventDefault();

		this.setState({ fullName: event.target.value });
	}

	handleSubmit = ( event ) =>
	{
		event.preventDefault();
		if ( this.state.fullName )
		{
			const editedMember = 
			{
				name: this.state.fullName, 
				uuid: this.props.uuid 
			}
			editMember( editedMember, this.props.membersList );
		}
		this.props.toggleEdit();
		this.props.updateMembers();
	}

	render()
	{
		return(
			<form onSubmit={ this.handleSubmit }>
				<input 
					defaultValue={ this.props.fullName }
					onChange={ this.handleChange }
					type="text"
				/>
			</form>
		);
	}
}

export default EditMemberForm