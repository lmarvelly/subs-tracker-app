import React from 'react';
import { connect } from 'react-redux';

import SeasonFormFilters from './SeasonListFilters';
import SeasonListItem from './SeasonListItem';

const SeasonPage = ( props ) =>
{
	return (
		<div>
			<SeasonFormFilters />
			
			<h2>Season List</h2>
			{
				props.seasons.map( ( season ) =>
				{
					return <SeasonListItem seasonName={ season.seasonName } />
				})
			}
		</div>
	);
};

// Add visible Season Filters
const mapStateToProps = ( state ) =>
{
	return {
		seasons: state.seasons
	}
};

export default connect( mapStateToProps )(SeasonPage);