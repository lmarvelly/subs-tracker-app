import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeasonForm from './SeasonForm';
import { startEditSeason, startRemoveSeason } from '../actions/seasons';

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
			className='button--secondary'
			onClick=
			{
				(e) =>
				{
					confirm('Are you sure you want to delete season') &&
					this.props.startRemoveSeason( this.props.season.seasonUuid );
					this.props.history.push('/seasons');
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
				<div className='page-header'>
					<div className='content-container'>
						<h1 className='page-header__title'>Edit Season Page</h1>
					</div>
				</div>
				
				<div className='content-container'>
					<SeasonForm
						season={this.props.season}
						onSubmit={this.onSubmit}
					/>
					{ this.deleteButton }
				</div>
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
	startRemoveSeason: ( data ) => dispatch( startRemoveSeason( data ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditSeasonPage );