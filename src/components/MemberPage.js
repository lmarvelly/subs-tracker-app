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
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content'>
						<h1 className='page-header__title'>Members</h1>
						<Link className='button' to='/add-member'>Add Member</Link>
					</div>
				</div>
			</div>

			<div className='content-container'>
				<MemberListFilters />

				<div className='list-header'>Members List</div>
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