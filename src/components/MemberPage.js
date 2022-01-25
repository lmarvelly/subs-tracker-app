import React from 'react';
import { connect } from 'react-redux';
import MemberListFilters from './MemberListFilters';
import MemberItem from './MemberItem';
import getVisibleMembers from '../selectors/members';

const MemberPage = ( props ) =>
{
	return (
		<div>
			<MemberListFilters />

			<h2>Members List</h2>
			{
				props.members.map( ( member ) =>
				{
					return (
						<MemberItem
							key={ member.playerUuid }
							playerUuid={ member.playerUuid }
							firstName={ member.firstName }
							middleNames={ member.middleNames }
							surname={ member.surname }
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
		members: getVisibleMembers( state.members, state.memberFilters )
	}
}

export default connect( mapStateToProps )( MemberPage );