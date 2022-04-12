import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberForm from './MemberForm';
import { startEditMember, startRemoveMember } from '../actions/members';

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
		
		this.props.history.push('/members');
	}

	deleteButton = 
		<button
			className='button--secondary margin-bottom-large'
			onClick=
			{
				(e) =>
				{
					confirm('Are you sure you want to remove record?' ) &&
					this.props.startRemoveMember( this.props.member.playerUuid ) ;
					this.props.history.push('/members'); // return to members page
				}
			}
		>
			Remove Member
		</button>

	render()
	{
		return (
			<div>
				<div className='page-header'>
					<div className='content-container'>
						<h1 className='page-header__title'>Edit Member Page</h1>
					</div>
				</div>

				<div className='content-container'>
					<MemberForm
						member={this.props.member}
						onSubmit={this.onSubmit}
					/>
					{ this.deleteButton }
				</div>
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

const mapDispatchToProps = ( dispatch, props ) => (
{
	startEditMember: ( member ) => dispatch( startEditMember(member.playerUuid, member) ),
	startRemoveMember: ( data ) => dispatch( startRemoveMember( data ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditMemberPage );