import React, { Component } from 'react';

export default class SeasonForm extends Component
{
	constructor( props )
	{
		super( props );

		if ( props.season ) 
		{
			this.state = 
			{
				seasonUuid: props.season.seasonUuid ? props.season.seasonUuid : '',
				seasonName: props.season.seasonName ? props.season.seasonName : ''
			}	
		}
		else
		{
			this.state = 
			{
				seasonName: ''
			}
		}
	}

	onSeasonNameChange = ( e ) =>
	{
		const seasonName = e.target.value;
		this.setState( () => ({ seasonName }));
	}

	onSubmit = ( e ) =>
	{
		e.preventDefault();
		const seasonUuid = this.state.seasonUuid;
		const seasonName = this.state.seasonName;
		const season = () => ({ seasonUuid, seasonName });

		if( !seasonName )
		{
			alert('Please enter a season name');
		}
		else
		{
			this.props.onSubmit( season() );
		}
	}

	render()
	{
		return(
			<div>
				<form onSubmit={ this.onSubmit }>
					Season Name:
					<input 
						type='text'
						placeholder='Season Name'
						value={ this.state.seasonName }
						onChange={ this.onSeasonNameChange }
					/>
					<button>Add Season</button>
				</form>
			</div>
		);
	}
}