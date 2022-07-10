import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import getVisibleMembers from '../selectors/members';
import getVisibleSeasons from '../selectors/seasons';
import getVisibleRecords from '../selectors/records';

const MembersSummaryPage = ( props ) =>
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
						<h1 className='page-header__title'>Member Summary Page</h1>
					</div>
				</div>
			</div>

			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select className='select'>
							<option value="">Ryan Mc</option>
						</select>
					</div>
					<div className='input-group__item'>
						<select className='select'>
							<option value="">2021/2022</option>
						</select>
					</div>
				</div>

				<h1 className='page-header__title'>
					Total paid: <span className='bold-font'>£65.50</span>
				</h1>
				<h1 className='page-header__title'>
					Total debt: <span className='bold-font'>£5.00</span>
				</h1>

				<h1 className='page-header__subtitle'>
					Total attendance:
				</h1>
				<h2 className='page-header__subtitle'>
					Training: <span className='bold-font'>48</span>
				</h2>
				<h2 className='page-header__subtitle'>
					GFSN games: <span className='bold-font'>8</span>
				</h2>
				<h2 className='page-header__subtitle'>
					kickabout: <span className='bold-font'>5</span>
				</h2>
				

				<div className='list-header'>
					<div className='show-for-mobile'>Records</div>
					<div className='show-for-desktop'>Record</div>
					<div className='show-for-desktop'>Amount</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						GFSN Match <span className='bold-font'>Debt: £5.00</span>
					</div>
					<div className='list-item__row'>
						24/6/22 <span className='bold-font'>Paid: £0.00</span>
					</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						Training <span className='bold-font'>Paid: £4.00</span>
					</div>
					<div className='list-item__row'>
						20/6/22
					</div>
				</div>
				<div className='list-item'>
					<div className='list-item__row'>
						Kickabout<span className='bold-font'>Paid: £5.00</span>
					</div>
					<div className='list-item__row'>
						17/6/22
					</div>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = ( dispatch, props ) => (
{
	resetMemberFilters: () => dispatch( resetMemberFilters() ),
	resetSeasonFilters: () => dispatch( resetSeasonFilters() )
});

const mapStateToProps = ( state ) =>
{
	return {
		members: getVisibleMembers( state.members, state.memberFilters ),
		seasons: getVisibleSeasons( state.seasons, state.seasonFilters )
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( MembersSummaryPage );