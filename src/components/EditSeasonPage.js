import React from 'react';
import { connect } from 'react-redux';

import SeasonForm from './SeasonForm';
import { editSeason, removeSeason } from '../actions/seasons';

const EditSeasonPage = ( props ) =>
{
	const season = props.seasons.find( ( season ) =>
		season.seasonUuid === props.match.params.id
	);
	console.log(season);
	const deleteButton = 
		<button
			onClick=
			{
				(e) =>
				{
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
			<SeasonForm
				season={season}
				onSubmit={( season =>
				{
					props.dispatch(
						editSeason(
							season.seasonUuid,
							season
						)
					);

					props.history.push('/seasons');
				})}
			/>
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