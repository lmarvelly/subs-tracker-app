import React from 'react';
import { connect } from 'react-redux';

import MemberForm from './MemberForm';
import { startEditMember, removeMember } from '../actions/members';

const EditMemberPage = ( props ) =>
{
	const member = props.members.find( ( member ) => 
		member.playerUuid === props.match.params.id 
	);
	const deleteButton = 
	<button
		onClick=
		{
			(e) =>
			{
				confirm('Are you sure you want to remove record?' ) &&
				props.dispatch( removeMember( props.match.params.id ) );
				props.history.push('/members'); // return to members page
			}
		}
	>
		Delete
	</button>

	return (
		<div>
			<h2>Edit Member Page</h2>
			<MemberForm
				member={member}
				onSubmit={( member =>
				{
					props.dispatch(
						startEditMember(
							member.playerUuid,
							member
						) 
					);

					props.history.push('/members');
				})}
			/>
			{ deleteButton }
		</div>
	);
}

const mapStateToProps = ( state, props ) =>
{
	return {
		members: state.members
	}
};

export default connect( mapStateToProps )( EditMemberPage );