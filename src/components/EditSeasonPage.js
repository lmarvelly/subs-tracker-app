import React from 'react';
import { connect } from 'react-redux';

import SeasonForm from './SeasonForm';
import { editSeason, removeSeason } from '../actions/seasons';

const EditSeasonPage = ( props ) =>
{
	const deleteButton = 
		<button
			onClick=
			{
				(e) =>
				{
					console.log(props.match.params.id);
					confirm('Are you sure you want to delete season') &&
					props.dispatch( removeSeason( props.match.params.id ) );
					props.history.push('/seasons');
				}
			}
		>
			Remove Season
		</button>
	return (
		<div>
			<h2>Edit Season Page</h2>
			<SeasonForm />
			{ deleteButton }
		</div>
	);
}

const mapStateToProps = ( state ) =>
{
	return {
		seasons: state.seasons
	}
}

export default connect( mapStateToProps )( EditSeasonPage );