import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberForm from './MemberForm';
import { startEditMember, removeMember, startSetMembers } from '../actions/members';

export class EditMemberPage extends Component
{
	constructor( props )
	{
		super( props );
		console.log('MEMBER:', this.props.member);
		this.state =
		{
			error: this.props.member ? false : true
		}
	}

	componentDidMount()
	{
		if (this.state.error) 
		{
			console.log('Whoops something went wrong!');
			console.log('MEMBERS:', this.props.members);
			this.props.history.push('/members');
		}
	}

	onSubmit = ( member ) =>
		{
			this.props.dispatch(
				startEditMember(
					member.playerUuid,
					member
				) 
			);
			
			this.props.dispatch(startSetMembers());
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

export default connect( mapStateToProps )( EditMemberPage );