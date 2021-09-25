import React, { Component } from 'react';
import EditMemberForm from '../forms/EditMemberForm';

class Member extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			isEditing: false
		}

		this.handleEdit = this.handleEdit.bind( this );
		this.handleRemove = this.handleRemove.bind( this );
	}

	handleEdit( event )
	{
		this.setState({ isEditing: true });
		this.props.handleEdit( this.props.id, this.props.membersList )
	}

	handleRemove( event )
	{
		this.props.handleRemove( this.props.id, this.props.membersList )
	}

	render()
	{
		const renderComponents = this.state.isEditing ? 
		(
			<div>
				<EditMemberForm 
					id={ this.props.id }
					fullName={ this.props.name }
				/>
			</div>
		)
		:
		(
			<div>
				<button onClick={ this.handleRemove }>remove</button>
				<button onClick={ this.handleEdit }>edit</button>
			</div>
		)

		return(
			<div className='Member'>
				<span>{ this.props.name }</span>
				{
					renderComponents
				}
			</div>
		);
	}
}

export default Member;