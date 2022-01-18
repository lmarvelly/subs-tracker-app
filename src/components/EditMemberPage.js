import React from 'react';
import { connect } from 'react-redux';

import { removeMember } from '../actions/members';

const EditMemberPage = ( props ) =>
{
	const deleteButton = 
	<button
		onClick=
		{
			(e) =>
			{
				confirm('Are you sure you want to remove record?' ) &&
				props.dispatch( removeMember( props.match.params.id ) );
				props.history.push('/members'); // return to 
			}
		}
	>
		Delete
	</button>

	return (
		<div>
			<h2>Edit Member Page</h2>
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