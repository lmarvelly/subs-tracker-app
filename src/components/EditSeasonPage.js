import React from 'react';
import { connect } from 'react-redux';

import SeasonForm from './SeasonForm';
import { editSeason, removeSeason } from '../actions/seasons';

const EditSeasonPage = ( props ) =>
{
	return (
		<div>
			<h2>Edit Season Page</h2>
			<SeasonForm />
		</div>
	);
}

const mapStateToProps = (  ) =>
{
	return {
		seasons: state.seasons
	}
}

export default connect( mapStateToProps )( EditSeasonPage );