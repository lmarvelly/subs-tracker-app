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
			<Link className='button' to='/add-season'>Add Season</Link>

			<SeasonFormFilters />
			
			<h2>Season List</h2>
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