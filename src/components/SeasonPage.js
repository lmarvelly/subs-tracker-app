import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SeasonFormFilters from './SeasonListFilters';
import SeasonListItem from './SeasonListItem';
import getVisibleSeasons from '../selectors/seasons';

const SeasonPage = ( props ) =>
{
	return (
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content'>
						<h1 className='page-header__title'>Season List</h1>
						<Link className='button' to='/add-season'>Add Season</Link>
					</div>
				</div>
			</div>
			
			<SeasonFormFilters />
			
			<div className='content-container'>
				<div className='list-header'>Seasons List</div>
				<div className='list-body'>
				{
					props.seasons.map( ( season ) =>
					{
						return <SeasonListItem 
									key={ season.seasonUuid } 
									seasonName={ season.seasonName } 
									seasonUuid={ season.seasonUuid } />
					})
				}
				</div>
			</div>
		</div>
	);
};

// Add visible Season Filters
const mapStateToProps = ( state ) =>
{
	return {
		seasons: getVisibleSeasons( state.seasons, state.seasonFilters )
	}
};

export default connect( mapStateToProps )(SeasonPage);