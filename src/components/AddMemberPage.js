import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberForm from './MemberForm';
import { startAddMember } from '../actions/members';

export class AddMemberPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	onSubmit =  ( member ) => 
	{
		this.props.startAddMember( { ...member } );
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

// Using mapDispatchToProps to make testing easier
const mapDispatchToProps = ( dispatch ) => (
{
	startAddMember: ({ ...member }) => dispatch( startAddMember({ ...member }) )
});

// undefined is where mapStateToProps is usually
export default connect( undefined, mapDispatchToProps )( AddMemberPage );