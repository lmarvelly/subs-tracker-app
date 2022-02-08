import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sortAsc, sortDesc, setSeasonTextFilter } from '../actions/seasonFilters';

class SeasonListFilters extends Component
{
	render()
	{
		return(
			<div>
				<h2>Season Filters</h2>
				<form>
					
				</form>
			</div>
		);
	};
};

const mapStateToProps = ( state ) =>
{
	return {
		seasons: state.seasons
	}
}

export default connect( mapStateToProps )( SeasonListFilters );