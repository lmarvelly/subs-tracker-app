import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeasonForm from './SeasonForm';
import { startEditSeason, removeSeason } from '../actions/seasons';

export class EditSeasonPage extends Component
{
	constructor( props )
	{
		super( props )
		this.state =
		{
			error: this.props.season ? false : true
		};
	};

	componentDidMount()
	{
		if( this.state.error )
		{
			this.props.history.push('/seasons');
		};
	};

	onSubmit = ( season ) =>
	{
		this.props.startEditSeason( season );
		this.props.history.push('/seasons');
	};

	deleteButton = 
	(
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
	);

	render()
	{
		return (
			<div>
				<h2>Edit Season Page</h2>
				<SeasonForm
					season={this.props.season}
					onSubmit={this.onSubmit}
				/>
				{ this.deleteButton }
			</div>
		);
	}
};

const mapStateToProps = ( state, props ) =>
{
	return {
		season: state.seasons.find( ( season ) => season.seasonUuid === props.match.params.id),
	};
};

const mapDispatchToProps = ( dispatch, props ) => (
{
	startEditSeason: ( season ) => dispatch( startEditSeason(season.seasonUuid, season) ),
	startSetSeason: () => dispatch( startSetSeason() )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditSeasonPage );