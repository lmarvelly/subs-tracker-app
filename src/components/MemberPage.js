import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetMemberFilters } from '../actions/memberFilters';
import MemberListFilters from './MemberListFilters';
import MemberListItem from './MemberListItem';
import getVisibleMembers from '../selectors/members';

const MemberPage = ( props ) =>
{
	useEffect(() =>
	{
		return () =>
		{
			props.resetMemberFilters();
		};
	}, []);

	return (
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content'>
						<h1 className='page-header__title'>Members Page</h1>
						<Link className='button' to='/add-member'>Add Member</Link>
					</div>
				</div>
			</div>

			<MemberListFilters />

			<div className='content-container'>
				<div className='list-header'>Members List</div>
				<div className='list-body'>
				{
					props.members.length === 0 ? (
						<div className='list-item list-item--message'>
							<span>No Members</span>
						</div>
					)
					:
					props.members.map( ( member ) =>
					{
						return (
							<MemberListItem
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
		</div>
	);
}

const mapDispatchToProps = ( dispatch, props ) => (
{
	resetMemberFilters: () => dispatch( resetMemberFilters() )
});

const mapStateToProps = ( state ) =>
{
	return {
		members: getVisibleMembers( state.members, state.memberFilters )
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( MemberPage );