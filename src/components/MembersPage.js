import React from 'react';
import { connect } from 'react-redux';

const MemberPage = ( props ) =>
{
	return (
		<div>
			<form>Members Forms</form>

			<h2>Members List</h2>
			{
				props.members.map( ( member ) =>
				{
					return <p key={member.playerUuid}>{member.name}</p>
				})
			}
		</div>
	);
}

const mapStateToProps = ( state ) =>
{
	return {
		members: state.members
	}
}

export default connect( mapStateToProps )( MemberPage );