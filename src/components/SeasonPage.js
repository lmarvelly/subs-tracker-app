import React from 'react';
import { connect } from 'react-redux';

const SeasonPage = ( props ) =>
{
	return (
		<div>
			<h2>Season List</h2>
		</div>
	);
}

// Add visible Season Filters
const mapStateToProps = ( state ) =>
{
	return {
		seasons: state.seasons
	}
}



export default connect( mapStateToProps )(SeasonPage);