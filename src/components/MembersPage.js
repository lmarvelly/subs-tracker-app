import React from 'react';
import { connect } from 'react-redux';
import MemberItem from './MemberItem';

const MemberPage = ( props ) =>
{
	return (
		<div>
			<form>Members Forms</form>

			<h2>Members List</h2>
			{
				props.members.map( ( member ) =>
				{
					return (
						<MemberItem
							key={ member.playerUuid }
							playerUuid={ member.playerUuid }
							fullName={ member.name }
							nickName={ member.nickName }
						/>
					);
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