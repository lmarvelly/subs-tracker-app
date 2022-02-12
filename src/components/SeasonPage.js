import React from 'react';
import { connect } from 'react-redux';

import SeasonFormFilters from './SeasonListFilters';
import SeasonListItem from './SeasonListItem';
import getVisibleSeasons from '../selectors/seasons';

const SeasonPage = ( props ) =>
{
	return (
		<div>
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