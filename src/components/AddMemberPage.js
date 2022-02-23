import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberForm from './MemberForm';
import { addMember } from '../actions/members';

export class AddMemberPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	onSubmit =  ( member ) => 
	{
		this.props.dispatch( addMember({ ...member }) );
		this.props.history.push('/members'); // Return to members page
	}

	render()
	{
		return (
			<div>
				<h1>Add Member Page</h1>

				<MemberForm
					onSubmit={ this.onSubmit }
				/>
			</div>
		);
	};
};

export default connect()( AddMemberPage );