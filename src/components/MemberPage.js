import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MemberListFilters from './MemberListFilters';
import MemberItem from './MemberItem';
import getVisibleMembers from '../selectors/members';

const MemberPage = ( props ) =>
{
	return (
		<div>
			<Link className='button' to='/add-member'>Add Member</Link>

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
							nickname={ member.nickname }
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