import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeMember } from '../actions/members';

const MemberItem = ( props) =>
{
	const deleteButton = 
	<button
		onClick=
		{
			(e) =>
			{
				confirm('Are you sure you want to remove record?', props.playerUuid) &&
				props.dispatch( removeMember( props.playerUuid ) );
			}
		}
	>
		Delete
	</button>
	return (
		<div>
			<span>Full Name:<b>{props.fullName}</b></span>
			<br />
			<span>Nick Name:<b>{props.nickName}</b></span>
			<br />
			<a>Insert Edit Link Here</a>
			{deleteButton}
			<br />
			<br />
		</div>
	);
}

const mapStateToProps = ( state, props ) =>
{
	return {
		members: state.members
	}
};

export default connect( mapStateToProps )( MemberItem );