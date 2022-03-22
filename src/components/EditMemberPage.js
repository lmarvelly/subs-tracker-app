import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberForm from './MemberForm';
import { startEditMember, removeMember, startSetMembers } from '../actions/members';

export class EditMemberPage extends Component
{
	constructor( props )
	{
		super( props );
		this.state =
		{
			error: this.props.member ? false : true
		}
	}

	componentDidMount()
	{
		if (this.state.error) 
		{
			this.props.history.push('/members');
		}
	}

	onSubmit = ( member ) =>
	{
		this.props.startEditMember(member);
		
		this.props.startSetMembers();
		this.props.history.push('/members');
	}

	deleteButton = 
		<button
			onClick=
			{
				(e) =>
				{
					confirm('Are you sure you want to remove record?' ) &&
					this.props.dispatch( removeMember( this.props.match.params.id ) );
					this.props.history.push('/members'); // return to members page
				}
			}
		>
			Delete
		</button>

	render()
	{
		return (
			<div>
				<h2>Edit Member Page</h2>
				<MemberForm
					member={this.props.member}
					onSubmit={this.onSubmit}
				/>
				{ this.deleteButton }
			</div>
		);
	}
}


const mapStateToProps = ( state, props ) =>
{	
	return {
			member: state.members.find( ( member ) => member.playerUuid === props.match.params.id 
		)
	}
};

const mapDispatchToProps = ( dispatch, props ) => ({
	startEditMember: ( member ) => dispatch( startEditMember(member.playerUuid, member) ),
	startSetMembers: () => dispatch( startSetMembers() )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditMemberPage );